/**
 * The front of the portal: a photo hero, the headline figures as a bento,
 * and four charts that answer the first questions a resident asks.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { BridgeGroup, DistrictOffice } from '../api/types';
import { BRIDGE_GROUPS, GAA_YEARS } from '../api/types';
import { shortNameOf } from '../config';
import { count, php, phpFull, plural } from '../lib/format';
import { asset } from '../lib/links';
import { usePortal } from '../lib/portal-context';
import type { ScopedProject, Summary } from '../lib/scope';
import { amountOf, byKind } from '../lib/plain';
import { ColumnChart, HBarChart, ShareBar } from './Charts';
import { DataFrom } from './Chrome';

type Words = Record<BridgeGroup, { label: string; sub: string; help: string }>;

export function Hero({ summary }: { summary: Summary }) {
  const { config } = usePortal();
  const name = shortNameOf(config);
  return (
    <section className="hero" aria-labelledby="hero-h">
      <img className="hero-img" src={asset('photos/manila-view.webp')} alt="The view west from Sumulong Highway, Antipolo: forested slopes falling to the Metro Manila skyline." />
      <div className="hero-body">
        <p className="hero-eyebrow">Lungsod ng Antipolo · Rizal · Region IV-A</p>
        <h1 id="hero-h">
          Where {name}’s budget <em className="serif">actually</em> goes.
        </h1>
        <p className="hero-lede">
          {plural(summary.rows, 'project')} for {name} in the 2027 national budget, and every program since 2020 that names the
          city. Each figure links to the page of the document it comes from.
        </p>
        <div className="hero-actions">
          <a className="pill pill-solid" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Browse the {count(summary.rows)} projects
          </a>
          <Link className="pill pill-glass" to="/gaa">Budgets since 2020 →</Link>
        </div>
        <DataFrom size="md" onDark />
      </div>
    </section>
  );
}

export function Bento({ summary }: { summary: Summary }) {
  const change = summary.house.php - summary.nep.php;
  return (
    <dl className="bento">
      <div className="tile tile-blue">
        <dt className="label">House bill, 2027</dt>
        <dd className="tile-big num">{php(summary.house.php)}</dd>
        <dd className="tile-sub">on {plural(summary.house.rows, 'project')}. Compared with the NEP, never added to it.</dd>
      </div>
      <div className="tile">
        <dt className="label">NEP, 2027</dt>
        <dd className="tile-big num">{php(summary.nep.php)}</dd>
        <dd className="tile-sub">on {plural(summary.nep.rows, 'project')}: the budget the President submitted.</dd>
      </div>
      <div className="tile">
        <dt className="label">House bill vs NEP</dt>
        <dd className={`tile-big num ${change > 0 ? 'up' : change < 0 ? 'down' : ''}`}>{change === 0 ? '±₱0' : `${change > 0 ? '+' : '−'}${php(Math.abs(change))}`}</dd>
        <dd className="tile-sub">the net change Congress made to these lines.</dd>
      </div>
      <div className="tile">
        <dt className="label">Added by the House</dt>
        <dd className="tile-big num">{count(summary.groups.house_only.rows)}</dd>
        <dd className="tile-sub">projects in the House bill only, worth {php(summary.groups.house_only.house_php)}. Candidates to check.</dd>
      </div>
    </dl>
  );
}

const STATUS_CLASS: Record<BridgeGroup, string> = {
  house_only: 's-house_only', nep_only: 's-nep_only', unchanged: 's-unchanged',
  increased: 's-increased', decreased: 's-decreased', scope_review: 's-scope_review',
};

export function Glance({ projects, summary, words, onStatus, status }: {
  projects: ScopedProject[];
  summary: Summary;
  words: Words;
  status: string;
  onStatus: (g: BridgeGroup | '') => void;
}) {
  const { districts } = usePortal();

  const kinds = useMemo(() => byKind(projects), [projects]);
  const kindTotal = kinds.reduce((a, k) => a + k.php, 0) || 1;
  const floodPct = Math.round(((kinds.find((k) => k.key === 'flood')?.php ?? 0) / kindTotal) * 100);

  const top = useMemo(
    () => [...projects].sort((a, b) => (b.house_php ?? b.nep_php ?? 0) - (a.house_php ?? a.nep_php ?? 0)).slice(0, 8),
    [projects],
  );

  const office: DistrictOffice | null = districts.status === 'ready' ? districts.value[0]?.data.offices[0] ?? null : null;

  return (
    <section className="section glance" aria-labelledby="glance-h">
      <Link to="/para-sa-bayan" className="callout">
        <span className="callout-tag">Bago rito? · New here?</span>
        <span className="callout-h">Para sa Bayan: <em className="serif">ang budget, sa simpleng salita</em></span>
        <span className="callout-sub">Mga larawan at paliwanag sa Filipino: saan napupunta ang pera, para sa barangay mo, at ano ang puwede mong gawin.</span>
        <span className="callout-go" aria-hidden="true">→</span>
      </Link>

      <div className="section-title">
        <p className="eyebrow">At a glance</p>
        <h2 id="glance-h" className="section-h-lg">The 2027 budget for Antipolo, <em className="serif">in four pictures</em></h2>
      </div>

      <div className="glance-grid">
        <article className="panel">
          <header className="panel-head">
            <h3>What the House did to each project</h3>
            <p className="muted small">Pick a colour to list those projects below.</p>
          </header>
          <ShareBar
            label={`Projects by status: ${BRIDGE_GROUPS.map((g) => `${words[g].label} ${summary.groups[g].rows}`).join(', ')}`}
            parts={BRIDGE_GROUPS.map((g) => ({
              key: g,
              label: words[g].label,
              value: summary.groups[g].rows,
              className: STATUS_CLASS[g],
              active: status === g,
              onClick: () => {
                onStatus(status === g ? '' : g);
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              },
              tip: (
                <>
                  <strong>{words[g].label}</strong>
                  <span>{plural(summary.groups[g].rows, 'project')} · NEP {php(summary.groups[g].nep_php)} · House {php(summary.groups[g].house_php)}</span>
                  {words[g].sub && <span className="muted">{words[g].sub}</span>}
                </>
              ),
            }))}
            legend={(p) => (
              <>
                <span className="legend-name">{p.label}</span>
                <span className="legend-v num">{count(p.value)}</span>
              </>
            )}
          />
          <p className="plain">
            <strong>Sa madaling salita:</strong> sa {count(summary.rows)} proyekto, {count(summary.groups.unchanged.rows)} ang hindi
            ginalaw ng Kamara. {count(summary.groups.house_only.rows)} ang lumitaw lang sa bersyon ng Kamara, at{' '}
            {count(summary.groups.nep_only.rows)} ang wala na roon.
          </p>
          <p className="panel-note">
            “In the House bill only” and “In the NEP only” are leads to check, not confirmed insertions or deletions. Every
            project page shows the source page in each document.
          </p>
        </article>

        <article className="panel">
          <header className="panel-head">
            <h3>What is being built</h3>
            <p className="muted small">House bill amount, grouped by words in each project’s title.</p>
          </header>
          <HBarChart
            label={`Projects by kind: ${kinds.map((k) => `${k.label} ${k.rows} projects, ${phpFull(k.php)}`).join('; ')}`}
            bars={kinds.map((k) => ({
              key: k.key,
              label: k.label,
              value: k.php,
              valueLabel: php(k.php),
              sub: plural(k.rows, 'project'),
              tone: k.tone,
              to: k.key === 'other' ? undefined : `/?q=${encodeURIComponent(k.key === 'flood' ? 'flood' : k.key === 'roads' ? 'road' : 'building')}#projects`,
              tip: (
                <>
                  <strong>{k.label}</strong>
                  <span>{phpFull(k.php)}</span>
                  <span className="muted">{plural(k.rows, 'project')}</span>
                </>
              ),
            }))}
          />
          <p className="plain">
            <strong>Sa madaling salita:</strong> mga {floodPct}% ng pera ay para sa baha at drainage. Sunod ang kalsada at tulay.
          </p>
        </article>

        <article className="panel panel-wide">
          <header className="panel-head">
            <h3>The eight biggest projects</h3>
            <p className="muted small">By House bill amount. Open one to see the source page in each document.</p>
          </header>
          <HBarChart
            label={`Biggest projects: ${top.map((p) => `${p.title}, ${phpFull(p.house_php ?? p.nep_php)}`).join('; ')}`}
            bars={top.map((p) => ({
              key: p.key,
              label: p.title,
              value: p.house_php ?? p.nep_php ?? 0,
              valueLabel: php(p.house_php ?? p.nep_php),
              sub: p.status_label,
              to: `/projects/${p.dataset}/${encodeURIComponent(p.id)}`,
              tip: (
                <>
                  <strong>{php(p.house_php ?? p.nep_php)}</strong>
                  <span>NEP {php(p.nep_php)} · House {php(p.house_php)}</span>
                  <span className="muted">{p.status_label}</span>
                </>
              ),
            }))}
          />
          {top[0] && (
            <p className="plain">
              <strong>Sa madaling salita:</strong> ang pinakamalaking proyekto ay {php(amountOf(top[0]))}. Pindutin ang alinman para
              makita ang eksaktong pahina sa dokumento ng budget.
            </p>
          )}
        </article>

        {office && <OfficeYears office={office} />}

        <figure className="photo-card">
          <img src={asset('photos/lrt2.webp')} alt="The elevated LRT-2 line on its concrete piers in Antipolo." loading="lazy" />
          <figcaption>
            <span className="label">Public works</span>
            <span>
              {count(projects.filter((p) => p.dataset === 'dpwh').length)} of the {count(projects.length)} projects are DPWH
              public works, built through the Rizal 1st District Engineering Office.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function OfficeYears({ office }: { office: DistrictOffice }) {
  const years = office.years ?? [];
  const slot = (fy: number, stage: string) => years.find((y) => y.fy === fy && y.stage === stage)?.php ?? null;
  const columns = [
    ...GAA_YEARS.map((fy) => ({ key: String(fy), label: `’${String(fy).slice(2)}`, value: slot(fy, 'gaa'), kind: 'solid' as const, full: `${fy} enacted (GAA)` })),
    { key: 'nep', label: 'NEP', value: slot(2027, 'nep'), kind: 'hatched' as const, full: '2027 NEP, whole office' },
  ];
  return (
    <article className="panel">
      <header className="panel-head">
        <h3>DPWH Rizal 1st DEO, year by year</h3>
        <p className="muted small">The whole office’s enacted budget. It is shared with Rizal’s 1st District, so it is shown whole, not split.</p>
      </header>
      <ColumnChart
        label={`Rizal 1st DEO budget: ${columns.map((c) => `${c.full} ${phpFull(c.value)}`).join('; ')}`}
        format={(v) => php(v).replace('.00', '')}
        height={170}
        columns={columns.map((c) => ({
          key: c.key,
          label: c.label,
          value: c.value,
          kind: c.kind,
          tip: (
            <>
              <strong>{php(c.value)}</strong>
              <span>{c.full}</span>
            </>
          ),
        }))}
      />
      <p className="plain">
        <strong>Sa madaling salita:</strong> bilyon-bilyong piso bawat taon ang dumaraan sa opisinang ito ng DPWH. Ang kulay
        guhit-guhit ay panukala pa lang para sa 2027.
      </p>
      <p className="panel-foot"><Link to="/gaa">Every year since 2020, and every program that names Antipolo →</Link></p>
    </article>
  );
}
