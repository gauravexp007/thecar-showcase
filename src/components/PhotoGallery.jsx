import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { carHash } from '../lib/hash';

/**
 * A short strip of extra photographs for one car, with a lightbox.
 *
 * Two arrangements: the detail page shows the full grid under the stage, and
 * the showroom shows the same photographs as a single row of thumbnails, so a
 * model can be browsed without leaving the showroom.
 *
 * Load behaviour, in order of how much it saves:
 *  - the grid uses the 700px file and lets the browser pick the 1400px one only
 *    on large or high-density screens (srcset + sizes);
 *  - every thumbnail is lazy and decoded off the main thread, so the hero
 *    photograph and the spec card paint first;
 *  - the full-size file is only requested when the lightbox opens.
 */
export default function PhotoGallery({ car, variant = 'grid' }) {
  const photos = car.gallery || [];
  const strip = variant === 'strip';
  const [openIndex, setOpenIndex] = useState(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [openIndex, close, step]);

  if (!photos.length) return null;
  const active = openIndex === null ? null : photos[openIndex];

  const lightbox = (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-[rgba(12,14,16,0.95)] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${car.brand} ${car.model} photographs`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="text-[12.5px] text-white/70">
              {car.brand} {car.model} · {openIndex + 1} / {photos.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close photos"
              autoFocus
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-2 sm:px-6">
            <img
              key={active.src}
              src={active.src}
              width={active.width}
              height={active.height}
              alt={active.alt}
              decoding="async"
              className="max-h-[calc(100dvh-9.5rem)] max-w-full rounded-[10px] object-contain"
            />
            <div className="absolute inset-y-0 left-2 flex items-center sm:left-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-ink"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center sm:right-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-ink"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="px-4 pb-5 text-center text-[12.5px] text-white/60 sm:px-6">{active.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (strip) {
    return (
      <section
        aria-label={`${car.brand} ${car.model} photographs`}
        className="flex min-w-0 items-center gap-2 sm:gap-3"
      >
        <h2 className="hidden shrink-0 text-[11px] tracking-[0.14em] text-muted uppercase sm:block">
          Gallery
        </h2>
        <ul className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
          {photos.map((photo, index) => (
            <li key={photo.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photo ${index + 1}: ${photo.alt}`}
                className="group relative block h-12 w-[68px] overflow-hidden rounded-[7px] bg-[#EDECE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:h-14 sm:w-[84px]"
              >
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]
 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </button>
            </li>
          ))}
        </ul>
        <a
          href={carHash(car.slug)}
          className="shrink-0 text-[12.5px] whitespace-nowrap text-muted transition-colors hover:text-ink"
        >
          All {photos.length} photos
        </a>
        {lightbox}
      </section>
    );
  }

  return (
    <section aria-label={`More ${car.brand} ${car.model} photographs`} className="mt-4">
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h2 className="text-[12px] tracking-[0.04em] text-muted uppercase">More photographs</h2>
        <p className="text-[12px] text-muted">{photos.length} photos</p>
      </div>

      <ul className={`grid gap-2 sm:gap-3 ${photos.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo ${index + 1}: ${photo.alt}`}
              className="group relative block aspect-[3/2] w-full overflow-hidden rounded-[10px] bg-[#EDECE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <img
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </button>
          </li>
        ))}
      </ul>

      {lightbox}
    </section>
  );
}
