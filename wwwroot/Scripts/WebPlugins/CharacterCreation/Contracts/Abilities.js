import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";
export var AbilityNames;
(function (AbilityNames) {
    AbilityNames["Strength"] = "Strength";
    AbilityNames["Dexterity"] = "Dexterity";
    AbilityNames["Constitution"] = "Constitution";
    AbilityNames["Intelligence"] = "Intelligence";
    AbilityNames["Wisdom"] = "Wisdom";
    AbilityNames["Charisma"] = "Charisma";
})(AbilityNames || (AbilityNames = {}));
export class Abilities {
    Strength;
    Dexterity;
    Constitution;
    Intelligence;
    Wisdom;
    Charisma;
    constructor(Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) {
        this.Strength = Strength;
        this.Dexterity = Dexterity;
        this.Constitution = Constitution;
        this.Intelligence = Intelligence;
        this.Wisdom = Wisdom;
        this.Charisma = Charisma;
    }
}
export const AbilitiesToArray = (a) => {
    if (!a)
        return [];
    const returnObject = [];
    if (a.Strength)
        returnObject.push(a.Strength);
    if (a.Dexterity)
        returnObject.push(a.Dexterity);
    if (a.Constitution)
        returnObject.push(a.Constitution);
    if (a.Intelligence)
        returnObject.push(a.Intelligence);
    if (a.Wisdom)
        returnObject.push(a.Wisdom);
    if (a.Charisma)
        returnObject.push(a.Charisma);
    returnObject.sort((a, b) => a - b);
    return returnObject;
};
export class AbilitiesDescription {
    description;
    pictureUrl;
    constructor(description, pictureUrl) {
        this.description = description;
        this.pictureUrl = pictureUrl;
    }
}
const abilityDetailsMap = {
    [AbilityNames.Strength]: {
        description: "You are the immovable object and the unstoppable force. You measure your worth in muscle and sinew, able to lift the heaviest gate or shatter the stoutest shield. When a challenge requires raw power, the party looks to you to break it.",
        pictureUrl: getCharacterCreatorPicturePath("/RR Downtime Meetup Ricardo de Gaspar.png") // Placeholder
    },
    [AbilityNames.Dexterity]: {
        description: "You move with the grace of a jungle cat and the speed of a viper's strike. Your fingers are quick, your balance is perfect, and you can slip through shadows without a sound. You are the one who ensures a surprise attack hits its mark or that a trap is safely bypassed.",
        pictureUrl: getCharacterCreatorPicturePath("/Elf/CC 300dpi 3inW MEN WOMEN ELF THIEF ACROBAT CONTORTIONIST ACTION Ambush Didrik Magnus-Andresen.jpg") // Placeholder
    },
    [AbilityNames.Constitution]: {
        description: "You are built like an ox, possessed of phenomenal stamina and an iron will to survive. You can shrug off wounds that would fell a lesser person, march for days without rest, and shake off poisons as if they were water. You are the last to fall in a grueling fight.",
        pictureUrl: getCharacterCreatorPicturePath("/Human/PD 300dpi 3inW MEN ALCHEMIST ASSAYER HERBALIST John C Gilbert.jpg") // Placeholder
    },
    [AbilityNames.Intelligence]: {
        description: "Your mind is a steel trap, always analyzing, remembering, and calculating. Your friends always look to you to find the right answer, because you always seem to figure out the right way. You are often found learning the stories of old from your elders or trying to find the answers in scrolls or books.",
        pictureUrl: getCharacterCreatorPicturePath("/PD MAGIC WARLOCK  SPELLCASTER John Dickson Batten.jpg") // Placeholder
    },
    [AbilityNames.Wisdom]: {
        description: "You see what others miss. Your instincts are uncanny, your perception is keen, and you possess deep common sense. You can read a room, sense a trap before it's sprung, and know when someone is lying. You are the party's moral compass and guide through the wilderness.",
        pictureUrl: getCharacterCreatorPicturePath("/Human/PD MEN LAWYER ADVOCATE BEADLE cropped Grandville.jpg") // Placeholder
    },
    [AbilityNames.Charisma]: {
        description: "You command attention the moment you enter a room. Your words can charm a noble, inspire a frightened soldier, or terrify a bandit leader into submission. You are a natural leader, able to bend social situations and people to your will with confidence and eloquence.",
        pictureUrl: getCharacterCreatorPicturePath("/RR Downtime Drinking Ricardo de Gaspar.JPG") // Placeholder
    },
};
/**
 * Finds the ability with the highest score and returns its D&D descriptive story and picture URL.
 * @param ability The Abilities object (D&D scores) to analyze.
 * @returns An AbilitiesDescription object for the maximum ability, or a default if none are found.
 */
export const MaxAbility = (ability) => {
    // 1. Find the name of the ability with the highest score
    let maxScore = -Infinity;
    // Default to Strength, though any ability will work as a starting point
    let maxAbilityName = AbilityNames.Strength;
    const abilityKeys = [
        AbilityNames.Strength,
        AbilityNames.Dexterity,
        AbilityNames.Constitution,
        AbilityNames.Intelligence,
        AbilityNames.Wisdom,
        AbilityNames.Charisma
    ];
    for (const key of abilityKeys) {
        // Use assertion to access the property since it matches the enum keys
        const score = ability[key];
        if (typeof score === 'number' && !isNaN(score)) {
            if (score > maxScore) {
                maxScore = score;
                maxAbilityName = key;
            }
        }
    }
    // 2. Retrieve the description and URL for the max ability name
    const details = abilityDetailsMap[maxAbilityName];
    // 3. Return the AbilitiesDescription object
    if (maxScore > -Infinity) {
        return new AbilitiesDescription(details.description, details.pictureUrl);
    }
    else {
        // Fallback description if no valid scores are found
        return new AbilitiesDescription("Could not determine the primary ability. Please ensure scores are correctly input.", "URL_FOR_DEFAULT_ICON");
    }
};
