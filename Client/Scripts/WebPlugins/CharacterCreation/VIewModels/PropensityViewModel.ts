import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js";
import { DescriptionModel, PictureModel, TaggedCharacterData, TaggedData } from "../Contracts/TaggedData.js";
import { DevelopmentalEnvironmentType, MoralityTypes, OrderTypes, RaceType } from "../Contracts/StringTypes.js";
import {DevelopmentalEnvironmentDescriptions, DevelopmentalEnvironments, Moralities, Order, RaceDescriptions, Races } from "../Configuration/DispositionData.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";

export class PropensityViewModel implements ICharacterWizardViewModel<void, void> {
    ViewUrl = "PartialViews/PropensityView.html"
    isLoading: Observable<boolean>;
    FriendlyName = "Propensity"
    
    ChosenRace : ko.Observable<RaceType>
    ChosenEconomicClass : ko.Observable<DevelopmentalEnvironmentType>
    ChosenMorality : ko.Observable<MoralityTypes> 
    ChosenOrder : ko.Observable<OrderTypes>
    
    PictureUrl : ko.Observable<string>
    RaceDescription : ko.Observable<string>

    EconomicClassDescription : ko.Observable<string>

    PossibleRaces = Races
    PossibleMoralities = Moralities
    PossibleOrders = Order
    PossibleEconomicClasses = DevelopmentalEnvironments

    constructor (public GlobalCharacterData : IConfiguredCharacterData) {

        const chosenRace : RaceType = GlobalCharacterData.Race()
        const chosenClass : DevelopmentalEnvironmentType = GlobalCharacterData.EconomicBackground()
        
        this.ChosenRace = ko.observable(chosenRace)
        this.ChosenEconomicClass = ko.observable(chosenClass)
        
        this.ChosenMorality = ko.observable(GlobalCharacterData.Morality())
        this.ChosenOrder = ko.observable(GlobalCharacterData.Order())

        const raceData = this.GetRaceData()
        this.PictureUrl = ko.observable(raceData.PictureUrl)
        this.RaceDescription = ko.observable(raceData.Description)

        const economicData = this.GetEconomicData()
        this.EconomicClassDescription = ko.observable(economicData.Description)

        // Setting up updates
        this.ChosenRace.subscribe(()=>{
            const raceData = this.GetRaceData ()

            this.PictureUrl(raceData.PictureUrl)
            this.RaceDescription(raceData.Description)
        })

        this.ChosenEconomicClass.subscribe(()=>{
            const economicData = this.GetEconomicData()
            
            this.EconomicClassDescription(economicData.Description)
        })

        this.GlobalCharacterData.Race.subscribe((value)=>{this.ChosenRace(value) })
        this.GlobalCharacterData.EconomicBackground.subscribe((value)=>{this.ChosenEconomicClass(value) })
        this.GlobalCharacterData.Morality.subscribe((value)=>{this.ChosenMorality(value) })
        this.GlobalCharacterData.Order.subscribe((value)=>{this.ChosenOrder(value) })

        this.isLoading = ko.observable(true)
    }

    Init () : Promise<void> {
        return Promise.resolve()
    }

    Evaluate () {
        this.GlobalCharacterData.Race(this.ChosenRace())
        this.GlobalCharacterData.Morality(this.ChosenMorality())
        this.GlobalCharacterData.Order(this.ChosenOrder())
        this.GlobalCharacterData.EconomicBackground(this.ChosenEconomicClass())
    }

    Randomize () {
        console.log("Randomize!")
        this.ChosenRace(Utility.RandomElement(Races)) 
        this.ChosenMorality (Utility.RandomElement(Moralities))
        this.ChosenOrder(Utility.RandomElement(Order))
        this.ChosenEconomicClass(Utility.RandomElement(DevelopmentalEnvironments))
    }

    private GetRaceData () : PictureModel {
        const taggedRaceData: TaggedCharacterData<PictureModel> | undefined = RaceDescriptions
            .find((taggedData)=>{ return taggedData.Tags.Race?.Race == this.ChosenRace()})

        if (taggedRaceData == undefined) throw Error(this.ChosenRace() + " config not found")
        
        return {PictureUrl: Utility.getBaseImageUrl(taggedRaceData.Payload.PictureUrl), Description : taggedRaceData.Payload.Description}
    }

    private GetEconomicData () : DescriptionModel {
        const taggedEconomicDescription: TaggedCharacterData<DescriptionModel> | undefined = DevelopmentalEnvironmentDescriptions
            .find((taggedData)=>{return taggedData.Tags.DevelopmentalEnvironment?.Class == this.ChosenEconomicClass()})
            
        if (taggedEconomicDescription == undefined) throw Error(this.ChosenEconomicClass() + " config not found")

        return taggedEconomicDescription?.Payload
    }
}
