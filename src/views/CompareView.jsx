import { ArrowLeft } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import CompareTable from '../components/CompareTable';
import Footer from '../components/Footer';
import { browseHash } from '../lib/hash';

export default function CompareView({ cars, onRemove, onClear }) {
  return (
    <div className="min-h-[100svh] bg-white">
      <SiteHeader back compareCount={cars.length} />

      <main className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Side by side</p>
            <h1 className="mt-1 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-none tracking-[-0.01em]">
              Compare
            </h1>
          </div>
          {cars.length > 0 && (
            <button type="button" onClick={onClear} className="btn-ghost">
              Clear all
            </button>
          )}
        </div>

        {cars.length === 0 ? (
          <div className="mt-10 max-w-md">
            <p className="text-[15px] leading-relaxed text-muted">
              Nothing selected yet. Add up to three cars from the showroom and their figures will
              line up here, with the strongest value in each row marked.
            </p>
            <a href={browseHash()} className="btn-primary mt-5">
              <ArrowLeft size={15} aria-hidden="true" />
              Back to the showroom
            </a>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <CompareTable cars={cars} onRemove={onRemove} />
            </div>
            <p className="mt-3 text-[12.5px] text-muted">
              {cars.length === 1
                ? 'Add one more car to see which figures win.'
                : '“Best” marks the strongest figure in the row — lowest price or time, highest otherwise.'}
            </p>
            <a
              href={browseHash()}
              className="mt-6 inline-flex text-[13px] text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
            >
              Keep browsing
            </a>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
