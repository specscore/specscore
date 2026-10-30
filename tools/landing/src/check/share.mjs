const ALLOWED = ['v', 'fmt', 'q', 'e', 'w'];

/**
 * A share fragment carries the format and the counts only.
 * Spec text is never serialized.
 * @param {{ format: string, score: number, errors: number, warnings: number }} result
 */
export function shareParams(result) {
  const params = new URLSearchParams();
  params.set('v', '1');
  params.set('fmt', result.format);
  params.set('q', String(result.score));
  params.set('e', String(result.errors));
  params.set('w', String(result.warnings));
  return params.toString();
}

export function shareHash(result) {
  return `#${shareParams(result)}`;
}

/**
 * @param {string} hash including or excluding the leading #
 * @returns {{ format: string, score: number, errors: number, warnings: number } | null}
 */
export function parseShareHash(hash) {
  const raw = String(hash || '').replace(/^#/, '');
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  for (const key of params.keys()) {
    if (!ALLOWED.includes(key)) return null;
  }
  if (params.get('v') !== '1') return null;
  const format = params.get('fmt') || '';
  const score = Number(params.get('q'));
  const errors = Number(params.get('e'));
  const warnings = Number(params.get('w'));
  if (!format || !Number.isFinite(score) || !Number.isFinite(errors) || !Number.isFinite(warnings)) {
    return null;
  }
  if (format.length > 40 || score < 0 || score > 100 || errors < 0 || warnings < 0) return null;
  return { format, score, errors, warnings };
}

/** Shields.io badge markdown. The score number is the only payload. */
export function badgeMarkdown(score, pageUrl) {
  const color = score >= 80 ? 'brightgreen' : score >= 50 ? 'yellow' : 'red';
  const label = encodeURIComponent('spec quality');
  const value = encodeURIComponent(`${score}/100`);
  return `[![Spec quality ${score}/100](https://img.shields.io/badge/${label}-${value}-${color})](${pageUrl})`;
}
