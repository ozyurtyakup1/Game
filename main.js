// main.js
import { clamp } from "./utils.js";
import { loadState, saveState, resetState } from "./state.js";
import { tickCrafting } from "./crafting.js";
import { renderAll, bindUI } from "./ui.js";

let state = loadState() ?? resetState();

function render() {
  renderAll(state);
}
function save() {
  saveState(state);
}

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", () => {
  state = resetState();
  render();
  save();
});

// ✅ this makes Start buttons work
bindUI({
  getState: () => state,
  setState: (s) => { state = s; },
  render,
  onSave: save,
});

function tick() {
  const now = Date.now();
  const dt = clamp(now - (state.lastTs ?? now), 0, 500);
  state.lastTs = now;

  tickCrafting(state, dt);

  render();
  save();
}

render();
setInterval(tick, 120);
