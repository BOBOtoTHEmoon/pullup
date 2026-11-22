'use client';

import { useState } from 'react';
import { BackLink, Avatar } from '@/components/ui';

const PEOPLE = [
  ['tolu', 'Tolu A.', 'TA', '#D9D2FF', 'Moremi Hall, 14 mutual friends'],
  ['chidera', 'Chidera O.', 'CO', '#F2D21B', 'Honours Hall, 9 mutual friends'],
  ['femi', 'Femi K.', 'FK', '#FF5A1F', 'In your contacts'],
  ['zainab', 'Zainab A.', 'ZA', '#C9C3BA', 'Went to Jaja After Dark'],
  ['david', 'David O.', 'DO', '#8C867E', 'Faculty of Engineering, 6 mutual'],
  ['ife', 'Ifeoluwa S.', 'IS', '#D9D2FF', 'In your contacts'],
];

export default function FindFriendsPage() {
  const [following, setFollowing] = useState<Record<string, boolean>>({ tolu: true });
  const [q, setQ] = useState('');
  const [synced, setSynced] = useState(false);
  const list = PEOPLE.filter(([, name]) => name.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="page" style={{ gap: 16 }}>
      <BackLink href="/friends" />
      <h1 className="disp" style={{ fontSize: 28 }}>Find friends</h1>
      <div>
        <label className="sr" htmlFor="fs">Search people</label>
        <input id="fs" type="search" className="field" placeholder="Name or @username" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid2">
        <button type="button" className="btn btn-ghost surface" onClick={() => setSynced(true)} style={{ height: 76, border: 0, flexDirection: 'column', alignItems: 'flex-start', gap: 2, textAlign: 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{synced ? 'Contacts synced' : 'Sync contacts'}</span>
          <span className="muted small" style={{ fontWeight: 400 }}>{synced ? '2 already here' : 'See who is already here'}</span>
        </button>
        <button type="button" className="btn btn-ghost surface" style={{ height: 76, border: 0, flexDirection: 'column', alignItems: 'flex-start', gap: 2, textAlign: 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Invite with link</span>
          <span className="muted small" style={{ fontWeight: 400 }}>Send on WhatsApp</span>
        </button>
      </div>
      <div className="stack">
        <div className="between" style={{ alignItems: 'baseline', paddingBottom: 6 }}>
          <h2 className="disp" style={{ fontSize: 18 }}>People you may know</h2>
          <span className="muted small">Near you</span>
        </div>
        {list.map(([id, name, initials, color, why]) => {
          const on = !!following[id];
          return (
            <div key={id} className="row line" style={{ padding: '10px 0' }}>
              <Avatar initials={initials} color={color} size={40} />
              <span className="stack" style={{ flex: 1, minWidth: 0 }}><strong style={{ fontSize: 14 }}>{name}</strong><span className="muted small">{why}</span></span>
              <button type="button" aria-pressed={on} onClick={() => setFollowing({ ...following, [id]: !on })}
                className={'btn btn-sm ' + (on ? 'btn-ghost' : 'btn-accent')} style={{ minWidth: 96 }}>
                {on ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
