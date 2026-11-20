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

/* The opening chapter: the hero is one photograph at a time, full-bleed, with
   the headline standing on it. Scrolling walks sideways through every house in
   the index — the next marque slides in from the right, the last slides away
   to the left. */
const HERO_STEP = 52; /* svh of scrolling handed to each marque */

const HERO_QUOTES = [
  'A badge says where a car was built. The car says why.',
  'Fifteen houses, fifteen arguments, each defended for a century.',
  'Speed is easy. Character takes a hundred years.',
  'Some companies sell cars. A few sell a point of view.',
  'Read the house, not the badge.',
  'Every great marque is one stubborn idea, repeated.',
];

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
    <div className="relative mx-auto mt-7 h-[3.5em] max-w-[720px] overflow-hidden px-2">
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
          className="sc-serif absolute inset-x-0 top-0 text-[clamp(1.2rem,2.05vw,1.75rem)] leading-[1.45] italic text-[#f4f1ea]/[0.9] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]"
        >
          {HERO_QUOTES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* One car of the opening plate. The frame slides sideways with the scroll and
   the photograph is held whole inside it — never cropped — while the car that
   owns the plate settles to 1:1 and its neighbours sit slightly larger, which
   gives the movement depth as well as travel. */
function HeroSlide({ marque, index, total, progress, reduced }) {
  /* The plate dissolves from one car to the next: each photograph is fully
     present for its half of the step and gone by the time the next one owns
     the plate, so the change is read as the scroll, not as a card sliding by. */
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(value * (total - 1) - index);
    if (reduced) return distance < 0.5 ? 1 : 0;
    /* Full opacity on either side of the step, a quick dissolve across the
       middle: the plate is never left half a car for long. */
    return Math.max(0, Math.min(1, 1.8 - 1.8 * distance));
  });

  const scale = useTransform(opacity, [0, 1], [1.045, 1]);

  const image = marque.images[0];

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 will-change-transform"
      aria-hidden="true"
    >
      <div className="absolute inset-[4%] flex items-center justify-center">
        <motion.img
          src={image.src}
          alt={image.alt}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ scale }}
          className="block h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
    </motion.div>
  );
}

function Hero() {
  const stageRef = useRef(null);
  const reduced = useReducedMotion();
  const total = MARQUES.length;

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.35 });
  const progress = reduced ? scrollYProgress : smooth;

  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, 'change', (value) => {
    const next = Math.min(total - 1, Math.max(0, Math.round(value * (total - 1))));
    setActive((current) => (current === next ? current : next));
  });

  const gotoBrand = (index) => {
    const el = stageRef.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + (index / (total - 1)) * distance + 2,
      behavior: 'smooth',
    });
  };

  const marque = MARQUES[active];

  return (
    <section
      id="top"
      ref={stageRef}
      className="relative"
      style={{ height: `calc(100svh + ${(total - 1) * HERO_STEP}svh)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#050607]">
        <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-5 px-5 pt-[calc(72px_+_2svh)] pb-5 sm:px-8 lg:flex-row lg:items-center lg:gap-14 lg:pb-8">
          <div className="order-1 flex min-h-0 w-full flex-col justify-center lg:order-1 lg:w-[44%] lg:flex-none">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="sc-kicker"
            >
              Goldenline — the marque index
            </motion.p>

            <h1 className="sc-serif mt-4 text-[clamp(2.2rem,5.2vw,4.6rem)] leading-[0.98] text-[#f7f4ee]">
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, delay: 0.2, ease: EASE }}
                >
                  The great marques.
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
            >
              <RotatingQuote />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
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

            <div className="mt-7 border-t border-[#f4f1ea]/12 pt-4">
              <div className="flex items-center gap-3">
                <img
                  src={marque.logo}
                  alt={`${marque.name} logo`}
                  loading="eager"
                  className="h-4 w-auto max-w-[64px] object-contain opacity-80"
                />
                <span className="sc-kicker !text-[10px]">
                  {pad(active + 1)}
                  <span className="mx-1.5" aria-hidden="true">
                    /
                  </span>
                  {pad(total)}
                </span>
                <span className="sc-kicker ml-auto hidden !text-[10px] sm:inline">
                  Scrolls one house at a time
                </span>
              </div>

              <motion.div
                key={marque.id}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, ease: EASE }}
              >
                  <p className="font-lemon mt-2.5 text-[clamp(1.5rem,2.7vw,2.4rem)] tracking-[0.05em] text-[#f7f4ee] uppercase">
                    {marque.name}
                  </p>
                  <p className="mt-1.5 text-[11px] tracking-[0.2em] text-[#f4f1ea]/65 uppercase">
                    Founded {marque.founded}
                    <span className="mx-1.5" aria-hidden="true">
                      /
                    </span>
                    {marque.city}, {marque.country}
                  </p>
              </motion.div>

              <div className="mt-3.5 flex items-center gap-1">
                {MARQUES.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => gotoBrand(index)}
                    aria-label={`Go to ${item.name}`}
                    aria-current={index === active ? 'true' : undefined}
                    className="group py-2"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ${
                        index === active
                          ? 'w-6 bg-[#c9a15a] sm:w-8'
                          : 'w-3 bg-[#f4f1ea]/35 group-hover:bg-[#f4f1ea]/80 sm:w-4'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sc-plate relative order-2 aspect-[16/10] w-full overflow-hidden border border-[#f4f1ea]/12 lg:order-2 lg:aspect-[16/11] lg:flex-1">
            {MARQUES.map((item, index) => (
              <HeroSlide
                key={item.id}
                marque={item}
                index={index}
                total={total}
                progress={progress}
                reduced={reduced}
              />
            ))}
          </div>
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
      <div className="px-5 sm:px-8">
        <div className="sc-plate relative mx-auto aspect-[16/9] w-full max-w-[1120px] overflow-hidden border border-[#f4f1ea]/12">
          <img
            src="/marques/bentley-3.avif"
            alt="A black Bentley Continental GT from the front three-quarter"
            className="h-full w-full object-contain p-[2.5%]"
          />
        </div>
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
            Photography from Wikimedia Commons contributors, resized and re-encoded for this layout
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
