import { getCar } from '../data/cars';

/** #/ (showcase) , #/showroom , #/car/brand-model , #/compare */
export function parseHash(hash = '') {
  const parts = hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean)
    .map((part) => decodeURIComponent(part).toLowerCase());

  if (!parts.length) return { name: 'showcase' };
  if (parts[0] === 'car' && parts[1]) {
    const car = getCar(parts[1]);
    if (car) return { name: 'detail', slug: car.slug };
    return { name: 'browse', missing: parts[1] };
  }
  if (parts[0] === 'compare') return { name: 'compare' };
  return { name: 'browse' };
}

export const showcaseHash = () => '#/';
export const browseHash = () => '#/showroom';
export const carHash = (slug) => `#/car/${slug}`;
export const compareHash = () => '#/compare';

export const isPlainSlug = (value) => /^[a-z0-9-]+$/.test(value);
