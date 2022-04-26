import { TileName, TileType } from "../Types/Tile";
import { TileSprite } from "./TileSprite";
import Phaser, { Math } from "phaser";
import { TileBase } from "./TileBase";
import { CurrencyMatchArgs } from "../Types/MatchArgs";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "1.5rem",
    stroke: "#000",
    strokeThickness: 2
};

export class CurrencyTile extends TileBase {
    tileType: TileType = "currency";
    tileName: TileName = "coin";

    goldValue: number;

    sprite: TileSprite;

    constructor(base: TileBase) {
        super(base.scene, base.id, base.x, base.y, base.column);

        this.goldValue = Math.Between(1, 6);

        this.sprite = new TileSprite(base.scene, this.tileName);
        this.sprite.setOrigin(0.5);
        this.add(this.sprite);

    }

    matchAction = (args?: CurrencyMatchArgs) =>  {
        this.destroy();
    }
}