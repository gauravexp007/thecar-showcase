import { bodyLabel, formatMoney, fuelLabel } from '../lib/format';
import { carHash } from '../lib/hash';

const ROWS = [
  { key: 'price', label: 'Price from', better: 'lower', get: (car) => car.price, render: (car) => formatMoney(car.price) },
  { key: 'body', label: 'Body', render: (car) => bodyLabel(car.body) },
  { key: 'fuel', label: 'Fuel', render: (car) => fuelLabel(car.fuel) },
  { key: 'power', label: 'Power', unit: 'hp', better: 'higher', get: (car) => car.specs.power },
  { key: 'accel', label: '0–60 mph', unit: 's', better: 'lower', decimals: 1, get: (car) => car.specs.accel },
  { key: 'topSpeed', label: 'Top speed', unit: 'mph', better: 'higher', get: (car) => car.specs.topSpeed },
  { key: 'mpg', label: 'Combined', unit: 'mpg', better: 'higher', get: (car) => car.specs.mpg },
  { key: 'range', label: 'Range', unit: 'mi', better: 'higher', get: (car) => car.specs.range },
  { key: 'seats', label: 'Seats', better: 'higher', get: (car) => car.specs.seats },
];

/** Best value in a row, or null when the row has no winner. Ties share the mark. */
function bestValue(row, cars) {
  if (!row.get) return null;
  const values = cars.map((car) => row.get(car));
  const present = values.filter((value) => value != null);
  if (present.length < 2) return null;
  return row.better === 'lower' ? Math.min(...present) : Math.max(...present);
}

export default function CompareTable({ cars, onRemove }) {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13.5px]">
        <caption className="sr-only">Side-by-side comparison of the selected cars</caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 w-[124px] bg-white p-3 align-top text-[12px] font-normal text-muted">
              Model
            </th>
            {cars.map((car) => (
              <th key={car.slug} scope="col" className="min-w-[180px] p-3 align-bottom font-normal">
                <a href={carHash(car.slug)} className="group block">
                  <img
                    src={car.image}
                    alt=""
                    className="h-16 w-full max-w-[190px] rounded-[10px] object-cover"
                    loading="lazy"
                  />
                  <span className="mt-2 block font-display text-[22px] leading-none group-hover:underline group-hover:decoration-line group-hover:underline-offset-4">
                    {car.model}
                  </span>
                  <span className="mt-1 block text-[12px] text-muted">{car.brand}</span>
                </a>
                <button
                  type="button"
                  onClick={() => onRemove(car.slug)}
                  className="mt-2 text-[11.5px] text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
                >
                  Remove
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            const best = bestValue(row, cars);
            return (
              <tr key={row.key} className="border-t border-line">
                <th scope="row" className="sticky left-0 z-10 bg-white p-3 text-[12.5px] font-normal text-muted">
                  {row.label}
                </th>
                {cars.map((car) => {
                  const value = row.get ? row.get(car) : null;
                  const isBest = best != null && value === best;
                  const text = row.render
                    ? row.render(car)
                    : value == null
                      ? '—'
                      : `${value.toFixed(row.decimals ?? 0)}${row.unit ? ` ${row.unit}` : ''}`;
                  return (
                    <td
                      key={car.slug}
                      className={`p-3 tabular-nums ${isBest ? 'font-semibold text-ink' : 'text-ink/80'}`}
                    >
                      {text}
                      {isBest && (
                        <span className="ml-1.5 rounded-chip bg-ink px-1.5 py-0.5 align-middle text-[10px] font-normal text-white">
                          Best
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
