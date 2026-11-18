import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'goldenline-theme';
const LIGHT_BG = '#ffffff';
const DARK_BG = '#0d0f11';

/** Fractions of the 900ms veil animation: opaque for the swap, clear at the end. */
const SWAP_AT = 440;
const VEIL_DURATION = 900;

const readTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Light/dark switch with a fading handover: a full-screen veil in the colour
 * of the theme you are heading to fades in over the whole page, the theme
 * flips while the page is covered, then the veil fades away to reveal the new
 * palette. Going dark reads as the page sinking from white to black, going
 * light as it lifting back out.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);
  const [veil, setVeil] = useState(null);
  const timers = useRef([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        setTheme(next);
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

      setVeil({ key: Date.now(), color: next === 'dark' ? DARK_BG : LIGHT_BG, origin });
      timers.current.push(window.setTimeout(() => setTheme(next), SWAP_AT));
      timers.current.push(window.setTimeout(() => setVeil(null), VEIL_DURATION));
    },
    [theme],
  );

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        aria-pressed={theme === 'dark'}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
      >
        {theme === 'dark' ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )}
      </button>

      {veil && (
        <span
          key={veil.key}
          aria-hidden="true"
          className="theme-veil pointer-events-none fixed inset-0 z-[100]"
          style={{
            backgroundColor: veil.color,
            transformOrigin: `${veil.origin.x}px ${veil.origin.y}px`,
          }}
        />
      )}
    </>
  );
}
