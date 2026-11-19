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

/* Ballpark Lemon Milk Bold advance is about 0.68em per capital, so a size
   derived from the character count keeps every name on one line at ~90vw. */
const brandSize = (name) => {
  const letters = name.replace(/[^A-Za-z]/g, '').length;
  const vw = Math.min(14, 84 / (letters * 0.78));
  return `clamp(2.1rem, ${vw.toFixed(2)}vw, 9.5rem)`;
};

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
          className="font-lemon text-[12px] tracking-[0.36em] text-[#f4f1ea] uppercase sm:text-[13px]"
        >
          goldenline
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

/* The five cars that stand in the opening lineup, left to right. */
const HERO_CARS = [
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    founded: '1904',
    src: '/marques/rolls-1.webp',
    logo: '/logos/rolls-royce.png',
    alt: 'A pale blue Rolls-Royce Spectre in a studio',
  },
  {
    id: 'bentley',
    name: 'Bentley',
    founded: '1919',
    src: '/marques/bentley-1.webp',
    logo: '/logos/bentley.png',
    alt: 'A green Bentley Continental GT',
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    founded: '1913',
    src: '/marques/aston-1.webp',
    logo: '/logos/aston-martin.png',
    alt: 'A silver Aston Martin Vanquish',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    founded: '1939',
    src: '/marques/ferrari-1.webp',
    logo: '/logos/ferrari.png',
    alt: 'A white Ferrari 12Cilindri',
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    founded: '1963',
    src: '/marques/lambo-1.webp',
    logo: '/logos/lamborghini.png',
    alt: 'A Lamborghini Revuelto',
  },
];

const HERO_QUOTES = [
  'A badge says where a car was built. The car says why.',
  'Twelve houses, twelve arguments, each defended for a century.',
  'Speed is easy. Character takes a hundred years.',
  'Some companies sell cars. A few sell a point of view.',
  'Read the house, not the badge.',
  'Every great marque is one stubborn idea, repeated.',
];

