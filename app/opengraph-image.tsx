import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Pullup: find the party, pull up with the squad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const font = (weight: number) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/poppins/files/poppins-latin-${weight}-normal.woff`));

// Preview image shown when a Pullup link is shared on WhatsApp, X, iMessage and others.
export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([font(700), font(400)]);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#0F0E0D', color: '#F4F1EC', padding: 72, overflow: 'hidden', fontFamily: 'Poppins' }}>
        <div style={{ position: 'absolute', right: -130, top: -150, width: 440, height: 440, borderRadius: 220, background: '#FF5A1F', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 30, top: 10, width: 120, height: 120, borderRadius: 60, background: '#0F0E0D', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="60" height="60" viewBox="0 0 26 26">
              <rect x="1" y="1" width="24" height="24" rx="5" fill="#FF5A1F" />
              <path d="M8 19V7h6a4 4 0 0 1 0 8H8" fill="none" stroke="#0F0E0D" strokeWidth="2.6" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>Pullup</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 820 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3 }}>
              <span>Find the party.&nbsp;</span>
              <span style={{ color: '#FF5A1F' }}>Pull up&nbsp;</span>
              <span>with the squad.</span>
            </div>
            <span style={{ fontSize: 28, fontWeight: 400, color: '#C9C3BA' }}>Tickets for parties, concerts and meetups. Pay by transfer, split with friends.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: bold, weight: 700, style: 'normal' },
        { name: 'Poppins', data: regular, weight: 400, style: 'normal' },
      ],
    },
  );
}
