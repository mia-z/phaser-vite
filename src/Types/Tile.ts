import { CombatTile } from "../objects/CombatTile";
import { CurrencyTile } from "../objects/CurrencyTile";
import { DefenceTile } from "../objects/DefenceTile";
import { EnemyTile } from "../objects/EnemyTile";
import { HealingTile } from "../objects/HealingTile";

export const TileNames = [ "sword", "coin", "healthPotion", "shield", "skull" ] as const;
export type TileName = typeof TileNames[number];

export const TileTypes = ["combat", "currency", "healing", "defence", "enemy"] as const;
export type TileType = typeof TileTypes[number];

export type Tile = EnemyTile | CurrencyTile | HealingTile | DefenceTile | CombatTile;

export const isEnemyTile = (t: Tile): t is EnemyTile => {
    return t.tileType === "enemy";
}

export const isHealingTile = (t: Tile): t is HealingTile => {
    return t.tileType === "healing";
}

export const isCurrencyTile = (t: Tile): t is CurrencyTile => {
    return t.tileType === "currency";
}

export const isCombatTile = (t: Tile): t is CombatTile => {
    return t.tileType === "combat";
}

export const isDefenceTile = (t: Tile): t is DefenceTile => {
    return t.tileType === "defence";
}
