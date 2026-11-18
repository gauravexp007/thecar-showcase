export const BODY_LABELS = {
  sedan: 'Sedan',
  suv: 'SUV',
  coupe: 'Coupe',
};

export const FUEL_LABELS = {
  petrol: 'Petrol',
  hybrid: 'Hybrid',
  EV: 'Electric',
};

export const bodyLabel = (body) => BODY_LABELS[body] || body;
export const fuelLabel = (fuel) => FUEL_LABELS[fuel] || fuel;

export const formatMoney = (value) => `$${value.toLocaleString('en-US')}`;
export const formatPrice = (value) => `from ${formatMoney(value)}`;
export const formatPriceShort = (value) => `$${Math.round(value / 1000)}k`;

/**
 * The headline figures, in display order. A null value is skipped, and hybrids
 * show electric range instead of a second economy number.
 */
export function specRows(car) {
  const s = car.specs;
  const rows = [
    { key: 'power', label: 'Power', value: s.power, unit: 'hp', better: 'higher', decimals: 0 },
    { key: 'accel', label: '0–60 mph', value: s.accel, unit: 's', better: 'lower', decimals: 1 },
    { key: 'topSpeed', label: 'Top speed', value: s.topSpeed, unit: 'mph', better: 'higher', decimals: 0 },
    car.fuel === 'EV'
      ? { key: 'range', label: 'Range', value: s.range, unit: 'mi', better: 'higher', decimals: 0 }
      : { key: 'mpg', label: 'Combined', value: s.mpg, unit: 'mpg', better: 'higher', decimals: 0 },
    s.range && car.fuel !== 'EV'
      ? { key: 'evRange', label: 'Electric range', value: s.range, unit: 'mi', better: 'higher', decimals: 0 }
      : null,
    { key: 'seats', label: 'Seats', value: s.seats, unit: '', better: 'higher', decimals: 0 },
  ];
  return rows.filter((row) => row && row.value != null);
}

/**
 * 0–100 km/h from the US 0–60 mph figure: roughly two tenths for quick cars,
 * three for the rest, which is how the two published times usually differ.
 * The stage badge labels it as converted in the detail panel footnote.
 */
export function accel100(car) {
  const value = car.specs?.accel;
  if (value == null) return null;
  return Math.round((value + (value < 4 ? 0.2 : 0.3)) * 10) / 10;
}

export const headlineSpecs = (car) => specRows(car).slice(0, 3);

export const formatSpecValue = (row) =>
  `${row.value.toFixed(row.decimals)}${row.unit ? ` ${row.unit}` : ''}`;
