'use client';

import { useState } from 'react';
import { HostTop, Avatar } from '@/components/ui';

const REQUESTS = [
  ['amaka', 'Amaka O.', 'AO', '#D9D2FF', 'Product designer at a fintech'],
  ['seun', 'Seun B.', 'SB', '#F2D21B', 'Backend engineer, building a logistics app'],
  ['kemi', 'Kemi A.', 'KA', '#FF5A1F', 'Final year, Computer Science, UNILAG'],
  ['tunde', 'Tunde L.', 'TL', '#C9C3BA', 'Founder, early stage, looking for a CTO'],
];

export default function Guests() {
  const [status, setStatus] = useState<Record<string, 'in' | 'out'>>({});
  const [sent, setSent] = useState('');
  const pending = REQUESTS.filter(([id]) => !status[id]).length;
  const approved = REQUESTS.filter(([id]) => status[id] === 'in').length;
  const approveAll = () => {
    const next = { ...status };
    REQUESTS.forEach(([id]) => { if (!next[id]) next[id] = 'in'; });
    setStatus(next);
  };

  return (
    <main className="page" style={{ gap: 16 }}>
      <HostTop active="Guests" event="Lagos Builders Night" />
      <div className="grid3">
        <div className="surface stack" style={{ padding: 12 }}><span className="muted small">Going</span><span style={{ fontSize: 22, fontWeight: 700 }}>{62 + approved}</span></div>
        <div className="surface stack" style={{ padding: 12 }}><span className="muted small">To review</span><span className="accent" style={{ fontSize: 22, fontWeight: 700 }}>{10 + pending}</span></div>
        <div className="surface stack" style={{ padding: 12 }}><span className="muted small">Waitlist</span><span style={{ fontSize: 22, fontWeight: 700 }}>9</span></div>
      </div>
      <div className="between" style={{ alignItems: 'baseline' }}>
        <h1 className="disp" style={{ fontSize: 20 }}>Requests</h1>
        <button type="button" className="link-btn" onClick={approveAll}>Approve all</button>
      </div>
      <div className="stack">
        {REQUESTS.map(([id, name, initials, color, what]) => (
          <div key={id} className="stack line" style={{ gap: 10, padding: '12px 0' }}>
            <div className="row">
              <Avatar initials={initials} color={color} size={38} />
              <span className="stack" style={{ flex: 1, minWidth: 0 }}><strong style={{ fontSize: 14 }}>{name}</strong><span className="muted small">{what}</span></span>
              {status[id] && <span style={{ fontSize: 13, fontWeight: 600, color: status[id] === 'in' ? '#FF5A1F' : 'var(--muted)' }}>{status[id] === 'in' ? 'Approved' : 'Declined'}</span>}
            </div>
            {!status[id] && (
              <div className="grid2" style={{ gap: 8, paddingLeft: 50 }}>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus({ ...status, [id]: 'out' })}>Decline</button>
                <button type="button" className="btn btn-accent btn-sm" onClick={() => setStatus({ ...status, [id]: 'in' })}>Approve</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid2">
        <button type="button" className="btn btn-ghost surface" onClick={() => setSent('msg')} style={{ height: 76, border: 0, flexDirection: 'column', alignItems: 'flex-start', gap: 2, textAlign: 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{sent === 'msg' ? 'Message drafted' : 'Message guests'}</span>
          <span className="muted small" style={{ fontWeight: 400 }}>SMS, WhatsApp, email</span>
        </button>
        <button type="button" className="btn btn-ghost surface" onClick={() => setSent('inv')} style={{ height: 76, border: 0, flexDirection: 'column', alignItems: 'flex-start', gap: 2, textAlign: 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{sent === 'inv' ? 'Invites queued' : 'Invite past guests'}</span>
          <span className="muted small" style={{ fontWeight: 400 }}>From your last 17 events</span>
        </button>
      </div>
    </main>
  );
}
