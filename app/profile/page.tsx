'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GuestHeader, Avatar, Flyer } from '@/components/ui';

const VIS = [
  ['everyone', 'Everyone', 'Anyone on Pullup can see the events you are going to.'],
  ['friends', 'Friends', 'Only people you both follow can see where you are going.'],
  ['me', 'Only me', 'Nobody sees your plans. You still see your friends.'],
] as const;

export default function ProfilePage() {
  const [vis, setVis] = useState<string>('friends');
  const note = VIS.find(([id]) => id === vis)![2];

  return (
    <main className="page" style={{ gap: 20 }}>
      <GuestHeader />
      <div className="row" style={{ gap: 14 }}>
        <Avatar initials="BO" color="#FF5A1F" size={64} />
        <span className="stack" style={{ flex: 1 }}>
          <span className="disp" style={{ fontSize: 22 }}>Bobo I.</span>
          <span className="muted" style={{ fontSize: 13 }}>@bobo, UNILAG</span>
        </span>
        <button type="button" className="btn btn-ghost btn-sm">Edit</button>
      </div>

      <div className="grid3" style={{ gap: 0, borderTop: '1px solid rgba(var(--rgb),0.1)', borderBottom: '1px solid rgba(var(--rgb),0.1)' }}>
        {[['23', 'Events', '/tickets'], ['148', 'Friends', '/friends'], ['12', 'Hosts', '/calendar/lagos-builders']].map(([n, l, h], i) => (
          <Link key={l} href={h} className="stack" style={{ alignItems: 'center', padding: '12px 0', borderLeft: i ? '1px solid rgba(var(--rgb),0.1)' : 0 }}>
            <strong style={{ fontSize: 18 }}>{n}</strong><span className="muted small">{l}</span>
          </Link>
        ))}
      </div>

      <div className="stack" style={{ gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Who sees where I am going</span>
        <div role="radiogroup" aria-label="Attendance visibility" className="seg" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {VIS.map(([id, label]) => (
            <button key={id} type="button" role="radio" aria-checked={vis === id} className={vis === id ? 'on' : ''} onClick={() => setVis(id)}>{label}</button>
          ))}
        </div>
        <span className="faint small">{note}</span>
      </div>

      <div className="stack">
        <div className="between" style={{ alignItems: 'baseline', paddingBottom: 6 }}>
          <h2 className="disp" style={{ fontSize: 18 }}>Going next</h2>
          <Link href="/tickets" className="muted small">My tickets</Link>
        </div>
        {[
          { t: 'Jaja After Dark', s: 'Fri 28 Nov, with Ada, Kunle, Tobi', d: '6 days', p: 0, h: '/events/jaja-after-dark' },
          { t: 'Akoka Block Party', s: 'Fri 5 Dec, VIP', d: '13 days', p: 3, h: '/events/akoka-block-party' },
        ].map((x) => (
          <Link key={x.t} href={x.h} className="row line list-row" style={{ padding: '10px 0' }}>
            <Flyer palette={x.p} title="" style={{ width: 44, height: 54, flex: 'none', borderRadius: 6 }} />
            <span className="stack" style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{x.t}</strong><span className="muted small">{x.s}</span></span>
            <span className="small" style={{ fontWeight: 600, color: x.p === 0 ? '#FF5A1F' : 'var(--muted)' }}>{x.d}</span>
          </Link>
        ))}
      </div>

      <div className="stack" style={{ gap: 10 }}>
        <div className="between" style={{ alignItems: 'baseline' }}>
          <h2 className="disp" style={{ fontSize: 18 }}>Hosts you follow</h2>
          <span className="muted small">All 12</span>
        </div>
        <div className="grid3">
          {[['JH', 'Jaja Hall SRC', 'var(--paper)', '#0F0E0D'], ['MH', 'Moremi Hall', '#D9D2FF', '#2A1B6B'], ['LB', 'Lagos Builders', '#2346FF', '#FFFFFF']].map(([i, n, bg, fg]) => (
            <Link key={n} href="/calendar/lagos-builders" className="card" style={{ gap: 6 }}>
              <span style={{ aspectRatio: '1 / 1', borderRadius: 10, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--paper-shadow)' }}><span className="fly" style={{ fontSize: 26 }}>{i}</span></span>
              <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{n}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
