import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MARQUES } from '../data/marques';
import { browseHash, compareHash } from '../lib/hash';

const EASE = [0.16, 1, 0.3, 1];

const jump = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const pad = (n) => String(n).padStart(2, '0');

/* ---------------------------------------------------------------- fragments */

function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduced ? 0.2 : 0.95, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

function Counter({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setValue(to);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.35 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 bottom-0 z-50 h-[2px] origin-left bg-[#c9a15a]/85"
    />
  );
}

/* --------------------------------------------------------------------- nav */

function ShowcaseNav({ compareCount }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[#f4f1ea]/10 transition-colors duration-500 ${
        solid ? 'sc-nav-solid' : ''
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8">
        <a
          href="#/"
          className="font-brand text-[22px] leading-none text-[#f4f1ea] sm:text-[25px]"
        >
          Goldenline
        </a>

        <nav className="flex items-center gap-5 sm:gap-8">
          <div className="hidden items-center gap-8 md:flex">
            <button type="button" onClick={() => jump('index')} className="sc-kicker hover:text-[#f4f1ea]">
              The index
            </button>
            <button type="button" onClick={() => jump('marques')} className="sc-kicker hover:text-[#f4f1ea]">
              Marques
            </button>
            <button type="button" onClick={() => jump('numbers')} className="sc-kicker hover:text-[#f4f1ea]">
              Numbers
            </button>
          </div>
          <a href={compareHash()} className="sc-kicker hidden hover:text-[#f4f1ea] sm:inline">
            Compare{compareCount > 0 ? ` (${compareCount})` : ''}
          </a>
          <a href={browseHash()} className="sc-btn !h-10 !px-5 !text-[10px] !tracking-[0.26em]">
            Showroom
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------- hero */

/* The opening plate is a wall of the marks themselves: every brand in the
   showcase (plus Audi and Jaguar) stacked vertically, separated by a hairline,
   all of them on screen at once — nothing here is driven by the scroll. Hovering
   a row enlarges that mark in place and lifts a full-size preview into the space
   beside the rail. */

const HERO_QUOTES = [
  'A badge says where a car was built. The car says why.',
  'Fifteen houses, fifteen arguments, each defended for a century.',
  'Speed is easy. Character takes a hundred years.',
  'Some companies sell cars. A few sell a point of view.',
  'Read the house, not the badge.',
  'Every great marque is one stubborn idea, repeated.',
];

/* The wall: the index houses in their order, then the two marks that sit
   outside it. */
const MARKS = [
  { id: 'acura', name: 'Acura', logo: '/logos/si/acura.svg' },
  { id: 'alfa-romeo', name: 'Alfa Romeo', logo: '/logos/si/alfaromeo.svg' },
  { id: 'aston-martin', name: 'Aston Martin', logo: '/logos/aston-martin.webp' },
  { id: 'audi', name: 'Audi', logo: '/logos/audi.webp' },
  { id: 'bentley', name: 'Bentley', logo: '/logos/bentley.webp' },
  { id: 'bmw', name: 'BMW', logo: '/logos/bmw.webp' },
  { id: 'bugatti', name: 'Bugatti', logo: '/logos/bugatti.webp' },
  { id: 'buick', name: 'Buick', logo: '/logos/buick.webp' },
  { id: 'cadillac', name: 'Cadillac', logo: '/logos/si/cadillac.svg' },
  { id: 'chevrolet', name: 'Chevrolet', logo: '/logos/chevrolet.webp' },
  { id: 'citroen', name: 'Citroën', logo: '/logos/si/citroen.svg' },
  { id: 'dodge', name: 'Dodge', logo: '/logos/dodge.webp' },
  { id: 'ferrari', name: 'Ferrari', logo: '/logos/ferrari.webp' },
  { id: 'ford', name: 'Ford', logo: '/logos/ford.webp' },
  { id: 'gmc', name: 'GMC', logo: '/logos/gmc.webp' },
  { id: 'honda', name: 'Honda', logo: '/logos/si/honda.svg' },
  { id: 'hyundai', name: 'Hyundai', logo: '/logos/si/hyundai.svg' },
  { id: 'infiniti', name: 'Infiniti', logo: '/logos/si/infiniti.svg' },
  { id: 'jaguar', name: 'Jaguar', logo: '/logos/jaguar.webp' },
  { id: 'jeep', name: 'Jeep', logo: '/logos/si/jeep.svg' },
  { id: 'kia', name: 'Kia', logo: '/logos/si/kia.svg' },
  { id: 'koenigsegg', name: 'Koenigsegg', logo: '/logos/koenigsegg.webp' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/logos/lamborghini.webp' },
  { id: 'land-rover', name: 'Land Rover', logo: '/logos/si/landrover.svg' },
  { id: 'lexus', name: 'Lexus', logo: '/logos/lexus.webp' },
  { id: 'maserati', name: 'Maserati', logo: '/logos/maserati.webp' },
  { id: 'mazda', name: 'Mazda', logo: '/logos/si/mazda.svg' },
  { id: 'mclaren', name: 'McLaren', logo: '/logos/mclaren.webp' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/logos/si/mercedes.svg' },
  { id: 'mini', name: 'MINI', logo: '/logos/si/mini.svg' },
  { id: 'mitsubishi', name: 'Mitsubishi', logo: '/logos/si/mitsubishi.svg' },
  { id: 'nissan', name: 'Nissan', logo: '/logos/si/nissan.svg' },
  { id: 'opel', name: 'Opel', logo: '/logos/si/opel.svg' },
  { id: 'pagani', name: 'Pagani', logo: '/logos/pagani.webp' },
  { id: 'peugeot', name: 'Peugeot', logo: '/logos/si/peugeot.svg' },
  { id: 'porsche', name: 'Porsche', logo: '/logos/porsche.webp' },
  { id: 'ram', name: 'Ram', logo: '/logos/si/ram.svg' },
  { id: 'renault', name: 'Renault', logo: '/logos/si/renault.svg' },
  { id: 'rolls-royce', name: 'Rolls-Royce', logo: '/logos/rolls-royce.webp' },
  { id: 'subaru', name: 'Subaru', logo: '/logos/si/subaru.svg' },
  { id: 'suzuki', name: 'Suzuki', logo: '/logos/si/suzuki.svg' },
  { id: 'tesla', name: 'Tesla', logo: '/logos/si/tesla.svg' },
  { id: 'toyota', name: 'Toyota', logo: '/logos/si/toyota.svg' },
  { id: 'volkswagen', name: 'Volkswagen', logo: '/logos/si/volkswagen.svg' },
  { id: 'volvo', name: 'Volvo', logo: '/logos/si/volvo.svg' },
];

const MARK_ROWS = (() => {
  const half = Math.ceil(MARKS.length / 2);
  return [MARKS.slice(0, half), MARKS.slice(half)];
})();

function RotatingQuote() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_QUOTES.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-[4.8em] max-w-[620px] overflow-hidden sm:h-[4.2em]">
      <AnimatePresence initial={false}>
        <motion.p
          key={index}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -10 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="sc-serif absolute inset-x-0 top-0 text-[clamp(1.15rem,1.85vw,1.55rem)] leading-[1.5] italic text-[#f4f1ea]/[0.92]"
        >
          “{HERO_QUOTES[index]}”
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-[#050607]"
    >
      <img
        src="/marques/hero-mclaren-570s-rear.avif"
        alt="A silver McLaren 570S from the rear three-quarter, lit in a dark studio"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[64%_50%] sm:object-[50%_50%]"
      />

      {/* Black vignette top and bottom: the picture sinks into the page at both
          edges, and a soft radial keeps the light pooled on the car itself. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[54%] bg-gradient-to-b from-[#050607] from-10% via-[#050607]/60 via-55% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#050607] from-10% via-[#050607]/65 via-55% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(56%_46%_at_52%_54%,rgba(255,255,255,0.08),transparent_72%)]"
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1600px] flex-col px-5 pt-[calc(72px_+_5svh)] pb-6 sm:px-8 sm:pb-8">
        <div className="max-w-[1080px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="sc-kicker"
          >
            Goldenline — the marque index
          </motion.p>

          <h1 className="sc-photo-title sc-serif mt-5 text-[clamp(2.5rem,6.2vw,5.4rem)] leading-[0.95]">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay: 0.2, ease: EASE }}
              >
                The Great Marques.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block italic"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay: 0.32, ease: EASE }}
              >
                Explore them.
              </motion.span>
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-7 sm:mt-auto sm:pt-8"
        >
          <RotatingQuote />
        </motion.div>

        <div className="mt-auto sm:mt-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <button type="button" onClick={() => jump('index')} className="sc-btn sc-btn-glass">
              Start exploring
              <ArrowDown size={14} aria-hidden="true" />
            </button>
            <a
              href={browseHash()}
              className="sc-btn sc-btn-quiet sc-btn-glass [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]"
            >
              Open the showroom
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </motion.div>

          <div className="mt-7 flex items-end justify-between gap-4 border-t border-[#f4f1ea]/15 pt-4">
            <p className="sc-kicker !text-[9.5px] !tracking-[0.22em] !text-[#f4f1ea]/45">
              McLaren 570S — rear three-quarter
            </p>
            <p className="sc-kicker hidden !text-[9.5px] !tracking-[0.22em] !text-[#f4f1ea]/45 sm:block">
              Fifteen houses · thirty cars
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- logo strip */

/* The marks, laid out horizontally under the name band: one row on a wide
   screen, wrapping into a grid on a phone, every cell cut by a hairline.
   Hovering a mark enlarges it and lifts a full-size preview above the strip. */

function LogoStrip() {
  const [active, setActive] = useState(null); // { row, index } — the mark under the cursor

  return (
    <section id="marks" className="border-b border-[#f4f1ea]/10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="sc-kicker">The marks</p>
          <p className="sc-kicker !text-[9.5px] !tracking-[0.22em] !text-[#f4f1ea]/45">
            {MARKS.length} houses — hover to enlarge
          </p>
        </div>

        <div className="mt-10">
          {MARK_ROWS.map((row, rowIndex) => {
            const hoverIndex = active && active.row === rowIndex ? active.index : null;
            const rowMark = hoverIndex === null ? null : row[hoverIndex];

            return (
              <div key={rowIndex} className="relative">
                {/* Dock tooltip: the mark at full size, rising out of its stack. */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-full z-40 hidden w-0 transition-opacity duration-200 md:block ${
                    hoverIndex === null ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    left: `clamp(110px, ${(((hoverIndex ?? 0) + 0.5) / row.length) * 100}%, calc(100% - 110px))`,
                  }}
                >
                  <div className="absolute bottom-4 left-0 -translate-x-1/2">
                    <div
                      className={`flex origin-bottom flex-col items-center gap-2.5 rounded-2xl bg-[#0a0c0e]/90 px-6 py-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)] backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        hoverIndex === null ? 'scale-75' : 'scale-100'
                      }`}
                    >
                      {rowMark && (
                        <>
                          <img
                            src={rowMark.logo}
                            alt=""
                            className="max-h-[56px] w-auto max-w-[150px] object-contain"
                          />
                          <p className="sc-kicker !text-[9px] !tracking-[0.28em]">{rowMark.name}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="mark-row" style={{ '--cols': row.length }}>
                  {row.map((mark, index) => {
                    const distance = hoverIndex === null ? 9 : Math.abs(index - hoverIndex);
                    const scale = distance === 0 ? 1.3 : distance === 1 ? 1.12 : distance === 2 ? 1.03 : 1;
                    const lift = distance === 0 ? -7 : distance === 1 ? -3 : 0;
                    const isActive = (current) =>
                      current && current.row === rowIndex && current.index === index;

                    return (
                      <li
                        key={mark.id}
                        className="mark-cell relative flex h-[76px] items-center justify-center sm:h-[104px]"
                        style={{ zIndex: Math.max(1, 30 - distance) }}
                      >
                        <span aria-hidden="true" className="mark-sep" />
                        <div
                          role="img"
                          tabIndex={0}
                          aria-label={`${mark.name} logo`}
                          onMouseEnter={() => setActive({ row: rowIndex, index })}
                          onMouseLeave={() => setActive((current) => (isActive(current) ? null : current))}
                          onFocus={() => setActive({ row: rowIndex, index })}
                          onBlur={() => setActive((current) => (isActive(current) ? null : current))}
                          className="mark-hit flex h-full w-full items-center justify-center outline-offset-4"
                          style={{
                            transform: `translateY(${lift}px) scale(${scale})`,
                            transitionDelay: `${Math.min(distance, 3) * 20}ms`,
                          }}
                        >
                          <img
                            src={mark.logo}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="max-h-[26px] w-auto max-w-[86%] object-contain transition-opacity duration-200 sm:max-h-[32px]"
                            style={{
                              opacity:
                                hoverIndex === null ? 0.66 : distance === 0 ? 1 : distance <= 2 ? 0.55 : 0.26,
                              filter:
                                distance === 0 ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.95))' : 'none',
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- marquee */

function BrandMarquee() {
  return (
    <div className="overflow-hidden border-y border-[#f4f1ea]/10 py-6">
      <div className="sc-marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {MARQUES.map((marque) => (
              <span key={`${copy}-${marque.id}`} className="flex items-center">
                <span className="font-lemon px-7 text-[clamp(1.3rem,3vw,2.4rem)] tracking-[0.06em] whitespace-nowrap text-[#f4f1ea]/70 uppercase">
                  {marque.name}
                </span>
                <span className="text-[#c9a15a]/60" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- approach */

function Approach() {
  return (
    <section id="approach" className="relative">
      <div className="mx-auto w-full max-w-[1600px] px-5 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="sc-kicker">The approach</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="sc-serif mt-6 max-w-[15ch] text-[clamp(2.3rem,5.4vw,4.4rem)] leading-[0.96] text-[#f7f4ee]">
                Read the <em className="italic">house</em>, not the badge
              </h2>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="sc-body max-w-[540px] !text-[16.5px]">
                A badge tells you where a car was built. It does not tell you why it exists. Each
                house below is here for one idea it has defended for decades — a suspension layout,
                an engine architecture, a way of stitching a seat — and the two cars that make the
                argument best.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 grid max-w-[440px] grid-cols-3 gap-5 border-t border-[#f4f1ea]/15 pt-6">
                {[
                  [String(MARQUES.length), 'Marques'],
                  [String(MARQUES.length * 2), 'Cars'],
                  ['123', 'Years covered'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sc-serif text-[clamp(1.8rem,3.2vw,2.6rem)] leading-none text-[#f7f4ee]">
                      {value}
                    </dt>
                    <dd className="sc-kicker mt-2 !text-[10px] !tracking-[0.24em]">{label}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" onClick={() => jump('index')} className="sc-btn mt-8">
                The full index
                <ArrowDown size={14} aria-hidden="true" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- index */

function Index() {
  return (
    <section id="index" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="sc-kicker">The index</p>
            <h2 className="sc-serif mt-5 max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] text-[#f7f4ee]">
              Fifteen houses, in <em className="italic">order</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sc-kicker max-w-[260px] sm:text-right">
              Pick a name to jump to its chapter. Two screens each.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-[#f4f1ea]/12">
          {MARQUES.map((marque, index) => (
            <Reveal
              key={marque.id}
              delay={index * 0.03}
              y={18}
              as="li"
              className="border-b border-[#f4f1ea]/12"
            >
              <a
                href={`#marque-${marque.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  jump(`marque-${marque.id}`);
                }}
                className="sc-index-row group flex items-center gap-4 py-4 sm:gap-8 sm:py-5"
              >
                <span className="sc-kicker w-8 shrink-0 !text-[9.5px] !tracking-[0.2em]">
                  {pad(index + 1)}
                </span>
                <span
                  className="sc-brand min-w-0 flex-1 truncate text-[#f7f4ee] transition-colors duration-500 group-hover:text-[#d8b478]"
                  style={{ fontSize: 'clamp(1.5rem, 4.4vw, 3.2rem)' }}
                >
                  {marque.name}
                </span>
                <span className="sc-kicker hidden shrink-0 sm:inline">{marque.country}</span>
                <span className="sc-kicker hidden w-14 shrink-0 text-right md:inline">
                  {marque.founded}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[#f4f1ea]/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#f7f4ee]"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- chapter */

/* A brand's mark, drawn as white line art so every house reads the same. */
function BrandMark({ marque, className = '' }) {
  return (
    <img
      src={marque.logo}
      alt={`${marque.name} logo`}
      loading="lazy"
      className={`w-auto object-contain ${className}`}
    />
  );
}

/* One photograph of the house, held whole inside its plate. `object-contain`
   keeps the car complete whatever shape the photograph is; each frame fades up
   and settles just before its turn, so the picture changes on the same beat as
   the words beside it. */
function ChapterFrame({ image, i, count, progress, reduced, priority }) {
  const reveal = useTransform(progress, (value) => {
    const position = value * count;
    if (reduced) return position >= i - 0.5 && position < i + 0.5 ? 1 : 0;
    return Math.min(1, Math.max(0, (position - (i - 0.18)) / 0.18));
  });

  const scale = useTransform(reveal, [0, 1], [1.06, 1]);
  const y = useTransform(reveal, [0, 1], [26, 0]);

  return (
    <motion.div
      style={{ opacity: reveal, scale, y }}
      className="absolute inset-[2.5%] will-change-transform"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-contain"
      />
    </motion.div>
  );
}

/* A frame's own tick: its number, and a hairline that fills exactly as far as
   the scroll has come through that frame. */
function FrameTick({ i, count, progress, active, label, onClick }) {
  const fill = useTransform(progress, (value) => {
    const position = value * count;
    return Math.min(1, Math.max(0, position - i));
  });

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'true' : undefined}
      className="group flex items-center gap-2 py-1.5"
    >
      <span
        className={`font-lemon text-[11px] tracking-[0.1em] transition-colors duration-500 ${
          active ? 'text-[#e8ca90]' : 'text-[#f4f1ea]/40 group-hover:text-[#f4f1ea]/85'
        }`}
      >
        {pad(i + 1)}
      </span>
      <span className="relative block h-[2px] w-8 overflow-hidden bg-[#f4f1ea]/15 sm:w-10">
        <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-[#c9a15a]" />
      </span>
    </button>
  );
}

const CHAPTER_TEXT = {
  enter: { opacity: 0 },
  centre: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE, staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const chapterLine = (reduced) => ({
  enter: { opacity: 0, y: reduced ? 0 : 22 },
  centre: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
});

function MarqueChapter({ marque, index }) {
  const stageRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });
  const count = marque.images.length;
  const [active, setActive] = useState(0);

  /* One frame per stretch of scroll: the picture and the words turn together. */
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setActive((current) => (current === next ? current : next));
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const gotoFrame = (frameIndex) => {
    const el = stageRef.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + ((frameIndex + 0.4) / count) * distance,
      behavior: 'smooth',
    });
  };

  const frame = marque.images[active];

  return (
    <section id={`marque-${marque.id}`} className="relative">
      <div ref={stageRef} className="relative" style={{ height: `${118 + count * 62}svh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 pt-[calc(72px_+_3svh)] pb-6 sm:px-8 sm:pb-8">
          <div className="mx-auto grid w-full max-w-[1560px] items-center gap-7 lg:grid-cols-[minmax(0,1.52fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <div className="sc-plate relative h-[37svh] overflow-hidden border border-[#f4f1ea]/12 sm:h-[45svh] lg:h-[calc(100svh_-_262px)] lg:max-h-[610px]">
                {marque.images.map((item, i) => (
                  <ChapterFrame
                    key={item.src}
                    image={item}
                    i={i}
                    count={count}
                    progress={scrollYProgress}
                    reduced={reduced}
                    priority={i === 0}
                  />
                ))}
              </div>

              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
                <p className="sc-kicker !text-[9.5px] !tracking-[0.22em]">{frame.caption}</p>
                <div className="flex items-center gap-3">
                  {marque.images.map((item, i) => (
                    <FrameTick
                      key={item.src}
                      i={i}
                      count={count}
                      progress={scrollYProgress}
                      active={i === active}
                      label={`Show frame ${i + 1} of ${marque.name}`}
                      onClick={() => gotoFrame(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2 h-px w-full bg-[#f4f1ea]/10">
                <motion.div style={{ scaleX: barScale }} className="h-px origin-left bg-[#c9a15a]/60" />
              </div>
            </div>

            <div className="flex min-w-0 flex-col lg:self-stretch">
              <div className="flex items-end gap-4 border-b border-[#f4f1ea]/12 pb-4">
                <BrandMark
                  marque={marque}
                  className="max-h-6 max-w-[74px] opacity-80 sm:max-h-7 sm:max-w-[90px]"
                />
                <div className="min-w-0">
                  <h2 className="font-lemon truncate text-[clamp(1.75rem,3.05vw,2.7rem)] leading-none tracking-[0.04em] text-[#f9f6f0] uppercase">
                    {marque.name}
                  </h2>
                  <p className="mt-2.5 text-[10.5px] tracking-[0.22em] text-[#f4f1ea]/45 uppercase">
                    Founded {marque.founded}
                    <span className="mx-1.5" aria-hidden="true">
                      /
                    </span>
                    {marque.city}, {marque.country}
                  </p>
                </div>
                <span className="sc-kicker ml-auto hidden shrink-0 !text-[10px] lg:inline">
                  {pad(index + 1)} / {pad(MARQUES.length)}
                </span>
              </div>

              <div className="flex flex-1 items-center py-7">
                <motion.div
                  key={`${marque.id}-${active}`}
                  variants={CHAPTER_TEXT}
                  initial="enter"
                  animate="centre"
                  className="w-full"
                >
                    <motion.p variants={chapterLine(reduced)} className="sc-kicker !text-[10px]">
                      {marque.tagline}
                    </motion.p>
                    <motion.h3
                      variants={chapterLine(reduced)}
                      className="sc-serif mt-3 text-[clamp(1.95rem,3.3vw,3rem)] leading-[1.03] text-[#f7f4ee]"
                    >
                      {frame.title}
                    </motion.h3>
                    <motion.p
                      variants={chapterLine(reduced)}
                      className="sc-body mt-3 max-w-[480px] !text-[clamp(0.98rem,1.06vw,1.12rem)] !leading-[1.72]"
                    >
                      {frame.note}
                    </motion.p>
                </motion.div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#f4f1ea]/12 pt-4">
                <p className="font-lemon text-[13px] tracking-[0.12em] text-[#f4f1ea]/75">
                  {pad(active + 1)}
                  <span className="mx-1.5 text-[#f4f1ea]/30">/</span>
                  {pad(count)}
                </p>
                <p className="sc-kicker !text-[9.5px] !tracking-[0.22em]">Scroll — one frame at a time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[820px] px-5 pt-10 pb-24 text-center sm:px-8 sm:pb-32">
        <Reveal>
          <p className="sc-body text-[clamp(1.08rem,1.55vw,1.26rem)] !leading-[1.75] !text-[#eae6de]">
            {marque.intro}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[#f4f1ea]/12 pt-5">
            <span className="sc-kicker !text-[9.5px]">{marque.city}</span>
            <span className="sc-kicker !text-[9.5px]">{marque.country}</span>
            <span className="sc-kicker !text-[9.5px]">Founded {marque.founded}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- deep dive */

function MarqueDetail({ marque, index }) {
  return (
    <section className="px-5 pt-20 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <div className="sc-plate relative h-[40svh] overflow-hidden border border-[#f4f1ea]/12 sm:h-[52svh]">
            <img
              src={marque.images[1].src}
              alt={marque.images[1].alt}
              loading="lazy"
              className="h-full w-full object-contain p-[2%]"
            />
          </div>
          <p className="sc-kicker mt-3 !text-[9.5px] !tracking-[0.22em]">
            {marque.images[1].caption}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="sc-kicker">
                What makes a {marque.name}
              </p>
              <h3
                className="sc-brand mt-4 text-[#f7f4ee]"
                style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2.1rem)' }}
              >
                {marque.name}
              </h3>
            </Reveal>

            <ol className="mt-9 border-t border-[#f4f1ea]/12">
              {marque.features.map((feature, featureIndex) => (
                <Reveal key={feature.title} delay={featureIndex * 0.05} as="li">
                  <div className="border-b border-[#f4f1ea]/12 py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="sc-kicker !text-[9px] !tracking-[0.2em]">
                        {pad(featureIndex + 1)}
                      </span>
                      <h4 className="sc-serif text-[clamp(1.15rem,2vw,1.5rem)] leading-tight text-[#f7f4ee]">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="sc-body mt-2.5 max-w-[460px] pl-8 !text-[13.5px] !leading-[1.7]">
                      {feature.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <p className="sc-kicker">The two cars that prove it</p>
            </Reveal>
            {marque.models.map((model, modelIndex) => (
              <Reveal key={model.name} delay={0.06 + modelIndex * 0.06}>
                <article className="mt-8 border-t border-[#f4f1ea]/12 pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h4 className="sc-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] text-[#f7f4ee]">
                      {model.name}
                    </h4>
                    <p className="sc-kicker">{model.sub}</p>
                  </div>

                  <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                    {[
                      [model.power, 'Power'],
                      [model.sprint, marque.sprintLabel],
                      [model.top, 'Top speed'],
                      [model.price, 'Price'],
                    ].map(([value, label]) => (
                      <div key={label}>
                        <dt className="sc-serif text-[clamp(1.25rem,2.2vw,1.8rem)] leading-none text-[#f7f4ee]">
                          {value}
                        </dt>
                        <dd className="sc-kicker mt-2 !text-[8.5px] !tracking-[0.2em]">{label}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="sc-body mt-6 max-w-[560px] !text-[13.5px]">{model.note}</p>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <a href={browseHash()} className="sc-btn mt-10">
                See the {marque.name} in the showroom
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- numbers */

const FIGURES = [
  { value: MARQUES.length, label: 'Marques' },
  { value: MARQUES.length * 2, label: 'Cars, two each' },
  { value: 2300, label: 'Most power, hp' },
  { value: 330, label: 'Top speed, mph' },
  { value: 9500, label: 'Highest redline, rpm' },
  { value: 1903, label: 'Oldest house' },
];

function Numbers() {
  return (
    <section id="numbers" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="sc-kicker">The figures</p>
            <h2 className="sc-serif mt-5 text-[clamp(2.3rem,5vw,4rem)] leading-[0.98] text-[#f7f4ee]">
              By the <em className="italic">numbers</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sc-kicker max-w-[300px] sm:text-right">
              Manufacturer figures for the current generation of each car. Where a maker quotes two,
              the higher one is used.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[#f4f1ea]/12 pt-12 sm:grid-cols-3 lg:grid-cols-6">
          {FIGURES.map((figure, index) => (
            <Reveal key={figure.label} delay={index * 0.05}>
              <dt className="sc-serif text-[clamp(2.1rem,4.2vw,3.2rem)] leading-none text-[#f7f4ee]">
                <Counter to={figure.value} />
              </dt>
              <dd className="sc-kicker mt-3 !text-[9px] !tracking-[0.22em]">{figure.label}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1}>
          <p className="sc-body mt-14 max-w-[660px]">
            The spread is the point. A Rolls-Royce Phantom makes 563 hp and weighs almost three
            tonnes; a Koenigsegg Gemera makes 2,300 hp and seats four. Both are the best answer their
            house knows how to give — which is why reading the marque matters more than reading the
            numbers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- closing */

function Closing() {
  return (
    <section className="relative overflow-hidden px-5 py-32 sm:px-8 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[420px] -translate-y-1/2 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(201,161,90,0.12),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-[900px] text-center">
        <Reveal>
          <p className="sc-kicker">Where next</p>
        </Reveal>
        <Reveal delay={0.07}>
          <h2 className="sc-serif mt-6 text-[clamp(2.4rem,6.2vw,5rem)] leading-[0.96] text-[#f7f4ee]">
            Fifteen houses.
            <br />
            <em className="italic">One place</em> to read them.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="sc-body mx-auto mt-7 max-w-[560px] !text-[16.5px]">
            The showroom keeps every figure, every colour and every detail shot — and you can put up
            to three cars side by side.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={browseHash()} className="sc-btn">
              Enter the showroom
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={compareHash()} className="sc-btn sc-btn-quiet">
              Compare cars
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ShowcaseFooter() {
  return (
    <footer className="border-t border-[#f4f1ea]/12 px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-brand text-[22px] leading-none text-[#f4f1ea]">Goldenline</p>
          <p className="mt-4 max-w-[460px] text-[12px] leading-relaxed text-[#f4f1ea]/45">
            Figures are manufacturer press data for the current generation of each car, rounded the
            way the maker publishes them. Prices are starting figures before options and local
            taxes, where a maker publishes one at all. A photograph can show a different trim to the
            figures listed.
          </p>
        </div>
        <div className="max-w-[380px] sm:text-right">
          <p className="text-[12px] leading-relaxed text-[#f4f1ea]/45">
            Photography from Wikimedia Commons contributors and manufacturer press images, resized
            and re-encoded for this layout and used here for an editorial demo. Every car, name, badge
            and image belongs to its manufacturer.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="sc-kicker mt-6 inline-flex items-center gap-2 hover:text-[#f4f1ea]"
          >
            Back to top
            <ArrowUpRight size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------- page */

export default function ShowcaseView({ compareCount = 0 }) {
  return (
    <div className="sc-root relative min-h-[100svh]">
      <ScrollProgress />
      <ShowcaseNav compareCount={compareCount} />
      <main>
        <Hero />
        <BrandMarquee />
        <LogoStrip />
        <Approach />
        <Index />
        <div id="marques">
          {MARQUES.map((marque, index) => (
            <div key={marque.id}>
              <MarqueChapter marque={marque} index={index} />
              <MarqueDetail marque={marque} index={index} />
            </div>
          ))}
        </div>
        <Numbers />
        <Closing />
      </main>
      <ShowcaseFooter />
    </div>
  );
}
