// data.js
import { ITEMS } from "./items.js";
import { CARPENTRY_RECIPES } from "./skills/carpentry.recipes.js";
import { SMITHING_RECIPES } from "./skills/smithing.recipes.js";

export const DATA = {
  items: ITEMS,
  recipes: [...CARPENTRY_RECIPES, ...SMITHING_RECIPES],
};

export const RECIPES_BY_ID = Object.fromEntries(DATA.recipes.map(r => [r.id, r]));
