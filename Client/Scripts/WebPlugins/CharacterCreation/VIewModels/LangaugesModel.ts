import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Language } from "../Contracts/Language.js";
import { TaggedCharacterData } from "../Contracts/TaggedData.js";

export class LanguageModel implements IWizardModel<void, Language, Language | undefined> {
    FriendlyName = "Languages"
    ViewUrl = "PartialViews/LanguageView.html"
    isLoading: Observable<boolean>;
    
    chosenLanguage : Observable<TaggedCharacterData<Language>>
    canSpeak : Observable<boolean>
    canWrite : Observable<boolean>
    canRead : Observable<boolean>

    constructor (public possibleLanguages : TaggedCharacterData<Language>[]) {
        this.canSpeak = ko.observable(false);
        this.canWrite = ko.observable(false);
        this.canRead = ko.observable(false);
        
        this.chosenLanguage = ko.observable(this.possibleLanguages[0])

        this.isLoading = ko.observable(false)
    }
    
    Init (chosenLanguage? : Language | undefined) {
        if (chosenLanguage) {
            const index = this.possibleLanguages.findIndex((data)=>{data.Payload.Name == chosenLanguage.Name})

            if (index == -1) throw "Undefined language being searched!"

            this.chosenLanguage(this.possibleLanguages[index])
        }
        return Promise.resolve()
    }
    
    Evaluate () {return this.chosenLanguage().Payload} // new Language()
}