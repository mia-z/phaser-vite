import { Tile, TileName, TileType } from "../Types/Tile";
import { TileSprite } from "./TileSprite";
import Phaser from "phaser";
import { TileBase } from "./TileBase";
import { HealingMatchArgs } from "../Types/MatchArgs";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "1.5rem",
    stroke: "#000",
    strokeThickness: 2
};

export class HealingTile extends TileBase {
    tileType: TileType = "healing";
    tileName: TileName = "healthPotion";

    healAmount: number;

    sprite: TileSprite;

    constructor(base: TileBase) {
        super(base.scene, base.id, base.x, base.y, base.column);

        this.healAmount = 2;

        this.sprite = new TileSprite(base.scene, this.tileName);
        this.sprite.setOrigin(0.5);
        this.add(this.sprite);
    }

    matchAction = (args?: HealingMatchArgs) =>  {
        
        this.destroy();
    }
}