/* Photographs are left at their own brightness; only the corners fall away. */
function Vignette({ soft = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${
        soft ? 'sc-vignette-soft' : 'sc-vignette'
      }`}
    />
  );
}

function RotatingQuote() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_QUOTES.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto mt-7 h-[4.6em] max-w-[620px] overflow-hidden px-2">
      <AnimatePresence initial={false}>
        <motion.p
          key={index}
          initial={{
            opacity: 0,
            y: reduced ? 0 : 12,
            filter: reduced ? 'blur(0px)' : 'blur(6px)',
          }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            y: reduced ? 0 : -12,
            filter: reduced ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={{ duration: 0.7, ease: EASE }}
          className="sc-serif absolute inset-x-0 top-0 text-[clamp(1.14rem,2.1vw,1.7rem)] leading-[1.5] italic text-[#f4f1ea]/[0.88]"
        >
          {HERO_QUOTES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* The cars stand in a row on one floor line: they rise into the frame one
   after another, the middle one a little closer to the viewer. */
function HeroLineup({ style }) {
  const reduced = useReducedMotion();

  return (
    <motion.div style={style} className="relative mx-auto w-full max-w-[1180px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 -top-8 -bottom-12 -z-10 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(201,161,90,0.1),transparent_74%)]"
      />

      <div className="no-scrollbar flex snap-x snap-mandatory items-end gap-2.5 overflow-x-auto pb-1 sm:gap-3.5 md:justify-center md:overflow-visible">
        {HERO_CARS.map((car, i) => {
          const mid = i === Math.floor(HERO_CARS.length / 2);
          return (
            <motion.figure
              key={car.id}
              initial={{ opacity: 0, y: reduced ? 0 : 64, scale: reduced ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: reduced ? 0.3 : 1.1,
                delay: reduced ? 0 : 0.5 + i * 0.12,
                ease: EASE,
              }}
              className={`group flex w-[45%] shrink-0 snap-center flex-col items-center gap-2 sm:w-[30%] sm:shrink md:w-auto md:flex-1 ${
                mid ? 'md:-translate-y-2' : ''
              }`}
            >
              <div className="flex h-7 w-full items-end justify-center sm:h-8">
                <img
                  src={car.logo}
                  alt={`${car.name} logo`}
                  loading="eager"
                  className="max-h-5 w-auto max-w-[78%] object-contain opacity-60 transition-opacity duration-500 group-hover:opacity-95 sm:max-h-6"
                />
              </div>

              <div className="relative w-full overflow-hidden border border-[#f4f1ea]/15 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
                <img
                  src={car.src}
                  alt={car.alt}
                  style={{ aspectRatio: '16 / 11' }}
                  className="w-full object-cover object-[50%_56%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#050607] via-[#050607]/45 to-transparent"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#050607]/70 to-transparent px-2.5 pt-8 pb-2">
                  <span className="font-lemon text-[7.5px] tracking-[0.18em] text-[#f7f4ee] uppercase sm:text-[8.5px]">
                    {car.name}
                  </span>
                  <span className="font-lemon hidden text-[7px] tracking-[0.14em] text-[#f4f1ea]/45 sm:block">
                    {car.founded}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="mt-3 hidden h-px w-full bg-gradient-to-r from-transparent via-[#f4f1ea]/25 to-transparent md:block"
      />
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lineupY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-7%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const lines = ['The great marques.', 'Explore them.'];

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pt-[9svh] pb-8 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-20 h-[70%] bg-[radial-gradient(58%_58%_at_50%_45%,rgba(255,255,255,0.09),transparent_72%)]"
      />
      <Vignette soft />

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="mx-auto w-full max-w-[1150px] pt-[3svh] text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="sc-kicker"
        >
          Goldenline — the marque index
        </motion.p>

        <h1 className="sc-serif mt-6 text-[clamp(2.6rem,7.2vw,6.2rem)] leading-[0.92] text-[#f7f4ee]">
          {lines.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.15, delay: 0.75 + index * 0.12, ease: EASE }}
              >
                {index === 1 ? <em className="italic">{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.35, ease: EASE }}
        >
          <RotatingQuote />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button type="button" onClick={() => jump('index')} className="sc-btn">
            Start exploring
            <ArrowDown size={14} aria-hidden="true" />
          </button>
          <a href={browseHash()} className="sc-btn sc-btn-quiet">
            Open the showroom
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      <div className="mt-9">
        <HeroLineup style={{ y: lineupY }} />

        <div className="mx-auto mt-6 flex w-full max-w-[1560px] items-end justify-between gap-6">
          <button
            type="button"
            onClick={() => jump('approach')}
            className="flex items-center gap-3 text-left"
            aria-label="Scroll to the next section"
          >
            <span className="sc-cue-line" aria-hidden="true" />
            <span className="sc-kicker">Scroll</span>
          </button>
          <p className="sc-kicker hidden text-right sm:block">
            {MARQUES.length} marques
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            {MARQUES.length * 2} cars
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            1909 — 2026
          </p>
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
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', reduced ? '-8%' : '8%']);

  return (
    <section id="approach" ref={ref} className="relative">
      <div className="relative isolate h-[58svh] overflow-hidden sm:h-[68svh]">
        <motion.img
          style={{ y }}
          src="/marques/bugatti-1.webp"
          alt="A Bugatti Chiron with its W16 engine cover open"
          className="absolute inset-0 -z-20 h-[116%] w-full object-cover object-[50%_42%]"
        />
        <Vignette />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 pt-14 pb-24 sm:px-8 sm:pt-20 sm:pb-32">
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
              <p className="sc-body max-w-[520px] !text-[15.5px]">
                A badge tells you where a car was built. It does not tell you why it exists. Each
                house below is here for one idea it has defended for decades — a suspension layout,
                an engine architecture, a way of stitching a seat — and the two cars that make the
                argument best.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 grid max-w-[420px] grid-cols-3 gap-5 border-t border-[#f4f1ea]/15 pt-6">
                {[
                  [String(MARQUES.length), 'Marques'],
                  [String(MARQUES.length * 2), 'Cars'],
                  ['117', 'Years covered'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sc-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-none text-[#f7f4ee]">
                      {value}
                    </dt>
                    <dd className="sc-kicker mt-2 !text-[9.5px] !tracking-[0.24em]">{label}</dd>
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
              Twelve houses, in <em className="italic">order</em>
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

function MarqueChapter({ marque, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const count = marque.images.length;
  const featureCount = marque.features.length;
  const [active, setActive] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  /* The stage is sticky for the whole section: the first third of the scroll
     walks through the photographs of this house, the rest opens its feature
     points one at a time. */
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const image = Math.min(count - 1, Math.floor(value * count));
    const feature = Math.min(
      featureCount - 1,
      Math.max(0, Math.floor(((value - 0.34) / 0.66) * featureCount)),
    );
    setActive((current) => (current === image ? current : image));
    setActiveFeature((current) => (current === feature ? current : feature));
  });

  const markY = useTransform(scrollYProgress, [0, 0.28], [reduced ? 0 : 22, 0]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const stageY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 16, reduced ? 0 : -16]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id={`marque-${marque.id}`}
      ref={ref}
      className="relative"
      style={{ height: `${120 + count * 30}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 pt-24 pb-10 sm:px-8">
        <div className="mx-auto grid w-full max-w-[1360px] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* photographs of this house ------------------------------------- */}
          <motion.div style={{ y: stageY }}>
            <div className="relative aspect-[16/10] overflow-hidden border border-[#f4f1ea]/15 bg-[#0b0c0d]">
              {marque.images.map((image, i) => (
                <motion.img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.035 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#050607] via-[#050607]/40 to-transparent"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#050607]/80 to-transparent px-4 pt-10 pb-3">
                <p className="sc-kicker !text-[8.5px] !tracking-[0.2em] !text-[#f4f1ea]/75">
                  {marque.images[active].caption}
                </p>
                <p className="sc-kicker !text-[8.5px] !tracking-[0.2em]">
                  {pad(active + 1)}
                  <span className="mx-1 text-[#f4f1ea]/30">/</span>
                  {pad(count)}
                </p>
              </div>
            </div>

            {/* the other previews of the same house */}
            <div className="mt-2.5 flex gap-2">
              {marque.images.map((image, i) => (
                <button
                  key={`${image.src}-preview`}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${image.caption}`}
                  className={`group relative aspect-[16/10] flex-1 overflow-hidden border transition-colors duration-500 ${
                    i === active
                      ? 'border-[#c9a15a]/70'
                      : 'border-[#f4f1ea]/15 hover:border-[#f4f1ea]/40'
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      i === active ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-2 h-px w-full bg-[#f4f1ea]/15">
              <motion.div style={{ width: barWidth }} className="h-px bg-[#c9a15a]/80" />
            </div>
          </motion.div>

          {/* the argument of this house ------------------------------------ */}
          <div>
            <motion.div style={{ y: markY, opacity: markOpacity }} className="flex items-center gap-4">
              <BrandMark marque={marque} className="max-h-9 max-w-[124px] opacity-85 sm:max-h-11" />
              <span className="h-px flex-1 bg-[#f4f1ea]/15" />
              <span className="sc-kicker !text-[9px]">
                {pad(index + 1)}
                <span className="mx-1.5 text-[#f4f1ea]/25">/</span>
                {pad(MARQUES.length)}
              </span>
            </motion.div>

            <h2
              className="sc-brand mt-5 text-[#f7f4ee]"
              style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.7rem)' }}
            >
              {marque.name}
            </h2>
            <p className="sc-serif mt-2 text-[clamp(0.98rem,1.7vw,1.3rem)] italic text-[#d8b478]">
              {marque.tagline}
            </p>
            <p className="sc-body mt-4 max-w-[470px] !text-[13px] !leading-[1.7]">{marque.intro}</p>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-y border-[#f4f1ea]/12 py-2.5">
              <span className="sc-kicker !text-[8.5px]">{marque.city}</span>
              <span className="sc-kicker !text-[8.5px]">{marque.country}</span>
              <span className="sc-kicker !text-[8.5px]">Founded {marque.founded}</span>
            </div>

            <ol className="hidden sm:block">
              {marque.features.map((feature, i) => {
                const open = i === activeFeature;
                return (
                  <li
                    key={feature.title}
                    className={`border-b border-[#f4f1ea]/12 py-3 transition-opacity duration-500 ${
                      open ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`sc-kicker !text-[9px] !tracking-[0.2em] transition-colors duration-500 ${
                          open ? '!text-[#d8b478]' : ''
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <h3 className="sc-serif text-[clamp(1rem,1.6vw,1.2rem)] leading-tight text-[#f7f4ee]">
                        {feature.title}
                      </h3>
                    </div>
                    {open ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="sc-body mt-2 max-w-[430px] overflow-hidden pl-7 !text-[12.5px] !leading-[1.65]"
                      >
                        {feature.body}
                      </motion.p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
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
          <div className="relative h-[34svh] overflow-hidden bg-[#0f1113] sm:h-[46svh]">
            <img
              src={marque.images[1].src}
              alt={marque.images[1].alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div aria-hidden="true" className="sc-vignette absolute inset-0" />
            <p className="sc-kicker absolute bottom-4 left-4 !text-[#f4f1ea]/70">
              {marque.images[1].caption}
            </p>
          </div>
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
  { value: 1909, label: 'Oldest house' },
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
            Twelve houses.
            <br />
            <em className="italic">One place</em> to read them.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="sc-body mx-auto mt-7 max-w-[520px]">
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
          <p className="font-lemon text-[12px] tracking-[0.36em] uppercase">goldenline</p>
          <p className="mt-4 max-w-[460px] text-[12px] leading-relaxed text-[#f4f1ea]/45">
            Figures are manufacturer press data for the current generation of each car, rounded the
            way the maker publishes them. Prices are starting figures before options and local
            taxes, where a maker publishes one at all. A photograph can show a different trim to the
            figures listed.
          </p>
        </div>
        <div className="max-w-[380px] sm:text-right">
          <p className="text-[12px] leading-relaxed text-[#f4f1ea]/45">
            Photography from Wikimedia Commons contributors, cropped and darkened for this layout
            and used here for an editorial demo. Every car, name, badge and image belongs to its
            manufacturer.
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
