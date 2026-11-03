// Click-to-load for <FilmEmbed>. Nothing is requested from YouTube until the
// visitor clicks the play button; then the poster button is replaced by an
// iframe on the privacy-enhanced youtube-nocookie.com domain.
const EMBED_ORIGIN = 'https://www.youtube-nocookie.com/embed/';

export function embedUrl(videoId: string): string {
  return `${EMBED_ORIGIN}${encodeURIComponent(videoId)}?autoplay=1`;
}

export function initFilms(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-film]').forEach((figure) => {
    if (figure.dataset.filmReady) return;
    figure.dataset.filmReady = '1';
    const button = figure.querySelector<HTMLButtonElement>('.film__play');
    const videoId = figure.dataset.videoId;
    if (!button || !videoId) return;
    button.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = embedUrl(videoId);
      frame.title = figure.dataset.videoTitle ?? '';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      button.replaceWith(frame);
      frame.focus();
    });
  });
}
