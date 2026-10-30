// Universal spec-quality rubric. These checks are generic heuristics.
// They are not SpecScore lint rules. Every format is scored on the same list.

const SCOPE_HEADING = /^(#{1,3})\s+.*(summary|problem|goal|objective|purpose|overview|background|motivation|why\b|scope|概要|背景|问题|問題|目标|目標|目的|objetivo|problema|цель|проблема|amaç|мета|проблема|개요|문제|목표)/im;
const VAGUE = /\b(fast|quickly|user-friendly|intuitive|robust|seamless|several|various|appropriate|adequate|efficient|easy to|simple to|and so on|etc\.|TBD|TODO|FIXME|NEEDS CLARIFICATION)\b/gi;
const TESTABLE = /(\*\*given\*\*|\bgiven\b[\s\S]{0,240}\bwhen\b[\s\S]{0,240}\bthen\b|\*\*when\*\*|\*\*then\*\*|\bwhen\b[\s\S]{0,240}\bshall\b|\bshall\b|\bmust\b|\*\*fr-\d+|\*\*sc-\d+|#### scenario:|^### ac: )/im;
const TERM_HEADING = /^#{1,3}\s+.*(glossary|definitions|terminology|key entities|用語|术语|術語|glosario|glossaire|glossario|глоссарий|terimler|глосарій|용어)/im;
const NFR = /\b(non-functional|performance|latency|throughput|security|privacy|accessibility|availability|reliability|scalability|compliance|性能|安全|隐私|隱私|seguridad|rendimiento|confidentialité|accessibilité|sicurezza|доступность|güvenlik|безпек|보안|가용)\b/i;
const EDGE = /^#{1,3}\s+.*(edge cases|error handling|failure|empty state|boundary)|(\berror\b|\btimeout\b|\bempty\b|\binvalid\b|\bboundary\b)/im;
const TRACE = /\b(REQ-\d+|FR-\d+|NFR-\d+|SC-\d+|AC-\d+|T\d{3})\b|^### AC: |^### Requirement:/m;

function lineNumber(text, index) {
  if (index < 0) return null;
  return text.slice(0, index).split('\n').length;
}

function locate(files, re) {
  const flags = re.flags.includes('g') ? re.flags.replace('g', '') : re.flags;
  const copy = new RegExp(re.source, flags);
  for (const file of files) {
    const match = copy.exec(file.text);
    if (match) return { file: file.path || 'pasted.md', line: lineNumber(file.text, match.index), match: match[0] };
  }
  return null;
}

function latinRatio(text) {
  const letters = text.replace(/\s/g, '');
  if (!letters) return 1;
  const latin = letters.match(/[A-Za-z]/g) || [];
  return latin.length / letters.length;
}

function headings(text) {
  return text.split('\n').filter((line) => /^#{1,6}\s+\S/.test(line));
}

function push(findings, finding) {
  findings.push({ origin: 'generic', ...finding });
}

/**
 * @param {{ path?: string, text: string }[]} files
 */
export function scoreQuality(files) {
  const text = files.map((file) => file.text || '').join('\n');
  const findings = [];
  const chars = text.trim().length;
  const heads = headings(text);

  const scopeAt = locate(files, SCOPE_HEADING);
  if (chars < 80) {
    push(findings, { id: 'quality/scope', status: 'fail', key: 'scope-fail', fixKey: 'scope-fix', line: 1, file: files[0]?.path || null });
  } else if (!scopeAt) {
    push(findings, { id: 'quality/scope', status: 'warn', key: 'scope-warn', fixKey: 'scope-fix', line: 1, file: files[0]?.path || null });
  } else {
    push(findings, { id: 'quality/scope', status: 'pass', key: 'scope-pass', line: scopeAt.line, file: scopeAt.file });
  }

  const testable = locate(files, TESTABLE);
  const requirementLike = /\b(should|must|shall|requirement)\b/i.test(text) || /^as an?\b/im.test(text);
  if (testable && !/unspecified|NEEDS CLARIFICATION/i.test(testable.match)) {
    push(findings, { id: 'quality/testable', status: 'pass', key: 'testable-pass', line: testable.line, file: testable.file });
  } else if (requirementLike) {
    push(findings, { id: 'quality/testable', status: 'fail', key: 'testable-fail', fixKey: 'testable-fix', line: testable?.line || 1, file: testable?.file || files[0]?.path || null });
  } else {
    push(findings, { id: 'quality/testable', status: 'warn', key: 'testable-warn', fixKey: 'testable-fix', line: 1, file: files[0]?.path || null });
  }

  if (latinRatio(text) < 0.2) {
    push(findings, { id: 'quality/unambiguous', status: 'na', key: 'vague-na' });
  } else {
    const hits = [];
    for (const file of files) {
      const re = new RegExp(VAGUE.source, 'gi');
      let match;
      while ((match = re.exec(file.text))) {
        hits.push({ word: match[0], line: lineNumber(file.text, match.index), file: file.path || 'pasted.md' });
        if (hits.length >= 8) break;
      }
    }
    if (hits.length === 0) {
      push(findings, { id: 'quality/unambiguous', status: 'pass', key: 'vague-pass' });
    } else if (hits.length < 4) {
      push(findings, {
        id: 'quality/unambiguous', status: 'warn', key: 'vague-warn', fixKey: 'vague-fix',
        line: hits[0].line, file: hits[0].file, params: { word: hits[0].word, line: hits[0].line, count: hits.length },
      });
    } else {
      push(findings, {
        id: 'quality/unambiguous', status: 'fail', key: 'vague-fail', fixKey: 'vague-fix',
        line: hits[0].line, file: hits[0].file, params: { word: hits[0].word, line: hits[0].line, count: hits.length },
      });
    }
  }

  const terms = locate(files, TERM_HEADING) || locate(files, /^\*\*[A-Z][A-Za-z0-9 -]{2,40}:\*\*/m);
  if (terms) push(findings, { id: 'quality/terms', status: 'pass', key: 'terms-pass', line: terms.line, file: terms.file });
  else push(findings, { id: 'quality/terms', status: 'warn', key: 'terms-warn', fixKey: 'terms-fix' });

  const nfr = locate(files, NFR);
  if (nfr) push(findings, { id: 'quality/nfr', status: 'pass', key: 'nfr-pass', line: nfr.line, file: nfr.file });
  else push(findings, { id: 'quality/nfr', status: 'warn', key: 'nfr-warn', fixKey: 'nfr-fix' });

  const edge = locate(files, EDGE);
  if (edge) push(findings, { id: 'quality/edge', status: 'pass', key: 'edge-pass', line: edge.line, file: edge.file });
  else push(findings, { id: 'quality/edge', status: 'warn', key: 'edge-warn', fixKey: 'edge-fix' });

  const trace = locate(files, TRACE);
  if (trace) push(findings, { id: 'quality/trace', status: 'pass', key: 'trace-pass', line: trace.line, file: trace.file });
  else if (requirementLike) push(findings, { id: 'quality/trace', status: 'fail', key: 'trace-fail', fixKey: 'trace-fix' });
  else push(findings, { id: 'quality/trace', status: 'warn', key: 'trace-warn', fixKey: 'trace-fix' });

  const h2 = heads.filter((line) => line.startsWith('## ')).length;
  if (chars < 80) {
    push(findings, { id: 'quality/structure', status: 'fail', key: 'structure-fail', fixKey: 'structure-fix-short' });
  } else if (chars < 400 || h2 === 0) {
    push(findings, { id: 'quality/structure', status: 'warn', key: 'structure-warn-short', fixKey: 'structure-fix-short' });
  } else if (chars > 12000 && h2 < 2) {
    push(findings, { id: 'quality/structure', status: 'warn', key: 'structure-warn-long', fixKey: 'structure-fix-long', params: { chars } });
  } else {
    push(findings, { id: 'quality/structure', status: 'pass', key: 'structure-pass' });
  }

  const applicable = findings.filter((item) => item.status !== 'na');
  const points = applicable.reduce((sum, item) => sum + (item.status === 'pass' ? 1 : item.status === 'warn' ? 0.5 : 0), 0);
  const score = applicable.length ? Math.round((100 * points) / applicable.length) : 0;
  return { score, findings };
}
