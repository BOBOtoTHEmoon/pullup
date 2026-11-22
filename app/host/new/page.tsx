'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BackLink, Icon } from '@/components/ui';

const TYPES = [['party', 'Party'], ['concert', 'Concert'], ['meetup', 'Meetup or class'], ['other', 'Something else']];
const ACCESS = [
  ['paid', 'Paid tickets', 'Sell tiers, tables and add-ons'],
  ['free', 'Free RSVP', 'Anyone can register, you cap the number'],
  ['approval', 'Request to join', 'You approve every guest before they get in'],
];

export default function NewEvent() {
  const [type, setType] = useState('party');
  const [access, setAccess] = useState('paid');
  const [flyer, setFlyer] = useState(false);

  return (
    <main className="page has-bar" style={{ gap: 16 }}>
      <div className="between"><BackLink href="/host" /><span className="label">Step 1 of 2</span></div>
      <div className="stack" style={{ gap: 8 }}>
        <h1 className="disp" style={{ fontSize: 28 }}>New event</h1>
        <div className="grid2" style={{ gap: 6 }}><span style={{ height: 4, borderRadius: 2, background: '#FF5A1F' }} /><span style={{ height: 4, borderRadius: 2, background: 'rgba(var(--rgb),0.14)' }} /></div>
      </div>
      <button type="button" onClick={() => setFlyer(true)} className="btn btn-ghost btn-block"
        style={{ height: 120, borderRadius: 10, border: `2px dashed ${flyer ? '#FF5A1F' : 'rgba(var(--rgb),0.25)'}`, flexDirection: 'column', gap: 6 }}>
        {Icon.upload}
        <span style={{ fontSize: 14, fontWeight: 600 }}>{flyer ? 'flyer.jpg added' : 'Upload your flyer'}</span>
        <span className="muted small" style={{ fontWeight: 400 }}>Portrait works best, up to 10 MB</span>
      </button>
      <div className="stack" style={{ gap: 6 }}><label htmlFor="nm" className="label">Event name</label><input id="nm" className="field" defaultValue="Lagos Builders Night" /></div>
      <div className="stack" style={{ gap: 6 }}>
        <span className="label">Type</span>
        <div role="radiogroup" aria-label="Event type" className="grid2" style={{ gap: 8 }}>
          {TYPES.map(([id, label]) => (
            <button key={id} type="button" role="radio" aria-checked={type === id} className={'opt ' + (type === id ? 'on' : '')} onClick={() => setType(id)} style={{ height: 44, fontSize: 13, fontWeight: 600 }}>{label}</button>
          ))}
        </div>
      </div>
      <div className="stack" style={{ gap: 6 }}>
        <span className="label">Who can get in</span>
        <div role="radiogroup" aria-label="Access" className="stack" style={{ gap: 8 }}>
          {ACCESS.map(([id, label, note]) => (
            <button key={id} type="button" role="radio" aria-checked={access === id} className={'opt ' + (access === id ? 'on' : '')} onClick={() => setAccess(id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 56, padding: '8px 14px', textAlign: 'left' }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
              <span className="muted small">{note}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid2">
        <div className="stack" style={{ gap: 6 }}><label htmlFor="dt" className="label">Date</label><input id="dt" className="field" defaultValue="Thu 4 Dec" /></div>
        <div className="stack" style={{ gap: 6 }}><label htmlFor="tm" className="label">Doors open</label><input id="tm" className="field" defaultValue="6:00 PM" /></div>
      </div>
      <div className="stack" style={{ gap: 6 }}><label htmlFor="vn" className="label">Venue</label><input id="vn" className="field" placeholder="Venue name and area" /></div>
      <div className="bar">
        <Link href={access === 'paid' ? '/host/tickets' : '/host/guests'} className="btn btn-accent btn-lg btn-block">
          {access === 'paid' ? 'Next: tickets' : 'Next: registration questions'}
        </Link>
      </div>
    </main>
  );
}
