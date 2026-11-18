import { useEffect, useState } from 'react';
import CarStage from '../components/CarStage';
import SiteHeader from '../components/SiteHeader';
import SpecPanel from '../components/SpecPanel';
import CompareTray from '../components/CompareTray';
import PhotoGallery from '../components/PhotoGallery';
import Footer from '../components/Footer';
import { browseHash } from '../lib/hash';

export default function DetailView({
  car,
  direction,
  loading,
  onStep,
  compareCars,
  onAddCompare,
  onRemoveCompare,
  onClearCompare,
  favorites,
  onFavorite,
  onImageError,
}) {
  const inCompare = compareCars.some((item) => item.slug === car.slug);
  const [paintKey, setPaintKey] = useState('shown');
  useEffect(() => setPaintKey('shown'), [car.slug]);

  return (
    <div className={`min-h-[100svh] bg-white ${compareCars.length ? 'pb-16' : ''}`}>
      <SiteHeader back compareCount={compareCars.length} />

      <main className="mx-auto w-full max-w-[1500px] px-4 pt-5 pb-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-[12.5px] text-muted">
          <a href={browseHash()} className="hover:text-ink">
            Showroom
          </a>
          <span aria-hidden="true"> / </span>
          <a href={browseHash()} className="hover:text-ink">
            {car.brand}
          </a>
          <span aria-hidden="true"> / </span>
          <span className="text-ink">{car.model}</span>
        </nav>

        <div className="mt-3 grid gap-7 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
          <div className="min-w-0">
            <CarStage
              variant="detail"
              priority
              car={car}
              direction={direction}
              loading={loading}
              onStep={onStep}
              onImageError={onImageError}
              paintKey={paintKey}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[12.5px] text-muted">
              <p>Photographs: {car.photoSource}</p>
              <p className="hidden sm:block">Use ← → to move between models</p>
            </div>

            <PhotoGallery car={car} />
          </div>

          <SpecPanel
            car={car}
            paintKey={paintKey}
            onPaint={setPaintKey}
            favorite={favorites.has(car.slug)}
            onFavorite={onFavorite}
            onCompare={onAddCompare}
            inCompare={inCompare}
            compareFull={compareCars.length >= 3}
          />
        </div>
      </main>

      <Footer />
      <CompareTray cars={compareCars} onRemove={onRemoveCompare} onClear={onClearCompare} />
    </div>
  );
}
