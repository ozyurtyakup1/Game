// skills/smithing.recipes.js
export const SMITHING_RECIPES = [
  {
    id: "iron_knife",
    name: "Iron Knife",
    timeSec: 15,
    inputs: { small_iron_blade: 1, leather_strip: 2 },
    tools: ["hammer"],          // later you can add "anvil" etc.
    outputs: { iron_knife: 1 },
  }
];
