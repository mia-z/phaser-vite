import { Tile } from "../objects/Tile";
import { TileNames, TileTypes } from "../Types/Tile";
import type { TileName, TileType } from "../Types/Tile";
import Phaser from "phaser";

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class TileFactory {
    scene: Phaser.Scene;
    currentDelta: number = 0;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    GenerateTile = (x: number, y: number, tileType: TileType, tileName: TileName): Tile => {
        const tileToCreate = new Tile(
            this.scene,
            this.currentDelta,
            x * baseTileSide,
            300 + (y * baseTileSide),
            tileName,
            x,
            tileType,
            tileName
        );

        this.currentDelta++;

        return tileToCreate;
    }

    GenerateRandomTile = (x: number, y: number = 200): Tile => {
        const tileTypeIndex = Phaser.Math.Between(0, TileTypes.length-1);

        const tileToCreate = new Tile(
            this.scene,
            this.currentDelta,
            x * baseTileSide,
            y,
            TileNames[tileTypeIndex],
            x,
            TileTypes[tileTypeIndex],
            TileNames[tileTypeIndex]
        );

        this.currentDelta++;

        return tileToCreate;
    }
}

export default TileFactory;

