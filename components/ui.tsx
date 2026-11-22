import Link from 'next/link';
import { PALETTES, priceLabel, eventHref, type EventItem } from '@/lib/data';

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <rect x="1" y="1" width="24" height="24" rx="5" fill="#FF5A1F" />
      <path d="M8 19V7h6a4 4 0 0 1 0 8H8" fill="none" stroke="#0F0E0D" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="row" style={{ gap: 8 }}>
      <Logo />
      <span className="disp" style={{ fontSize: 18 }}>Pullup</span>
    </Link>
  );
}

export const Icon = {
  back: <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 6h12M3 12h12" stroke="currentColor" strokeWidth="1.8" /></svg>,
  close: <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" /></svg>,
  chevron: <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>,
  arrow: <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>,
  share: <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 12V2M5 6l4-4 4 4M3 10v6h12v-6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>,
  search: <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" /></svg>,
  locate: <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="currentColor" strokeWidth="1.6" /><circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>,
  upload: <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 15V4M6 9l5-5 5 5M3 15v4h16v-4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>,
  check: <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-7.6" fill="none" stroke="currentColor" strokeWidth="2.6" /></svg>,
  bank: <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 8l8-5 8 5M4 8v7M8 8v7M12 8v7M16 8v7M2 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>,
};

export function BackLink({ href, dark = false }: { href: string; dark?: boolean }) {
  return (
    <Link href={href} aria-label="Back" className={dark ? 'chip-dark' : ''}
      style={dark ? undefined : { width: 44, height: 44, marginLeft: -10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {Icon.back}
    </Link>
  );
}

export function MenuButton() {
  return <Link href="/menu" aria-label="Menu" className="icon-btn">{Icon.menu}</Link>;
}

export function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <span className="av" style={{ background: color, width: size, height: size, fontSize: size > 40 ? 14 : 12 }}>
      {initials}
    </span>
  );
}

/** Top header used on the main guest screens. */
export function GuestHeader() {
  return (
    <div className="between" style={{ height: 44 }}>
      <Wordmark />
      <div className="row" style={{ gap: 10 }}>
        <Link href="/profile" aria-label="Profile"><Avatar initials="BO" color="#FF5A1F" size={34} /></Link>
        <MenuButton />
      </div>
    </div>
  );
}

/** Placeholder flyer art until hosts upload their own flyers. */
export function Flyer({ palette, title, size = 30, style }: { palette: number; title: string; size?: number; style?: React.CSSProperties }) {
  const p = PALETTES[palette % PALETTES.length];
  const words = title.split(' ').slice(0, 3);
  const shape = Math.round(size * 3.1);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 10, ...style }}>
      <div className="art" style={{ position: 'absolute', inset: 0, background: p.bg, color: p.fg }}>
        <div style={{ position: 'absolute', right: -shape * 0.25, top: shape * 0.25, width: shape, height: shape, background: p.shape, borderRadius: p.radius, transform: `rotate(${p.rot})` }} />
        <span className="fly" style={{ position: 'absolute', left: 12, bottom: 12, fontSize: size }}>
          {words.map((w, i) => <span key={i} style={{ display: 'block' }}>{w}</span>)}
        </span>
      </div>
    </div>
  );
}

export function EventCard({ ev, ratio = '1 / 1' }: { ev: EventItem; ratio?: string }) {
  return (
    <Link href={eventHref(ev)} className="card">
      <Flyer palette={ev.palette} title={ev.title} style={{ aspectRatio: ratio }} />
      <div className="stack" style={{ gap: 2 }}>
        <span className="accent" style={{ fontSize: 11, fontWeight: 600 }}>{ev.date}, {ev.time}</span>
        <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{ev.title}</span>
        <span className="muted small">{priceLabel(ev)}</span>
      </div>
    </Link>
  );
}

const HOST_TABS = [
  ['Sales', '/host'], ['Orders', '/host/orders'], ['Guests', '/host/guests'],
  ['Gate', '/host/gate'], ['Payouts', '/host/payouts'], ['Tickets', '/host/tickets'],
] as const;

/** Header and tabs for the organizer screens. */
export function HostTop({ active, event = 'Moremi Week Finale' }: { active: string; event?: string }) {
  return (
    <>
      <div className="between">
        <button type="button" className="stack" style={{ height: 44, justifyContent: 'center', alignItems: 'flex-start', background: 'none', border: 0, padding: 0, textAlign: 'left' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#FF5A1F' }}>HOST MODE</span>
          <span className="row" style={{ gap: 6, fontSize: 15, fontWeight: 600 }}>{event} {Icon.chevron}</span>
        </button>
        <div className="row" style={{ gap: 8 }}>
          <Link href="/host/new" className="btn btn-ghost btn-sm">New event</Link>
          <MenuButton />
        </div>
      </div>
      <nav aria-label="Host" className="tabs" style={{ gap: 16, marginTop: -6 }}>
        {HOST_TABS.map(([label, href]) => (
          <Link key={label} href={href} className={label === active ? 'on' : ''} aria-current={label === active ? 'page' : undefined}>{label}</Link>
        ))}
      </nav>
    </>
  );
}
