export type MatchArgs = EnemyMatchArgs | HealingMatchArgs | CurrencyMatchArgs | CombatMatchArgs | DefenceMatchArgs;
export type EnemyMatchArgs = {
    damage: number;
}
export type HealingMatchArgs = {

}
export type CurrencyMatchArgs = {
    reward: number;
}
export type CombatMatchArgs = {
    damage: number;
}
export type DefenceMatchArgs = {
    defenceMod: number;
}