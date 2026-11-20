import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import BrandRail from './BrandRail';
import ThemeToggle from './ThemeToggle';
import FilterBar from './FilterBar';
import { compareHash } from '../lib/hash';

export default function SiteHeader({
  browsing = false,
  back = false,
  brandId,
  onBrand,
  query = '',
  onQuery,
  filters = { body: null, fuel: null },
  onToggle,
  onClear,
  resultCount = 0,
  activeFilters = false,
  compareCount = 0,
}) {
  const [hidden, setHidden] = useState(false);
  const [lifted, setLifted] = useState(false);
  const lastY = useRef(0);

  // The bar travels with the page: it slides up out of the way as you read
  // downwards and comes back the moment you turn around, so a short flick
  // upwards brings the navigation back without going anywhere.
  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;

      setLifted(y > 8);

      if (y <= 96) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      if (Math.abs(delta) > 4 || y <= 96) lastY.current = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      onFocus={() => setHidden(false)}
      className={`sticky top-0 z-40 w-full px-2 pt-2 transition-transform duration-300 ease-out will-change-transform sm:px-3 sm:pt-3 ${
        hidden ? '-translate-y-[140%]' : 'translate-y-0'
      }`}
    >
      <div
        className={`glass-bar mx-auto w-full max-w-[1500px] rounded-[22px] px-3 transition-shadow duration-300 sm:px-5 ${
          lifted ? 'is-lifted' : ''
        }`}
      >
        <div className="w-full">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            {back && (
              <a
                href="#/showroom"
                aria-label="Back to the showroom"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </a>
            )}
            <a
              href="#/showroom"
              className="truncate font-brand text-[26px] leading-none text-ink sm:text-[36px] lg:text-[40px]"
            >
              Goldenline<span className="text-gold">.</span>
            </a>
          </div>

          <nav className="flex shrink-0 items-center gap-1 text-[15px] sm:text-[16px]">
            <a
              href="#/"
              className="rounded-chip px-3 py-1.5 text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              Showcase
            </a>
            <a
              href="#/showroom"
              className="rounded-chip px-3 py-1.5 text-ink transition-colors hover:bg-ink/5"
            >
              Showroom
            </a>
            <a
              href={compareHash()}
              className="rounded-chip px-3 py-1.5 text-ink transition-colors hover:bg-ink/5"
            >
              Compare
              {compareCount > 0 && (
                <span className="ml-1.5 text-ink">{compareCount}</span>
              )}
            </a>
            <ThemeToggle />
          </nav>
        </div>

        {browsing && (
          <div className="-mt-1 border-t border-line pt-1 pb-1">
            <BrandRail brandId={brandId} onBrand={onBrand} />
          </div>
        )}

        {browsing && (
          <div className="pb-3">
            <FilterBar
              query={query}
              onQuery={onQuery}
              filters={filters}
              onToggle={onToggle}
              onClear={onClear}
              resultCount={resultCount}
              activeFilters={activeFilters}
            />
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
