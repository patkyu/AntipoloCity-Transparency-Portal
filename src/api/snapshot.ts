/**
 * Snapshot mode: the portal reads saved API responses from `snapshot/` beside
 * the page instead of calling the live API. Used where a page may not call
 * other hosts (an embedded or sandboxed copy). `npm run snapshot` records them.
 */

/** A short, stable file name for a request URL (cyrb53). */
export function snapshotKey(url: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < url.length; i++) {
    const ch = url.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

const env = (import.meta as { env?: Record<string, string> }).env;
export const SNAPSHOT: boolean = env?.VITE_SNAPSHOT === '1';
/** Where the page is served from, for snapshot files. */
export const BASE_URL: string = env?.BASE_URL ?? '/';
