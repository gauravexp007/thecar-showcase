import { CARS } from '../data/cars';

const SOURCES = [...new Set(CARS.map((car) => car.photoSource))];

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-7 text-[12.5px] leading-relaxed text-muted sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="font-brand text-[24px] leading-none text-ink">
            goldenline<span className="text-gold">.</span>
          </p>
          <p className="max-w-[560px]">
            Specifications are US-market figures for the 2025 model year, from manufacturer press
            data and fueleconomy.gov. Prices are starting MSRP before destination. Photographs show
            a representative trim of each model line. Colour options use published photographs of
            each car in that paint, some of them from Wikimedia Commons, so the setting behind the
            car varies between shots.
          </p>
        </div>

        <p className="mt-4 max-w-[820px]">
          Photography from {SOURCES.slice(0, -1).join(', ')} and {SOURCES[SOURCES.length - 1]},
          used here for an editorial demo. Every car, name, badge and image belongs to its
          manufacturer.
        </p>
      </div>
    </footer>
  );
}
