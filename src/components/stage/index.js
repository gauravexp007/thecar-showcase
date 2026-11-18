/**
 * Renderer registry — the phase-2 seam.
 *
 * CarStage only ever asks this file which renderer to use. To move from the
 * photographed stage to a 3D tour:
 *
 *   1. Add `Stage3D.jsx` next to Stage2D.jsx with the same props:
 *      { car, onImageError }  (plus anything you add, passed through CarStage)
 *   2. Register it below and set ACTIVE_STAGE = 'three'.
 *
 * Nothing else in the app changes: the title, arrows, swipe handling, hotspot
 * layer, loading state and layout all live in CarStage.
 */
import Stage2D from './Stage2D';

export const STAGE_RENDERERS = {
  '2d': Stage2D,
};

export const ACTIVE_STAGE = '2d';

export const STAGE_CONFIG = {
  /** The stage is height-driven: the photo scales to fit this box. */
  maxHeight: 'min(52vh, 560px)',
};
