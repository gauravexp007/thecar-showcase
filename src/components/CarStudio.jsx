import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { createStudio, STAGE_LABEL } from '../studio/rrStudio';
import { closeStudio, getStudioOpen, subscribeStudio } from '../lib/studioStore';

/* The 3D preview. It opens over whatever page you were on, so the back button
   puts you exactly where you left — same page, same scroll. */
export default function CarStudio() {
  const open = useSyncExternalStore(subscribeStudio, getStudioOpen, getStudioOpen);
  const scrollRef = useRef(null);
  const canvasRef = useRef(null);
  const studioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const gap = window.innerWidth - root.clientWidth;
    const previousPadding = document.body.style.paddingRight;
    root.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      root.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    setReady(false);
    setFailed(false);
    setLoaded(0);
    setProgress(0);
    setTouched(false);

    let cancelled = false;
    let studio = null;
    let onScroll = null;
    const el = scrollRef.current;

    createStudio({
      canvas: canvasRef.current,
      onProgress: (value) => setLoaded(value),
      onReady: () => setReady(true),
      onError: (error) => {
        console.error('[studio] could not start', error);
        setFailed(true);
        setReady(true);
      },
    }).then((instance) => {
      if (!instance) return;
      if (cancelled) {
        instance.dispose();
        return;
      }
      studio = instance;
      studioRef.current = instance;

      onScroll = () => {
        const max = el.scrollHeight - el.clientHeight;
        const value = max > 0 ? el.scrollTop / max : 0;
        instance.setProgress(value);
        setProgress(value);
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      el.scrollTop = 0;
      onScroll();
    });

    return () => {
      cancelled = true;
      if (onScroll) el?.removeEventListener('scroll', onScroll);
      studio?.dispose();
      studioRef.current = null;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeStudio();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="cst"
      role="dialog"
      aria-modal="true"
      aria-label={`${STAGE_LABEL} 3D preview`}
    >
      <div
        ref={scrollRef}
        className="cst-scroll"
        onScroll={() => setTouched(true)}
        onPointerDown={() => setTouched(true)}
      >
        <div className="cst-track">
          <div className="cst-stage">
            <canvas
              ref={canvasRef}
              className="cst-canvas"
              aria-label={`A 3D ${STAGE_LABEL} you can orbit by scrolling and turn by dragging`}
            />

            <div className="cst-vignette" aria-hidden="true" />

            <header className="cst-bar">
              <button type="button" onClick={closeStudio} className="cst-back">
                <ArrowLeft size={15} aria-hidden="true" />
                Back
              </button>
              <p className="cst-meta">
                <span>{STAGE_LABEL}</span>
                <span className="cst-dot" aria-hidden="true" />
                <span>3D preview</span>
              </p>
            </header>

            <div className={`cst-hints ${touched ? 'is-quiet' : ''}`} aria-hidden="true">
              <p className="cst-hint">
                <span className="cst-key">Scroll</span> to orbit
              </p>
              <p className="cst-hint">
                <span className="cst-key">Hold &amp; drag</span> to turn
              </p>
            </div>

            <div className="cst-hud">
              <div className="cst-copy">
                <p className="cst-kicker">The marque index — 3D preview</p>
                <h1 className="cst-title">
                  Ferrari <em>458 Italia</em>
                </h1>
                <p className="cst-lede">
                  A real, full-size car in real time. Scroll and the camera walks a
                  circle around the body; hold and drag to turn it under your hand.
                </p>
              </div>
            </div>

            <div className="cst-meter" aria-hidden="true">
              <span className="cst-meter-fill" style={{ transform: `scaleY(${progress})` }} />
            </div>

            {!ready && (
              <div className="cst-loader">
                <p className="cst-loader-label">Unveiling the car</p>
                <div className="cst-load-track">
                  <span style={{ width: `${Math.round(loaded * 100)}%` }} />
                </div>
                <p className="cst-load-pct">{Math.round(loaded * 100)}%</p>
              </div>
            )}

            {failed && (
              <div className="cst-error">
                <p className="cst-error-title">The car could not be reached</p>
                <p className="cst-error-copy">
                  The preview streams the model from a public 3D library, so it needs a
                  live connection. Reload to try again, or go back to the page.
                </p>
                <div className="cst-error-actions">
                  <button type="button" onClick={() => window.location.reload()} className="cst-back">
                    <RotateCcw size={14} aria-hidden="true" />
                    Reload
                  </button>
                  <button type="button" onClick={closeStudio} className="cst-back">
                    <ArrowLeft size={14} aria-hidden="true" />
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="cst-space" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
