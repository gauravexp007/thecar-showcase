import { X } from 'lucide-react';
import { compareHash } from '../lib/hash';

export default function CompareTray({ cars, onRemove, onClear }) {
  if (!cars.length) return null;
  const ready = cars.length >= 2;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto">
          {cars.map((car) => (
            <span
              key={car.slug}
              className="flex shrink-0 items-center gap-1.5 rounded-chip border border-line py-1 pr-1 pl-2"
            >
              <img src={car.image} alt="" className="h-5 w-9 rounded-[6px] object-cover" loading="lazy" />
              <span className="text-[12.5px] whitespace-nowrap">{car.model}</span>
              <button
                type="button"
                onClick={() => onRemove(car.slug)}
                aria-label={`Remove ${car.brand} ${car.model} from compare`}
                className="grid h-6 w-6 place-items-center rounded-full text-muted hover:bg-paper hover:text-ink"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>

        <span className="hidden shrink-0 text-[12px] text-muted sm:block">{cars.length} of 3</span>
        <button
          type="button"
          onClick={onClear}
          className="hidden shrink-0 text-[12.5px] text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink sm:block"
        >
          Clear
        </button>
        <a
          href={compareHash()}
          aria-disabled={!ready}
          className={`shrink-0 ${ready ? 'btn-primary h-10 px-4' : 'pointer-events-none h-10 rounded-chip border border-line px-4 text-[13.5px] leading-10 text-muted'}`}
        >
          Compare
        </a>
      </div>
    </div>
  );
}
