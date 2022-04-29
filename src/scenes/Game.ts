import Phaser, { GameObjects, Geom } from 'phaser';
import { ProgressBar } from '../components/ProgressBar';
import TileFactory from '../factories/TileFactory';
import { EnemyTile } from '../objects/EnemyTile';
import { HealingTile } from '../objects/HealingTile';
import { TileBase } from '../objects/TileBase';
import { isCombatTile, isCurrencyTile, isDefenceTile, isEnemyTile, isHealingTile, Tile, TileType } from '../Types/Tile';
import State from '../State';

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "2rem",
    stroke: "#000",
    strokeThickness: 2
};

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export default class Game extends Phaser.Scene {
	state?: State;

	collisionGroup?: Phaser.Physics.Arcade.Group;
	tileFactory: TileFactory;

	isDragging: boolean = false;

	dragPoints: Array<{ x: number, y: number }> = [];
	selectedTiles: Array<Tile> = [];
	dragLine?: Phaser.GameObjects.Graphics;
	dragLineFill?: Phaser.GameObjects.Graphics;
	dragLinePath?: Phaser.Curves.Path;
	startingTileType?: TileType;

	tiles: Tile[] = [];
	tileBoxGraphic?: Phaser.GameObjects.Rectangle;

	healthBar?: ProgressBar;
	healthIcon?: Phaser.GameObjects.Sprite;
	defenceBar?: ProgressBar;
	defenceIcon?: Phaser.GameObjects.Sprite;
	goldText?: Phaser.GameObjects.Text;
	goldIcon?: Phaser.GameObjects.Sprite;
	xpText?: Phaser.GameObjects.Text;
	xpIcon?: Phaser.GameObjects.Sprite;

	get playerHp() {
		return this.data.get("playerHp");
	}

	set playerHp(newHp: number) {
		this.data.set("playerHp", newHp);
	}

	get playerCurrentHp() {
		return this.data.get("playerCurrentHp");
	}

	set playerCurrentHp(newCurrentHp: number) {
		this.data.set("playerCurrentHp", newCurrentHp);
	}

	get playerShield() {
		return this.data.get("playerShield");
	}

	set playerShield(newShield: number) {
		this.data.set("playerShield", newShield);
	}

	get playerCurrentShield() {
		return this.data.get("playerCurrentShield");
	}

	set playerCurrentShield(newCurrentShield: number) {
		this.data.set("playerCurrentShield", newCurrentShield);
	}

	get playerXp() {
		return this.data.get("playerXp");
	}

	set playerXp(newXp: number) {
		this.data.set("playerXp", newXp);
	}

	get playerLevel() {
		return this.data.get("playerLevel");
	}

	set playerLevel(newLevel: number) {
		this.data.set("playerLevel", newLevel);
	}

	get playerDamage() {
		return this.data.get("playerDamage");
	}

	set playerDamage(newDamage: number) {
		this.data.set("playerDamage", newDamage);
	}

	get playerGold() {
		return this.data.get("playerGold");
	}

	set playerGold(newGold: number) {
		this.data.set("playerGold", newGold);
	}

	constructor() {
		super('GameScene');
		this.tileFactory = new TileFactory(this);
	}

	init = () => {
		this.initializeDataAccessors();
	}
	
	preload = () => {
		this.load.image("coin", "assets/coin.svg");
		this.load.image("sword", "assets/gladius.svg");
		this.load.image("healthPotion", "assets/health-potion.svg");
		this.load.image("shield", "assets/shield.svg");
		this.load.image("skull", "assets/skull-white.svg");
		this.load.image("healthCross", "assets/health-cross.svg");
		this.load.image("xpIcon", "assets/xp-icon.svg");
		this.load.image("defenceIcon", "assets/defence-icon.svg");
		this.load.image("moneyBag", "assets/money-bag.svg");
		this.load.spritesheet("slash", "assets/slashes_meme.png", { frameWidth: 64, frameHeight: 64});
	}

	create = () => {
		this.state = new State(this);
this.state.on("statechange", (states: State) => console.log(states.state))
		this.buildUi();
		this.buildGrid();
		this.registerCollisions();
		this.registerHandlers();
		this.registerAnimations();

		this.state.start("playerTurn");
	}

	update = (time: number, delta: number) => {
		if (this.input.pointer1.isDown) {			
			
		}
	}

	/** FRONT END FUNCTIONS */
	buildUi = () => {
		this.healthBar = new ProgressBar(this, 20, 20, Math.floor(this.sys.canvas.width/2), 50, 0x27ae60, 0x2ecc71);
		this.add.existing(this.healthBar);
		this.healthIcon = this.add.sprite(Math.floor(this.sys.canvas.width/2) + 50, 45, "healthCross").setOrigin(0.5).setTintFill(0x27ae60);
		this.healthIcon.displayWidth = 45;
		this.healthIcon.displayHeight = 45;
		this.healthIcon.name = "healthIcon";

		this.defenceBar = new ProgressBar(this, 20, 90, Math.floor(this.sys.canvas.width/2), 50, 0x2980b9, 0x3498db, 10);
		this.add.existing(this.defenceBar);
		this.defenceIcon = this.add.sprite(Math.floor(this.sys.canvas.width/2) + 50, 115, "defenceIcon").setOrigin(0.5).setTintFill(0x2980b9);
		this.defenceIcon.displayWidth = 45;
		this.defenceIcon.displayHeight = 45;
		this.defenceIcon.name = "defenceIcon";

		this.goldText = new Phaser.GameObjects.Text(this, 60, 150, `${this.data.get("playerGold")}`, textStyle);
		this.add.existing(this.goldText);
		this.goldIcon = new Phaser.GameObjects.Sprite(this, 20, 150, "moneyBag").setOrigin(0).setTintFill(0xf39c12);
		this.add.existing(this.goldIcon);
		this.goldIcon.displayWidth = 45;
		this.goldIcon.displayHeight = 45;
		this.goldIcon.name = "goldIcon";

		this.xpText = new Phaser.GameObjects.Text(this, 60 + Math.floor(this.sys.canvas.width/4), 150, `${this.data.get("playerXp")}`, textStyle);
		this.add.existing(this.xpText);
		this.xpIcon = new Phaser.GameObjects.Sprite(this, 20 + Math.floor(this.sys.canvas.width/4), 150, "xpIcon").setOrigin(0).setTintFill(0xc0392b);
		this.add.existing(this.xpIcon);
		this.xpIcon.displayWidth = 45;
		this.xpIcon.displayHeight = 45;
		this.xpIcon.name = "xpIcon";

		this.tileBoxGraphic = new Phaser.GameObjects.Rectangle(this, 0, 300, baseTileSide*6, baseTileSide*6, 0x2C3E50).setOrigin(0).setDepth(-1).setName("container-mask");
		this.add.existing(this.tileBoxGraphic);
	}

	buildGrid = () => {
		let count = 0;
		for (let x = 0; x < gridSize; x++) {
			for (let y = 0; y < gridSize; y++) {
				var newTile = this.tileFactory.GenerateRandomTile(x, y);
				if (isEnemyTile(newTile)) {
					newTile.spawnedThisTurn = false;
				}
				this.tiles.push(newTile);
				this.add.existing(this.tiles[count]);
				count++;
			}
		}
	}

	updateDragLine = (remove: boolean = false) => {
		if (remove) {
			this.selectedTiles.pop();
			this.dragPoints.pop();
		}
		this.dragLine?.clear();
		this.dragLine?.lineStyle(16, 0x000000, 1);
		this.dragLineFill?.clear();
		this.dragLineFill?.lineStyle(8, 0xFFFFFF, 1);
		this.dragLinePath = new Phaser.Curves.Path(this.selectedTiles[0].x, this.selectedTiles[0].y);
		this.dragLinePath.splineTo(this.dragPoints.map(point => { return new Phaser.Math.Vector2(point.x,point.y) }));
		this.dragLinePath.draw(this.dragLine as Phaser.GameObjects.Graphics, 128);
		this.dragLinePath.draw(this.dragLineFill as Phaser.GameObjects.Graphics, 128);
	}

	dimTiles = (tileType: TileType) => {
		if (this.checkMatchingTileType(tileType)) {
			this.tiles.filter(x => !this.checkMatchingTileType(x.tileType)).forEach((tile, index) => tile.emit("dim"));
		}
	}

	undimTiles = (tileType: TileType) => {
		if (this.checkMatchingTileType(tileType)) {
			this.tiles.filter(x => !this.checkMatchingTileType(x.tileType)).forEach((tile, index) => tile.emit("undim"));
		}
	}
	/** FRONT END FUNCTIONS END */

	/** INITIALIZERS */
	initializeDataAccessors = () => {
		this.data.set("playerHp", 20);
		this.events.on("changedata-playerHp", (gameObject: Phaser.GameObjects.GameObject, value: number) => {
			this.healthBar?.setMax(value);
		});
		this.data.set("playerCurrentHp", 20);
		this.events.on("changedata-playerCurrentHp", (gameObject: Phaser.GameObjects.GameObject, value: number) => {
			this.healthBar?.setProgress(value);
		});
		this.data.set("playerShield", 10);
		this.events.on("changedata-playerShield", (gameObject: Phaser.GameObjects.GameObject, value: number) => {
			this.defenceBar?.setMax(value);
		});
		this.data.set("playerCurrentShield", 10);
		this.events.on("changedata-playerCurrentShield", (gameObject: Phaser.GameObjects.GameObject, value: number) => {
			this.defenceBar?.setProgress(value);
		});
		this.data.set("playerXp", 0);
		this.events.on("changedata-playerXp", (gameObject: Phaser.GameObjects.GameObject, value: number) => {
			this.xpText?.setText(value.toString());
		});
		this.data.set("playerGold", 0);
		this.events.on("changedata-playerGold", (gameObject: Phaser.GameObjects.GameObject, value: number) => {
			this.goldText?.setText(value.toString());
		});
		this.data.set("playerLevel", 1);
		this.data.set("playerDamage", 1);
	}
	/** INITIALIZERS END */

	/** FUNCTION REGISTERS */
	registerCollisions = () => {
		this.physics.world.checkCollision.up = false;
		this.physics.world.checkCollision.left = false;
		this.physics.world.checkCollision.right = false;
		this.physics.world.gravity.y = 3300;

		this.collisionGroup = this.physics.add.group({
			defaultKey: "tile",
			bounceY: 0,
			collideWorldBounds: true
		});

		this.collisionGroup.addMultiple(this.tiles);

		this.physics.add.collider(this.collisionGroup, this.collisionGroup, (t1, t2) => {
			var b1 = t1.body;
			var b2 = t2.body;

			if (Math.floor(b1.y) > Math.floor(b2.y)) {
				b2.y += (b1.top - b2.bottom);
				b2.stop();
			}
			else {
				b1.y += (b2.top - b1.bottom);
				b1.stop();
			}
		});
	}

	registerHandlers = () => {
		this.events.on("setStartingDragTile", (tile: Tile) => {
			if (this.state?.state === "playerTurn") {
				this.startingTileType = tile.tileType;
				this.selectedTiles.push(tile);
				this.dragPoints.push({ x: tile.x, y: tile.y });
				this.dragLine = this.add.graphics();
				this.dragLineFill = this.add.graphics();
				this.dimTiles(this.startingTileType as TileType);
			}
		});

		this.events.on("draggingIntersect", (tile: Tile) => {
			if (this.state?.state === "playerTurn") {
				if (this.selectedTiles.length < 1) return;
				if (!this.selectedTiles.some(t => t.id == tile.id)) {
					let xDistanceDiff = tile.x - this.dragPoints[this.dragPoints.length - 1].x;
					let yDistanceDiff = tile.y - this.dragPoints[this.dragPoints.length - 1].y;
					if (yDistanceDiff > baseTileSide*1.2 || yDistanceDiff < -(baseTileSide*1.2) || xDistanceDiff > baseTileSide*1.2 || xDistanceDiff < -(baseTileSide*1.2)) {
						console.log("DISTANCE TOO LARGE");
					} else {
						this.checkIntersectedTile(tile);
						this.updateDragLine();
					}
				} else if (this.selectedTiles.length > 1 && tile.id == this.selectedTiles[this.selectedTiles.length-2].id) {
					this.updateDragLine(true);
				}
			}
		});

		this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
			if (this.state?.state === "playerTurn") {
				if (this.selectedTiles.length > 2) {
					this.state?.next();
				}
				this.selectedTiles = [];
				this.dragPoints = [];
				this.dragLine?.destroy();
				this.dragLinePath?.destroy();
				this.dragLineFill?.destroy();
				this.undimTiles(this.startingTileType as TileType);
			}
		});
	}

	registerAnimations = () => {
		this.anims.create({
			key: "slash",
			frames: this.anims.generateFrameNumbers("slash", { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] })
		});
	}
	/** FUNCTION REGISTERS END */

	/** LOGIC FUNCTIONS */
	checkMatchingTileType = (tileType: TileType) => {
		switch(tileType) {
			case "combat": if (this.startingTileType === "enemy" || this.startingTileType === "combat") return true;
			case "enemy": if (this.startingTileType === "enemy" || this.startingTileType === "combat") return true;
			case "currency": if (this.startingTileType == tileType) return true;
			case "defence": if (this.startingTileType == tileType) return true;
			case "healing": if (this.startingTileType == tileType) return true;
		}
	}
	
	checkIntersectedTile = (tile: Tile) => {
		if (this.checkMatchingTileType(tile.tileType)) {
			this.selectedTiles.push(tile);
			this.dragPoints.push({ x: tile.x, y: tile.y });
		}
	}
	/** LOGIC FUNCTIONS END*/
}
