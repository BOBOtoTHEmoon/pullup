// Dummy data for the prototype. Replace with real API calls later.

export type LocationId =
  | 'unilag' | 'yabatech' | 'lasu' | 'ui' | 'oau'
  | 'mainland' | 'island' | 'ibadan';

export type Location = {
  id: LocationId;
  kind: 'campus' | 'city';
  name: string;
  area: string;
};

export const LOCATIONS: Location[] = [
  { id: 'unilag', kind: 'campus', name: 'UNILAG', area: 'Akoka' },
  { id: 'yabatech', kind: 'campus', name: 'YABATECH', area: 'Yaba' },
  { id: 'lasu', kind: 'campus', name: 'LASU', area: 'Ojo' },
  { id: 'ui', kind: 'campus', name: 'UI', area: 'Ibadan' },
  { id: 'oau', kind: 'campus', name: 'OAU', area: 'Ile-Ife' },
  { id: 'mainland', kind: 'city', name: 'Lagos Mainland', area: 'Yaba, Ikeja' },
  { id: 'island', kind: 'city', name: 'Island and Lekki', area: 'VI, Ikoyi' },
  { id: 'ibadan', kind: 'city', name: 'Ibadan', area: 'Bodija' },
];

export const getLocation = (id: LocationId) => LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0];
export const atOrIn = (l: Location) => (l.kind === 'campus' ? 'at' : 'in');

// Flyer looks. Each event uses one of these as placeholder art until hosts upload flyers.
export const PALETTES = [
  { bg: '#FF5A1F', fg: '#0F0E0D', shape: '#0F0E0D', radius: '50%', rot: '0deg' },
  { bg: '#D9D2FF', fg: '#2A1B6B', shape: '#2A1B6B', radius: '0', rot: '18deg' },
  { bg: '#0E3B2E', fg: '#F4E9C9', shape: '#F2B33D', radius: '999px 999px 0 0', rot: '0deg' },
  { bg: '#F2D21B', fg: '#0F0E0D', shape: '#0F0E0D', radius: '12px', rot: '-12deg' },
  { bg: '#2346FF', fg: '#FFFFFF', shape: '#FFFFFF', radius: '50%', rot: '0deg' },
];

export type EventItem = {
  slug: string;
  title: string;
  host: string;
  date: string;
  time: string;
  venue: string;
  price: number; // 0 means free
  going: number;
  palette: number;
  location: LocationId;
  access: 'paid' | 'approval';
  soldOut?: boolean;
};

const e = (
  slug: string, title: string, host: string, date: string, time: string,
  venue: string, price: number, going: number, palette: number,
  location: LocationId, access: 'paid' | 'approval' = 'paid',
): EventItem => ({ slug, title, host, date, time, venue, price, going, palette, location, access });

