// A tiny store, so the three places that offer the 3D preview (the showcase
// hero, every house in the index, and the showroom bar) can open the same
// full-screen room without any view knowing about another.

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
