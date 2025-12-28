import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js";
import { DescriptionModel, MultiTaggedCharacterData, PictureModel, TaggedCharacterData, TaggedData } from "../Contracts/TaggedData.js";
import { DevelopmentalEnvironmentType, MoralityTypes, OrderTypes, RaceType } from "../Contracts/StringTypes.js";
import {DevelopmentalEnvironmentDescriptions, DevelopmentalEnvironments, Moralities, Order, RaceDescriptions, Races } from "../Configuration/DispositionData.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { getMatchingMultiTaggedData, getMatchingTaggedData } from "../Utility/FilterUtility.js";
import { TaggedLanguageData } from "../Configuration/LanguageOptions.js";
import { TaggedItemData } from "../Configuration/TaggedItemData.js";
import { LearnedLanguage } from "../Contracts/Language.js";
import { TaggedEdgesData } from "../Configuration/EdgesData.js";
import { TaggedCharacterBynameData, TaggedCharacterEpithetsData, TaggedCharacterNameData } from "../Configuration/TaggedNameData.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";

export class AncestryViewModel implements IWizardModel<void, RaceType> {
    ViewUrl = "PartialViews/PropensityView.html"
    isLoading: Observable<boolean>;
    FriendlyName = "Ancestry"
    
    ChosenRace : ko.Observable<RaceType>
    
    PictureUrl : ko.Observable<string>
    RaceDescription : ko.Observable<string>

    constructor (public GlobalCharacterData : ConfiguredCharacterData, public PossibleRaces : RaceType[]) {
        this.ChosenRace = ko.observable(PossibleRaces[0])

        const raceData = this.GetRaceData(PossibleRaces[0])
        this.PictureUrl = ko.observable(raceData.PictureUrl)
        this.RaceDescription = ko.observable(raceData.Description)
        
        this.isLoading = ko.observable(true)

        this.ChosenRace.subscribe((race)=>{
            const raceData = this.GetRaceData(race)

            this.PictureUrl(raceData.PictureUrl)
            this.RaceDescription(raceData.Description)
        })
    }

    Init () : Promise<void> {
        this.ChosenRace(this.GlobalCharacterData.Race())

        return Promise.resolve()
    }

    Evaluate () {
        return this.ChosenRace()
    }

    Randomize () {
        this.ChosenRace(Utility.RandomElement(Races)) 
    }

    private GetRaceData (race : RaceType) : PictureModel {
        const taggedRaceData: TaggedCharacterData<PictureModel> | undefined = RaceDescriptions
            .find((taggedData)=>{ return taggedData.Tags.Race?.Race == race})

        if (taggedRaceData == undefined) throw Error(race + " config not found")
        
        return {PictureUrl: getCharacterCreatorPicturePath(taggedRaceData.Payload.PictureUrl), Description : taggedRaceData.Payload.Description}
    }
}



