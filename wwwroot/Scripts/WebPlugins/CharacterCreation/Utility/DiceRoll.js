import { Abilities } from "../Contracts/Abilities.js";
export const RandomizeAbilities = () => {
    const Strength = rollAbility();
    const Dexterity = rollAbility();
    const Constitution = rollAbility();
    const Intelligence = rollAbility();
    const Wisdom = rollAbility();
    const Charisma = rollAbility();
    return new Abilities(Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma);
};
const sixSidedDieRoll = () => Math.ceil(Math.random() * 5 + 1);
export const rollAbility = () => {
    let sum = 0;
    const roll = [sixSidedDieRoll(), sixSidedDieRoll(), sixSidedDieRoll()];
    const smallestNumber = Math.min(...roll);
    const index = roll.findIndex((x) => smallestNumber == x);
    roll.splice(index, 1);
    roll.map((x) => sum += x);
    return sum;
};
