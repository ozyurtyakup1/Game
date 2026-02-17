export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
export const msToSecCeil = (ms) => Math.ceil(ms / 1000);
export const percent = (remaining, total) =>
  clamp(100 * (1 - remaining / total), 0, 100);