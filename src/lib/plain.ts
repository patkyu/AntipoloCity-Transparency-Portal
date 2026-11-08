/**
 * Plain-language helpers: what kind of work a project is, and which of
 * Antipolo's 16 barangays its title names. Both read the title only.
 */
import type { ScopedProject } from './scope';

export type Tone = 'accent' | 'sky' | 'ink' | 'rule';

/** What kind of work a project is, read from words in its title. */
export const KINDS: { key: string; label: string; tagalog: string; rx: RegExp; tone: Tone }[] = [
  { key: 'flood', label: 'Flood control & drainage', tagalog: 'Pangontra sa baha at drainage', rx: /flood|drainage|slope|river|creek|canal|revetment|dike|sea ?wall|waterway|culvert/i, tone: 'accent' },
  { key: 'roads', label: 'Roads & bridges', tagalog: 'Kalsada at tulay', rx: /road|\brd\b|street|highway|bridge|\bbr\.|pavement|widening|bypass|diversion|intersection|\bfmr\b|farm-to-market|overpass/i, tone: 'sky' },
  { key: 'buildings', label: 'Buildings & facilities', tagalog: 'Gusali at pasilidad', rx: /building|school|hall|cent(er|re)|facilit|court|gym|hospital|health|classroom|office|market|water system/i, tone: 'ink' },
];
export const OTHER_KIND = { key: 'other', label: 'Other', tagalog: 'Iba pa', rx: /$^/, tone: 'rule' as Tone };

export function kindOf(title: string): string {
  return KINDS.find((k) => k.rx.test(title))?.key ?? 'other';
}

/** The House bill amount: one version, never NEP and House mixed. */
export const amountOf = (p: ScopedProject) => p.house_php ?? 0;

export function byKind(projects: readonly ScopedProject[]) {
  const acc = new Map<string, { rows: number; php: number }>();
  for (const p of projects) {
    const k = kindOf(p.title);
    const a = acc.get(k) ?? { rows: 0, php: 0 };
    a.rows++;
    a.php += amountOf(p);
    acc.set(k, a);
  }
  return [...KINDS, OTHER_KIND].map((k) => ({ ...k, ...(acc.get(k.key) ?? { rows: 0, php: 0 }) })).filter((k) => k.rows > 0);
}

/** Antipolo's 16 barangays, with the spellings the documents use. */
export const BARANGAYS: { name: string; rx: RegExp }[] = [
  { name: 'Bagong Nayon', rx: /bagong\s+nayon/i },
  { name: 'Beverly Hills', rx: /beverly\s+hills/i },
  { name: 'Calawis', rx: /calawis/i },
  { name: 'Cupang', rx: /cupang/i },
  { name: 'Dalig', rx: /\bdalig\b/i },
  { name: 'Dela Paz', rx: /de\s*la\s+paz/i },
  { name: 'Inarawan', rx: /inarawan/i },
  { name: 'Mambugan', rx: /mambugan/i },
  { name: 'Mayamot', rx: /mayamot/i },
  { name: 'Muntindilaw', rx: /munting?\s*dilaw/i },
  { name: 'San Isidro', rx: /san\s+isidro/i },
  { name: 'San Jose', rx: /san\s+jose/i },
  { name: 'San Juan', rx: /san\s+juan/i },
  { name: 'San Luis', rx: /san\s+luis/i },
  { name: 'San Roque', rx: /san\s+roque/i },
  { name: 'Santa Cruz', rx: /(santa|sta\.?)\s+cruz/i },
];

/** Projects per barangay named in an Antipolo title; a project naming two barangays counts in both. */
export function byBarangay(projects: readonly ScopedProject[]) {
  const antipolo = projects.filter((p) => /antipolo/i.test(p.title));
  return BARANGAYS.map((b) => {
    const rows = antipolo.filter((p) => b.rx.test(p.title));
    return { ...b, rows: rows.length, php: rows.reduce((a, p) => a + amountOf(p), 0) };
  });
}

/** Split `total` into whole blocks, by largest remainder, so the blocks add up exactly. */
export function blocks(parts: { key: string; php: number }[], unit: number): Record<string, number> {
  const total = Math.round(parts.reduce((a, p) => a + p.php, 0) / unit);
  const raw = parts.map((p) => ({ key: p.key, exact: p.php / unit }));
  const out: Record<string, number> = Object.fromEntries(raw.map((r) => [r.key, Math.floor(r.exact)]));
  let left = total - Object.values(out).reduce((a, b) => a + b, 0);
  for (const r of [...raw].sort((a, b) => (b.exact % 1) - (a.exact % 1))) {
    if (left <= 0) break;
    out[r.key]++;
    left--;
  }
  return out;
}
