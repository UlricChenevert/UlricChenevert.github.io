import { ko } from "../../../Libraries/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { DevelopmentalEnvironmentDescriptions, DevelopmentalEnvironments, Moralities, Order, RaceDescriptions, Races } from "../Configuration/DispositionData.js";
export class PropensityViewModel {
    GlobalCharacterData;
    ViewUrl = "PartialViews/PropensityView.html";
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
    }
    init() {
        return Promise.resolve();
    }
    Evaluate() {
        this.GlobalCharacterData.Race(this.ChosenRace());
        this.GlobalCharacterData.Morality(this.ChosenMorality());
        this.GlobalCharacterData.Order(this.ChosenOrder());
        this.GlobalCharacterData.EconomicBackground(this.ChosenEconomicClass());
    }
    Randomize() {
        console.log("Randomize!");
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