export const EVENTS: EventItem[] = [
  e('jaja-after-dark', 'Jaja After Dark', 'Jaja Hall SRC', 'Fri 28 Nov', '10:00 PM', 'Jaja Hall car park', 3000, 312, 0, 'unilag'),
  e('moremi-week-finale', 'Moremi Week Finale', 'Moremi Hall', 'Sat 29 Nov', '8:00 PM', 'Moremi Hall quad', 2500, 540, 1, 'unilag'),
  e('lagoon-front-sundowner', 'Lagoon Front Sundowner', 'The 400L Set', 'Sun 30 Nov', '4:00 PM', 'Lagoon Front', 5000, 188, 2, 'unilag'),
  e('akoka-block-party', 'Akoka Block Party', 'Block 7 Collective', 'Fri 5 Dec', '9:00 PM', 'Sports Centre', 4000, 426, 3, 'unilag'),
  e('lagos-builders-night', 'Lagos Builders Night', 'Lagos Builders', 'Thu 4 Dec', '6:00 PM', '[VENUE], Yaba', 0, 62, 4, 'unilag', 'approval'),

  e('yabatech-freshers-jam', 'Yabatech Freshers Jam', 'SUG Yabatech', 'Fri 28 Nov', '6:00 PM', 'Yabatech sports complex', 2000, 610, 1, 'yabatech'),
  e('art-school-night', 'Art School Night', 'School of Art', 'Sat 29 Nov', '7:00 PM', 'Art and Design block', 3000, 204, 0, 'yabatech'),
  e('yaba-rooftop-sessions', 'Yaba Rooftop Sessions', 'North Side Crew', 'Sat 6 Dec', '8:00 PM', 'Rooftop, Yaba', 6000, 147, 2, 'yabatech'),
  e('builders-night-yaba', 'Lagos Builders Night', 'Lagos Builders', 'Thu 4 Dec', '6:00 PM', '[VENUE], Yaba', 0, 62, 4, 'yabatech', 'approval'),

  e('lasu-freshers-bash', 'LASU Freshers Bash', 'LASU SU', 'Fri 28 Nov', '7:00 PM', 'LASU sports centre', 2500, 702, 3, 'lasu'),
  e('ojo-beach-sundowner', 'Ojo Beach Sundowner', 'Ojo Coast Club', 'Sun 30 Nov', '3:00 PM', 'Ojo beachfront', 5000, 219, 2, 'lasu'),
  e('senate-car-park-rave', 'Senate Car Park Rave', 'Night Shift', 'Sat 6 Dec', '9:00 PM', 'Senate car park', 3000, 388, 0, 'lasu'),

  e('indy-hall-week', 'Indy Hall Week', 'Independence Hall', 'Sat 29 Nov', '7:00 PM', 'Independence Hall', 2500, 455, 1, 'ui'),
  e('zik-night-live', 'Zik Night Live', 'Zik Hall', 'Fri 5 Dec', '8:00 PM', 'Nnamdi Azikiwe Hall', 3000, 381, 0, 'ui'),
  e('bodija-block-party', 'Bodija Block Party', 'Bodija Collective', 'Sat 6 Dec', '9:00 PM', 'Bodija', 4000, 240, 3, 'ui'),

  e('awo-hall-week', 'Awo Hall Week', 'Awolowo Hall', 'Sat 29 Nov', '7:00 PM', 'Awo Hall', 2000, 498, 1, 'oau'),
  e('amphitheatre-night', 'Amphitheatre Night', 'Great Ife Arts', 'Fri 5 Dec', '7:00 PM', 'Amphitheatre', 3500, 322, 2, 'oau'),
  e('ife-freshers-fest', 'Ife Freshers Fest', 'SU OAU', 'Sat 6 Dec', '4:00 PM', 'Sports complex', 2500, 640, 0, 'oau'),

  e('surulere-day-party', 'Surulere Day Party', 'Sunday Social', 'Sun 30 Nov', '2:00 PM', 'Surulere', 7000, 420, 3, 'mainland'),
  e('ikeja-rooftop-nights', 'Ikeja Rooftop Nights', 'Skyline Crew', 'Sat 6 Dec', '8:00 PM', 'Ikeja GRA', 10000, 265, 1, 'mainland'),
  e('mainland-comedy-live', 'Mainland Comedy Live', 'Laugh Lab', 'Fri 5 Dec', '7:00 PM', 'Ikeja', 8000, 190, 0, 'mainland'),

  e('lekki-beach-sundowner', 'Lekki Beach Sundowner', 'Tides', 'Sun 30 Nov', '4:00 PM', 'Lekki beachfront', 15000, 640, 2, 'island'),
  e('vi-rooftop-sessions', 'VI Rooftop Sessions', 'Skyline Crew', 'Sat 6 Dec', '8:00 PM', 'Victoria Island', 20000, 288, 1, 'island'),
  e('ikoyi-brunch-rave', 'Ikoyi Brunch Rave', 'Sunday Social', 'Sun 7 Dec', '12:00 PM', 'Ikoyi', 12000, 354, 3, 'island'),
  e('founders-dinner', 'Founders Dinner', 'Lagos Builders', 'Thu 8 Jan', '7:00 PM', 'Victoria Island', 0, 40, 4, 'island', 'approval'),

  e('ibadan-day-party', 'Ibadan Day Party', 'Oyo Social', 'Sun 30 Nov', '2:00 PM', 'Bodija', 5000, 330, 3, 'ibadan'),
  e('ring-road-live', 'Ring Road Live', 'Amplify', 'Sat 6 Dec', '7:00 PM', 'Ring Road', 6000, 212, 0, 'ibadan'),
];

// Akoka Block Party is sold out in the demo, so its page shows resale tickets.
EVENTS.find((x) => x.slug === 'akoka-block-party')!.soldOut = true;

export const getEvent = (slug: string) => EVENTS.find((x) => x.slug === slug);
export const eventsFor = (loc: LocationId) => EVENTS.filter((x) => x.location === loc);
export const eventHref = (ev: EventItem) => (ev.access === 'approval' ? `/rsvp/${ev.slug}` : `/events/${ev.slug}`);

export const naira = (n: number) => '₦' + Math.round(n).toLocaleString('en-NG');
export const priceLabel = (ev: EventItem) => (ev.soldOut ? 'Sold out, resale open' : ev.price === 0 ? 'Free, approval' : 'From ' + naira(ev.price));
export const ticketFee = (subtotal: number, count: number) => (count > 0 ? subtotal * 0.03 + 50 * count : 0);

export const TIERS = [
  { id: 'reg', name: 'Regular', note: 'Early bird, 64 left', mult: 1, max: 10 },
  { id: 'vip', name: 'VIP', note: 'Front section and fast lane', mult: 8 / 3, max: 6 },
  { id: 'table', name: 'Table for 6', note: 'Reserved table, 1 bottle', mult: 20, max: 2 },
];

export const FRIEND_COLORS = ['#D9D2FF', '#F2D21B', '#FF5A1F', '#C9C3BA', '#8C867E'];
