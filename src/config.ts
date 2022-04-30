import Phaser from "phaser";

export const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: "game",
	backgroundColor: "",
	transparent: true,
	scale: {
		mode: Phaser.Scale.FIT,
		width: 600,
		height: 900,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	// physics: {
	// 	default: "arcade",
	// 	arcade: {
	// 		debug: false,
	// 		fps: 60,
	// 		gravity: { y: 200 }
	// 	}
	// },
	physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 1
            },
        }
    },
	seed: ["123"]
};

export default config;
