import Phaser, { GameObjects, Geom } from 'phaser';
import { Tile } from '../objects/Tile';

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);
var tiles: GameObjects.Rectangle[][] = [];

let elapsed = 0;

export default class Game extends Phaser.Scene {
	constructor() {
		super('GameScene');
	}

	init = () => {
		
		
	}

	preload = () => {
		
	}

	create = () => {
		this.add.grid(0, 0, 600, 600, baseTileSide, baseTileSide, 0x000, 1, 0xFFF, 1).setOrigin(0);
		for (let x = 0; x < gridSize; x++) {
			tiles[x] = [];
			for (let y = 0; y < gridSize; y++) {
				tiles[x][y] = this.add
					.rectangle(
						x * baseTileSide,
						y * baseTileSide,
						baseTileSide,
						baseTileSide,
						0xFF0000,
						1
					)
					.setInteractive()
					.on("pointerdown", (event: any) => tiles[x][y].fillColor = 0xFFFF00)
					.on("pointermove", (event: any) => console.log(event))
					.setOrigin(0);

			}
		}
	}

	drawn = false;
	update = (time: number, delta: number) => {
		if (!this.drawn) {
			this.drawPath();
			this.drawn = true;
		}
	}

	drawPath = () => {

		// const tl = this.randomTile(1, 4, 1, 4);  
		// const tr = this.randomTile(5, 9, 1, 4);
		// const bl = this.randomTile(1, 4, 5, 9);
		// const br = this.randomTile(5, 9, 5, 9);

		// // tl.fillStyle(0xFFFFFF, 1).fillRect(0, 0, baseTileSide, baseTileSide);
		// // tr.fillStyle(0xFFFFFF, 1).fillRect(0, 0, baseTileSide, baseTileSide);
		// // bl.fillStyle(0xFFFFFF, 1).fillRect(0, 0, baseTileSide, baseTileSide);
		// // br.fillStyle(0xFFFFFF, 1).fillRect(0, 0, baseTileSide, baseTileSide);

		// tl.fillColor = 0xFFFFFF;
		// tr.fillColor = 0xFFFFFF;
		// bl.fillColor = 0xFFFFFF;
		// br.fillColor = 0xFFFFFF;

		// let tllg = new Phaser.Geom.Line(tl.x + (baseTileSide / 2), tl.y + (baseTileSide / 2), tr.x + (baseTileSide / 2), tr.y + (baseTileSide / 2));
		// let tll = this.add.graphics().strokeLineShape(tllg).lineStyle(1, 0x00FF00, 1);
		
		// let trlg = new Phaser.Geom.Line(tr.x + (baseTileSide / 2), tr.y + (baseTileSide / 2), br.x + (baseTileSide / 2), br.y + (baseTileSide / 2));
		// let trl = this.add.graphics().strokeLineShape(trlg).lineStyle(1, 0x00FF00, 1);

		// let brlg = new Phaser.Geom.Line(br.x + (baseTileSide / 2), br.y + (baseTileSide / 2), bl.x + (baseTileSide / 2), bl.y + (baseTileSide / 2));
		// let brl = this.add.graphics().strokeLineShape(brlg).lineStyle(1, 0x00FF00, 1);

		// let bllg = new Phaser.Geom.Line(bl.x + (baseTileSide / 2), bl.y + (baseTileSide / 2), tl.x + (baseTileSide / 2), tl.y + (baseTileSide / 2));
		// let bll = this.add.graphics().strokeLineShape(bllg).lineStyle(1, 0x00FF00, 1);

		// const intersectors = [
		// 	tllg, trlg, brlg, bllg
		// ];
		
		// let prevTile = null;

		// for (let x = 0; x < gridSize; x++) {
		// 	for (let y = 0; y < gridSize; y++) {
		// 		if (intersectors.some(lineGeometry => Geom.Intersects.LineToRectangle(lineGeometry, new Phaser.Geom.Rectangle(tiles[x][y].x, tiles[x][y].y, tiles[x][y].width * 0.9, tiles[x][y].height * 0.9)))) {
		// 			tiles[x][y].fillColor = 0xFFFFFF;
		// 			if (!prevTile) {	
		// 				prevTile = tiles[x][y];
		// 			} else {
		// 				//this.add.graphics().strokeLineShape(new Phaser.Geom.Line(prevTile.x + baseTileSide / 2, prevTile.y + baseTileSide / 2, tiles[x][y].x + baseTileSide / 2, tiles[x][y].y  + baseTileSide / 2));
		// 				prevTile = tiles[x][y];
		// 			}
		// 		}
		// 	}
		// }
	}

	randomTile = (xFrom: number = 2, xTo: number = 9, yFrom: number = 2, yTo: number = 9) => {
		var xCoord: number = Phaser.Math.Between(xFrom, xTo);
		var yCoord: number = Phaser.Math.Between(yFrom, yTo);
		return tiles[xCoord][yCoord];
	}
}
