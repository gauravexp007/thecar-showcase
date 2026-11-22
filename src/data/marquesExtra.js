/**
 * Houses added after the first edition of the index.
 *
 * Same shape as `/src/data/marques.js`, so the showcase can render them without
 * knowing they are new. Their photography already ships with the showroom, so
 * the index grows without adding a single byte of imagery.
 */
import { MARQUES } from './marques';

export const EXTRA_MARQUES = [
  {
    id: 'audi',
    name: 'Audi',
    logo: '/logos/audi.webp',
    country: 'Germany',
    city: 'Ingolstadt',
    founded: '1909',
    tagline: 'The quiet fast one.',
    intro:
      'Audi made its name by refusing to choose between a family estate and a weapon: quattro put the power at all four corners in 1980 and the company has spent every generation since making that grip feel effortless. The current range is the most restrained fast car in Germany — and often the quickest point to point.',
    signature: [
      ['Founded', '1909'],
      ['Built in', 'Ingolstadt, Germany'],
      ['Known for', 'quattro all-wheel drive'],
    ],
    images: [
      {
        src: '/cars/gallery/audi-a5-1.webp',
        alt: 'A grey Audi A5 from the front three-quarter',
        title: 'The long roofline',
        caption: 'Audi A5, front three-quarter.',
        note:
          'The A5 is the shape Audi keeps returning to: a low, wide nose, a roofline that runs to the tail in one gesture, and almost no decoration in between.',
      },
      {
        src: '/cars/gallery/audi-a5-2.webp',
        alt: 'A grey Audi A5 seen from the side',
        title: 'Drawn in one line',
        caption: 'Audi A5, in profile.',
        note:
          'A single crease runs the length of the flank and does all the work. Audi calls it the tornado line; it is really a way to make a tall door look like a low one.',
      },
      {
        src: '/cars/gallery/audi-q5-1.webp',
        alt: 'A dark Audi Q5 SUV from the front',
        title: 'The house grille',
        caption: 'Audi Q5, front three-quarter.',
        note:
          'The single-frame grille has been the family face since 2004 — wide, upright and now mostly closed off, because the engines behind it need less air than they used to.',
      },
    ],
    features: [
      {
        title: 'quattro, forty years on',
        body:
          'A centre differential decides where the torque goes before either axle loses grip, and in most cars the rear axle gets the larger share by default. It is the reason an Audi feels heavier than it is in the wet, and the reason it rarely steps out of line.',
      },
      {
        title: 'Digital light',
        body:
          'The matrix headlamps are made of dozens of individually switched segments that mask oncoming traffic while leaving the rest of the road on full beam. In the newest cars the pattern is drawn rather than merely dimmed.',
      },
      {
        title: 'The five-cylinder',
        body:
          'Audi kept the straight-five alive when everyone else abandoned it: 2.5 litres, a distinctive uneven thrum, and the same firing order that made the original Quattro rally car so recognisable from a hillside.',
      },
    ],
    models: [
      {
        name: 'RS 6 Avant',
        sub: 'Performance estate',
        power: '621 hp',
        sprint: '3.4 s',
        top: '174 mph',
        price: 'from $126,000',
        note: '4.0-litre twin-turbo V8, 627 lb-ft, and a boot that will take a full week of luggage at the same speed.',
      },
      {
        name: 'e-tron GT',
        sub: 'Electric four-door',
        power: '522 hp',
        sprint: '3.9 s',
        top: '152 mph',
        price: 'from $107,000',
        note: 'Two motors and a two-speed rear gearbox, built on the same architecture as the Porsche Taycan but tuned for distance rather than lap times.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
  {
    id: 'volvo',
    name: 'Volvo',
    logo: '/logos/si/volvo.svg',
    country: 'Sweden',
    city: 'Gothenburg',
    founded: '1927',
    tagline: 'Safety, as a design brief.',
    intro:
      'Volvo has spent ninety-odd years treating a car as a piece of public health equipment. The three-point seatbelt was given away free in 1959; the company still publishes its crash research. What is easy to miss is how well the current cars are drawn — calm, upright, and trimmed in materials that look expensive because they are.',
    signature: [
      ['Founded', '1927'],
      ['Built in', 'Gothenburg, Sweden'],
      ['Known for', 'Giving away the seatbelt'],
    ],
    images: [
      {
        src: '/cars/gallery/volvo-ex30-1.webp',
        alt: 'A small Volvo EX30 electric SUV from the front three-quarter',
        title: 'Small, and certain of itself',
        caption: 'Volvo EX30, front three-quarter.',
        note:
          'The EX30 is the smallest Volvo in decades and the most confident: no grille to speak of, a clean nose, and the proportions of a car that knows it does not need to shout.',
      },
      {
        src: '/cars/gallery/volvo-ex30-2.webp',
        alt: 'A Volvo EX30 seen from the rear three-quarter',
        title: 'The cut tail',
        caption: 'Volvo EX30, rear three-quarter.',
        note:
          'The rear is sliced off almost vertically, which buys cabin space and gives the little car a distinctly Scandinavian silhouette: nothing added for the sake of a photograph.',
      },
      {
        src: '/cars/gallery/volvo-xc90-1.webp',
        alt: 'A Volvo XC90 SUV from the front',
        title: 'The upright one',
        caption: 'Volvo XC90, front three-quarter.',
        note:
          'The XC90 has carried the same tall, square-shouldered stance since 2015. It reads as furniture rather than fashion, which is exactly the intent.',
      },
    ],
    features: [
      {
        title: 'The belt, given away',
        body:
          'Nils Bohlin patented the three-point belt in 1959 and Volvo opened the patent so every maker could use it. It is credited with saving more than a million lives, and it remains the single most valuable thing the industry has ever handed over.',
      },
      {
        title: 'Pilot Assist',
        body:
          'Radar and camera keep the car centred in its lane and a set distance behind the traffic ahead. Volvo insists on calling it assistance rather than driving: the hands stay on the wheel, and the car says so every few seconds.',
      },
      {
        title: 'Honest materials',
        body:
          'Wool blends, recycled denim and a veneer taken from fallen Swedish ash replace the usual leather and gloss. The cabin is quiet, warm and deliberately unglamorous — and it has aged better than most.',
      },
    ],
    models: [
      {
        name: 'EX30',
        sub: 'Compact electric SUV',
        power: '422 hp',
        sprint: '3.6 s',
        top: '112 mph',
        price: 'from $36,000',
        note: 'The quickest Volvo ever built, in the smallest body it sells: two motors, a 69 kWh battery, and a footprint smaller than a Golf.',
      },
      {
        name: 'XC90',
        sub: 'Seven-seat SUV',
        power: '455 hp',
        sprint: '5.3 s',
        top: '112 mph',
        price: 'from $59,000',
        note: 'A plug-in hybrid with a 2.0-litre four and an electric rear axle, still the shape that defined the modern Volvo.',
      },
    ],
    sprintLabel: '0–62 mph',
  },
];

export const ALL_MARQUES = [...MARQUES, ...EXTRA_MARQUES];
