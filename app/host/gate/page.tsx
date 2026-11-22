'use client';

import { useState } from 'react';
import { BackLink, Icon } from '@/components/ui';

const SCANS = [
  { ok: true, name: 'Kunle A.', ticket: 'Regular, squad of 4', addon: 'Drink bundle', extra: '2 of 4 inside' },
  { ok: true, name: 'Ada N.', ticket: 'VIP', addon: 'None', extra: 'Fast lane' },
  { ok: false, name: 'Femi K.', ticket: 'Regular', addon: 'None', extra: 'Scanned 10:12 PM' },
  { ok: true, name: 'Chioma E.', ticket: 'Table for 6', addon: 'Bottle', extra: 'Table 3' },
];

// The gate scanner stays dark in both themes because it sits over the camera view.
export default function Gate() {
  const [i, setI] = useState(0);
  const [inside, setInside] = useState(286);
  const s = SCANS[i % SCANS.length];
  const next = () => { if (s.ok) setInside(inside + 1); setI(i + 1); };

  return (
    <main style={{ position: 'relative', minHeight: 'calc(100vh / var(--z))', overflow: 'hidden', background: 'radial-gradient(120% 70% at 50% 35%, #3A332C 0%, #1A1714 55%, #0B0A09 100%)', color: '#F4F1EC' }}>
      <div className="between" style={{ position: 'absolute', left: 20, right: 20, top: 20 }}>
        <BackLink href="/host" dark />
        <div className="stack" style={{ alignItems: 'flex-end' }}>
          <span className="num" style={{ fontSize: 20, fontWeight: 700 }}>{inside} <span style={{ fontSize: 13, fontWeight: 500, color: '#C9C3BA' }}>/ 412 in</span></span>
          <span style={{ fontSize: 11, color: '#C9C3BA' }}>Offline. All 412 tickets saved on this phone</span>
        </div>
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 130, width: 260, height: 260, transform: 'translateX(-50%)' }}>
        {(['tl', 'tr', 'bl', 'br'] as const).map((c) => {
          const line = '4px solid #F4F1EC';
          const top = c[0] === 't';
          const left = c[1] === 'l';
          return (
            <div key={c} style={{
              position: 'absolute', width: 44, height: 44,
              top: top ? 0 : undefined, bottom: top ? undefined : 0,
              left: left ? 0 : undefined, right: left ? undefined : 0,
              borderTop: top ? line : undefined, borderBottom: top ? undefined : line,
              borderLeft: left ? line : undefined, borderRight: left ? undefined : line,
              borderRadius: top ? (left ? '14px 0 0 0' : '0 14px 0 0') : (left ? '0 0 0 14px' : '0 0 14px 0'),
            }} />
          );
        })}
        <div className="scanline" />
      </div>

      <div className="grid2" style={{ position: 'absolute', left: 20, right: 20, top: 410 }}>
        <button type="button" className="btn" style={{ background: 'rgba(244,241,236,0.1)', color: '#F4F1EC', height: 44 }}>Enter PIN instead</button>
        <button type="button" className="btn" style={{ background: 'rgba(244,241,236,0.1)', color: '#F4F1EC', height: 44 }}>Torch</button>
      </div>

      <div key={i} className="rise" role="status" style={{ position: 'absolute', left: 12, right: 12, bottom: 24, borderRadius: 16, overflow: 'hidden', background: '#F4F1EC', color: '#0F0E0D' }}>
        <div className="row" style={{ background: s.ok ? '#FF5A1F' : '#2A2724', color: s.ok ? '#0F0E0D' : '#F4F1EC', padding: '16px 18px' }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: s.ok ? '#0F0E0D' : '#F4F1EC', color: s.ok ? '#FF5A1F' : '#2A2724', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            {s.ok ? Icon.check : Icon.close}
          </span>
          <span className="stack">
            <span className="disp" style={{ fontSize: 24 }}>{s.ok ? 'Let them in' : 'Already used'}</span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{s.ok ? 'Valid ticket, first scan' : 'This code was scanned before'}</span>
          </span>
        </div>
        <div className="stack" style={{ padding: '16px 18px 18px', gap: 14 }}>
          <div className="grid2" style={{ gap: '12px 16px' }}>
            {[['Name', s.name], ['Ticket', s.ticket], ['Add-on', s.addon], [s.ok ? 'Note' : 'First scan', s.extra]].map(([k, v]) => (
              <div key={k} className="stack"><span style={{ fontSize: 11, color: '#5B564F' }}>{k}</span><strong style={{ fontSize: 14 }}>{v}</strong></div>
            ))}
          </div>
          <button type="button" className="btn btn-ink btn-lg btn-block" onClick={next}>Scan next</button>
        </div>
      </div>
    </main>
  );
}
