export const CARPENTRY_RECIPES = [
  {
    id: "wooden_crate",
    name: "Wooden Crate",
    timeSec: 12,
    inputs: { plank: 5, nails: 3 },
    tools: ["hammer"],
    outputs: { crate: 1 },
  },
  {
    id: "stool",
    name: "Stool",
    timeSec: 9,
    inputs: { plank: 4, nails: 2 },
    tools: ["hammer"],
    outputs: { stool: 1 },
  },
  {
    id: "wooden_chest",
    name: "Wooden Chest",
    timeSec: 18,
    inputs: { plank: 12, nails: 6 },
    tools: ["hammer"],
    outputs: { chest: 1 },
  },
  {
    id: "wooden_table",
    name: "Wooden Table",
    timeSec: 22,
    inputs: { plank: 14, nails: 8 },
    tools: ["hammer"],
    outputs: { table: 1 },
  },
  {
    id: "wooden_bed",
    name: "Wooden Bed",
    timeSec: 28,
    inputs: { plank: 18, nails: 10 },
    tools: ["hammer"],
    outputs: { bed: 1 },
  },

  // Optional "tool craft" (still basic; tools are items too)
  {
    id: "wooden_hammer_handle",
    name: "Hammer Handle",
    timeSec: 10,
    inputs: { plank: 2 },
    tools: [],
    outputs: { hammer_handle: 1 },
  },
];