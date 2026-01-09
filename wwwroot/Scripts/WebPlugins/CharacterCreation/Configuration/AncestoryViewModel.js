import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { RaceDescriptions, Races } from "../Configuration/DispositionData.js";
import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";
export class AncestryViewModel {
    GlobalCharacterData;
    PossibleRaces;
    ViewUrl = "PartialViews/PropensityView.html";
    isLoading;
    FriendlyName = "Ancestry";
    ChosenRace;
    PictureUrl;
    RaceDescription;
    constructor(GlobalCharacterData, PossibleRaces) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleRaces = PossibleRaces;
        this.ChosenRace = ko.observable(PossibleRaces[0]);
        const raceData = this.GetRaceData(PossibleRaces[0]);
        this.PictureUrl = ko.observable(raceData.PictureUrl);
        this.RaceDescription = ko.observable(raceData.Description);
        this.isLoading = ko.observable(true);
    }
    Init() {
        this.ChosenRace(this.GlobalCharacterData.Race());
        return Promise.resolve();
    }
    Evaluate() {
        return this.ChosenRace();
    }
    Randomize() {
        this.ChosenRace(Utility.RandomElement(Races));
    }
    GetRaceData(race) {
        const taggedRaceData = RaceDescriptions
            .find((taggedData) => { return taggedData.Tags.Race?.Race == race; });
        if (taggedRaceData == undefined)
            throw Error(race + " config not found");
        return { PictureUrl: getCharacterCreatorPicturePath(taggedRaceData.Payload.PictureUrl), Description: taggedRaceData.Payload.Description };
    }
}
