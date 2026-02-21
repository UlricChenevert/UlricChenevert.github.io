import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Deity } from "../Contracts/Diety.js";
import { PronounType } from "../Contracts/StringTypes.js";

export class DeityCreationModel implements IWizardModel<void, Deity, Deity> {
    ViewUrl = "PartialViews/DeityPickerView.html"
    isLoading: Observable<boolean>;
    
    chosenDeity : Observable<Deity>
    chosenDeityDescription : Observable<string>

    createdDeityName : Observable<string>
    deityPronoun : PronounType
    createdDeityDescription : Observable<string>

    isCustom : Observable<boolean>

    constructor (public possibleDeities : Deity[], public FriendlyName = "Worshipped Deity") {
        this.chosenDeity = ko.observable<Deity>(this.possibleDeities[0])
        this.chosenDeityDescription = ko.observable(this.possibleDeities[0].Description)

        this.createdDeityName = ko.observable((this.possibleDeities[0].Pronoun.name)? this.possibleDeities[0].Pronoun.name : "Unknown Deity")
        this.createdDeityDescription = ko.observable(this.possibleDeities[0].Description)

        this.deityPronoun = this.possibleDeities[0].Pronoun;

        this.isCustom = ko.observable(this.chosenDeity().Pronoun.name == "Custom")
        this.isLoading = ko.observable(false)

        this.chosenDeity.subscribe((newDeity)=>{
            this.chosenDeityDescription(newDeity.Description)
            this.isCustom(newDeity.Pronoun.name == "Custom")
            this.createdDeityName((newDeity.Pronoun.name)? newDeity.Pronoun.name : "Unknown Deity")
            this.createdDeityDescription(newDeity.Description)
        })
    }
    
    Init (chosenDeity? : Deity) {
        if (chosenDeity === undefined) return Promise.resolve()

        const DeityData = this.possibleDeities.find((taggedDeity)=>taggedDeity.Pronoun.id == chosenDeity.Pronoun.id)
        
        if (DeityData !== undefined) { // Not Custom deity 
            this.chosenDeity(DeityData)
            this.deityPronoun = DeityData.Pronoun
            return Promise.resolve()
        }

        this.createdDeityName((chosenDeity.Pronoun.name)? chosenDeity.Pronoun.name : "Unknown Deity")
        this.createdDeityDescription(chosenDeity.Description)
        this.deityPronoun = chosenDeity.Pronoun
        this.isCustom(true)

        return Promise.resolve()
    }

    createDeity() {
        const newDeity = new Deity(
                    {
                        id:((this.deityPronoun)? this.deityPronoun.id : Utility.idGenerator.newID()), 
                        name: this.createdDeityName()
                    }, 
                    this.createdDeityDescription(), 
                    ""
                )

        this.chosenDeity(newDeity)

        return newDeity
    }
    
    Evaluate () {
        if (this.isCustom()) return this.createDeity() 

        return this.chosenDeity()
    }

    Randomize() {
        this.chosenDeity(Utility.RandomElement(this.possibleDeities))
    }
}