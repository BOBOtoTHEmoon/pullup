'use client';

import { useState } from 'react';
import { HostTop, Avatar } from '@/components/ui';

const ORDERS = [
  { name: 'Ada N.', i: 'AD', c: '#D9D2FF', what: 'VIP x2', amt: '₦16,580', meta: 'Transfer, 2m', tag: 'All' },
  { name: 'Squad of 4', i: 'S4', c: '#FF5A1F', what: 'Regular x4, led by Tobi', amt: '₦12,560', meta: 'Squad, 9m', tag: 'Squads' },
  { name: 'Femi K.', i: 'FK', c: '#F2D21B', what: 'Regular x1, code FEMI', amt: '₦2,640', meta: 'Card, 14m', tag: 'All' },
  { name: 'Chioma E.', i: 'CE', c: '#C9C3BA', what: 'Table for 6', amt: '₦61,850', meta: 'Transfer, 31m', tag: 'All' },
  { name: 'David O.', i: 'DO', c: '#8C867E', what: 'Regular x2, drink bundle', amt: '₦9,330', meta: 'Transfer, 48m', tag: 'All' },
  { name: 'Zainab A.', i: 'ZA', c: '#D9D2FF', what: 'Regular x1, resold', amt: '₦2,640', meta: 'Resale, 1h', tag: 'Resold' },
  { name: 'Ifeoluwa S.', i: 'IS', c: '#F2D21B', what: 'VIP x1, code TOLU', amt: '₦8,290', meta: 'Card, 1h', tag: 'All' },
  { name: 'Musa B.', i: 'MB', c: '#C9C3BA', what: 'Regular x1, refunded', amt: '₦2,640', meta: 'Refund, 2h', tag: 'Refunded' },
];
const TABS = ['All', 'Squads', 'Resold', 'Refunded'];

export default function Orders() {
  const [tab, setTab] = useState('All');
  const [q, setQ] = useState('');
  const list = ORDERS.filter((o) => (tab === 'All' || o.tag === tab) && (o.name + o.what).toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="page" style={{ gap: 16 }}>
      <HostTop active="Orders" />
      <div className="between" style={{ alignItems: 'baseline' }}><h1 className="disp" style={{ fontSize: 24 }}>287 orders</h1><span className="muted small">412 tickets</span></div>
      <div><label className="sr" htmlFor="os">Search orders</label><input id="os" type="search" className="field" placeholder="Search name, phone or code" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div role="tablist" className="tabs" style={{ gap: 18 }}>
        {TABS.map((t) => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="stack">
        {list.length === 0 && <p className="muted" style={{ padding: '12px 0' }}>No orders match.</p>}
        {list.map((o) => (
          <div key={o.name + o.what} className="row line list-row" style={{ padding: '11px 8px', margin: '0 -8px' }}>
            <Avatar initials={o.i} color={o.c} size={34} />
            <span className="stack" style={{ flex: 1, minWidth: 0 }}><strong style={{ fontSize: 14 }}>{o.name}</strong><span className="muted small">{o.what}</span></span>
            <span className="stack" style={{ alignItems: 'flex-end' }}><strong className="num" style={{ fontSize: 14 }}>{o.amt}</strong><span className="faint" style={{ fontSize: 11 }}>{o.meta}</span></span>
          </div>
        ))}
      </div>
    </main>
  );
}
