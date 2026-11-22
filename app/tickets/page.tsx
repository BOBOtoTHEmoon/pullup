'use client';

import { useState } from 'react';
import { GuestHeader } from '@/components/ui';

// Draws a QR-style pattern for the demo. A real build would encode a signed ticket ID.
function FakeQR({ seed, size = 150 }: { seed: number; size?: number }) {
  const N = 25;
  let s = seed;
  const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of [[0, 0], [0, N - 7], [N - 7, 0]]) {
      const y = r - fr, x = c - fc;
      if (y >= -1 && y <= 7 && x >= -1 && x <= 7) {
        if (y < 0 || x < 0 || y > 6 || x > 6) return 0;
        if (y === 0 || y === 6 || x === 0 || x === 6) return 1;
        return y >= 2 && y <= 4 && x >= 2 && x <= 4 ? 1 : 0;
      }
    }
    return -1;
  };
  const cells: [number, number][] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const f = finder(r, c);
    if (f === 1 || (f === -1 && rnd() > 0.52)) cells.push([r, c]);
  }
  return (
    <svg role="img" aria-label="Entry QR code" width={size} height={size} viewBox={`-1 -1 ${N + 2} ${N + 2}`} shapeRendering="crispEdges" style={{ background: '#fff', borderRadius: 8, flex: 'none' }}>
      {cells.map(([r, c]) => <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#0F0E0D" />)}
    </svg>
  );
}

const TICKETS = [
  { title: 'Jaja After Dark', host: 'JAJA HALL SRC', date: 'Fri 28 Nov', doors: '10:00 PM', type: 'Regular, squad of 4', pin: '4819', bg: '#FF5A1F', seed: 20261128 },
  { title: 'Akoka Block Party', host: 'BLOCK 7 COLLECTIVE', date: 'Fri 5 Dec', doors: '9:00 PM', type: 'VIP', pin: '7302', bg: '#F2D21B', seed: 20261205 },
  { title: 'Lagos Builders Night', host: 'LAGOS BUILDERS', date: 'Thu 4 Dec', doors: '6:00 PM', type: 'Free, approved', pin: '1166', bg: '#2346FF', seed: 20261204 },
];

export default function TicketsPage() {
  const [i, setI] = useState(0);
  const [sent, setSent] = useState('');
  const t = TICKETS[i];
  const light = t.bg === '#2346FF';

  return (
    <main className="page" style={{ gap: 16 }}>
      <GuestHeader />
      <div className="between" style={{ alignItems: 'baseline' }}>
        <h1 className="disp" style={{ fontSize: 28 }}>My tickets</h1>
        <div className="row" style={{ gap: 6 }}>
          <button type="button" className="icon-btn" aria-label="Previous ticket" disabled={i === 0} onClick={() => setI(i - 1)} style={{ opacity: i === 0 ? 0.4 : 1 }}>‹</button>
          <span className="muted num" style={{ fontSize: 13 }}>{i + 1} of {TICKETS.length}</span>
          <button type="button" className="icon-btn" aria-label="Next ticket" disabled={i === TICKETS.length - 1} onClick={() => setI(i + 1)} style={{ opacity: i === TICKETS.length - 1 ? 0.4 : 1 }}>›</button>
        </div>
      </div>

      <div className="paper" style={{ overflow: 'hidden', position: 'relative', borderRadius: 14 }}>
        <div style={{ position: 'relative', height: 128, background: t.bg, overflow: 'hidden', color: light ? '#fff' : '#0F0E0D' }}>
          <div className="spin" style={{ position: 'absolute', right: -40, top: -6, width: 150, height: 150, borderRadius: '50%', background: 'repeating-radial-gradient(circle, #0F0E0D 0 6px, #1E1C1A 6px 8px)' }} />
          <div style={{ position: 'absolute', right: 20, top: 54, width: 30, height: 30, borderRadius: '50%', background: t.bg }} />
          <div className="sheen" aria-hidden="true" />
          <div className="stack" style={{ position: 'absolute', left: 16, bottom: 14, gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>{t.host}</span>
            <span className="fly" style={{ fontSize: 38, lineHeight: 0.85 }}>{t.title}</span>
          </div>
        </div>
        <div className="grid2" style={{ padding: 16, gap: '12px 16px' }}>
          {[['Date', t.date], ['Doors', t.doors], ['Ticket', t.type], ['Holder', 'Bobo I.']].map(([k, v]) => (
            <div key={k} className="stack"><span style={{ fontSize: 11, color: '#5B564F' }}>{k}</span><strong style={{ fontSize: 14 }}>{v}</strong></div>
          ))}
        </div>
        <div aria-hidden="true" style={{ position: 'relative', height: 22 }}>
          <div style={{ position: 'absolute', left: -11, top: 0, width: 22, height: 22, borderRadius: '50%', background: 'var(--bg)' }} />
          <div style={{ position: 'absolute', right: -11, top: 0, width: 22, height: 22, borderRadius: '50%', background: 'var(--bg)' }} />
          <div style={{ position: 'absolute', left: 20, right: 20, top: 10, borderTop: '2px dashed #CFC8BE' }} />
        </div>
        <div className="row" style={{ padding: '8px 16px 18px', gap: 18 }}>
          <FakeQR seed={t.seed} />
          <div className="stack" style={{ gap: 10 }}>
            <span className="stack" style={{ gap: 2 }}>
              <span style={{ fontSize: 11, color: '#5B564F' }}>Gate PIN</span>
              <span style={{ fontSize: 26, letterSpacing: '0.14em', fontWeight: 600 }} className="num">{t.pin}</span>
            </span>
            <span style={{ fontSize: 12, color: '#4A453F', lineHeight: 1.4 }}>Works offline. The moving shine means it is live, not a screenshot.</span>
          </div>
        </div>
      </div>

      <div className="grid2">
        <button type="button" className="btn btn-ghost" onClick={() => setSent('send')}>{sent === 'send' ? 'Choose a friend' : 'Send to a friend'}</button>
        <button type="button" className="btn btn-ghost" onClick={() => setSent('resell')}>{sent === 'resell' ? 'Listed for resale' : 'Resell'}</button>
      </div>
    </main>
  );
}
