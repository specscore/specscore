import { alternatesForPath as linksFor, inventoryFromFiles, localeHasRoute as hasRoute } from './route-map.mjs';

const files = Object.keys(import.meta.glob('../pages/**/*.astro'));
const inventory = inventoryFromFiles(files);

export function localeHasRoute(code, route) {
  return hasRoute(inventory, code, route);
}

export function alternatesForPath(pathname) {
  return linksFor(inventory, pathname);
}
