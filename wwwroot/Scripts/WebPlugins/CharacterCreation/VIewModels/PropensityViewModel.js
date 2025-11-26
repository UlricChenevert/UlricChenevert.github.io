import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { DevelopmentalEnvironmentDescriptions, DevelopmentalEnvironments, Moralities, Order, RaceDescriptions, Races } from "../Configuration/DispositionData.js";
import { getMatchingMultiTaggedData } from "../Utility/FilterUtility.js";
import { TaggedLanguageData } from "../Configuration/LanguageOptions.js";
import { TaggedItemData } from "../Configuration/TaggedItemData.js";
import { LearnedLanguage } from "../Contracts/Language.js";
import { TaggedEdgesData } from "../Configuration/EdgesData.js";
import { TaggedCharacterBynameData, TaggedCharacterEpithetsData, TaggedCharacterNameData } from "../Configuration/TaggedNameData.js";
import { CharacterName } from "../Contracts/CharacterName.js";
export class PropensityViewModel {
    GlobalCharacterData;
    ViewUrl = "PartialViews/PropensityView.html";
    isLoading;
    FriendlyName = "Propensity";
    ChosenRace;
    ChosenEconomicClass;
    ChosenMorality;
    ChosenOrder;
    PictureUrl;
    RaceDescription;
    EconomicClassDescription;
    PossibleRaces = Races;
    PossibleMoralities = Moralities;
    PossibleOrders = Order;
    PossibleEconomicClasses = DevelopmentalEnvironments;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        const chosenRace = GlobalCharacterData.Race();
        const chosenClass = GlobalCharacterData.EconomicBackground();
        this.ChosenRace = ko.observable(chosenRace);
        this.ChosenEconomicClass = ko.observable(chosenClass);
        this.ChosenMorality = ko.observable(GlobalCharacterData.Morality());
        this.ChosenOrder = ko.observable(GlobalCharacterData.Order());
        const raceData = this.GetRaceData();
        this.PictureUrl = ko.observable(raceData.PictureUrl);
        this.RaceDescription = ko.observable(raceData.Description);
        const economicData = this.GetEconomicData();
        this.EconomicClassDescription = ko.observable(economicData.Description);
        // Setting up updates
        this.ChosenRace.subscribe(() => {
            const raceData = this.GetRaceData();
            this.PictureUrl(raceData.PictureUrl);
            this.RaceDescription(raceData.Description);
        });
        this.ChosenEconomicClass.subscribe(() => {
            const economicData = this.GetEconomicData();
            this.EconomicClassDescription(economicData.Description);
        });
        this.isLoading = ko.observable(true);
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() {
        this.GlobalCharacterData.Race(this.ChosenRace());
        this.GlobalCharacterData.Morality(this.ChosenMorality());
        this.GlobalCharacterData.Order(this.ChosenOrder());
        this.GlobalCharacterData.EconomicBackground(this.ChosenEconomicClass());
        updateItemData(this.GlobalCharacterData);
        updateLanguageData(this.GlobalCharacterData);
        updateEdgesData(this.GlobalCharacterData);
        updateNameData(this.GlobalCharacterData);
    }
    Randomize() {
        // console.log("Randomize!")
        this.ChosenRace(Utility.RandomElement(Races));
        this.ChosenMorality(Utility.RandomElement(Moralities));
        this.ChosenOrder(Utility.RandomElement(Order));
        this.ChosenEconomicClass(Utility.RandomElement(DevelopmentalEnvironments));
    }
    GetRaceData() {
        const taggedRaceData = RaceDescriptions
            .find((taggedData) => { return taggedData.Tags.Race?.Race == this.ChosenRace(); });
        if (taggedRaceData == undefined)
            throw Error(this.ChosenRace() + " config not found");
        return { PictureUrl: Utility.getBaseImageUrl(taggedRaceData.Payload.PictureUrl), Description: taggedRaceData.Payload.Description };
    }
    GetEconomicData() {
        const taggedEconomicDescription = DevelopmentalEnvironmentDescriptions
            .find((taggedData) => { return taggedData.Tags.DevelopmentalEnvironment?.Class == this.ChosenEconomicClass(); });
        if (taggedEconomicDescription == undefined)
            throw Error(this.ChosenEconomicClass() + " config not found");
        return taggedEconomicDescription?.Payload;
    }
}
const updateItemData = (characterData) => {
    const items = getMatchingMultiTaggedData(TaggedItemData, characterData);
    characterData.Items(items.map(x => x.Payload));
};
const updateLanguageData = (characterData) => {
    const languages = getMatchingMultiTaggedData(TaggedLanguageData, characterData);
    const language = Utility.RandomElement(languages).Payload;
    characterData.Languages([new LearnedLanguage(language.Name, true, true, true)]);
};
const updateEdgesData = (characterData) => {
    const edges = getMatchingMultiTaggedData(TaggedEdgesData, characterData);
    const splitArray = Utility.splitIntoTwoArrays(edges, (edgeData) => edgeData.Tags.some((tag) => (tag.Race === undefined || tag.Race.Race == characterData.Race()) &&
        (tag.Optional !== undefined && tag.Optional)));
    const edgesYouHaveToChoose = splitArray.predicateTrueArray;
    const raceEnsuredEdges = splitArray.predicateFalseArray;
    if (edgesYouHaveToChoose.length > 0)
        raceEnsuredEdges.push(Utility.RandomElement(edgesYouHaveToChoose));
    characterData.Edges(raceEnsuredEdges.map(x => x.Payload));
};
const updateNameData = (characterData) => {
    characterData.Name(new CharacterName(updateNamePart(TaggedCharacterNameData, characterData), updateNamePart(TaggedCharacterBynameData, characterData), updateNamePart(TaggedCharacterEpithetsData, characterData)));
};
const updateNamePart = (possibleNamePart, characterData) => {
    const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData);
    const NamePart = Utility.RandomElement(NameParts).Payload;
    return NamePart;
};
