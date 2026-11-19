import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CARS, carsOfBrand, getCar } from './data/cars';
import { MARQUES } from './data/marques';
import { carHash, parseHash } from './lib/hash';
import { preloadCarImages } from './lib/preload';
import BrowseView from './views/BrowseView';
import DetailView from './views/DetailView';
import CompareView from './views/CompareView';
import ShowcaseView from './views/ShowcaseView';
import RouteCurtain from './components/RouteCurtain';

const COMPARE_LIMIT = 3;

const readRoute = () => parseHash(window.location.hash);
const matchesQuery = (car, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${car.brand} ${car.model} ${car.body} ${car.fuel}`.toLowerCase().includes(q);
};

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [selectedSlug, setSelectedSlug] = useState(() => {
    const initial = readRoute();
    return initial.name === 'detail' ? initial.slug : CARS[0].slug;
  });
  const [brandId, setBrandId] = useState(() => {
    const initial = readRoute();
    return initial.name === 'detail' ? getCar(initial.slug).brandId : CARS[0].brandId;
  });
  const [direction, setDirection] = useState(1);
  const [compareSlugs, setCompareSlugs] = useState([]);
  const [favorites, setFavorites] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ body: null, fuel: null });
  const [loading, setLoading] = useState(true);

  // Moving between the showcase and the showroom goes through a curtain so the
  // two halves of the site feel like one place rather than two pages.
  const reduced = useReducedMotion();
  const [curtain, setCurtain] = useState(null);
  const curtainTimer = useRef(null);
  const routeRef = useRef(route);
  const pendingRoute = useRef(null);

  const selectedCar = getCar(selectedSlug) || CARS[0];
  const activeFilters = Boolean(query.trim() || filters.body || filters.fuel);
  const brandCars = useMemo(() => carsOfBrand(brandId), [brandId]);

  const matches = useMemo(
    () =>
      CARS.filter(
        (car) =>
          matchesQuery(car, query) &&
          (!filters.body || car.body === filters.body) &&
          (!filters.fuel || car.fuel === filters.fuel),
      ),
    [query, filters],
  );

  const listCars = activeFilters ? matches : brandCars;
  const compareCars = compareSlugs.map((slug) => getCar(slug)).filter(Boolean);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 460);
    return () => window.clearTimeout(timer);
  }, []);

  const applyRoute = useCallback((next) => {
    routeRef.current = next;
    setRoute(next);
    if (next.name === 'detail') {
      const car = getCar(next.slug);
      if (car) {
        setSelectedSlug(car.slug);
        setBrandId(car.brandId);
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(window.location.hash);
      const crossing = (routeRef.current.name === 'showcase') !== (next.name === 'showcase');

      if (!crossing || reduced || curtainTimer.current) {
        applyRoute(next);
        return;
      }

      pendingRoute.current = next;
      setCurtain({ phase: 'in', label: next.name === 'showcase' ? 'The showcase' : 'The showroom' });

      curtainTimer.current = window.setTimeout(() => {
        applyRoute(pendingRoute.current);
        setCurtain({ phase: 'out', label: next.name === 'showcase' ? 'The showcase' : 'The showroom' });
        curtainTimer.current = window.setTimeout(() => {
          setCurtain(null);
          curtainTimer.current = null;
        }, 800);
      }, 600);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      if (curtainTimer.current) window.clearTimeout(curtainTimer.current);
    };
  }, [applyRoute, reduced]);

  useEffect(() => {
    if (!activeFilters || matches.length === 0) return;
    if (matches.some((car) => car.slug === selectedSlug)) return;
    setDirection(1);
    setSelectedSlug(matches[0].slug);
    setBrandId(matches[0].brandId);
  }, [activeFilters, matches, selectedSlug]);

  useEffect(() => {
    const index = listCars.findIndex((car) => car.slug === selectedCar.slug);
    if (index < 0 || listCars.length < 2) return;
    preloadCarImages(listCars[(index + 1) % listCars.length]);
    preloadCarImages(listCars[(index - 1 + listCars.length) % listCars.length]);
  }, [listCars, selectedCar.slug]);

  useEffect(() => {
    document.title =
      route.name === 'showcase'
        ? `Goldenline — ${MARQUES.length} marques, explored`
        : route.name === 'detail'
          ? `${selectedCar.brand} ${selectedCar.model} — Goldenline`
          : route.name === 'compare'
            ? 'Compare cars — Goldenline'
            : 'Goldenline — explore cars';
  }, [route.name, selectedCar]);

  const handleBrand = (id) => {
    setBrandId(id);
    setQuery('');
    setFilters({ body: null, fuel: null });
    const first = carsOfBrand(id)[0];
    if (first && first.slug !== selectedSlug) {
      setDirection(1);
      setSelectedSlug(first.slug);
    }
  };

  const handleSelectCar = (slug) => {
    const car = getCar(slug);
    if (!car) return;
    setBrandId(car.brandId);
    if (car.slug !== selectedSlug) {
      setDirection(1);
      setSelectedSlug(car.slug);
      if (route.name === 'detail') window.location.hash = carHash(car.slug);
    }
  };

  const handleStep = useCallback(
    (delta) => {
      if (!listCars.length) return;
      const index = listCars.findIndex((car) => car.slug === selectedCar.slug);
      const next = listCars[index < 0 ? 0 : (index + delta + listCars.length) % listCars.length];
      setDirection(delta);
      setSelectedSlug(next.slug);
      setBrandId(next.brandId);
      if (route.name === 'detail') window.location.hash = carHash(next.slug);
    },
    [listCars, selectedCar.slug, route.name],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = event.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (event.target?.isContentEditable) return;
      if (route.name === 'compare') return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleStep(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleStep(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleStep, route.name]);

  const handleToggleFilter = (kind, value) => {
    setFilters((prev) => ({ ...prev, [kind]: prev[kind] === value ? null : value }));
  };

  const handleClearFilters = () => {
    setQuery('');
    setFilters({ body: null, fuel: null });
  };

  const addCompare = (slug) => {
    setCompareSlugs((prev) =>
      prev.includes(slug) || prev.length >= COMPARE_LIMIT ? prev : [...prev, slug],
    );
  };

  const removeCompare = (slug) => {
    setCompareSlugs((prev) => prev.filter((item) => item !== slug));
  };

  const toggleFavorite = (slug) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  let view;

  if (route.name === 'showcase') {
    view = <ShowcaseView compareCount={compareCars.length} />;
  } else if (route.name === 'compare') {
    view = (
      <CompareView
        cars={compareCars}
        onRemove={removeCompare}
        onClear={() => setCompareSlugs([])}
      />
    );
  } else if (route.name === 'detail') {
    view = (
      <DetailView
        car={selectedCar}
        direction={direction}
        loading={loading}
        onStep={handleStep}
        compareCars={compareCars}
        onAddCompare={addCompare}
        onRemoveCompare={removeCompare}
        onClearCompare={() => setCompareSlugs([])}
        favorites={favorites}
        onFavorite={toggleFavorite}
      />
    );
  } else {
    view = (
      <BrowseView
        car={selectedCar}
        direction={direction}
        loading={loading}
        brandId={brandId}
        onBrand={handleBrand}
        query={query}
        onQuery={setQuery}
        filters={filters}
        onToggleFilter={handleToggleFilter}
        onClearFilters={handleClearFilters}
        matches={matches}
        listCars={listCars}
        activeFilters={activeFilters}
        onSelectCar={handleSelectCar}
        onStep={handleStep}
        compareCars={compareCars}
        onAddCompare={addCompare}
        onRemoveCompare={removeCompare}
        onClearCompare={() => setCompareSlugs([])}
        favorites={favorites}
        onFavorite={toggleFavorite}
      />
    );
  }

  return (
    <>
      {view}
      {curtain && <RouteCurtain phase={curtain.phase} label={curtain.label} />}
    </>
  );
}
