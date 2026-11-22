'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { GuestHeader, EventCard, Flyer, Icon } from '@/components/ui';
import { eventsFor, getLocation, atOrIn, priceLabel, eventHref } from '@/lib/data';

const FILTERS = ['All', 'Tonight', 'Parties', 'Concerts', 'Free'];

export default function EventsPage() {
  const { location } = useApp();
  const loc = getLocation(location);
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');

  let list = eventsFor(location).filter((e) => e.title.toLowerCase().includes(q.toLowerCase()));
  if (filter === 'Free') list = list.filter((e) => e.price === 0);
  if (filter === 'Tonight') list = list.slice(0, 1);
  const [featured, ...rest] = list;

  return (
    <main className="page">
      <GuestHeader />
      <div className="row" style={{ alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <h1 className="disp" style={{ fontSize: 34 }}>Tonight {atOrIn(loc)}</h1>
        <Link href="/location" className="disp row accent" style={{ fontSize: 34, gap: 6, borderBottom: '2px solid #FF5A1F' }}>
          {loc.name} {Icon.chevron}
        </Link>
      </div>
      <div style={{ position: 'relative' }}>
        <label className="sr" htmlFor="s">Search events</label>
        <span className="faint" style={{ position: 'absolute', left: 14, top: 16 }}>{Icon.search}</span>
        <input id="s" type="search" className="field" placeholder="Parties, hosts, artists" style={{ paddingLeft: 40 }} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div role="tablist" className="tabs">
        {FILTERS.map((f) => (
          <button key={f} role="tab" aria-selected={f === filter} className={f === filter ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {!featured && <p className="muted">Nothing here yet. Try another filter or location.</p>}

      {featured && (
        <Link href={eventHref(featured)} className="card surface" style={{ flexDirection: 'row', gap: 14, padding: 10 }}>
          <Flyer palette={featured.palette} title={featured.title} size={24} style={{ width: 104, height: 128, flex: 'none', borderRadius: 8 }} />
          <div className="stack" style={{ justifyContent: 'space-between', padding: '4px 4px 4px 0', flex: 1 }}>
            <div className="stack" style={{ gap: 4 }}>
              <span className="accent small" style={{ fontWeight: 600 }}>{featured.date}, {featured.time}</span>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.25 }}>{featured.title}</span>
              <span className="muted small">{featured.venue}</span>
            </div>
            <div className="between">
              <span className="muted small">{featured.going} going</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{priceLabel(featured)}</span>
            </div>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <>
          <h2 className="disp" style={{ fontSize: 22 }}>This week</h2>
          <div className="grid2" style={{ gap: '18px 12px' }}>
            {rest.map((ev) => <EventCard key={ev.slug} ev={ev} />)}
          </div>
        </>
      )}
    </main>
  );
}
