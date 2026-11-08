import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shortNameOf } from '../config';
import { usePortal } from '../lib/portal-context';
import { date } from '../lib/format';
import { asset, NATIONAL_URL, SOURCE_CODE_URL } from '../lib/links';

const NAV = [
  { to: '/para-sa-tao', hash: '', label: 'Para sa Tao' },
  { to: '/', hash: '', label: '2027 projects' },
  { to: '/', hash: '#offices', label: 'Offices' },
  { to: '/gaa', hash: '', label: '2020–2026' },
  { to: '/about', hash: '', label: 'About' },
];

/** "Data from [BetterGov.ph]": the logo, blue on light and white on dark. */
export function DataFrom({ size = 'md', onDark = false }: { size?: 'sm' | 'md' | 'lg'; onDark?: boolean }) {
  return (
    <a className={`data-from data-from-${size}${onDark ? ' on-dark' : ''}`} href="https://bettergov.ph" target="_blank" rel="noopener">
      <span className="data-from-label">Data from</span>
      {onDark ? (
        <img src={asset('brand/bettergov-horizontal-white.png')} alt="BetterGov.ph" />
      ) : (
        <>
          <img className="bg-logo-light" src={asset('brand/bettergov-horizontal-primary.png')} alt="BetterGov.ph" />
          <img className="bg-logo-dark" src={asset('brand/bettergov-horizontal-white.png')} alt="BetterGov.ph" />
        </>
      )}
    </a>
  );
}

/** The portal's own mark: a plain monogram, never the city seal. */
function Mark() {
  return (
    <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="var(--brand)" />
      <path d="M11 30 L20 9 L29 30" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.6 22.5 H25.4" stroke="var(--sky)" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

export function Masthead() {
  const { config } = usePortal();
  const { pathname, hash } = useLocation();
  return (
    <header className="masthead">
      <div className="page masthead-inner">
        <Link to="/" className="masthead-title" onClick={() => window.scrollTo(0, 0)}>
          <Mark />
          <span>
            <span className="masthead-name">{shortNameOf(config)} <span className="serif">Transparency</span></span>
            <span className="masthead-kicker">Independent citizen portal · Budgets 2020–2027</span>
          </span>
        </Link>
        <nav className="pillnav" aria-label="Sections">
          {NAV.map((n) => {
            const active = pathname === n.to && (n.hash ? hash === n.hash : hash !== '#offices');
            return (
              <Link
                key={n.label}
                to={{ pathname: n.to, hash: n.hash }}
                className={active ? 'active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={() => !n.hash && pathname === n.to && window.scrollTo(0, 0)}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <DataFrom size="sm" />
      </div>
    </header>
  );
}

export function Footer() {
  const { config, scope, client } = usePortal();
  const meta = scope.status === 'ready' ? scope.value.meta : null;
  return (
    <footer className="footer">
      <div className="page footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-big">
              Every peso here is public. <span className="serif">Read it, share it, ask about it.</span>
            </p>
            <p className="footer-independent">
              {shortNameOf(config)} Transparency is an independent citizen portal. It is not a website of the City Government of
              Antipolo. Figures come from the national budget documents, through the BetterGov.ph Budget API.
            </p>
          </div>
          <DataFrom size="lg" onDark />
        </div>

        <ul className="footer-links">
          <li>
            <span className="label">This portal</span>
            <span>
              Run by{' '}
              {config.operator.url ? (
                <a href={config.operator.url} target="_blank" rel="noopener">{config.operator.name}</a>
              ) : (
                config.operator.name
              )}
            </span>
          </li>
          <li>
            <span className="label">Every project, nationwide</span>
            <a href={NATIONAL_URL} target="_blank" rel="noopener">budget.bettergov.ph ↗</a>
          </li>
          <li>
            <span className="label">Data</span>
            <a href={`${client.base}/docs`} target="_blank" rel="noopener">Budget API and MCP ↗</a>
          </li>
          <li>
            <span className="label">Open source</span>
            <a href={SOURCE_CODE_URL} target="_blank" rel="noopener">Built on the BetterGov.ph transparency portal ↗</a>
          </li>
        </ul>

        <p className="footer-source">
          Source: GAA 2020–2026, NEP FY 2027 and House Bill 10858 · via the BetterGov.ph Budget API
          {meta && <> · data built {date(meta.built_at)}</>}
        </p>
        {meta && <p className="footer-notice">{meta.notice}</p>}
        <p className="footer-credits">
          Photos, Wikimedia Commons, CC BY-SA 4.0: Metro Manila from Cloud 9, Sumulong Highway, by patrickroque01 ·
          Hinulugang Taktak Falls by Ralff Nestor Nacor · LRT-2 Antipolo by LMP 2001.
        </p>
      </div>
    </footer>
  );
}

export function PageHead({ eyebrow, title, children }: { eyebrow: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="lede">{children}</div>}
    </div>
  );
}

/** A photo banner for the inner pages. */
export function PhotoHead({ photo, alt, eyebrow, title, children }: { photo: string; alt: string; eyebrow: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="photohead">
      <img src={asset(photo)} alt={alt} className="photohead-img" />
      <div className="photohead-body">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="lede">{children}</div>}
      </div>
    </div>
  );
}
