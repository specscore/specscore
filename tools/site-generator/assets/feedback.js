// Keep feedback independent from analytics consent and page content.
(() => {
  const button = document.querySelector('[data-feedback-launcher]');
  const embed = document.getElementById('site-feedback-widget');
  const ready = () => { if (button && typeof window.ImproveIt?.open === 'function') button.hidden = false; };
  embed?.addEventListener('load', ready, {once: true});
  ready();
  button?.addEventListener('click', () => window.ImproveIt?.open());
})();
