'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BackLink, Avatar } from '@/components/ui';
import { getEvent, EVENTS } from '@/lib/data';

export default function RsvpPage() {
  const { slug } = useParams<{ slug: string }>();
  const ev = getEvent(slug) ?? EVENTS.find((e) => e.access === 'approval')!;
  const [requested, setRequested] = useState(false);
  const words = ev.title.split(' ').slice(0, 3);

  return (
    <main style={{ paddingBottom: 170 }}>
      <div style={{ position: 'relative', height: 300, background: '#2346FF', color: '#fff', overflow: 'hidden' }}>
        <div className="pulse" style={{ position: 'absolute', right: -60, top: 60, width: 220, height: 220, border: '26px solid #fff', borderRadius: '50%' }} />
        <span className="fly" style={{ position: 'absolute', left: 20, bottom: 22, fontSize: 64 }}>{words.map((w, i) => <span key={i} style={{ display: 'block' }}>{w}</span>)}</span>
        <div style={{ position: 'absolute', left: 16, top: 20 }}><BackLink href="/events" dark /></div>
      </div>

      <div className="page" style={{ gap: 22, paddingTop: 22 }}>
        <div className="stack" style={{ gap: 10 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15 }}>{ev.title}</h1>
          <Link href="/calendar/lagos-builders" className="row" style={{ gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: 6, background: '#2346FF', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>LB</span>
            <span className="muted" style={{ fontSize: 13 }}>Hosted by <strong style={{ color: 'var(--text)' }}>{ev.host}</strong></span>
          </Link>
        </div>
        <div className="grid2" style={{ gap: 12 }}>
          <div className="stack" style={{ borderTop: '1px solid rgba(var(--rgb),0.16)', paddingTop: 10 }}>
            <span className="muted small">When</span><strong>{ev.date}</strong><span className="soft" style={{ fontSize: 13 }}>{ev.time} to 9:00 PM</span>
          </div>
          <div className="stack" style={{ borderTop: '1px solid rgba(var(--rgb),0.16)', paddingTop: 10 }}>
            <span className="muted small">Where</span><strong>{ev.venue}</strong><span className="soft" style={{ fontSize: 13 }}>Shown after approval</span>
          </div>
        </div>
        <div className="between surface" style={{ padding: 14 }}>
          <span className="stack"><strong style={{ fontSize: 14 }}>Free, host approves guests</strong><span className="muted small">{ev.going} of 80 spots taken</span></span>
          <span className="av-stack"><Avatar initials="" color="#D9D2FF" size={28} /><Avatar initials="" color="#F2D21B" size={28} /><Avatar initials="" color="#FF5A1F" size={28} /></span>
        </div>
        <p className="soft" style={{ fontSize: 14, lineHeight: 1.6 }}>[ABOUT THE EVENT: two or three lines from the host on what happens on the night and who it is for.]</p>
        <div className="stack" style={{ gap: 14 }}>
          <h2 className="disp" style={{ fontSize: 20 }}>A few questions from the host</h2>
          <div className="stack" style={{ gap: 6 }}><label htmlFor="q1" className="label">What do you do?</label><input id="q1" className="field" placeholder="e.g. Product designer at a fintech" /></div>
          <div className="stack" style={{ gap: 6 }}><label htmlFor="q2" className="label">Instagram or LinkedIn</label><input id="q2" className="field" placeholder="@yourhandle" /></div>
          <div className="stack" style={{ gap: 6 }}><label htmlFor="q3" className="label">What do you want from tonight?</label><textarea id="q3" rows={3} className="field" placeholder="Meet a co-founder, find a job, just vibes" /></div>
        </div>
      </div>

      <div className="bar">
        {requested ? (
          <>
            <div role="status" className="stack" style={{ gap: 2 }}>
              <strong style={{ fontSize: 15 }}>Request sent</strong>
              <span className="muted" style={{ fontSize: 13 }}>The host reviews requests before the event. Your ticket appears in My tickets once you are in.</span>
            </div>
            <div className="grid2">
              <button type="button" className="btn btn-ghost" onClick={() => setRequested(false)}>Cancel request</button>
              <button type="button" className="btn btn-ghost">Add to calendar</button>
            </div>
          </>
        ) : (
          <button type="button" className="btn btn-accent btn-lg btn-block" onClick={() => setRequested(true)}>Request to join</button>
        )}
      </div>
    </main>
  );
}
