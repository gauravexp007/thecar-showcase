import { useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ACTIVE_STAGE, STAGE_RENDERERS } from './stage';
import { accel100 } from '../lib/format';

const EASE = [0.22, 0.61, 0.24, 1];

/**
 * The stage: a 16:9 card inset from the page edges with rounded corners. The
 * renderer crops the photograph to fill it while keeping the car centred, and
 * the model name sits in the bottom-left corner in Lemon Milk.
 */
export default function CarStage({
  car,
  direction = 1,
  variant = 'browse',
  loading = false,
  onStep,
  onImageError,
  priority = false,
  className = '',
  paintKey,
}) {
  const reduced = useReducedMotion();
  const pointer = useRef(null);
  // The paint is chosen outside the stage and handed in; without a choice the
  // car shows the colour it was photographed in.
  const colors = car.colors || [];
  const paint = colors.find((color) => color.key === paintKey) || colors[0] || {};
  const paintFilter = paint.filter || 'none';
  const paintImage = paint.image || car.image;
  const Renderer = STAGE_RENDERERS[ACTIVE_STAGE];
  const isDetail = variant === 'detail';
  // Long model names ("Macan Electric", "Continental GT") need a smaller face
  // to sit beside the 0–100 badge instead of running through it.
  const longName = car.model.length > 10;
  const titleSize = isDetail
    ? longName
      ? 'text-[clamp(1.25rem,2.6vw,2.4rem)]'
      : 'text-[clamp(1.5rem,3.6vw,3.2rem)]'
    : longName
      ? 'text-[clamp(1.3rem,3.9vw,3.5rem)]'
      : 'text-[clamp(1.55rem,5.4vw,4.8rem)]';

  // The showcase is always 16:9, so every car lands in the same frame. Wide
  // photographs are cropped at the sides and tall ones top and bottom, with
  // the car held in place by its own focus point.
  const frameRatio = 16 / 9;

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse') return;
    if (event.target.closest?.('button, a, input, select, textarea')) return;
    pointer.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || !onStep) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) onStep(dx < 0 ? 1 : -1);
  };

  return (
    <section
      className={`relative w-full ${
        isDetail ? '' : 'mx-auto max-w-[1240px] px-3 sm:px-6 lg:px-8'
      } ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div
        className="relative w-full overflow-hidden rounded-panel bg-[#EDECE8]"
        style={{
          width: '100%',
          aspectRatio: String(frameRatio),
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={car.slug}
            className="absolute inset-0"
            initial={reduced ? { opacity: 0 } : { x: `${direction * 34}%`, opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={
              reduced
                ? { opacity: 0, transition: { duration: 0.25 } }
                : { x: `${-direction * 34}%`, opacity: 0, transition: { duration: 0.45, ease: 'easeIn' } }
            }
            transition={{
              x: { duration: reduced ? 0.2 : 0.7, ease: EASE },
              opacity: { duration: reduced ? 0.2 : 0.5, ease: 'easeOut' },
            }}
          >
            <Renderer
              car={car}
              priority={priority}
              onImageError={onImageError}
              image={paintImage}
              focus={paint.focus}
              filter={paintFilter}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/65 via-black/15 to-transparent"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 pb-4 sm:p-7 sm:pb-6 lg:p-10 lg:pb-8">
          <motion.div
            key={`title-${car.slug}`}
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.55, ease: 'easeOut' }}
            className="max-w-[78%]"
          >
            <p className="font-lemon text-[10px] leading-none tracking-[0.18em] text-white/75 uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-[11px]">
              {car.brand} · {car.year}
            </p>
            <div className="mt-2 flex min-w-0 items-end gap-3 sm:gap-5">
              <h1
                className={`min-w-0 font-lemon leading-[0.88] tracking-[-0.01em] text-white uppercase [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] ${titleSize}`}
              >
                {car.model}
              </h1>

              {accel100(car) != null && (
                <p className="mb-1 shrink-0 leading-none [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                  <span className="block text-[10.5px] tracking-[0.18em] text-white/80 uppercase">
                    0–100 km/h
                  </span>
                  <span className="mt-1 block font-display text-[24px] italic text-white sm:text-[30px]">
                    {accel100(car).toFixed(1)}s
                  </span>
                </p>
              )}
            </div>

          </motion.div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {car.brand} {car.model}, {car.year}
        </p>

        {onStep && (
          <div className="absolute right-4 bottom-4 z-20 flex items-center gap-1.5 sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-8">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous model"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-colors hover:bg-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next model"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-colors hover:bg-white"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        {loading && <div className="absolute inset-0 z-30 skeleton" />}
      </div>
    </section>
  );
}
