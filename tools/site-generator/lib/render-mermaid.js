const MERMAID_BLOCK_RE = /```mermaid\n([\s\S]*?)```/g;

/**
 * Escapes &, <, > so the diagram source survives being embedded in HTML.
 * Mermaid syntax uses `-->`, `<|--`, etc., so `<` must be escaped or the
 * browser will treat it as a tag.
 */
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Replaces ```mermaid fenced blocks with <pre class="mermaid"> elements that
 * the Mermaid client-side script (loaded conditionally by injectIntoTemplate)
 * will hydrate into SVG on page load.
 *
 * The wrapper structure (mermaid-wrap / mermaid-label / mermaid-body) mirrors
 * the previous Puppeteer-based output so the existing CSS still applies.
 *
 * @param {string} markdown
 * @returns {{ markdown: string, hasMermaid: boolean }}
 */
export function renderMermaidBlocks(markdown) {
  let hasMermaid = false;
  const out = markdown.replace(MERMAID_BLOCK_RE, (_match, source) => {
    hasMermaid = true;
    const escaped = escapeHtml(source.trim());
    return (
      '<div class="mermaid-wrap">\n' +
      '<div class="mermaid-label">Diagram</div>\n' +
      '<div class="mermaid-body"><pre class="mermaid">' + escaped + '</pre></div>\n' +
      '</div>'
    );
  });
  return { markdown: out, hasMermaid };
}
