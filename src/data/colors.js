/**
 * Paint choices per car.
 *
 * Every option is a real photograph of that car in that paint, taken from the
 * manufacturer's own press set or a published car photograph on the web — no
 * recolouring, no tinting, no colour filters. `shown` is the colour already on
 * the showroom hero; the rest carry their own photograph and their own focal
 * point, so the car stays centred when the 16:9 frame crops a wider shot.
 *
 * Paint names follow each model's published palette.
 */

const p = (key, name, hex, slug, focus) => ({
  key,
  name,
  hex,
  image: `/cars/paint/${slug}-${key}.webp`,
  focus,
});

export const PAINTS = {
  'audi-a3': [
    { key: 'shown', name: 'Progressive Red Metallic', hex: '#a3121f' },
    p('blue', 'Navarra Blue Metallic', '#1e4f8a', 'audi-a3', '51% 40%'),
  ],
  'audi-a5': [
    { key: 'shown', name: 'Arkona White', hex: '#f0efea' },
    p('black', 'Mythos Black Metallic', '#16181a', 'audi-a5', '46% 42%'),
  ],
  'audi-q5': [
    { key: 'shown', name: 'Arkona White', hex: '#f0efea' },
    p('grey', 'Daytona Grey Metallic', '#5b6065', 'audi-q5', '50% 48%'),
  ],
  'bmw-3-series': [
    { key: 'shown', name: 'Arctic Race Blue Metallic', hex: '#7d9cc0' },
    p('red', 'Vegas Red Metallic', '#8c1f22', 'bmw-3-series', '53% 44%'),
    p('grey', 'Skyscraper Grey Metallic', '#6f767c', 'bmw-3-series', '53% 40%'),
  ],
  'bmw-5': [
    { key: 'shown', name: 'Cape York Green Metallic', hex: '#33512a' },
    p('blue', 'Phytonic Blue Metallic', '#2b5c86', 'bmw-5', '47% 49%'),
  ],
  'bmw-ix': [
    { key: 'shown', name: 'Phytonic Blue Metallic', hex: '#24558c' },
    p('storm', 'Storm Bay Metallic', '#8b939a', 'bmw-ix', '50% 51%'),
  ],
  'mercedes-e': [
    { key: 'shown', name: 'High-Tech Silver Metallic', hex: '#b9bcc0' },
    p('black', 'Obsidian Black Metallic', '#131518', 'mercedes-e', '48% 52%'),
  ],
  'mercedes-c-class': [
    { key: 'shown', name: 'High-Tech Silver Metallic', hex: '#b9bcc0' },
    p('black', 'Obsidian Black Metallic', '#131518', 'mercedes-c-class', '54% 41%'),
  ],
  'mercedes-glc': [
    { key: 'shown', name: 'Nautic Blue Metallic', hex: '#1c3f77' },
    p('white', 'Polar White', '#f0f1f0', 'mercedes-glc', '48% 49%'),
    p('red', 'Patagonia Red Metallic', '#7d2230', 'mercedes-glc', '54% 40%'),
  ],
  'porsche-911-carrera': [
    { key: 'shown', name: 'Ruby Star Neo', hex: '#8d4a5e' },
    p('white', 'Carrara White Metallic', '#ecebe6', 'porsche-911-carrera', '48% 49%'),
    p('silver', 'GT Silver Metallic', '#9fa3a6', 'porsche-911-carrera', '50% 50%'),
  ],
  'porsche-taycan': [
    { key: 'shown', name: 'Carrara White Metallic', hex: '#ecebe6' },
    p('red', 'Carmine Red', '#8f1f25', 'porsche-taycan', '52% 46%'),
    p('blue', 'Neptune Blue', '#2c5d8f', 'porsche-taycan', '50% 51%'),
  ],
  'volvo-ex30': [
    { key: 'shown', name: 'Cloud Blue', hex: '#a8bccb' },
    p('white', 'Crystal White', '#eeeeea', 'volvo-ex30', '48% 46%'),
    p('black', 'Onyx Black', '#14161a', 'volvo-ex30', '50% 52%'),
  ],
  'volvo-xc90': [
    { key: 'shown', name: 'Vapour Grey', hex: '#6c7175' },
    p('blue', 'Denim Blue', '#2a4467', 'volvo-xc90', '49% 53%'),
    p('white', 'Crystal White', '#eeeeea', 'volvo-xc90', '51% 51%'),
  ],
  'kia-ev9': [
    { key: 'shown', name: 'Ocean Blue', hex: '#2a7f88' },
    p('black', 'Aurora Black Pearl', '#121418', 'kia-ev9', '49% 53%'),
  ],
  'kia-ev6': [
    { key: 'shown', name: 'Snow White Pearl', hex: '#eceae5' },
    p('blue', 'Yacht Blue', '#3b6ea8', 'kia-ev6', '50% 48%'),
    p('black', 'Aurora Black Pearl', '#121418', 'kia-ev6', '50% 48%'),
  ],
  'kia-sportage': [
    { key: 'shown', name: 'Gravity Grey', hex: '#6b6f72' },
    p('white', 'Snow White Pearl', '#eceae5', 'kia-sportage', '49% 50%'),
    p('black', 'Aurora Black Pearl', '#121418', 'kia-sportage', '50% 54%'),
  ],
};

export function colorOptions(slug) {
  return PAINTS[slug] || [];
}
