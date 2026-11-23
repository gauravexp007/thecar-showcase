// A tiny store, so the two places that offer the 3D view (the showcase hero and
// the showroom bar) can open the same full-screen studio without either view
// having to know about the other.

let open = false;
const listeners = new Set();

const emit = () => listeners.forEach((listener) => listener());

export const openStudio = () => {
  if (open) return;
  open = true;
  emit();
};

export const closeStudio = () => {
  if (!open) return;
  open = false;
  emit();
};

export const getStudioOpen = () => open;

export const subscribeStudio = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
