'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BackLink } from '@/components/ui';

const UPCOMING = [
  { mon: 'DEC', day: '4', title: 'Lagos Builders Night', meta: '6 PM, Yaba. Approval needed', price: 'Free', href: '/rsvp/lagos-builders-night' },
  { mon: 'DEC', day: '13', title: 'Design Crit Saturday', meta: '11 AM, Ikoyi', price: '₦5,000', href: '/rsvp/lagos-builders-night' },
  { mon: 'JAN', day: '8', title: 'Founders Dinner', meta: '7 PM, Victoria Island', price: 'Free', href: '/rsvp/founders-dinner' },
];
const PAST = [
  { mon: 'NOV', day: '6', title: 'Lagos Builders Night', meta: '74 went', price: 'Photos', href: '#' },
  { mon: 'OCT', day: '9', title: 'Pitch Practice', meta: '38 went', price: 'Photos', href: '#' },
];

export default function CalendarPage() {
  const [on, setOn] = useState(false);
  const [tab, setTab] = useState<'up' | 'past'>('up');
  const list = tab === 'up' ? UPCOMING : PAST;

  return (
    <main>
      <div style={{ position: 'relative', height: 150, background: '#2346FF', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: -50, width: 200, height: 200, border: '24px solid rgba(255,255,255,0.9)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', left: 16, top: 20 }}><BackLink href="/rsvp/lagos-builders-night" dark /></div>
      </div>
      <div className="page" style={{ paddingTop: 0, gap: 16 }}>
        <span style={{ width: 68, height: 68, marginTop: -34, borderRadius: 14, background: '#0F0E0D', color: '#fff', border: '3px solid var(--bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, position: 'relative' }}>LB</span>
        <div className="stack" style={{ gap: 6 }}>
          <h1 className="disp" style={{ fontSize: 26 }}>Lagos Builders</h1>
          <p className="soft" style={{ fontSize: 14, lineHeight: 1.55 }}>[ONE LINE ABOUT THIS CALENDAR: who runs it and what kind of events it hosts.]</p>
          <span className="muted" style={{ fontSize: 13 }}><strong style={{ color: 'var(--text)' }}>{on ? '2,341' : '2,340'}</strong> subscribers, 18 events so far</span>
        </div>
        <button type="button" aria-pressed={on} onClick={() => setOn(!on)} className={'btn btn-lg btn-block ' + (on ? 'btn-ghost' : 'btn-accent')}>
          {on ? 'Subscribed' : 'Subscribe'}
        </button>
        <span className="muted small" style={{ marginTop: -8 }}>{on ? 'You will get every new event from Lagos Builders first.' : 'Get new events from this host before anyone else.'}</span>
        <div role="tablist" className="tabs">
          <button role="tab" aria-selected={tab === 'up'} className={tab === 'up' ? 'on' : ''} onClick={() => setTab('up')}>Upcoming</button>
          <button role="tab" aria-selected={tab === 'past'} className={tab === 'past' ? 'on' : ''} onClick={() => setTab('past')}>Past</button>
        </div>
        <div className="stack">
          {list.map((e) => (
            <Link key={e.title + e.day} href={e.href} className="row list-row" style={{ gap: 14, padding: '12px 8px', margin: '0 -8px' }}>
              <span className="surface stack" style={{ width: 52, height: 56, alignItems: 'center', justifyContent: 'center', flex: 'none', borderRadius: 8 }}>
                <span className="accent" style={{ fontSize: 11, fontWeight: 600 }}>{e.mon}</span>
                <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>{e.day}</span>
              </span>
              <span className="stack" style={{ flex: 1, minWidth: 0 }}><strong style={{ fontSize: 15 }}>{e.title}</strong><span className="muted small">{e.meta}</span></span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{e.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
