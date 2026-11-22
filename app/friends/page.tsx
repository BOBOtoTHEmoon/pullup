import Link from 'next/link';
import { GuestHeader, Avatar, Flyer } from '@/components/ui';

const u = { textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 600 } as const;

export default function FriendsPage() {
  return (
    <main className="page" style={{ gap: 16 }}>
      <GuestHeader />
      <div className="between">
        <h1 className="disp" style={{ fontSize: 28 }}>Friends</h1>
        <Link href="/friends/find" className="btn btn-ghost btn-sm">Find friends</Link>
      </div>

      <div className="row line" style={{ alignItems: 'flex-start', padding: '14px 0' }}>
        <Avatar initials="AD" color="#D9D2FF" size={38} />
        <div className="stack" style={{ flex: 1, gap: 10 }}>
          <span style={{ lineHeight: 1.45 }}><strong>Ada</strong> started a squad for <Link href="/events/lagoon-front-sundowner" style={u}>Lagoon Front Sundowner</Link>. 2 spots left.</span>
          <div className="row">
            <Link href="/events/lagoon-front-sundowner/squad" className="btn btn-accent btn-sm">Join squad</Link>
            <span className="faint small">₦5,200 each, 8 min ago</span>
          </div>
        </div>
      </div>

      <div className="row line" style={{ padding: '14px 0' }}>
        <Avatar initials="KU" color="#F2D21B" size={38} />
        <span style={{ flex: 1, lineHeight: 1.45 }}><strong>Kunle</strong> got 2 tickets to <Link href="/events/akoka-block-party" style={u}>Akoka Block Party</Link><br /><span className="faint small">24 min ago</span></span>
        <Flyer palette={3} title="" style={{ width: 44, height: 54, flex: 'none', borderRadius: 6 }} />
      </div>

      <div className="row line" style={{ alignItems: 'flex-start', padding: '14px 0' }}>
        <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--paper)', color: '#0F0E0D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', boxShadow: 'var(--paper-shadow)' }}><span className="fly" style={{ fontSize: 15 }}>JH</span></span>
        <div className="stack" style={{ flex: 1, gap: 10 }}>
          <span style={{ lineHeight: 1.45 }}><strong>Jaja Hall SRC</strong> posted 48 photos from Jaja After Dark. You are tagged in 3.</span>
          <div className="grid3" style={{ gap: 6 }}>
            <span style={{ aspectRatio: '1 / 1', borderRadius: 6, background: 'linear-gradient(160deg, #3A2A22, #FF5A1F 140%)' }} />
            <span style={{ aspectRatio: '1 / 1', borderRadius: 6, background: 'linear-gradient(200deg, #2A2140, #1A1816)' }} />
            <span className="surface" style={{ aspectRatio: '1 / 1', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>+45</span>
          </div>
          <span className="faint small">1 hour ago. Photo placeholders.</span>
        </div>
      </div>

      <div className="row line" style={{ padding: '14px 0' }}>
        <span style={{ width: 38, height: 38, borderRadius: 10, background: '#D9D2FF', color: '#2A1B6B', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><span className="fly" style={{ fontSize: 15 }}>MH</span></span>
        <span style={{ flex: 1, lineHeight: 1.45 }}><strong>Moremi Hall</strong> dropped early bird tickets. 120 left at ₦2,500.<br /><span className="faint small">2 hours ago</span></span>
        <Link href="/events/moremi-week-finale" className="btn btn-ghost btn-sm">View</Link>
      </div>

      <div className="row line" style={{ padding: '14px 0' }}>
        <Avatar initials="TL" color="#8C867E" size={38} />
        <span style={{ flex: 1, lineHeight: 1.45 }}><strong>Tolu</strong> and 3 friends are going to <Link href="/events/moremi-week-finale" style={u}>Moremi Week Finale</Link><br /><span className="faint small">Yesterday</span></span>
      </div>
    </main>
  );
}
