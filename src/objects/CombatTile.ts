import { TileName, TileType } from "../Types/Tile";
import { TileSprite } from "./TileSprite";
import Phaser from "phaser";
import { TileBase } from "./TileBase";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "1.5rem",
    stroke: "#000",
    strokeThickness: 2
};

export class CombatTile extends TileBase {
    tileType: TileType = "combat";
    tileName: TileName = "sword";

    damage: number;

    sprite: TileSprite;

    constructor(base: TileBase) {
        super(base.scene, base.id, base.x, base.y, base.column);

        this.damage = 1;

        this.sprite = new TileSprite(base.scene, this.tileName);
        this.sprite.setOrigin(0.5);
        this.add(this.sprite);

    }
}