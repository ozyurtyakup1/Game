// crafting.js
import { RECIPES_BY_ID } from "./data.js";

export function invCount(state, id) {
  return state.inv?.[id] ?? 0;
}

function hasTools(state, tools = []) {
  return tools.every(t => invCount(state, t) > 0); // tools not consumed
}

function hasInputs(state, inputs = {}) {
  return Object.entries(inputs).every(([id, need]) => invCount(state, id) >= need);
}

export function canCraft(state, recipe) {
  return hasTools(state, recipe.tools) && hasInputs(state, recipe.inputs);
}

function spend(state, inputs = {}) {
  for (const [id, need] of Object.entries(inputs)) {
    state.inv[id] = invCount(state, id) - need;
  }
}

function gain(state, outputs = {}) {
  for (const [id, qty] of Object.entries(outputs)) {
    state.inv[id] = invCount(state, id) + qty;
  }
}

// ✅ click Start: spend immediately
export function startCraft(state, recipeId) {
  if (state.active) return false;

  const r = RECIPES_BY_ID[recipeId];
  if (!r) return false;
  if (!canCraft(state, r)) return false;

  spend(state, r.inputs);

  const ms = r.timeSec * 1000;
  state.active = { recipeId, remainingMs: ms, totalMs: ms };
  return true;
}

// ✅ timer finished: give output
function completeCraft(state) {
  const r = RECIPES_BY_ID[state.active.recipeId];
  if (r) gain(state, r.outputs);
  state.active = null;
}

// ✅ called every tick
export function tickCrafting(state, dtMs) {
  if (!state.active) return false;

  state.active.remainingMs -= dtMs;

  if (state.active.remainingMs <= 0) {
    completeCraft(state);
    return true; // changed state
  }

  return false;
}