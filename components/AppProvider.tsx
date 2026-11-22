'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LOCATIONS, type LocationId } from '@/lib/data';

type Theme = 'dark' | 'light';

type AppState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  location: LocationId;
  setLocation: (l: LocationId) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [location, setLocationState] = useState<LocationId>('unilag');

  useEffect(() => {
    try {
      const t = localStorage.getItem('pullup-theme') as Theme | null;
      if (t === 'dark' || t === 'light') setThemeState(t);
      const l = localStorage.getItem('pullup-location') as LocationId | null;
      if (l && LOCATIONS.some((x) => x.id === l)) setLocationState(l);
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('pullup-theme', t); } catch {}
  };

  const setLocation = (l: LocationId) => {
    setLocationState(l);
    try { localStorage.setItem('pullup-location', l); } catch {}
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, location, setLocation }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
