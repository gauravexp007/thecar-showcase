/**
 * The paint picker that sits with the car's details rather than on the photo:
 * a row of swatches, the active one ringed, with the paint's name beside them.
 */
export default function PaintSwatches({ colors = [], value, onChange, className = '' }) {
  if (!colors || colors.length < 2) return null;
  const active = colors.find((color) => color.key === value) || colors[0];

  return (
    <div className={`flex flex-wrap items-center gap-1 ${className}`}>
      <span className="mr-1.5 text-[11.5px] tracking-[0.16em] text-muted uppercase">Paint</span>
      {colors.map((color) => {
        const selected = color.key === active.key;
        return (
          <button
            key={color.key}
            type="button"
            onClick={() => onChange(color.key)}
            aria-pressed={selected}
            aria-label={`Paint: ${color.name}`}
            title={color.name}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-paper"
          >
            <span
              className={`h-[18px] w-[18px] rounded-full border transition-all ${
                selected ? 'border-ink ring-1 ring-ink/45 ring-offset-2' : 'border-line'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          </button>
        );
      })}
      <span className="ml-1.5 text-[13px] text-ink">{active.name}</span>
    </div>
  );
}
