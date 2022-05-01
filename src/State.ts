import FSM from "phaser3-rex-plugins/plugins/fsm";
import { FloatToAsync } from "./lib/AsyncAnimations";
import { EnemyTile } from "./objects/EnemyTile";
import Game from "./scenes/Game";
import { isCombatTile, isCurrencyTile, isDefenceTile, isEnemyTile, isHealingTile, Tile, TileType } from "./Types/Tile";

export default class State extends FSM {
    game: Game;

    tilesToRemove: Array<Tile>;

    constructor(game: Game) {
        super();
        this.game = game;

        this.tilesToRemove = [];
    }
    
    next_playerTurn = () => "tileActions";
    enter_playerTurn = () => {
        console.log(this.game.tiles);
    }
    exit_playerTurn = () => { /**/}

    next_tileActions = () => "removeAndReplaceTile";
    enter_tileActions = () => {
        const damageMod = this.game.selectedTiles.filter(x => x.tileType == "combat").length; //Change this to a reducer at some point
        this.game.selectedTiles.forEach((tile, index) => {
            if (isEnemyTile(tile)) {
                tile.currentHp -= damageMod + this.game.playerDamage;
                
                if (tile.currentHp <= 0) {
                    this.game.playerXp += tile.xpReward;
                    this.tilesToRemove.push(tile);
                } else {

                }
            }

            if (isHealingTile(tile)) {
                this.game.playerCurrentHp += tile.healAmount;
                if (this.game.playerCurrentHp > this.game.playerHp) {
                    this.game.playerCurrentHp = this.game.playerHp;
                } else {
                    tile.shouldAnimate = true;
                }

                this.tilesToRemove.push(tile);
            }

            if (isCombatTile(tile)) {
                this.tilesToRemove.push(tile);
            }

            if (isCurrencyTile(tile)) {
                this.game.playerGold += tile.goldValue;
                tile.shouldAnimate = true;

                this.tilesToRemove.push(tile);
            }

            if (isDefenceTile(tile)) {
                this.game.playerCurrentShield += tile.defenceMod;
                if (this.game.playerCurrentShield > this.game.playerShield) {
                    this.game.playerCurrentShield = this.game.playerShield;
                } else {
                    tile.shouldAnimate = true;
                }

                this.tilesToRemove.push(tile);
            }
        });

        this.next();
    }
    exit_tileActions = () => { /**/}

    next_removeAndReplaceTile = () => "enemyTurn";
    enter_removeAndReplaceTile = async () => {
        const destroyPromises: Array<Promise<void>> = [];

        this.tilesToRemove.forEach(async (tile, index) => {
            this.game.tiles = [ ...this.game.tiles.filter(x => x.id !== tile.id)]; //is this the most reasonable/efficient way to do this?
            destroyPromises.push(tile.destroy() as Promise<void>);

            var replacementTile = this.game.tileFactory.GenerateRandomTile(tile.column);
            this.game.tiles.push(replacementTile);
            this.game.tilesLayer?.add(this.game.tiles[this.game.tiles.length-1]);
            this.game.matter.add.gameObject(this.game.tiles[this.game.tiles.length-1]);
            //this.game.collisionGroup?.add(this.game.tiles[this.game.tiles.length-1]);
        });
        await Promise.all(destroyPromises);
        this.next();
    }
    exit_removeAndReplaceTile = () => { this.tilesToRemove = [];  }

    next_enemyTurn = () => "playerTurn";
    enter_enemyTurn = async () => {
        let enemyAttackPromises: Array<Promise<void>> = [];

        if (this.game.tiles?.some(x => isEnemyTile(x))) {

			let attackingEnemies = this.game.tiles.filter(x => isEnemyTile(x));
			attackingEnemies.forEach((enemy: Tile, index: number) => {
                const e = enemy as EnemyTile;
				if (e.spawnedThisTurn) {
					e.spawnedThisTurn = false;
					return;
				}

                enemyAttackPromises.push(e.attackAnimation());

				if (this.game.playerCurrentShield > 0) {
					this.game.playerCurrentShield -= 1;
					return;
				}

				this.game.playerCurrentHp -= e.damage;
            });

		}

        await Promise.all(enemyAttackPromises);
        this.next();
    }
    exit_enemyTurn = () => { /**/}
}