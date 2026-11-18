/** Warm the browser cache for the next/previous car photographs. */
export function preloadCarImages(car) {
  if (!car || typeof window === 'undefined') return;
  if (typeof car.image !== 'string' || !car.image) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = car.image;
}
