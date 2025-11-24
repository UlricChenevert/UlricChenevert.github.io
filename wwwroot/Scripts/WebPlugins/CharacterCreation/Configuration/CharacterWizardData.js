import { ko } from "../../../Framework/Knockout/ko.js";
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js";
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js";
import { Utility } from "../../../WebCore/Utility.js";
import { getPossibleBackground } from "../Utility/General.js";
import { RandomizeAbilities } from "../Utility/DiceRoll.js";
export class ConfiguredCharacterData {
    Race;
    Age;
    Morality;
    Order;
    EconomicBackground;
    ChildhoodBackground;
    AdultBackground;
    ElderBackground;
    Abilities;
    Items;
    People;
    Places;
    Organizations;
    constructor() {
        this.Race = ko.observable(Races[0]);
        this.Morality = ko.observable(Moralities[1]);
        this.Order = ko.observable(Order[1]);
        this.EconomicBackground = ko.observable(DevelopmentalEnvironments[0]);
        this.Age = ko.observable(Ages[1]);
        this.ChildhoodBackground = ko.observable(ChildhoodBackgrounds[0].Payload);
        this.AdultBackground = ko.observable(AdultBackgrounds[0].Payload);
        this.ElderBackground = ko.observable(undefined);
        this.Abilities = ko.observable(undefined);
        this.Items = ko.observableArray([]);
        this.People = ko.observableArray([]);
        this.Organizations = ko.observableArray([]);
        this.Places = ko.observableArray([]);
    }
}
export function RandomizeGlobalCharacterData(configuredCharacterData) {
    configuredCharacterData.Race(Utility.RandomElement(Races));
    configuredCharacterData.Morality(Utility.RandomElement(Moralities));
    configuredCharacterData.Order(Utility.RandomElement(Order));
    configuredCharacterData.EconomicBackground(Utility.RandomElement(DevelopmentalEnvironments));
    configuredCharacterData.Age(Utility.RandomElement(Ages));
    configuredCharacterData.ChildhoodBackground(Utility.RandomElement(getPossibleBackground(ChildhoodBackgrounds, configuredCharacterData)));
    configuredCharacterData.Abilities(RandomizeAbilities());
    configuredCharacterData.AdultBackground((configuredCharacterData.Age() == 'Adult' || configuredCharacterData.Age() == 'Elder') ?
        Utility.RandomElement(getPossibleBackground(AdultBackgrounds, configuredCharacterData)) : undefined);
    configuredCharacterData.ElderBackground((configuredCharacterData.Age() == 'Elder') ?
        Utility.RandomElement(getPossibleBackground(ElderBackgrounds, configuredCharacterData)) : undefined);
}
