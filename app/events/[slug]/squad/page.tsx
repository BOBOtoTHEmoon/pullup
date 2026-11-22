'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BackLink, Flyer, Avatar } from '@/components/ui';
import { getEvent, EVENTS, naira, ticketFee } from '@/lib/data';

export default function SquadPage() {
  const { slug } = useParams<{ slug: string }>();
  const ev = getEvent(slug) ?? EVENTS[0];
  const share = ev.price + ticketFee(ev.price, 1);
  const [secs, setSecs] = useState(23 * 60 + 41);
  const [reminded, setReminded] = useState(false);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const members = [
    { name: 'Ada', sub: 'Paid 6 min ago', initials: 'AD', color: '#D9D2FF', status: 'Paid', tone: 'var(--text)' },
    { name: 'Kunle', sub: 'Paid 2 min ago', initials: 'KU', color: '#F2D21B', status: 'Paid', tone: 'var(--text)' },
    { name: 'Tobi', sub: reminded ? 'Reminder sent' : 'Opened the link', initials: 'TO', color: '#8C867E', status: 'Waiting', tone: 'var(--muted)' },
    { name: 'You', sub: 'Started this squad', initials: 'BO', color: '#FF5A1F', status: 'Pay below', tone: '#FF5A1F' },
  ];

  const copy = (what: string) => { setCopied(what); setTimeout(() => setCopied(''), 1500); };

  return (
    <main className="page" style={{ gap: 18 }}>
      <div className="between">
        <BackLink href={`/events/${ev.slug}`} />
        <span className="muted" style={{ fontSize: 13 }}>Closes in <strong className="num" style={{ color: 'var(--text)' }}>{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</strong></span>
      </div>
      <div className="row" style={{ gap: 14 }}>
        <Flyer palette={ev.palette} title="" style={{ width: 56, height: 68, flex: 'none', borderRadius: 6 }} />
        <div className="stack" style={{ gap: 2 }}>
          <h1 className="disp" style={{ fontSize: 28 }}>Squad of 4</h1>
          <span className="muted" style={{ fontSize: 13 }}>{ev.title}, Regular, {ev.date}</span>
        </div>
      </div>
      <div className="stack" style={{ gap: 8 }}>
        <div className="progress"><div style={{ width: '50%' }} /></div>
        <div className="between muted small"><span>2 of 4 paid</span><span>Tickets unlock at 4 of 4</span></div>
      </div>
      <div className="stack">
        {members.map((m) => (
          <div key={m.name} className="row line" style={{ padding: '10px 0' }}>
            <Avatar initials={m.initials} color={m.color} size={34} />
            <span className="stack" style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>{m.name}</strong><span className="muted small">{m.sub}</span></span>
            <span style={{ fontSize: 13, fontWeight: 600, color: m.tone }}>{m.status}</span>
          </div>
        ))}
      </div>
      <div className="grid2">
        <button type="button" className="btn btn-ghost" onClick={() => copy('link')}>{copied === 'link' ? 'Link copied' : 'Copy squad link'}</button>
        <button type="button" className="btn btn-ghost" onClick={() => setReminded(true)}>{reminded ? 'Reminded' : 'Remind Tobi'}</button>
      </div>
      <div className="paper stack" style={{ padding: 16, gap: 12 }}>
        <div className="between" style={{ alignItems: 'baseline' }}>
          <strong style={{ fontSize: 13 }}>Your share</strong>
          <span className="num" style={{ fontSize: 22, fontWeight: 700 }}>{naira(share)}</span>
        </div>
        <div className="between" style={{ paddingTop: 12, borderTop: '1px solid #DDD7CF' }}>
          <span className="stack" style={{ gap: 2 }}>
            <span style={{ fontSize: 11, color: '#5B564F' }}>Transfer to this account only</span>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '0.04em' }}>[ACCOUNT NO.]</span>
            <span style={{ fontSize: 12, color: '#4A453F' }}>[PARTNER BANK], Pullup Checkout</span>
          </span>
          <button type="button" className="btn btn-sm" style={{ border: '1px solid #0F0E0D', background: 'transparent', color: '#0F0E0D' }} onClick={() => copy('acct')}>{copied === 'acct' ? 'Copied' : 'Copy'}</button>
        </div>
        <span style={{ fontSize: 11, color: '#5B564F' }}>{naira(ev.price)} ticket + {naira(share - ev.price)} fee. Confirms in seconds.</span>
      </div>
      <Link href="/tickets" className="btn btn-accent btn-lg btn-block">I have sent the money</Link>
    </main>
  );
}
