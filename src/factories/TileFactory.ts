import { TileBase } from "../objects/TileBase";
import { Tile, TileTypes } from "../Types/Tile";
import Phaser from "phaser";
import { EnemyTile } from "../objects/EnemyTile";
import { CombatTile } from "../objects/CombatTile";
import { HealingTile } from "../objects/HealingTile";
import { DefenceTile } from "../objects/DefenceTile";
import { CurrencyTile } from "../objects/CurrencyTile";

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class TileFactory {
    scene: Phaser.Scene;
    currentDelta: number = 0;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    GenerateRandomTile = (x: number, y: number = 200): Tile => {
        this.currentDelta++;

        const tileType = TileTypes[Phaser.Math.RND.between(0, TileTypes.length-1)];
        const baseValues: TileBase = new TileBase(
            this.scene, //Main Scene
            this.currentDelta, //Current delta of this factory - used to generate a unique value
            x * baseTileSide, //The x position
            y, //the y position
            x, //The column
        );

        switch (tileType) {
            case "enemy": return new EnemyTile(baseValues);
            case "combat": return new CombatTile(baseValues);
            case "healing": return new HealingTile(baseValues);
            case "defence": return new DefenceTile(baseValues);
            case "currency": return new CurrencyTile(baseValues);
            default: throw new Error("INVALID TILE TYPE :(");
        }
    }
}

export default TileFactory;

