import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { Check, Heart } from 'lucide-react';

export function CountUp({ value, decimals = 0, duration = 1, className = '' }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [value, duration, reduced]);

  return <span className={className}>{Number(display).toFixed(decimals)}</span>;
}

export function FavoriteButton({ active, onToggle, label, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from saved cars` : `Save ${label}`}
      title={active ? 'Remove from saved cars' : 'Save this car'}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-chip border transition-colors ${
        active
          ? 'border-ink bg-ink text-white'
          : 'border-line bg-white text-ink hover:border-ink/40 hover:bg-paper'
      } ${className}`}
    >
      <Heart size={17} aria-hidden="true" fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}

export function ToggleChip({ active, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`chip ${
        active
          ? 'border-ink bg-ink text-white'
          : 'border-line bg-white text-muted hover:border-ink/30 hover:text-ink'
      } ${className}`}
    >
      {active && <Check size={12} aria-hidden="true" />}
      {children}
    </button>
  );
}

export function SectionTitle({ children, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={`font-display text-[24px] leading-tight tracking-[-0.01em] text-ink ${className}`}>
      {children}
    </Tag>
  );
}
