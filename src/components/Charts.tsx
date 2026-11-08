/**
 * Small, dependency-free charts drawn to scale with HTML and CSS. Every mark
 * has a hover and focus tooltip, and every chart carries a text summary for
 * screen readers. Colours come from the theme tokens, so both themes read.
 */
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Round a maximum up to a tidy axis end, and give three ticks below it. */
function niceTicks(max: number): number[] {
  if (max <= 0) return [0];
  const step0 = max / 4;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0) ?? 10 * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step * 0.001; v += step) ticks.push(v);
  if (ticks[ticks.length - 1] < max) ticks.push(ticks[ticks.length - 1] + step);
  return ticks;
}

interface Tip { i: number; x: number; y: number }

function Tooltip({ tip, children }: { tip: Tip | null; children: ReactNode }) {
  if (!tip) return null;
  return (
    <div className="chart-tip" role="status" style={{ left: tip.x, top: tip.y }}>
      {children}
    </div>
  );
}

function useTip() {
  const [tip, setTip] = useState<Tip | null>(null);
  const show = (i: number) => (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
    const box = (e.currentTarget.closest('.chart') as HTMLElement).getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    setTip({ i, x: Math.min(Math.max(r.left - box.left + r.width / 2, 90), box.width - 90), y: r.top - box.top });
  };
  return { tip, show, hide: () => setTip(null) };
}

// ---------------------------------------------------------------------------
// Columns: one per year, to scale, with a faint grid
// ---------------------------------------------------------------------------

export interface Column {
  key: string;
  label: string;
  value: number | null;
  /** Shown above the column; defaults to nothing. */
  valueLabel?: string;
  /** "solid" (default), "hatched" (a version, not law), or "accent". */
  kind?: 'solid' | 'hatched' | 'accent';
  tip: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function ColumnChart({ columns, format, height = 180, label }: { columns: Column[]; format: (v: number) => string; height?: number; label: string }) {
  const { tip, show, hide } = useTip();
  const max = Math.max(1, ...columns.map((c) => c.value ?? 0));
  const ticks = niceTicks(max);
  const top = ticks[ticks.length - 1];
  return (
    <figure className="chart colchart" aria-label={label}>
      <div className="colchart-plot" style={{ height }}>
        <div className="colchart-grid" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} style={{ bottom: `${(t / top) * 100}%` }}>
              <em>{format(t)}</em>
            </span>
          ))}
        </div>
        <div className="colchart-cols" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((c, i) => {
            const Tag = c.onClick ? 'button' : 'div';
            return (
              <Tag
                key={c.key}
                type={c.onClick ? 'button' : undefined}
                className={`col k-${c.kind ?? 'solid'}${c.active ? ' active' : ''}${tip?.i === i ? ' hot' : ''}`}
                onClick={c.onClick}
                aria-pressed={c.onClick ? Boolean(c.active) : undefined}
                tabIndex={c.onClick ? undefined : 0}
                onMouseEnter={show(i)}
                onMouseLeave={hide}
                onFocus={show(i)}
                onBlur={hide}
                aria-label={`${c.label}: ${c.value == null ? 'no figure' : format(c.value)}`}
              >
                <span className="col-bar" style={{ height: `${((c.value ?? 0) / top) * 100}%` }}>
                  {c.valueLabel && <span className="col-v num">{c.valueLabel}</span>}
                </span>
              </Tag>
            );
          })}
        </div>
      </div>
      <div className="colchart-x" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }} aria-hidden="true">
        {columns.map((c) => <span key={c.key} className={c.active ? 'active' : undefined}>{c.label}</span>)}
      </div>
      <Tooltip tip={tip}>{tip && columns[tip.i].tip}</Tooltip>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Horizontal bars: ranked items, to scale from zero
// ---------------------------------------------------------------------------

export interface HBar {
  key: string;
  label: ReactNode;
  value: number;
  valueLabel: string;
  sub?: ReactNode;
  to?: string;
  tip: ReactNode;
  /** A token name for the bar colour; defaults to the accent. */
  tone?: 'accent' | 'sky' | 'ink' | 'positive' | 'negative' | 'neutral' | 'rule';
}

export function HBarChart({ bars, label }: { bars: HBar[]; label: string }) {
  const { tip, show, hide } = useTip();
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <figure className="chart hbars" aria-label={label}>
      <ol>
        {bars.map((b, i) => {
          const body = (
            <>
              <span className="hbar-head">
                <span className="hbar-label">{b.label}</span>
                <span className="hbar-v num">{b.valueLabel}</span>
              </span>
              <span className="hbar-track">
                <span className={`hbar-fill t-${b.tone ?? 'accent'}`} style={{ width: `${Math.max((b.value / max) * 100, b.value > 0 ? 1.5 : 0)}%` }} />
              </span>
              {b.sub && <span className="hbar-sub">{b.sub}</span>}
            </>
          );
          const events = { onMouseEnter: show(i), onMouseLeave: hide, onFocus: show(i), onBlur: hide };
          return (
            <li key={b.key} className={tip?.i === i ? 'hot' : undefined}>
              {b.to ? (
                <Link to={b.to} className="hbar" {...events}>{body}</Link>
              ) : (
                <span className="hbar" tabIndex={0} {...events}>{body}</span>
              )}
            </li>
          );
        })}
      </ol>
      <Tooltip tip={tip}>{tip && bars[tip.i].tip}</Tooltip>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Share bar: one bar split into parts (parts of a whole, never versions)
// ---------------------------------------------------------------------------

export interface Share {
  key: string;
  label: string;
  value: number;
  className: string;
  tip: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function ShareBar({ parts, label, legend }: { parts: Share[]; label: string; legend: (p: Share) => ReactNode }) {
  const { tip, show, hide } = useTip();
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  const visible = parts.filter((p) => p.value > 0);
  return (
    <figure className="chart sharebar" aria-label={label}>
      <div className="sharebar-track">
        {visible.map((p) => {
          const i = parts.indexOf(p);
          return (
            <button
              key={p.key}
              type="button"
              className={`share ${p.className}${p.active ? ' active' : ''}`}
              style={{ flexGrow: p.value / total }}
              onClick={p.onClick}
              aria-pressed={Boolean(p.active)}
              aria-label={`${p.label}: ${p.value}`}
              onMouseEnter={show(i)}
              onMouseLeave={hide}
              onFocus={show(i)}
              onBlur={hide}
            />
          );
        })}
      </div>
      <ul className="sharebar-legend">
        {visible.map((p) => (
          <li key={p.key}>
            <button type="button" className={p.active ? 'active' : undefined} onClick={p.onClick} aria-pressed={Boolean(p.active)}>
              <span className={`share-sw ${p.className}`} aria-hidden="true" />
              {legend(p)}
            </button>
          </li>
        ))}
      </ul>
      <Tooltip tip={tip}>{tip && parts[tip.i].tip}</Tooltip>
    </figure>
  );
}
