import { Abilities } from "../Contracts/Abilities.js";

export namespace DiceRoll {
    export const ABILITY_SCORE_AMOUNT = 6
    
    export const RandomizeAbilities = () =>
    {
        const Strength = roll2d6withAdvantage(); 
        const Dexterity = roll2d6withAdvantage(); 
        const Constitution = roll2d6withAdvantage(); 
        const Intelligence = roll2d6withAdvantage(); 
        const Wisdom = roll2d6withAdvantage(); 
        const Charisma = roll2d6withAdvantage()
    
        return new Abilities(Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
    }
    
    export const getRandomWeightedRolls = () => {
        const scores : number[] = []
            
        for (let i = 0; i < ABILITY_SCORE_AMOUNT; i++) {
            scores[i] = roll2d6withAdvantage()
        }

        return scores.sort((a, b)=>a-b)
    }
    
    export const standardAbilityScores = [7, 8, 8, 9, 9, 10].sort((a, b)=>a-b)
    
    export const sixSidedDieRoll = () => anySidedDieRoll(6)
    export const fourSidedDieRoll = () => anySidedDieRoll(4)
    export const eightSidedDieRoll = () => anySidedDieRoll(8)

    export const anySidedDieRoll = (sides: number) => Math.floor(Math.random() * sides) + 1;
    
    export const roll2d6withAdvantage = () => {
        let sum = 0;
    
        const roll = [sixSidedDieRoll(), sixSidedDieRoll(), sixSidedDieRoll()]
        
        const smallestNumber = Math.min(...roll)
        const index = roll.findIndex((x : number)=>smallestNumber==x)
        roll.splice(index, 1)
    
        roll.map((x)=>sum += x)
    
        return sum
    }
}
