export const TileNames = [ "sword", "coin", "healthPotion", "shield", "skull" ] as const;
export type TileName = typeof TileNames[number];

export const TileTypes = ["combat", "currency", "healing", "defence", "enemy"] as const;
export type TileType = typeof TileTypes[number];



