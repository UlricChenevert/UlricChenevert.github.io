import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js";
import { MultiTaggedCharacterData, PictureModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { RaceType } from "../Contracts/StringTypes.js";
import {RaceDescriptions, Races } from "../Configuration/DispositionData.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { getMatchingMultiTaggedData } from "../Utility/FilterUtility.js";
import { TaggedLanguageData } from "../Configuration/LanguageOptions.js";
import { TaggedItemData } from "../Configuration/TaggedItemData.js";
import { LearnedLanguage } from "../Contracts/Language.js";
import { TaggedEdgesData } from "../Configuration/EdgesData.js";
import { TaggedCharacterBynameData, TaggedCharacterEpithetsData, TaggedCharacterNameData } from "../Configuration/TaggedNameData.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";

export class PropensityViewModel implements ICharacterWizardViewModel<void, void> {
    ViewUrl = "PartialViews/PropensityView.html"
    isLoading: Observable<boolean>;
    FriendlyName = "Ancestry    "
    
    ChosenRace : ko.Observable<RaceType>
    // ChosenEconomicClass : ko.Observable<DevelopmentalEnvironmentType>
    
    PictureUrl : ko.Observable<string>
    RaceDescription : ko.Observable<string>

    // EconomicClassDescription : ko.Observable<string>

    PossibleRaces = Races
    // PossibleEconomicClasses = DevelopmentalEnvironments

    constructor (public GlobalCharacterData : ConfiguredCharacterData) {

        const chosenRace : RaceType = GlobalCharacterData.Race()
        // const chosenClass : DevelopmentalEnvironmentType = GlobalCharacterData.EconomicBackground()
        
        this.ChosenRace = ko.observable(chosenRace)
        // this.ChosenEconomicClass = ko.observable(chosenClass)

        const raceData = this.GetRaceData()
        this.PictureUrl = ko.observable(raceData.PictureUrl)
        this.RaceDescription = ko.observable(raceData.Description)

        // const economicData = this.GetEconomicData()
        // this.EconomicClassDescription = ko.observable(economicData.Description)

        // Setting up updates
        this.ChosenRace.subscribe(()=>{
            const raceData = this.GetRaceData ()

            this.PictureUrl(raceData.PictureUrl)
            this.RaceDescription(raceData.Description)
        })

        // this.ChosenEconomicClass.subscribe(()=>{
        //     const economicData = this.GetEconomicData()
            
        //     this.EconomicClassDescription(economicData.Description)
        // })
        
        this.isLoading = ko.observable(true)
    }

    Init () : Promise<void> {
        this.ChosenRace(this.GlobalCharacterData.Race())
        // this.ChosenEconomicClass(this.GlobalCharacterData.EconomicBackground())

        return Promise.resolve()
    }

    Evaluate () {
        this.GlobalCharacterData.Race(this.ChosenRace())
        
        // this.GlobalCharacterData.EconomicBackground(this.ChosenEconomicClass())
        
        updateItemData(this.GlobalCharacterData)
        updateLanguageData(this.GlobalCharacterData)
        updateEdgesData(this.GlobalCharacterData)
        updateNameData(this.GlobalCharacterData)
    }

    Randomize () {
        this.ChosenRace(Utility.RandomElement(Races)) 
        
        // this.ChosenEconomicClass(Utility.RandomElement(DevelopmentalEnvironments))
    }

    private GetRaceData () : PictureModel {
        const taggedRaceData: TaggedCharacterData<PictureModel> | undefined = RaceDescriptions
            .find((taggedData)=>{ return taggedData.Tags.Race?.Race == this.ChosenRace()})

        if (taggedRaceData == undefined) throw Error(this.ChosenRace() + " config not found")
        
        return {PictureUrl: getCharacterCreatorPicturePath(taggedRaceData.Payload.PictureUrl), Description : taggedRaceData.Payload.Description}
    }

    // private GetEconomicData () : DescriptionModel {
    //     const taggedEconomicDescription: TaggedCharacterData<DescriptionModel> | undefined = DevelopmentalEnvironmentDescriptions
    //         .find((taggedData)=>{return taggedData.Tags.DevelopmentalEnvironment?.Class == this.ChosenEconomicClass()})
            
        // if (taggedEconomicDescription == undefined) throw Error(this.ChosenEconomicClass() + " config not found")

    //     return taggedEconomicDescription?.Payload
    // }
}


const updateItemData = (characterData : ConfiguredCharacterData) => {
    const items = getMatchingMultiTaggedData(TaggedItemData, characterData)
    characterData.Items(items.map(x=>x.Payload))
}

const updateLanguageData = (characterData : ConfiguredCharacterData) => {
    const languages = getMatchingMultiTaggedData(TaggedLanguageData, characterData)
    const language = Utility.RandomElement(languages).Payload
    characterData.Languages([new LearnedLanguage(language.Name, true, true, true)])
}

const updateEdgesData = (characterData : ConfiguredCharacterData) => {
    const edges = getMatchingMultiTaggedData(TaggedEdgesData, characterData)
    const splitArray = Utility.splitIntoTwoArrays(edges, 
        (edgeData)=>
            edgeData.Tags.some(
                (tag)=>
                    (tag.Race === undefined || tag.Race.Race == characterData.Race()) &&
                    (tag.Optional !== undefined && tag.Optional)
                )
        )

    const edgesYouHaveToChoose = splitArray.predicateTrueArray
    const raceEnsuredEdges = splitArray.predicateFalseArray

    if (edgesYouHaveToChoose.length > 0) 
        raceEnsuredEdges.push(Utility.RandomElement(edgesYouHaveToChoose))

    characterData.Edges(raceEnsuredEdges.map(x=>x.Payload))
}

const updateNameData = (characterData : ConfiguredCharacterData) => {
    characterData.Name(new CharacterName(
        updateNamePart(TaggedCharacterNameData, characterData),
        updateNamePart(TaggedCharacterBynameData, characterData),
        updateNamePart(TaggedCharacterEpithetsData, characterData),
    ))
}

const updateNamePart = (possibleNamePart : MultiTaggedCharacterData<string>[], characterData : ConfiguredCharacterData) => {
    const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData)
    const NamePart = Utility.RandomElement(NameParts).Payload

    return NamePart
}
