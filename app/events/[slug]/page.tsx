'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BackLink, Icon, Avatar } from '@/components/ui';
import { getEvent, PALETTES, TIERS, naira, ticketFee, EVENTS } from '@/lib/data';

export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const ev = getEvent(slug) ?? EVENTS[0];
  const p = PALETTES[ev.palette];
  const [qty, setQty] = useState<Record<string, number>>({ reg: 1, vip: 0, table: 0 });
  const [bundle, setBundle] = useState(false);

  const tiers = TIERS.map((t) => ({ ...t, price: Math.round(ev.price * t.mult / 500) * 500 }));
  const count = tiers.reduce((n, t) => n + qty[t.id], 0);
  let sub = tiers.reduce((s, t) => s + t.price * qty[t.id], 0);
  if (bundle) sub += 2000 * Math.max(1, count);
  const total = sub + ticketFee(sub, count);
  const change = (id: string, d: number, max: number) => setQty({ ...qty, [id]: Math.min(max, Math.max(0, qty[id] + d)) });
  const words = ev.title.split(' ').slice(0, 3);

  return (
    <main style={{ paddingBottom: 150 }}>
      <div style={{ position: 'relative', height: 420, background: p.bg, color: p.fg, overflow: 'hidden' }}>
        <div className="pulse" style={{ position: 'absolute', right: -90, top: 90, width: 300, height: 300, background: p.shape, borderRadius: p.radius }} />
        <div className="stack" style={{ position: 'absolute', left: 20, right: 20, bottom: 26, gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em' }}>{ev.host.toUpperCase()} PRESENTS</span>
          <span className="fly" style={{ fontSize: 88, lineHeight: 0.8 }}>{words.map((w, i) => <span key={i} style={{ display: 'block' }}>{w}</span>)}</span>
        </div>
        <div className="between" style={{ position: 'absolute', left: 16, right: 16, top: 20 }}>
          <BackLink href="/events" dark />
          <button type="button" className="chip-dark" aria-label="Share event">{Icon.share}</button>
        </div>
      </div>

      <div className="page" style={{ gap: 30, paddingTop: 26 }}>
        <div className="stack" style={{ gap: 16 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15 }}>{ev.title}</h1>
          <div className="grid2" style={{ gap: 12 }}>
            <div className="stack" style={{ borderTop: '1px solid rgba(var(--rgb),0.16)', paddingTop: 10 }}>
              <span className="muted small">When</span><strong>{ev.date}</strong><span className="soft" style={{ fontSize: 13 }}>{ev.time} till late</span>
            </div>
            <div className="stack" style={{ borderTop: '1px solid rgba(var(--rgb),0.16)', paddingTop: 10 }}>
              <span className="muted small">Where</span><strong>{ev.venue}</strong><a href="#" className="accent" style={{ fontSize: 13 }}>Open in Maps</a>
            </div>
          </div>
        </div>

        <div className="row surface" style={{ padding: 14 }}>
          <span className="av-stack">
            <Avatar initials="AD" color="#D9D2FF" size={30} /><Avatar initials="KU" color="#F2D21B" size={30} /><Avatar initials="TO" color="#8C867E" size={30} />
          </span>
          <span style={{ fontSize: 13, lineHeight: 1.35 }}>
            <strong>Ada, Kunle and 10 others</strong><br /><span className="muted">you follow are going. {ev.going} in total.</span>
          </span>
        </div>

        <div className="stack" style={{ gap: 14 }}>
          <h2 className="disp" style={{ fontSize: 22 }}>Tickets</h2>
          <div className="stack">
            {tiers.map((t) => (
              <div key={t.id} className="row line" style={{ padding: '16px 0' }}>
                <div className="stack" style={{ flex: 1, gap: 3 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{t.name}</span>
                  <span className="muted small">{t.note}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: qty[t.id] ? '#FF5A1F' : 'var(--text)' }}>{naira(t.price)}</span>
                </div>
                <div className="row" style={{ gap: 4 }}>
                  <button type="button" className="icon-btn" style={{ width: 44, height: 44, background: 'var(--surface)', fontSize: 18 }} aria-label={`Remove one ${t.name}`} onClick={() => change(t.id, -1, t.max)}>−</button>
                  <span className="num" style={{ width: 28, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{qty[t.id]}</span>
                  <button type="button" className="icon-btn" style={{ width: 44, height: 44, background: 'var(--surface)', fontSize: 18 }} aria-label={`Add one ${t.name}`} onClick={() => change(t.id, 1, t.max)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <label className="row" style={{ padding: 14, borderRadius: 10, border: `1px solid ${bundle ? '#FF5A1F' : 'rgba(var(--rgb),0.14)'}`, cursor: 'pointer' }}>
            <input type="checkbox" checked={bundle} onChange={() => setBundle(!bundle)} style={{ width: 20, height: 20, accentColor: '#FF5A1F', margin: 0 }} />
            <span className="stack" style={{ flex: 1 }}><strong style={{ fontSize: 14 }}>Add a drink bundle</strong><span className="muted small">2 drinks and water, collect at the bar</span></span>
            <strong>₦2,000</strong>
          </label>
        </div>

        <div className="stack" style={{ gap: 14 }}>
          <h2 className="disp" style={{ fontSize: 22 }}>Hosted by</h2>
          <div className="row" style={{ gap: 14 }}>
            <span style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--paper)', color: '#0F0E0D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--paper-shadow)' }}>
              <span className="fly" style={{ fontSize: 20 }}>{ev.host.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
            </span>
            <span className="stack" style={{ flex: 1 }}>
              <strong style={{ fontSize: 15 }}>{ev.host}</strong>
              <span className="muted small">Verified host. 14 events, 3,900 tickets sold.</span>
            </span>
            <button type="button" className="btn btn-ghost btn-sm">Follow</button>
          </div>
        </div>

        <div className="stack" style={{ gap: 14 }}>
          <h2 className="disp" style={{ fontSize: 22 }}>Before you buy</h2>
          <div className="grid2" style={{ gap: '18px 14px' }}>
            {[
              ['Cancelled event', 'Full refund, automatically, within 48 hours.'],
              ["Can't make it", 'Resell on Pullup up to 2 hours before doors.'],
              ['At the gate', 'Show your code. Works offline.'],
              ['Fees', '3% + ₦50 per ticket. Already in your total.'],
            ].map(([t, d]) => (
              <div key={t} className="stack" style={{ gap: 4 }}><strong style={{ fontSize: 13 }}>{t}</strong><span className="muted small" style={{ lineHeight: 1.45 }}>{d}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bar">
        <div className="between" style={{ alignItems: 'baseline' }}>
          <span className="muted" style={{ fontSize: 13 }}>{count === 0 ? 'No tickets yet' : `${count} ${count === 1 ? 'ticket' : 'tickets'}, fees included`}</span>
          <span className="num" style={{ fontSize: 20, fontWeight: 700 }}>{naira(total)}</span>
        </div>
        <div className="grid2">
          <Link href={`/events/${ev.slug}/squad`} className="btn btn-ghost btn-lg">Start a squad</Link>
          <Link href="/tickets" className="btn btn-accent btn-lg">Get tickets</Link>
        </div>
      </div>
    </main>
  );
}
