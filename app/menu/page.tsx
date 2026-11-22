'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/AppProvider';
import { Wordmark, Avatar, Icon } from '@/components/ui';
import { getLocation } from '@/lib/data';

export default function MenuPage() {
  const router = useRouter();
  const { theme, setTheme, location } = useApp();
  const links = [
    { label: 'Explore events', note: getLocation(location).name, href: '/events' },
    { label: 'My tickets', note: '3 upcoming', href: '/tickets' },
    { label: 'Friends', note: '2 new', href: '/friends' },
    { label: 'Following', note: 'Hosts and calendars', href: '/calendar/lagos-builders' },
    { label: 'Find friends', note: '', href: '/friends/find' },
  ];

  return (
    <main className="page" style={{ gap: 22 }}>
      <div className="between" style={{ height: 44 }}>
        <Wordmark />
        <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => router.back()}>{Icon.close}</button>
      </div>
      <Link href="/profile" className="row list-row" style={{ padding: 12, margin: '0 -12px' }}>
        <Avatar initials="BO" color="#FF5A1F" size={44} />
        <span className="stack" style={{ flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Bobo I.</span>
          <span className="muted small">View profile</span>
        </span>
      </Link>
      <nav aria-label="Menu" className="stack">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="menu-link line" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '12px 0' }}>
            <span className="disp" style={{ fontSize: 22, lineHeight: 1.2 }}>{l.label}</span>
            <span className="muted small">{l.note}</span>
          </Link>
        ))}
      </nav>
      <Link href="/host" className="between surface" style={{ padding: 16 }}>
        <span className="stack">
          <span style={{ fontSize: 15, fontWeight: 600 }}>Host an event</span>
          <span className="muted small">Switch to host mode</span>
        </span>
        {Icon.arrow}
      </Link>
      <div className="between">
        <span style={{ fontSize: 13, fontWeight: 600 }}>Appearance</span>
        <div role="radiogroup" aria-label="Appearance" className="seg" style={{ gridTemplateColumns: '1fr 1fr', width: 170 }}>
          {(['dark', 'light'] as const).map((t) => (
            <button key={t} type="button" role="radio" aria-checked={theme === t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)} style={{ height: 36 }}>
              {t === 'dark' ? 'Dark' : 'Light'}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px 20px', flexWrap: 'wrap', fontSize: 13 }}>
        <Link href="/menu" className="muted">Become a promoter</Link>
        <Link href="/menu" className="muted">Help</Link>
        <Link href="/menu" className="muted">Refund policy</Link>
        <Link href="/" className="muted">Log out</Link>
      </div>
    </main>
  );
}
