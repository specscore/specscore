// The landing (tools/landing, Astro) shows a click-to-load product film under the
// hero on the English and Russian home pages. These tests check the built pages in
// public/ (run `sh tools/cf-build.sh` first; CI does) and the click behaviour.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import {embedUrl, initFilms} from '../../landing/src/scripts/film-embed.ts';

const FILMS = {
  'index.html': {id: 'dvYYsFzfDlk', other: 'VBTWMyOfkLs', poster: '/film/specscore-specs-that-pass-en.webp', duration: '1:38'},
  'ru/index.html': {id: 'VBTWMyOfkLs', other: 'dvYYsFzfDlk', poster: '/film/specscore-specs-that-pass-ru.webp', duration: '1:52'},
};

async function built(file) {
  const url = new URL(`../../../public/${file}`, import.meta.url);
  try {
    await access(url);
  } catch {
    return null;
  }
  return readFile(url, 'utf8');
}

for (const [file, film] of Object.entries(FILMS)) {
  test(`${file}: film slot has a local poster, no YouTube request before the click`, async (t) => {
    const html = await built(file);
    if (html === null) return t.skip('public/ not built; run sh tools/cf-build.sh');
    assert.ok(html.includes(`data-video-id="${film.id}"`), 'film id for this locale');
    assert.ok(!html.includes(`data-video-id="${film.other}"`), 'never the other locale film');
    assert.match(html, new RegExp(`<img[^>]*class="film__poster"[^>]*src="${film.poster}"[^>]*width="1280"[^>]*height="720"|<img[^>]*src="${film.poster}"[^>]*width="1280"[^>]*height="720"`));
    assert.ok(html.includes(`>${film.duration}</span>`), 'visible duration badge');
    assert.match(html, /<button[^>]*class="film__play"[^>]*aria-label="[^"]*[0-9]:[0-9]{2}/);
    const outsideNoscript = html.replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
    assert.doesNotMatch(outsideNoscript, /<iframe/);
    // The click handler (inlined script) names youtube-nocookie.com, but no element
    // the browser fetches on load (src, href, srcset, preconnect) may point at it.
    assert.doesNotMatch(outsideNoscript, /(?:src|href|srcset|data-src)=["'][^"']*(?:youtube|ytimg|youtu\.be|google\.com\/vi)/i);
    const poster = new URL(`../../../public${film.poster}`, import.meta.url);
    await access(poster);
  });
}

test('other locales do not show a film', async (t) => {
  const html = await built('de/index.html');
  if (html === null) return t.skip('public/ not built; run sh tools/cf-build.sh');
  assert.doesNotMatch(html, /data-film/);
});

test('embedUrl uses the privacy-enhanced domain with autoplay', () => {
  assert.equal(embedUrl('dvYYsFzfDlk'), 'https://www.youtube-nocookie.com/embed/dvYYsFzfDlk?autoplay=1');
});

test('click replaces the poster button with one youtube-nocookie iframe', () => {
  const listeners = [];
  let replacedWith = null;
  const button = {
    addEventListener: (type, fn) => listeners.push([type, fn]),
    replaceWith: (el) => { replacedWith = el; },
  };
  const figure = {
    dataset: {videoId: 'VBTWMyOfkLs', videoTitle: 'Film'},
    querySelector: () => button,
  };
  const frame = {focus() {}};
  globalThis.document = {createElement: (tag) => { assert.equal(tag, 'iframe'); return frame; }};
  initFilms({querySelectorAll: () => [figure]});
  assert.equal(replacedWith, null, 'nothing is embedded before the click');
  assert.equal(listeners.length, 1);
  listeners[0][1]();
  assert.equal(replacedWith, frame);
  assert.equal(frame.src, 'https://www.youtube-nocookie.com/embed/VBTWMyOfkLs?autoplay=1');
  assert.equal(frame.title, 'Film');
  delete globalThis.document;
});
