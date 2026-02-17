// state.js
const SAVE_KEY = "basic_carpentry_v1";

export const DEFAULT_STATE = {
  inv: { plank: 12, nails: 10, hammer: 1, crate: 0, stool: 0 },
  active: null, // { recipeId, remainingMs, totalMs }
  lastTs: Date.now(),
};

export function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(SAVE_KEY);
  return structuredClone(DEFAULT_STATE);
}