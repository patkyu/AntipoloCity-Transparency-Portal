/**
 * /para-sa-bayan: the budget in plain Filipino, with pictures.
 * Counts only lines whose title names Antipolo, so projects of the shared
 * DPWH office in nearby towns are left out of every figure here.
 */
import { Link } from 'react-router-dom';
import { Await } from '../components/Bits';
import { PhotoHead } from '../components/Chrome';
import { HBarChart } from '../components/Charts';
import { count, php, phpFull } from '../lib/format';
import { amountOf, blocks, byBarangay, byKind } from '../lib/plain';
import { usePortal } from '../lib/portal-context';
import type { ScopeResult } from '../lib/scope';
import { useTitle } from '../lib/use-title';

/** Antipolo's population, 2020 Census of Population and Housing (PSA). */
const POPULATION = 887_399;
const BLOCK = 10_000_000;

export default function People() {
  const { scope } = usePortal();
  useTitle('Para sa Bayan · Antipolo Transparency');
  return (
    <main className="page main people">
      <PhotoHead
        photo="photos/manila-view.webp"
        alt="Ang tanaw mula sa Sumulong Highway, Antipolo, pababa sa Metro Manila."
        eyebrow={<>Para sa Bayan<span className="sep">·</span>For the People<span className="sep">·</span>Sa simpleng salita</>}
        title={<>Ang budget ng Antipolo, <em className="serif">ipinaliwanag nang simple.</em></>}
      >
        <p>
          Hindi mo kailangang maging eksperto para maintindihan kung saan napupunta ang pera ng bayan. Dito, ipinapaliwanag
          namin ang mga numero gamit ang larawan at pang-araw-araw na salita.
        </p>
      </PhotoHead>
      <Await state={scope} what="ang mga proyekto">
        {(s) => <Plain scope={s} />}
      </Await>
    </main>
  );
}

