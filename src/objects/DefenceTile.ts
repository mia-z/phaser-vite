import { TileName, TileType } from "../Types/Tile";
import { TileSprite } from "./TileSprite";
import Phaser from "phaser";
import { TileBase } from "./TileBase";
import Game from "../scenes/Game";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "1.5rem",
    stroke: "#000",
    strokeThickness: 2
};

export class DefenceTile extends TileBase {
    tileType: TileType = "defence";
    tileName: TileName = "shield";

    defenceMod: number;

    sprite: TileSprite;

    constructor(base: TileBase) {
        super(base.scene, base.id, base.x, base.y, base.column);

        this.defenceMod = 1;

        this.sprite = new TileSprite(base.scene, this.tileName);
        this.sprite.setOrigin(0.5);
        this.add(this.sprite);

    }

    destroy = (): Promise<void> | void => new Promise((resolve, reject) => {
        let animatedSprite = this.scene.add.sprite(this.x, this.y, this.tileName);
        animatedSprite.displayHeight = this.height;
        animatedSprite.displayWidth = this.width;
        const game = this.scene as Game;
        super.destroy();
        game.tweens.add({
            targets: animatedSprite,
            props: {
                x: { value: game.defenceIcon?.x, duration: 400, ease: "Sine" },
                y: { value: game.defenceIcon?.y, duration: 400, ease: "Power2" },
                scale: { value: 0.1, duration: 400, ease: "Power2" },
            },
            onComplete: (tween, target) => {
                target.forEach(t => t.destroy());
                return resolve();
            }
        });
    });
}