import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/components/AppProvider';

const description = 'Tickets for parties, concerts and meetups near you. Pay by transfer, split the cost with friends, and get in with one scan.';

export const metadata: Metadata = {
  title: { default: 'Pullup: find the party', template: '%s | Pullup' },
  description,
  applicationName: 'Pullup',
  openGraph: {
    type: 'website',
    siteName: 'Pullup',
    title: 'Pullup: find the party, pull up with the squad',
    description,
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pullup: find the party, pull up with the squad',
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0e0d',
};

// Applies the saved theme before the page paints, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('pullup-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Poppins:wght@400;500;600;700;800&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppProvider>
          <div className="app">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
