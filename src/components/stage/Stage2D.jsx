import { useState } from 'react';

/**
 * The 2D renderer: one manufacturer photograph per car, filling the frame edge
 * to edge.
 *
 * The frame follows the photograph's proportions, so most cars fill it exactly.
 * When the frame has to be trimmed (a tall photo on a short screen), the photo
 * is scaled to cover and panned with `car.focus` — a percentage pair measured
 * from each picture — so the car lands in the middle of the frame instead of
 * being sliced at the roof or the wheels.
 *
 * Phase 2 swaps this component for a 3D canvas with the same props.
 */
export default function Stage2D({ car, priority = false, onImageError, image, focus, filter = 'none' }) {
  const src = image || car.image;
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-paper px-6 text-center">
        <div>
          <p className="text-[14px] font-medium text-ink">Photograph unavailable</p>
          <p className="mt-1 text-[12.5px] text-muted">
            {car.brand} {car.model} — try another model while this one loads.
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={`${car.brand} ${car.model}, ${car.year}`}
      width={car.imageWidth}
      height={car.imageHeight}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      draggable="false"
      onError={() => {
        setFailed(true);
        onImageError?.(car);
      }}
      style={{
        objectPosition: focus || car.focus || '50% 50%',
        filter,
        transition: 'filter 520ms cubic-bezier(0.22, 0.61, 0.24, 1)',
      }}
      className="h-full w-full object-cover"
    />
  );
}
