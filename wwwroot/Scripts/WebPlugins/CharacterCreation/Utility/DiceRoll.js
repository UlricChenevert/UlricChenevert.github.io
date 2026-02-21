import { Abilities } from "../Contracts/Abilities.js";
export var DiceRoll;
(function (DiceRoll) {
    DiceRoll.ABILITY_SCORE_AMOUNT = 6;
    DiceRoll.RandomizeAbilities = () => {
        const Strength = DiceRoll.roll2d6withAdvantage();
        const Dexterity = DiceRoll.roll2d6withAdvantage();
        const Constitution = DiceRoll.roll2d6withAdvantage();
        const Intelligence = DiceRoll.roll2d6withAdvantage();
        const Wisdom = DiceRoll.roll2d6withAdvantage();
        const Charisma = DiceRoll.roll2d6withAdvantage();
        return new Abilities(Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma);
    };
    DiceRoll.getRandomWeightedRolls = () => {
        const scores = [];
        for (let i = 0; i < DiceRoll.ABILITY_SCORE_AMOUNT; i++) {
            scores[i] = DiceRoll.roll2d6withAdvantage();
        }
        return scores.sort((a, b) => a - b);
    };
    DiceRoll.standardAbilityScores = [7, 8, 8, 9, 9, 10].sort((a, b) => a - b);
    DiceRoll.sixSidedDieRoll = () => DiceRoll.anySidedDieRoll(6);
    DiceRoll.fourSidedDieRoll = () => DiceRoll.anySidedDieRoll(4);
    DiceRoll.eightSidedDieRoll = () => DiceRoll.anySidedDieRoll(8);
    DiceRoll.anySidedDieRoll = (sides) => Math.floor(Math.random() * sides) + 1;
    DiceRoll.roll2d6withAdvantage = () => {
        let sum = 0;
        const roll = [DiceRoll.sixSidedDieRoll(), DiceRoll.sixSidedDieRoll(), DiceRoll.sixSidedDieRoll()];
        const smallestNumber = Math.min(...roll);
        const index = roll.findIndex((x) => smallestNumber == x);
        roll.splice(index, 1);
        roll.map((x) => sum += x);
        return sum;
    };
})(DiceRoll || (DiceRoll = {}));
