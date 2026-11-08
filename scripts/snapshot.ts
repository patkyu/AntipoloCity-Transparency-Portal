/**
 * npm run snapshot: records every API response the portal reads (overview,
 * the 2027 projects, the districts, every project page, the 2020–2026
 * programs) into public/snapshot/, and saves the portraits beside them.
 * Build with VITE_SNAPSHOT=1 to read from it.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import config from '../portal.config';
import { createClient } from '../src/api/client';
import { snapshotKey } from '../src/api/snapshot';
import { DEFAULT_API } from '../src/config';
import { loadGaa } from '../src/lib/gaa';
import { resolveScope } from '../src/lib/scope';

const OUT = join(process.cwd(), 'public', 'snapshot');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'img'), { recursive: true });

const UA = { 'user-agent': 'antipolo-transparency-portal/0.1 (snapshot)' };
const bodies = new Map<string, string>();
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input instanceof Request ? input.url : input);
  const res = await realFetch(url, { ...init, headers: { ...(init?.headers as object), ...UA } });
  const text = await res.text();
  if (res.ok) bodies.set(url, text);
  return new Response(text, { status: res.status, statusText: res.statusText, headers: res.headers });
}) as typeof fetch;

const client = createClient(process.env.VITE_API_BASE || config.api || DEFAULT_API);
await client.overview();
const scope = await resolveScope(client, config);
const ids = new Set(config.scope.districts ?? []);
for (const q of scope.queries) for (const o of q.officeLens?.offices ?? []) for (const d of o.districts) ids.add(d.id);
await Promise.all([...ids].map((id) => client.district(id)));
for (let i = 0; i < scope.projects.length; i += 6) {
  await Promise.all(scope.projects.slice(i, i + 6).map((p) => client.project(p.dataset, p.id)));
}
await loadGaa(client, config);

// Portraits and other images the responses point at: saved locally, URLs rewritten.
const images = new Map<string, string>();
for (const text of bodies.values()) {
  for (const m of text.matchAll(/https:\/\/[^"\s]+?\.(?:jpe?g|png|webp)/g)) images.set(m[0], '');
}
for (const src of images.keys()) {
  const res = await realFetch(src, { headers: UA }).catch(() => null);
  if (!res?.ok) { console.warn(`image not saved: ${src}`); images.delete(src); continue; }
  const ext = src.split('.').pop();
  const name = `img/${createHash('sha1').update(src).digest('hex').slice(0, 12)}.${ext}`;
  writeFileSync(join(OUT, name), Buffer.from(await res.arrayBuffer()));
  images.set(src, `snapshot/${name}`);
}

for (const [url, text] of bodies) {
  let out = text;
  for (const [src, local] of images) out = out.split(src.replaceAll('/', '\\/')).join(local).split(src).join(local);
  writeFileSync(join(OUT, `${snapshotKey(url)}.json`), out);
}
console.log(`snapshot: ${bodies.size} responses, ${images.size} images → public/snapshot/`);
