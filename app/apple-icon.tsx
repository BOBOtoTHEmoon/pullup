import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Home-screen icon for iPhones when someone adds Pullup to their home screen.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF5A1F' }}>
        <svg width="120" height="120" viewBox="0 0 26 26">
          <path d="M8 19V7h6a4 4 0 0 1 0 8H8" fill="none" stroke="#0F0E0D" strokeWidth="2.6" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
