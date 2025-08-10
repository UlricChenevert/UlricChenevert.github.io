import { ko } from "../../../Libraries/ko.js";
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js";
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js";
export class ConfiguredCharacterData {
    Race;
    Morality;
    Order;
    Age;
    EconomicBackground;
    ChildhoodBackground;
    AdultBackground;
    ElderBackground;
    constructor() {
        this.Race = ko.observable(Races[0]);
        this.Morality = ko.observable(Moralities[1]);
        this.Order = ko.observable(Order[1]);
        this.EconomicBackground = ko.observable(DevelopmentalEnvironments[0]);
        this.Age = ko.observable(Ages[1]);
        this.ChildhoodBackground = ko.observable(ChildhoodBackgrounds[0].Payload);
        this.AdultBackground = ko.observable(AdultBackgrounds[0].Payload);
        this.ElderBackground = ko.observable(ElderBackgrounds[0].Payload);
    }
}
