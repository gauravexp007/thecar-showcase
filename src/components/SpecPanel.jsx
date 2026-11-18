import { Check } from 'lucide-react';
import PaintSwatches from './PaintSwatches';
import { CountUp, FavoriteButton } from './ui';
import { bodyLabel, formatMoney, fuelLabel, specRows } from '../lib/format';

export default function SpecPanel({
  car,
  favorite,
  onFavorite,
  onCompare,
  inCompare,
  compareFull,
  paintKey,
  onPaint,
}) {
  const rows = specRows(car);

  return (
    <aside className="panel p-5 sm:p-6 lg:sticky lg:top-[5.5rem]">
      <p className="label">
        {car.brand} · {bodyLabel(car.body)} · {fuelLabel(car.fuel)}
      </p>
      <h2 className="mt-1 font-display text-[34px] leading-none tracking-[-0.01em]">{car.model}</h2>
      <p className="mt-2 text-[15px] text-muted">{formatMoney(car.price)} before destination</p>

      <PaintSwatches colors={car.colors} value={paintKey} onChange={onPaint} className="mt-4" />

      <dl className="mt-5">
        {rows.map((row) => (
          <div key={row.key} className="spec-line">
            <dt className="text-muted">{row.label}</dt>
            <dd className="font-medium tabular-nums">
              <CountUp value={row.value} decimals={row.decimals} />
              {row.unit && <span className="ml-1 text-[13px] font-normal text-muted">{row.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[13.5px] leading-relaxed text-muted">
        <span className="font-medium text-ink">Launched in {car.launched}.</span>{' '}
        {car.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {car.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] text-ink">
            <Check size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-muted" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onCompare(car.slug)}
          disabled={inCompare || compareFull}
          className="btn-primary flex-1"
        >
          {inCompare ? 'In compare' : compareFull ? 'Compare is full' : 'Add to compare'}
        </button>
        <FavoriteButton
          active={favorite}
          onToggle={() => onFavorite(car.slug)}
          label={`${car.brand} ${car.model}`}
        />
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
        US market, {car.year} model year. Photograph shows a representative trim. 0–100 km/h
        is converted from the published US 0–60 mph time.
      </p>
    </aside>
  );
}
