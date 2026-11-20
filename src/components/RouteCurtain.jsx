import { useEffect } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1];

/**
 * The handover between the two halves of the site.
 *
 * Leaving the showcase for the showroom (or coming back) drops a dark panel
 * over the page, swaps the view underneath it, then lifts it away. It is a
 * single 1.3-second gesture: the panel rises from the bottom, holds long enough
 * for the new page to paint, then carries on out of the top.
 */
export default function RouteCurtain({ phase, label }) {
  // Nothing should scroll behind the panel while the page changes underneath.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0b0c]"
      initial={{ y: '100%' }}
      animate={{ y: phase === 'in' ? '0%' : '-100%' }}
      transition={{ duration: phase === 'in' ? 0.58 : 0.74, ease: EASE }}
    >
      <div className="text-center">
        <p className="font-brand text-[20px] leading-none text-[#f4f1ea]/60 sm:text-[22px]">
          Goldenline
        </p>
        <p className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-none italic text-[#f4f1ea]">
          {label}
        </p>
        <motion.span
          className="mx-auto mt-6 block h-px w-16 origin-center bg-[#d4af7a]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
        />
      </div>
    </motion.div>
  );
}
