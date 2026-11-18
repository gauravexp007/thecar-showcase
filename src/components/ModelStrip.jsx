import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ModelStrip({ cars, activeSlug, onSelect, onStep, showBrand = false }) {
  if (!cars.length) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onStep?.(-1)}
        aria-label="Previous model"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
      >
        <ChevronLeft size={15} aria-hidden="true" />
      </button>

      <div className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
        {cars.map((car) => {
          const active = car.slug === activeSlug;
          return (
            <button
              key={car.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(car.slug)}
              className={`flex shrink-0 items-center gap-2 rounded-chip border py-1 pr-3 pl-1.5 transition-colors ${
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-white text-ink hover:border-ink/30 hover:bg-paper'
              }`}
            >
              <span className="block h-7 w-11 overflow-hidden rounded-[8px] bg-paper">
                <img
                  src={car.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </span>
              <span className="text-[12.5px] whitespace-nowrap">
                {showBrand ? `${car.brand} ${car.model}` : car.model}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onStep?.(1)}
        aria-label="Next model"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-paper"
      >
        <ChevronRight size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
