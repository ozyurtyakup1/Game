// ui.js
import { DATA, RECIPES_BY_ID } from "./data.js";
import { canCraft, invCount, startCraft } from "./crafting.js";
import { msToSecCeil, percent } from "./utils.js";

export function bindUI({ getState, setState, render, onSave }) {
  const recipesEl = document.getElementById("recipes");

  recipesEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-start]");
    if (!btn) return;

    // If disabled, do nothing (covers "busy" and "not enough materials")
    if (btn.disabled) return;

    const state = getState();
    const changed = startCraft(state, btn.dataset.start);
    if (changed) {
      setState(state);
      render();
      onSave?.();
    }
  });
}

function reqChip(label, need, have, isTool = false) {
  const ok = have >= need;
  const cls = ok ? "good" : "bad";
  return `
    <div class="reqItem">
      <div class="reqTop">
        <div class="reqName">${label}${isTool ? " (tool)" : ""}</div>
        <div class="reqNeed mono">${isTool ? "" : `x${need}`}</div>
      </div>
      <div class="small">
        You have: <span class="mono ${cls}">${have}</span>
      </div>
    </div>
  `;
}

export function renderAll(state) {
  renderInventory(state);
  renderActiveStatus(state);
  renderRecipes(state);
}

function renderInventory(state) {
  const invEl = document.getElementById("inventory");
  const ids = new Set([...Object.keys(DATA.items), ...Object.keys(state.inv ?? {})]);

  invEl.innerHTML = Array.from(ids).map(id => `
    <div class="invRow">
      <div>${DATA.items[id]?.name ?? id}</div>
      <div class="mono">${Math.floor(invCount(state, id))}</div>
    </div>
  `).join("");
}

function renderActiveStatus(state) {
  const badge = document.getElementById("activeStatus");
  if (!state.active) { badge.textContent = "Idle"; return; }
  const r = RECIPES_BY_ID[state.active.recipeId];
  badge.textContent = `Crafting: ${r ? r.name : state.active.recipeId}`;
}

function renderRecipes(state) {
  const recipesEl = document.getElementById("recipes");

  recipesEl.innerHTML = DATA.recipes.map(r => {
    const active = state.active?.recipeId === r.id;
    const busy = !!state.active && !active;

    const afford = canCraft(state, r);
    const enabled = !busy && !active && afford;

    const btnText = active ? "Crafting..." : (busy ? "Busy" : "Start");

    const reqs = [];
    for (const [id, need] of Object.entries(r.inputs ?? {})) {
      reqs.push(reqChip(DATA.items[id]?.name ?? id, need, Math.floor(invCount(state, id))));
    }
    for (const t of (r.tools ?? [])) {
      reqs.push(reqChip(DATA.items[t]?.name ?? t, 1, Math.floor(invCount(state, t)), true));
    }

    let pct = 0;
    let timeLeft = "";
    if (active) {
      pct = percent(state.active.remainingMs, state.active.totalMs);
      timeLeft = `${msToSecCeil(state.active.remainingMs)}s left`;
    }

    const produces = Object.entries(r.outputs ?? {})
      .map(([id, n]) => `${DATA.items[id]?.name ?? id} x${n}`)
      .join(", ");

    return `
      <div class="recipe">
        <div class="recipeTitle">
          <div>
            <div class="recipeName">${r.name}</div>
            <div class="recipeMeta">Time: ${r.timeSec}s • Produces: ${produces}</div>
          </div>
          <button class="btn" ${enabled ? "" : "disabled"} data-start="${r.id}">
            ${btnText}
          </button>
        </div>

        <div class="reqList">${reqs.join("")}</div>

        <div class="controls">
          <div class="bar"><div style="width:${pct}%"></div></div>
          <div class="mono" style="min-width:90px; text-align:right;">${timeLeft}</div>
        </div>
      </div>
    `;
  }).join("");
}
