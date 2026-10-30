import { detectFormat } from './detect.mjs';
import { scoreQuality } from './quality.mjs';
import { conventionFindings } from './conventions.mjs';
import { placeForLint, restructure } from './restructure.mjs';

function counts(violations) {
  let errors = 0;
  let warnings = 0;
  for (const item of violations || []) {
    if (item.advisory) warnings += 1;
    else if (String(item.severity || '').startsWith('warn')) warnings += 1;
    else errors += 1;
  }
  return { errors, warnings };
}

/**
 * @param {{ path?: string, text: string }[]} files
 * @param {{ format?: string, lint?: (files: {path: string, text: string}[]) => Promise<{violations: object[], version?: string, engine?: string}> }} [options]
 */
export async function scoreDocument(files, options = {}) {
  const input = files.map((file) => ({
    path: file.path || 'pasted.md',
    text: String(file.text || '').replace(/\r\n/g, '\n'),
  }));
  const detection = detectFormat(input);
  const format = options.format && options.format !== 'auto' ? options.format : detection.format;
  const quality = scoreQuality(input);
  const conventions = conventionFindings(format, input);
  const skeleton = restructure(input);
  const skeletonQuality = scoreQuality(skeleton.files.filter((file) => file.path.endsWith(`/${skeleton.slug}/README.md`)));

  let specscore = null;
  let skeletonLint = null;
  if (options.lint) {
    skeletonLint = await options.lint(skeleton.files);
    if (format === 'specscore') {
      const placed = placeForLint(input);
      const raw = await options.lint(placed.files);
      const violations = placed.keep ? raw.violations.filter(placed.keep) : raw.violations;
      specscore = {
        ...raw,
        violations,
        omitted: raw.violations.length - violations.length,
      };
    }
  }

  const lintCounts = counts(specscore?.violations);
  const share = {
    format,
    score: quality.score,
    errors: quality.findings.filter((item) => item.status === 'fail').length + lintCounts.errors,
    warnings: quality.findings.filter((item) => item.status === 'warn').length + lintCounts.warnings,
  };

  return {
    detection,
    format,
    overridden: Boolean(options.format && options.format !== 'auto' && options.format !== detection.format),
    quality,
    conventions,
    skeleton,
    skeletonQuality,
    specscore,
    skeletonLint,
    share,
  };
}
