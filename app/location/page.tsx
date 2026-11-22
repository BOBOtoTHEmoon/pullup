'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { BackLink, Icon } from '@/components/ui';
import { LOCATIONS, eventsFor, atOrIn, getLocation, type LocationId } from '@/lib/data';

export default function LocationPage() {
  const { location, setLocation } = useApp();
  const [pick, setPick] = useState<LocationId>(location);
  const [q, setQ] = useState('');
  const cur = getLocation(pick);
  const count = eventsFor(pick).length;

  const group = (kind: 'campus' | 'city') =>
    LOCATIONS.filter((l) => l.kind === kind && (l.name + l.area).toLowerCase().includes(q.toLowerCase()));

  const Option = ({ id, name, area }: { id: LocationId; name: string; area: string }) => {
    const on = id === pick;
    return (
      <button type="button" role="radio" aria-checked={on} onClick={() => setPick(id)} className="list-row"
        style={{ display: 'flex', alignItems: 'center', gap: 12, height: 52, padding: '0 12px', margin: '0 -12px', border: 0, background: on ? 'var(--surface)' : 'transparent', textAlign: 'left' }}>
        <span style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{name}</span>
          <span className="muted small">{area}</span>
        </span>
        <span className="muted small">{eventsFor(id).length} events</span>
        <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${on ? '#FF5A1F' : 'rgba(var(--rgb),0.3)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: on ? '#FF5A1F' : 'transparent' }} />
        </span>
      </button>
    );
  };

  return (
    <main className="page has-bar">
      <BackLink href="/" />
      <h1 className="disp" style={{ fontSize: 30 }}>Where are you going out?</h1>
      <button type="button" className="btn btn-ghost btn-block" onClick={() => setPick('unilag')}>{Icon.locate} Use my location</button>
      <div>
        <label className="sr" htmlFor="loc">Search campus or city</label>
        <input id="loc" type="search" className="field" placeholder="Search campus or city" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {(['campus', 'city'] as const).map((kind) => {
        const list = group(kind);
        if (!list.length) return null;
        return (
          <div key={kind} role="radiogroup" aria-label={kind === 'campus' ? 'Campuses' : 'Cities'} className="stack">
            <span className="caps" style={{ padding: '4px 0 6px' }}>{kind === 'campus' ? 'CAMPUSES' : 'CITIES'}</span>
            {list.map((l) => <Option key={l.id} {...l} />)}
          </div>
        );
      })}
      <div className="bar">
        <Link href="/events" className="btn btn-accent btn-lg btn-block" onClick={() => setLocation(pick)}>
          Show {count} events {atOrIn(cur)} {cur.name}
        </Link>
      </div>
    </main>
  );
}