function Plain({ scope }: { scope: ScopeResult }) {
  // The House version only, so every figure here is one version, never NEP and House mixed.
  const projects = scope.projects.filter((p) => /antipolo/i.test(p.title) && (p.house_php ?? 0) > 0);
  const total = projects.reduce((a, p) => a + amountOf(p), 0);
  const perPerson = total / POPULATION;
  const kinds = byKind(projects);
  const squares = blocks(kinds.map((k) => ({ key: k.key, php: k.php })), BLOCK);
  const flood = kinds.find((k) => k.key === 'flood');
  const floodPct = flood ? Math.round((flood.php / total) * 100) : 0;
  const brgys = byBarangay(projects).sort((a, b) => b.php - a.php);
  const houseOnly = projects.filter((p) => p.bridge_group === 'house_only');
  const biggest = [...projects].sort((a, b) => amountOf(b) - amountOf(a))[0];

  return (
    <>
      <p className="people-scope">
        <strong>Paalala:</strong> sa page na ito, binibilang lang namin ang <strong>{count(projects.length)} proyekto</strong> sa bersyon ng Kamara na may
        salitang “Antipolo” sa pangalan, para hindi masama ang mga proyekto sa kalapit na bayan na hawak din ng parehong
        opisina ng DPWH.
      </p>

      {/* 1. Three plain sentences */}
      <section className="section" aria-labelledby="pt-1">
        <h2 id="pt-1" className="section-h-lg">Sa isang tingin</h2>
        <div className="say-grid">
          <div className="say say-blue">
            <span className="say-big num">{php(total)}</span>
            <p>ang nakalaan para sa <strong>{count(projects.length)} proyekto</strong> sa Antipolo sa panukalang 2027 budget, ayon sa bersyon ng Kamara.</p>
          </div>
          <div className="say">
            <span className="say-big num">₱{Math.round(perPerson).toLocaleString('en-US')}</span>
            <p>
              kung hahatiin sa bawat taga-Antipolo (may {POPULATION.toLocaleString('en-US')} ayon sa 2020 Census ng PSA). Hindi ito
              ibibigay sa tao; paraan lang ito para maintindihan ang laki.
            </p>
          </div>
          <div className="say">
            <span className="say-big num">{floodPct}%</span>
            <p>ng perang ito ay para sa <strong>pangontra sa baha at drainage</strong>: mga flood control, kanal at slope protection.</p>
          </div>
        </div>
      </section>

      {/* 2. Waffle: every square is ₱10M */}
      <section className="section" aria-labelledby="pt-2">
        <div className="section-title">
          <p className="eyebrow">Larawan 1</p>
          <h2 id="pt-2" className="section-h-lg">Kung bawat kahon ay <em className="serif">₱10 milyon</em></h2>
          <p className="lede">Ito ang {php(total)} kung gagawing {count(Object.values(squares).reduce((a, b) => a + b, 0))} na kahon. Bawat kulay ay isang uri ng proyekto.</p>
        </div>
        <div className="panel waffle-panel">
          <div className="waffle" role="img" aria-label={kinds.map((k) => `${k.tagalog}: ${squares[k.key]} kahon, ${phpFull(k.php)}`).join('; ')}>
            {kinds.flatMap((k) => Array.from({ length: squares[k.key] ?? 0 }, (_, i) => <span key={`${k.key}-${i}`} className={`w t-${k.tone}`} title={`${k.tagalog}: ${php(k.php)}`} />))}
          </div>
          <ul className="waffle-legend">
            {kinds.map((k) => (
              <li key={k.key}>
                <span className={`w t-${k.tone}`} aria-hidden="true" />
                <span>
                  <strong>{k.tagalog}</strong>
                  <span className="muted"> · {count(squares[k.key] ?? 0)} kahon · {php(k.php)} · {count(k.rows)} proyekto</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="plain"><strong>Sa madaling salita:</strong> karamihan ng pera ay para sa baha. Sunod ang kalsada at tulay, at kaunti para sa mga gusali.</p>
        </div>
      </section>

      {/* 3. The budget's journey */}
      <section className="section" aria-labelledby="pt-3">
        <div className="section-title">
          <p className="eyebrow">Larawan 2</p>
          <h2 id="pt-3" className="section-h-lg">Paano nagiging <em className="serif">kalsada</em> ang pera?</h2>
          <p className="lede">May pitong hakbang mula panukala hanggang sa tapos na proyekto. Ang datos dito ay hanggang hakbang 2 pa lang.</p>
        </div>
        <ol className="journey">
          {JOURNEY.map((s, i) => (
            <li key={s.title} className={`step${i < 2 ? ' done' : ''}`}>
              <span className="step-n" aria-hidden="true">{i + 1}</span>
              <div>
                <p className="step-who label">{s.who}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="step-ask"><strong>Puwede mong itanong:</strong> {s.ask}</p>
                {i < 2 && <span className="step-tag">Nasa datos ng website</span>}
                {i === 2 && <span className="step-tag step-tag-next">Susunod para sa 2027</span>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Barangays */}
      <section className="section" aria-labelledby="pt-4">
        <div className="section-title">
          <p className="eyebrow">Larawan 3</p>
          <h2 id="pt-4" className="section-h-lg">Ano ang para sa <em className="serif">barangay ko?</em></h2>
          <p className="lede">Pindutin ang inyong barangay para makita ang mga proyekto doon.</p>
        </div>
        <div className="brgy-grid">
          {brgys.map((b) => (
            <Link key={b.name} to={`/?q=${encodeURIComponent(SEARCH[b.name] ?? b.name.toLowerCase())}#projects`} className="brgy">
              <span className="brgy-name">{b.name}</span>
              <span className="brgy-amt num">{b.rows ? php(b.php) : '—'}</span>
              <span className="brgy-track"><span style={{ width: `${(b.php / (brgys[0].php || 1)) * 100}%` }} /></span>
              <span className="brgy-n">{b.rows ? `${count(b.rows)} proyekto` : 'walang proyektong nakapangalan'}</span>
            </Link>
          ))}
        </div>
        <p className="fine">
          Batay sa pangalan ng barangay na nakasulat sa proyekto. Ang proyektong may dalawang barangay ay binibilang sa
          dalawa. May mga proyekto, gaya ng mga bahagi ng highway, na walang nakasulat na barangay.
        </p>
      </section>

      {/* 5. Words */}
      <section className="section" aria-labelledby="pt-5">
        <div className="section-title">
          <p className="eyebrow">Mga salita</p>
          <h2 id="pt-5" className="section-h-lg">Mga salitang <em className="serif">dapat mong malaman</em></h2>
        </div>
        <dl className="words">
          {WORDS.map((w) => (
            <div key={w.term} className="word">
              <dt><span className="word-tag">{w.tag}</span>{w.term}</dt>
              <dd>{w.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6. A worked example */}
      <section className="section" aria-labelledby="pt-6">
        <div className="section-title">
          <p className="eyebrow">Halimbawa</p>
          <h2 id="pt-6" className="section-h-lg">Isang proyekto, <em className="serif">mula simula hanggang dulo</em></h2>
          <p className="lede">Ang “road safety” sa Sumulong Highway: saan galing ang pera, at saan malalaman ang presyo ng bawat cat’s eye.</p>
        </div>
        <div className="story panel">
          <ol className="story-line">
            <li className="done">
              <span className="label">2022 · Batas (GAA)</span>
              <strong>₱100,000,000</strong>
              <p>
                <em>Installation of Road Safety Facilities at Sumulong Highway and Marikina Victoria Valley Road (From Robinsons Place
                Antipolo to Masinag Intersection)</em>, Brgy. Dela Paz, Sta. Cruz, Mambugan at Mayamot.
              </p>
            </li>
            <li>
              <span className="label">Bidding · PhilGEPS</span>
              <strong>Sino ang contractor? Magkano ang kontrata?</strong>
              <p>Hindi ito nasa budget. Hanapin ang pangalan ng proyekto sa philgeps.gov.ph.</p>
            </li>
            <li>
              <span className="label">Detalye · FOI</span>
              <strong>Magkano bawat cat’s eye?</strong>
              <p>Nasa <em>Program of Work</em> at <em>Detailed Cost Estimate</em> ng DPWH Rizal 1st DEO. Hingin sa foi.gov.ph.</p>
            </li>
            <li>
              <span className="label">Audit · COA</span>
              <strong>Tama ba ang paggastos?</strong>
              <p>Basahin ang annual audit report ng DPWH sa coa.gov.ph.</p>
            </li>
          </ol>
          <p className="plain">
            <strong>Sa madaling salita:</strong> ang budget ang nagsasabi kung <em>magkano ang pinayagang gastusin</em>. Ang kontrata
            at ang audit ang nagsasabi kung <em>magkano talaga ang ginastos at kung tama ito</em>.
          </p>
        </div>
      </section>

      {/* 7. House-only projects */}
      {houseOnly.length > 0 && (
        <section className="section" aria-labelledby="pt-7">
          <div className="section-title">
            <p className="eyebrow">Larawan 4</p>
            <h2 id="pt-7" className="section-h-lg">Mga proyektong <em className="serif">idinagdag sa Kamara</em></h2>
            <p className="lede">
              Wala ang {count(houseOnly.length)} na ito sa orihinal na panukala ng Pangulo, pero lumitaw sa bersyon ng Kamara. Hindi
              ibig sabihing mali sila. Karapatan lang nating itanong kung bakit idinagdag.
            </p>
          </div>
          <div className="panel">
            <HBarChart
              label={`Mga proyekto sa bersyon ng Kamara lang: ${houseOnly.map((p) => `${p.title} ${phpFull(amountOf(p))}`).join('; ')}`}
              bars={[...houseOnly].sort((a, b) => amountOf(b) - amountOf(a)).map((p) => ({
                key: p.key,
                label: p.title,
                value: amountOf(p),
                valueLabel: php(amountOf(p)),
                to: `/projects/${p.dataset}/${encodeURIComponent(p.id)}`,
                tip: (
                  <>
                    <strong>{phpFull(amountOf(p))}</strong>
                    <span>Sa bersyon ng Kamara lang</span>
                  </>
                ),
              }))}
            />
          </div>
        </section>
      )}

      {/* 8. What you can do */}
      <section className="section" aria-labelledby="pt-8">
        <div className="section-title">
          <p className="eyebrow">Ikaw naman</p>
          <h2 id="pt-8" className="section-h-lg">Ano ang <em className="serif">puwede mong gawin?</em></h2>
        </div>
        <ol className="todo">
          <li><span className="todo-n">1</span><h3>Hanapin</h3><p>Hanapin ang proyekto sa inyong barangay sa <Link to="/#projects">listahan ng proyekto</Link>.{biggest && <> Ang pinakamalaki ay {php(amountOf(biggest))}.</>}</p></li>
          <li><span className="todo-n">2</span><h3>Silipin</h3><p>Puntahan ang lugar. Kunan ng litrato, may petsa. May ginagawa ba? May karatula ba ng proyekto?</p></li>
          <li><span className="todo-n">3</span><h3>Humingi ng dokumento</h3><p>Mag-FOI request sa <a href="https://www.foi.gov.ph" target="_blank" rel="noopener">foi.gov.ph</a>. Libre ito at karapatan mo.</p></li>
          <li><span className="todo-n">4</span><h3>Alamin ang kontrata</h3><p>Hanapin ang contractor at halaga sa <a href="https://www.philgeps.gov.ph" target="_blank" rel="noopener">philgeps.gov.ph</a>.</p></li>
          <li><span className="todo-n">5</span><h3>Basahin ang audit</h3><p>Tingnan ang mga puna ng COA sa <a href="https://www.coa.gov.ph" target="_blank" rel="noopener">coa.gov.ph</a>.</p></li>
          <li><span className="todo-n">6</span><h3>Magtanong</h3><p>Magtanong nang magalang sa DPWH Rizal 1st DEO o sa inyong kongresista, dala ang datos.</p></li>
        </ol>
      </section>

      <p className="fine">
        Ang mga numero rito ay mula sa NEP 2027, House Bill 10858 at GAA 2022, sa pamamagitan ng BetterGov.ph Budget API. Ang halaga
        sa budget ay ang pinayagang gastusin, hindi pa ang aktwal na nagastos. <Link to="/about">Tungkol sa datos →</Link>
      </p>
    </>
  );
}

/** Search words that match how titles spell the barangay ("Sta. Cruz", "Munting Dilaw"). */
const SEARCH: Record<string, string> = { 'Santa Cruz': 'cruz', Muntindilaw: 'dilaw', 'Dela Paz': 'paz' };

const JOURNEY = [
  { who: 'Ang Pangulo at DBM', title: 'Panukala (NEP)', body: 'Gumagawa ang mga ahensya ng listahan ng gusto nilang pondohan. Ipinapadala ito ng Pangulo sa Kongreso.', ask: 'Ano ang orihinal na hiniling para sa Antipolo?' },
  { who: 'Kamara (House of Representatives)', title: 'Binabago ng Kamara', body: 'Sinusuri, dinadagdagan o binabawasan ng mga kongresista ang listahan, at ipinapasa ito bilang House bill.', ask: 'Ano ang idinagdag o tinanggal, at bakit?' },
  { who: 'Senado at Bicameral Conference', title: 'Sinusuri ng Senado', body: 'Gumagawa rin ng sariling bersyon ang Senado. Pinag-iisa ng Bicam ang dalawang bersyon.', ask: 'May nagbago ba sa huling bersyon?' },
  { who: 'Ang Pangulo', title: 'Nagiging batas (GAA)', body: 'Pinipirmahan ng Pangulo. Dito pa lang may pahintulot na gastusin ang pera.', ask: 'Nasa pinirmahang batas ba ang proyekto?' },
  { who: 'DPWH', title: 'Bidding', body: 'Pumipili ang DPWH ng contractor sa pamamagitan ng bidding. Makikita ito sa PhilGEPS.', ask: 'Sino ang nanalong contractor at magkano?' },
  { who: 'Contractor', title: 'Paggawa', body: 'Ginagawa ang proyekto. Dapat may karatula sa lugar na nagsasabi kung ano, magkano at kailan.', ask: 'Tama ba ang ginagawa, at tapos na ba sa takdang panahon?' },
  { who: 'Commission on Audit (COA)', title: 'Audit', body: 'Sinusuri ng COA kung tama ang paggastos at may nakita bang problema.', ask: 'Ano ang sinabi ng COA tungkol sa proyekto?' },
];

const WORDS = [
  { tag: 'NEP', term: 'National Expenditure Program', meaning: 'Ang panukalang budget ng Pangulo. Ito ang unang listahan, bago galawin ng Kongreso.' },
  { tag: 'HB', term: 'House bill (HB 10858)', meaning: 'Ang bersyon ng budget na binago at ipinasa ng Kamara. Hindi pa ito batas.' },
  { tag: 'GAA', term: 'General Appropriations Act', meaning: 'Ang pinal na budget, batas na. Pinirmahan ng Pangulo. Ito lang ang may bisa.' },
  { tag: '₱', term: 'Appropriation (nakalaan)', meaning: 'Ang pinayagang gastusin. Hindi ito ang aktwal na nagastos; maaaring mas mababa o hindi gastusin.' },
  { tag: 'DEO', term: 'District Engineering Office', meaning: 'Ang opisina ng DPWH na gumagawa ng proyekto. Ang Rizal 1st DEO ang humahawak sa Antipolo, kasama ang Cainta, Taytay, Angono at Binangonan.' },
  { tag: '+', term: '“Sa House bill lang”', meaning: 'Proyektong wala sa panukala ng Pangulo pero lumitaw sa bersyon ng Kamara. Dapat itanong, pero hindi awtomatikong mali.' },
  { tag: '−', term: '“Sa NEP lang”', meaning: 'Proyektong nasa panukala ng Pangulo pero wala na sa bersyon ng Kamara. Maaaring tinanggal o inilipat.' },
  { tag: 'FOI', term: 'Freedom of Information', meaning: 'Ang karapatan mong humingi ng dokumento sa gobyerno, gaya ng presyo bawat gamit sa isang proyekto.' },
];
