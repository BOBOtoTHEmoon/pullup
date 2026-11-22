'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BackLink } from '@/components/ui';

const TIERS = [
  { name: 'Regular', price: '₦2,500', qty: '400', ends: 'Sat 6 PM' },
  { name: 'VIP', price: '₦8,000', qty: '150', ends: 'Sat 6 PM' },
  { name: 'Table for 6', price: '₦60,000', qty: '10', ends: 'Fri 9 PM' },
];

export default function TicketSetup() {
  const [payer, setPayer] = useState<'buyer' | 'me'>('buyer');
  const [opts, setOpts] = useState({ squads: true, bundle: true, promoters: true });
  const toggle = (k: keyof typeof opts) => setOpts({ ...opts, [k]: !opts[k] });

  const switches: [keyof typeof opts, string, string][] = [
    ['squads', 'Allow squads', 'Friends split the cost and pay separately'],
    ['bundle', 'Drink bundle add-on', '₦2,000, collected at the bar'],
    ['promoters', 'Promoter codes', '10% commission on each sale'],
  ];

  return (
    <main className="page has-bar" style={{ gap: 18 }}>
      <div className="between"><BackLink href="/host/new" /><span className="label">Step 2 of 2</span></div>
      <div className="stack" style={{ gap: 8 }}>
        <h1 className="disp" style={{ fontSize: 28 }}>Tickets</h1>
        <div className="grid2" style={{ gap: 6 }}><span style={{ height: 4, borderRadius: 2, background: '#FF5A1F' }} /><span style={{ height: 4, borderRadius: 2, background: '#FF5A1F' }} /></div>
      </div>
      <div className="stack" style={{ gap: 10 }}>
        {TIERS.map((t) => (
          <div key={t.name} className="surface stack" style={{ padding: 14, gap: 10 }}>
            <div className="between"><strong style={{ fontSize: 15 }}>{t.name}</strong><button type="button" className="muted" style={{ background: 'none', border: 0, fontSize: 13, fontWeight: 600 }}>Edit</button></div>
            <div className="grid3">
              {[['Price', t.price], ['Quantity', t.qty], ['Sales end', t.ends]].map(([k, v]) => (
                <span key={k} className="stack"><span className="muted" style={{ fontSize: 11 }}>{k}</span><strong style={{ fontSize: 14 }}>{v}</strong></span>
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-block" style={{ borderStyle: 'dashed' }}>Add ticket type</button>
      </div>
      <div className="stack" style={{ gap: 10 }}>
        <span className="label">Who pays the 3% + ₦50 fee</span>
        <div role="radiogroup" aria-label="Who pays the fee" className="seg" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <button type="button" role="radio" aria-checked={payer === 'buyer'} className={payer === 'buyer' ? 'on' : ''} onClick={() => setPayer('buyer')}>Buyer pays</button>
          <button type="button" role="radio" aria-checked={payer === 'me'} className={payer === 'me' ? 'on' : ''} onClick={() => setPayer('me')}>I pay</button>
        </div>
        <span className="muted small" style={{ lineHeight: 1.5 }}>
          {payer === 'buyer' ? 'A ₦3,000 ticket costs the buyer ₦3,140. You receive the full ₦3,000.' : 'A ₦3,000 ticket costs the buyer ₦3,000. You receive ₦2,860.'}
        </span>
      </div>
      <div className="stack">
        {switches.map(([k, t, d], i) => (
          <label key={k} className="row" style={{ padding: '14px 0', borderTop: '1px solid rgba(var(--rgb),0.08)', borderBottom: i === switches.length - 1 ? '1px solid rgba(var(--rgb),0.08)' : 0, cursor: 'pointer' }}>
            <span className="stack" style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{t}</strong><span className="muted small">{d}</span></span>
            <input type="checkbox" checked={opts[k]} onChange={() => toggle(k)} style={{ width: 22, height: 22, accentColor: '#FF5A1F', margin: 0 }} />
          </label>
        ))}
      </div>
      <div className="bar"><Link href="/host" className="btn btn-accent btn-lg btn-block">Publish event</Link></div>
    </main>
  );
}
