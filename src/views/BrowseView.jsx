import { useEffect, useState } from 'react';
import { ArrowRight, Box, Check, SearchX } from 'lucide-react';
import PaintSwatches from '../components/PaintSwatches';
import CarStage from '../components/CarStage';
import SiteHeader from '../components/SiteHeader';
import Footer from '../components/Footer';
import ModelStrip from '../components/ModelStrip';
import CompareTray from '../components/CompareTray';
import PhotoGallery from '../components/PhotoGallery';
import { FavoriteButton } from '../components/ui';
import {
  bodyLabel,
  formatPrice,
  formatSpecValue,
  fuelLabel,
  headlineSpecs,
  specRows,
} from '../lib/format';
import { carHash } from '../lib/hash';
import { openStudio } from '../lib/studioStore';

export default function BrowseView({
  car,
  direction,
  loading,
  brandId,
  onBrand,
  query,
  onQuery,
  filters,
  onToggleFilter,
  onClearFilters,
  matches,
  listCars,
  activeFilters,
  onSelectCar,
  onStep,
  compareCars,
  onRemoveCompare,
  onClearCompare,
  onAddCompare,
  favorites,
  onFavorite,
  onImageError,
}) {
  const [paintKey, setPaintKey] = useState('shown');
  useEffect(() => setPaintKey('shown'), [car.slug]);

  const header = (
    <SiteHeader
      browsing
      brandId={brandId}
      onBrand={onBrand}
      query={query}
      onQuery={onQuery}
      filters={filters}
      onToggle={onToggleFilter}
      onClear={onClearFilters}
      resultCount={matches.length}
      activeFilters={activeFilters}
      compareCount={compareCars.length}
    />
  );

  if (!matches.length) {
    return (
      <div className="flex min-h-[100svh] flex-col bg-white">
        {header}
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="w-full max-w-md text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-line text-muted">
              <SearchX size={19} aria-hidden="true" />
            </span>
            <h1 className="mt-5 font-display text-[36px] leading-none">Nothing here yet</h1>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {query.trim() ? `No car matches “${query.trim()}”. ` : ''}
              Try another body type or fuel, or clear everything to see the whole showroom.
            </p>
            <button type="button" onClick={onClearFilters} className="btn-primary mt-6 w-full">
              Clear search and filters
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`flex min-h-[100svh] flex-col bg-white ${compareCars.length ? 'pb-16' : ''}`}>
      {header}

      <main className="flex flex-1 flex-col">
        <CarStage
          car={car}
          direction={direction}
          loading={loading}
          onStep={onStep}
          onImageError={onImageError}
          paintKey={paintKey}
          className="pt-3 sm:pt-4"
        />

        <BrowseInfoBar
          car={car}
          paintKey={paintKey}
          onPaint={setPaintKey}
          favorites={favorites}
          onFavorite={onFavorite}
          onAddCompare={onAddCompare}
          compareCars={compareCars}
          listCars={listCars}
          activeFilters={activeFilters}
          onSelectCar={onSelectCar}
          onStep={onStep}
        />

        <ShowroomDetails car={car} />
      </main>

      <Footer />
      <CompareTray cars={compareCars} onRemove={onRemoveCompare} onClear={onClearCompare} />
    </div>
  );
}

/* The showroom card for the car on the stage: what it is, what makes it
   special, and the figures people actually compare before a test drive. */
function ShowroomDetails({ car }) {
  const cells = [
    { key: 'price', label: 'Price', value: formatPrice(car.price) },
    { key: 'engine', label: 'Engine', value: car.engine },
    { key: 'drivetrain', label: 'Drivetrain', value: car.drivetrain },
    ...specRows(car).map((row) => ({
      key: row.key,
      label: row.label,
      value: formatSpecValue(row),
    })),
  ];

  return (
    <section className="border-t border-line bg-paper/60">
      <div className="mx-auto w-full max-w-[1300px] px-4 py-7 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <h2 className="label">
              The {car.model}, in detail
            </h2>
            <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
              {car.description}
            </p>

            <h3 className="mt-5 text-[11px] tracking-[0.14em] text-muted uppercase">
              Specialities
            </h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-1.5 rounded-chip border border-line bg-white px-2.5 py-1 text-[12.5px] text-ink"
                >
                  <Check size={12} aria-hidden="true" className="shrink-0 text-muted" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-line sm:grid-cols-3 lg:border-l lg:pl-10">
            {cells.map((cell) => (
              <div key={cell.key} className="min-w-0">
                <dt className="text-[10.5px] tracking-[0.13em] text-muted uppercase">
                  {cell.label}
                </dt>
                <dd className="mt-1 text-[13.5px] leading-snug text-ink tabular-nums">
                  {cell.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function BrowseInfoBar({
  car,
  paintKey,
  onPaint,
  favorites,
  onFavorite,
  onAddCompare,
  compareCars,
  listCars,
  activeFilters,
  onSelectCar,
  onStep,
}) {
  const specs = headlineSpecs(car);
  const inCompare = compareCars.some((item) => item.slug === car.slug);

  return (
    <div className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[1300px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-muted">
              <span>{bodyLabel(car.body)}</span>
              <span aria-hidden="true">·</span>
              <span>{fuelLabel(car.fuel)}</span>
              <span aria-hidden="true">·</span>
              <span className="text-ink">{formatPrice(car.price)}</span>
            </div>

            <PaintSwatches
              colors={car.colors}
              value={paintKey}
              onChange={onPaint}
              className="mt-1"
            />

            <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              {specs.map((row) => (
                <span key={row.key} className="text-[15px] text-muted">
                  {row.label}{' '}
                  <span className="font-medium text-ink tabular-nums">{formatSpecValue(row)}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:shrink-0">
            {!inCompare && compareCars.length < 3 && (
              <button
                type="button"
                onClick={() => onAddCompare(car.slug)}
                className="btn-ghost hidden md:inline-flex"
              >
                Add to compare
              </button>
            )}
            {/* The preview opens over this page, so the back button returns here. */}
            <button
              type="button"
              onClick={openStudio}
              aria-label="Open the car in the 3D preview"
              className="btn-ghost !px-3 sm:!px-4"
            >
              <Box size={15} aria-hidden="true" />
              <span className="hidden sm:inline">3D view</span>
            </button>
            <FavoriteButton
              active={favorites.has(car.slug)}
              onToggle={() => onFavorite(car.slug)}
              label={`${car.brand} ${car.model}`}
            />
            <a href={carHash(car.slug)} className="btn-primary flex-1 justify-center lg:flex-none">
              Explore this car
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-4 border-t border-line pt-3">
          <ModelStrip
            cars={listCars}
            activeSlug={car.slug}
            onSelect={onSelectCar}
            onStep={onStep}
            showBrand={activeFilters}
          />
        </div>

        <div className="mt-3 border-t border-line pt-2.5">
          <PhotoGallery car={car} variant="strip" />
        </div>
      </div>
    </div>
  );
}
