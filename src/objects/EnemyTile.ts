import { TileName, TileType } from "../Types/Tile";
import { TileSprite } from "./TileSprite";
import Phaser from "phaser";
import { TileBase } from "./TileBase";
import { EnemyMatchArgs } from "../Types/MatchArgs";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "1.5rem",
    stroke: "#000",
    strokeThickness: 5
};

export class EnemyTile extends TileBase {
    tileType: TileType = "enemy";
    tileName: TileName = "skull";

    maxHp: number;
    currentHp: number;
    level: number;
    xpReward: number;
    damage: number;
    spawnedThisTurn: boolean;

    sprite: TileSprite;
    text: Phaser.GameObjects.Text;

    constructor(base: TileBase) {
        super(base.scene, base.id, base.x, base.y, base.column);

        this.maxHp = 5;
        this.currentHp = 5;
        this.level = 3;
        this.xpReward = 4;
        this.damage = 1;
        this.spawnedThisTurn = true;

        this.sprite = new TileSprite(base.scene, this.tileName);
        this.sprite.setOrigin(0.5);
        this.add(this.sprite);

        this.text = new Phaser.GameObjects.Text(base.scene, -(this.displayOriginX), (this.displayOriginY/2)-5, `${this.currentHp}/${this.maxHp}`, textStyle);
        this.text.setDepth(100);
        this.add(this.text);
    }
    
    matchAction = (args?: EnemyMatchArgs): boolean =>  {
        const { damage } = args as EnemyMatchArgs;
        this.currentHp -= damage;
        if (this.currentHp <= 0) {
            this.destroy();
            return true;
        } else {
            this.text.setText(`${this.currentHp}/${this.maxHp}`);
            return false;
        }
    }
}