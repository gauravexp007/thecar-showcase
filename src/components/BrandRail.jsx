import { BRANDS } from '../data/cars';

export default function BrandRail({ brandId, onBrand }) {
  return (
    <nav aria-label="Brands" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto sm:flex-wrap sm:overflow-visible">
      {BRANDS.map((brand) => {
        const active = brand.id === brandId;
        return (
          <button
            key={brand.id}
            type="button"
            aria-pressed={active}
            onClick={() => onBrand(brand.id)}
            className={`relative shrink-0 rounded-chip px-3 py-1.5 text-[15px] whitespace-nowrap transition-colors sm:text-[16px] ${
              active ? 'text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {brand.name}
            <span
              aria-hidden="true"
              className={`absolute inset-x-3 -bottom-0.5 h-px transition-opacity ${
                active ? 'bg-ink opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
