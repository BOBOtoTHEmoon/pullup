import { HostTop, Icon } from '@/components/ui';

export default function Payouts() {
  const rows: [string, string, boolean?][] = [
    ['Ticket sales', '₦1,236,500'],
    ['Pullup fee', 'Paid by buyers'],
    ['Promoter commission', '−₦44,200'],
  ];
  return (
    <main className="page" style={{ gap: 18 }}>
      <HostTop active="Payouts" />
      <div className="paper stack" style={{ padding: 18, gap: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#5B564F' }}>Held safely until your event</span>
        <span className="disp num" style={{ fontSize: 36, lineHeight: 1 }}>₦1,236,500</span>
        <span style={{ fontSize: 13, color: '#4A453F', lineHeight: 1.5 }}>Released to your account on <strong style={{ color: '#0F0E0D' }}>Sun 30 Nov</strong>, the morning after the gates open.</span>
      </div>
      <div className="stack">
        {rows.map(([k, v]) => (
          <div key={k} className="between line" style={{ padding: '11px 0' }}><span className="muted">{k}</span><strong className="num">{v}</strong></div>
        ))}
        <div className="between" style={{ padding: '12px 0', borderTop: '1px solid rgba(var(--rgb),0.2)', borderBottom: '1px solid rgba(var(--rgb),0.08)' }}>
          <strong>You receive</strong><strong className="accent num">₦1,192,300</strong>
        </div>
      </div>
      <div className="row surface" style={{ padding: 14 }}>
        <span style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(var(--rgb),0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{Icon.bank}</span>
        <span className="stack" style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>[BANK NAME]</strong><span className="muted small">Account ending [0000]</span></span>
        <button type="button" className="btn btn-ghost btn-sm">Change</button>
      </div>
      <div className="stack">
        <h2 className="disp" style={{ fontSize: 18, marginBottom: 6 }}>Past payouts</h2>
        {[['Moremi Movie Night', 'Paid Sun 9 Nov', '₦418,000'], ['Freshers Welcome', 'Paid Sun 19 Oct', '₦903,500']].map(([t, d, a]) => (
          <div key={t} className="between line" style={{ padding: '11px 0' }}>
            <span className="stack"><strong style={{ fontSize: 14 }}>{t}</strong><span className="muted small">{d}</span></span>
            <strong className="num">{a}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}
