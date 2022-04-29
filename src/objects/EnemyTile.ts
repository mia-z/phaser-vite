import { TileName, TileType } from "../Types/Tile";
import { TileSprite } from "./TileSprite";
import Phaser from "phaser";
import { TileBase } from "./TileBase";
import Game from "../scenes/Game";

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
    level: number;
    xpReward: number;
    damage: number;
    spawnedThisTurn: boolean;

    sprite: TileSprite;
    text: Phaser.GameObjects.Text;

    get currentHp() {
		return this.data.get("currentHp");
	}

	set currentHp(newCurrentHp: number) {
		this.data.set("currentHp", newCurrentHp);
	}

    constructor(base: TileBase) {
        super(base.scene, base.id, base.x, base.y, base.column);

        this.maxHp = 5;
        this.level = 3;
        this.xpReward = 4;
        this.damage = 1;
        this.spawnedThisTurn = true;

        this.setDataEnabled();

        this.data.set("currentHp", 5);

        this.sprite = new TileSprite(base.scene, this.tileName);
        this.sprite.setOrigin(0.5);
        this.add(this.sprite);

        this.text = new Phaser.GameObjects.Text(base.scene, -(this.displayOriginX), (this.displayOriginY/2)-5, `${this.currentHp}`, textStyle);
        this.text.setDepth(100);
        this.add(this.text);

        this.data.events.on("changedata-currentHp", () => {
            this.text.text = `${this.currentHp}`;
        });
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
                x: { value: game.xpIcon?.x, duration: 400, ease: "Sine" },
                y: { value: game.xpIcon?.y, duration: 400, ease: "Power2" },
                scale: { value: 0.1, duration: 400, ease: "Power2" },
            },
            onComplete: (tween, target) => {
                target.forEach(t => t.destroy());
                return resolve();
            }
        });
    });

    attackAnimation = (delay?: number): Promise<void> => new Promise((resolve, reject) => {
        this.bringToTop(this.sprite);
        this.bringToTop(this.text);
        let tl = this.scene.tweens.add({
            targets: [this.sprite, this.text],
            ease: "Quint.easeInOut",
            duration: 150,
            props: {
                y: { value: "-=50" }
            },
            yoyo: true,
            onComplete: () => {
                //tl.destroy();
                return resolve();
            }
        });
    });
}