import Phaser from 'phaser';

export const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'game',
	backgroundColor: '#33A5E7',
	scale: {
		width: 600,
		height: 900,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
			fps: 60,
			gravity: { y: 200 }
		}
	}
};

export default config;
