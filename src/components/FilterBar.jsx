import { Search, X } from 'lucide-react';
import { BODY_TYPES, FUELS } from '../data/cars';
import { ToggleChip } from './ui';

export default function FilterBar({
  query,
  onQuery,
  filters,
  onToggle,
  onClear,
  resultCount,
  activeFilters,
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <label className="relative block w-full sm:max-w-[420px] sm:flex-1">
        <span className="sr-only">Search cars</span>
        <Search
          size={15}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search make or model"
          className="h-10 w-full rounded-chip border border-line bg-paper pr-8 pl-9 text-[13.5px] text-ink transition-colors placeholder:text-muted focus:border-ink/40 focus:bg-white focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQuery('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-1.5 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-line/60 hover:text-ink"
          >
            <X size={13} aria-hidden="true" />
          </button>
        )}
      </label>

      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
        {BODY_TYPES.map((body) => (
          <ToggleChip
            key={body.value}
            active={filters.body === body.value}
            onClick={() => onToggle('body', body.value)}
          >
            {body.label}
          </ToggleChip>
        ))}
        <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-line" />
        {FUELS.map((fuel) => (
          <ToggleChip
            key={fuel.value}
            active={filters.fuel === fuel.value}
            onClick={() => onToggle('fuel', fuel.value)}
          >
            {fuel.label}
          </ToggleChip>
        ))}
      </div>

      <span className="shrink-0 text-[12.5px] text-muted sm:ml-auto" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'car' : 'cars'}
      </span>
      {activeFilters && (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 text-[12.5px] text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Clear
        </button>
      )}
    </div>
  );
}
