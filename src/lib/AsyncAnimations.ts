import Game from "../scenes/Game";
import { Tile } from "../Types/Tile";

type AnimatePropsBase = {
    scene: Game,
    tile: Tile,
}

export type FloatToAsyncProps = {
    animateTo: Phaser.GameObjects.Sprite,
    tempSprite: string
} & AnimatePropsBase;

export type FadeOutAsyncProps = {

} & AnimatePropsBase;

export const FloatToAsync = (props: FloatToAsyncProps): Promise<void> => new Promise((resolve, reject) => {
    const { scene, animateTo, tile, tempSprite } = props;
    let animatedSprite = scene.add.sprite(tile.x, tile.y, tempSprite);
    animatedSprite.displayHeight = tile.height;
    animatedSprite.displayWidth = tile.width;
    scene.tweens.add({
        targets: animatedSprite,
        props: {
            x: { value: animateTo.x, duration: 400, ease: "Sine" },
            y: { value: animateTo.y, duration: 400, ease: "Power2" },
            scale: { value: 0.2, duration: 400, ease: "Power2" },
        },
        delay: Phaser.Math.Between(0, 250),
        onComplete: (tween, target) => {
            target.forEach(t => t.destroy());
            return resolve();
        }
    });
});

export const FadeOutAsync = (props: FadeOutAsyncProps): Promise<void> => new Promise((resolve, reject) => {

})
