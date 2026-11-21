import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const STORAGE_KEY = 'goldenline-theme';

/** How long the palette cross-fade runs for (matches .theme-transition). */
const FADE_MS = 260;

const readTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Light/dark switch as a plain cross-fade: the theme flips at once and a
 * short-lived `theme-transition` class on <html> lets every surface and every
 * piece of type ease into its new colour over a single 260ms ease.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);
  const timer = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = theme === 'dark' ? 'light' : 'dark';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setTheme(next);
      return;
    }

    // Arm the colour transitions, then flip the palette in the same frame: the
    // browser reads both changes at once, so every element starts its fade from
    // the colour that is currently on screen.
    root.classList.add('theme-transition');
    setTheme(next);

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, FADE_MS + 80);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === 'dark'}
      className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:bg-paper"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="grid place-items-center"
      >
        {theme === 'dark' ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
