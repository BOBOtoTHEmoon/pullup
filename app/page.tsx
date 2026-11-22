import Link from 'next/link';
import { Wordmark, MenuButton, EventCard, Icon } from '@/components/ui';
import { getEvent, type EventItem } from '@/lib/data';

const TRENDING = ['jaja-after-dark', 'yabatech-freshers-jam', 'lekki-beach-sundowner', 'lasu-freshers-bash']
  .map((s) => getEvent(s))
  .filter(Boolean) as EventItem[];

const BENEFITS = [
  ['Pay by transfer', 'OPay, Moniepoint or any bank. Confirms in seconds.'],
  ['Split with friends', 'One link. Everyone pays their own share.'],
  ['Refund if cancelled', 'Your money waits until the event happens.'],
  ['No scam resale', 'Resell on Pullup. Old codes stop working.'],
];

const HOST_FEATURES = [
  ['Paid or free', 'Tickets, RSVPs, approvals'],
  ['Promoter codes', 'Commission per promoter'],
  ['Tables and add-ons', 'VIP, bottles, more'],
  ['Your own calendar', 'Followers get every event'],
  ['Gate app', 'Any phone, offline'],
  ['Next-day payout', 'To your account'],
];

export default function Home() {
  return (
    <main>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '20px 20px 56px' }} className="stack">
        <div className="beams" aria-hidden="true">
          <div className="beam-wrap" style={{ left: -60 }}><div className="beam a" /></div>
          <div className="beam-wrap" style={{ right: -80 }}><div className="beam b" /></div>
        </div>
        <div className="between" style={{ position: 'relative', height: 44 }}>
          <Wordmark />
          <div className="row" style={{ gap: 8 }}>
            <Link href="/profile" style={{ fontSize: 13, fontWeight: 600, padding: '0 10px' }}>Log in</Link>
            <MenuButton />
          </div>
        </div>
        <div className="stack" style={{ position: 'relative', gap: 16, paddingTop: 36 }}>
          <h1 className="disp" style={{ fontSize: 42, lineHeight: 1.04, textWrap: 'balance' }}>
            Find the party. <span className="accent">Pull up</span> with the squad.
          </h1>
          <p className="soft" style={{ fontSize: 15, lineHeight: 1.6 }}>
            Tickets for parties, concerts and meetups near you. Pay by transfer, split the cost with friends, and get in with one scan.
          </p>
        </div>
        <div className="stack" style={{ position: 'relative', gap: 10, marginTop: 26 }}>
          <Link href="/location" className="btn btn-accent btn-lg btn-block">Explore events {Icon.arrow}</Link>
          <Link href="/host/new" className="btn btn-ghost btn-lg btn-block">List your event</Link>
        </div>
      </section>

      <section className="stack" style={{ padding: '0 20px 72px', gap: 18 }}>
        <div className="between" style={{ alignItems: 'baseline' }}>
          <h2 className="disp" style={{ fontSize: 24 }}>Trending this week</h2>
          <Link href="/location" className="muted" style={{ fontSize: 13, fontWeight: 600 }}>See all</Link>
        </div>
        <div className="grid2" style={{ gap: '18px 12px' }}>
          {TRENDING.map((ev) => <EventCard key={ev.slug} ev={ev} ratio="4 / 5" />)}
        </div>
      </section>

      <section className="stack" style={{ padding: '0 20px 80px', gap: 22 }}>
        <h2 className="disp" style={{ fontSize: 30, lineHeight: 1.08 }}>Built for how people actually go out.</h2>
        <div className="grid2" style={{ gap: '22px 16px' }}>
          {BENEFITS.map(([t, d]) => (
            <div key={t} className="stack" style={{ gap: 6, borderTop: '2px solid #FF5A1F', paddingTop: 12 }}>
              <strong style={{ fontSize: 14 }}>{t}</strong>
              <span className="muted small" style={{ lineHeight: 1.5 }}>{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stack" style={{ background: '#F4F1EC', color: '#0F0E0D', padding: '64px 20px', gap: 22 }}>
        <h2 className="disp" style={{ fontSize: 36, lineHeight: 1.04 }}>Sell out your next event.</h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4A453F' }}>
          Sell tickets, tables and add-ons, or run a free RSVP where you approve every guest. Give each promoter a code and see who is actually selling.
        </p>
        <div className="grid2" style={{ gap: '18px 16px' }}>
          {HOST_FEATURES.map(([t, d]) => (
            <div key={t} className="stack" style={{ gap: 4, borderTop: '2px solid #0F0E0D', paddingTop: 10 }}>
              <strong style={{ fontSize: 13 }}>{t}</strong>
              <span style={{ fontSize: 12, color: '#5B564F' }}>{d}</span>
            </div>
          ))}
        </div>
        <Link href="/host/new" className="btn btn-ink btn-lg btn-block">List your event</Link>
        <span style={{ fontSize: 12, color: '#4A453F', textAlign: 'center' }}>
          <strong style={{ color: '#0F0E0D' }}>Free to list.</strong> 3% + ₦50 per paid ticket, shown upfront.
        </span>
      </section>

      <footer className="stack" style={{ padding: '44px 20px 40px', alignItems: 'center', gap: 16, textAlign: 'center' }}>
        <span className="disp" style={{ fontSize: 20 }}>Pullup</span>
        <nav aria-label="Footer" style={{ display: 'flex', gap: '8px 20px', flexWrap: 'wrap', justifyContent: 'center', fontSize: 13 }}>
          <Link href="/location" className="muted">Explore</Link>
          <Link href="/host" className="muted">Organizers</Link>
          <Link href="/menu" className="muted">Become a promoter</Link>
          <Link href="/menu" className="muted">Refunds</Link>
          <Link href="/menu" className="muted">Help</Link>
        </nav>
        <span className="faint small">© 2026 Pullup. Made in Akoka.</span>
      </footer>
    </main>
  );
}
