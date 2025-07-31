import { ko } from "../../../Libraries/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { EconomicClassDescriptions, EconomicClasses, Moralities, Order, RaceDescriptions, Races } from "../Configuration/DispositionData.js";
export class PropensityViewModel {
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
    PossibleEconomicClasses = EconomicClasses;
    constructor() {
        const chosenRace = Races[0];
        const chosenClass = EconomicClasses[0];
        this.ChosenRace = ko.observable(chosenRace);
        this.ChosenEconomicClass = ko.observable(chosenClass);
        this.ChosenMorality = ko.observable(Moralities[1]);
        this.ChosenOrder = ko.observable(Order[1]);
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
        return { RaceChoice: this.ChosenRace(), Disposition: { Morality: this.ChosenMorality, Order: this.ChosenOrder } };
    }
    Randomize() {
        console.log("Randomize!");
        this.ChosenRace(Utility.RandomElement(Races));
        this.ChosenMorality(Utility.RandomElement(Moralities));
        this.ChosenOrder(Utility.RandomElement(Order));
        this.ChosenEconomicClass(Utility.RandomElement(EconomicClasses));
    }
    GetRaceData() {
        const taggedRaceData = RaceDescriptions
            .find((taggedData) => {
            return taggedData.Tags
                .some((tag) => { return tag.Type == "Race" && tag.Race == this.ChosenRace(); });
        });
        if (taggedRaceData == undefined)
            throw Error(this.ChosenRace() + " config not found");
        return { PictureUrl: Utility.getBaseImageUrl(taggedRaceData.Payload.PictureUrl), Description: taggedRaceData.Payload.Description };
    }
    GetEconomicData() {
        const taggedEconomicDescription = EconomicClassDescriptions
            .find((taggedData) => {
            return taggedData.Tags
                .some((tag) => { return tag.Type == "EconomicClass" && tag.Class == this.ChosenEconomicClass(); });
        });
        if (taggedEconomicDescription == undefined)
            throw Error(this.ChosenEconomicClass() + " config not found");
        return taggedEconomicDescription?.Payload;
    }
}
