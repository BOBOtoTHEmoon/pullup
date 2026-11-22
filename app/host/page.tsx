import { HostTop } from '@/components/ui';

const DAYS: [string, number][] = [['Fri', 31], ['Sat', 22], ['Sun', 40], ['Mon', 47], ['Tue', 52], ['Wed', 58], ['Thu', 64]];
const PROMOTERS = [
  ['1', 'Tolu A.', 'Moremi Hall', '96 sold', '₦19,200 earned'],
  ['2', 'Chidera O.', 'Honours Hall', '71 sold', '₦14,200 earned'],
  ['3', 'Femi K.', 'Jaja Hall', '54 sold', '₦10,800 earned'],
];

export default function HostSales() {
  return (
    <main className="page" style={{ gap: 18 }}>
      <HostTop active="Sales" />
      <div className="stack" style={{ gap: 10 }}>
        <span className="muted small">Revenue so far</span>
        <span className="disp num" style={{ fontSize: 44, lineHeight: 1 }}>₦1,236,500</span>
        <div className="progress"><div style={{ width: '69%' }} /></div>
        <div className="between muted small"><span><strong style={{ color: 'var(--text)' }}>412</strong> of 600 tickets sold</span><span>Sat 29 Nov, 8 PM</span></div>
      </div>
      <div className="grid2">
        {[['Sold today', '38'], ['Squads formed', '61'], ['Page visits', '2,140'], ['Next payout', 'Sun 30']].map(([k, v]) => (
          <div key={k} className="surface stack" style={{ padding: 14, gap: 2 }}><span className="muted small">{k}</span><span style={{ fontSize: 22, fontWeight: 700 }}>{v}</span></div>
        ))}
      </div>
      <div className="stack" style={{ gap: 10 }}>
        <div className="between" style={{ alignItems: 'baseline' }}><h2 className="disp" style={{ fontSize: 18 }}>Last 7 days</h2><span className="muted small">Tickets per day</span></div>
        <div role="img" aria-label="Tickets sold per day over the last 7 days, peaking at 64 on Thursday" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 8, height: 100, alignItems: 'end' }}>
          {DAYS.map(([d, v], i) => (
            <div key={d} className="stack" style={{ alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
              <div className="grow" style={{ width: '100%', height: Math.round((v / 64) * 76), borderRadius: '4px 4px 0 0', background: i === DAYS.length - 1 ? '#FF5A1F' : 'rgba(var(--rgb),0.2)' }} />
              <span className="muted" style={{ fontSize: 10 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="stack">
        <div className="between" style={{ alignItems: 'baseline', paddingBottom: 6 }}><h2 className="disp" style={{ fontSize: 18 }}>Top promoters</h2><span className="muted small">All 14</span></div>
        {PROMOTERS.map(([r, n, h, s, e]) => (
          <div key={n} className="row line" style={{ padding: '10px 0' }}>
            <span className="accent" style={{ width: 22, fontSize: 13, fontWeight: 700 }}>{r}</span>
            <span className="stack" style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{n}</strong><span className="muted" style={{ fontSize: 11 }}>{h}</span></span>
            <span className="stack" style={{ alignItems: 'flex-end' }}><strong style={{ fontSize: 14 }}>{s}</strong><span className="muted" style={{ fontSize: 11 }}>{e}</span></span>
          </div>
        ))}
      </div>
    </main>
  );
}
