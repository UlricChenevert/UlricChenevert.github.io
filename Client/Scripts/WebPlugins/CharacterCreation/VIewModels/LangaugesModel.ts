// import { Observable } from "../../../Framework/Knockout/knockout.js";
// import { ko } from "../../../Framework/Knockout/ko.js";
// import { Language, LearnedLanguage } from "../Contracts/Language.js";
// import { MultiTaggedCharacterData, TaggedCharacterData } from "../Contracts/TaggedData.js";

// export class LanguageModel implements IWizardModel<void, LearnedLanguage, LearnedLanguage | undefined> {
//     FriendlyName = "Languages"
//     ViewUrl = "PartialViews/LanguageView.html"
//     isLoading: Observable<boolean>;
    
//     chosenLanguage : Observable<MultiTaggedCharacterData<Language>>
//     canSpeak : Observable<boolean>
//     canWrite : Observable<boolean>
//     canRead : Observable<boolean>

//     constructor (public possibleLanguages : MultiTaggedCharacterData<Language>[]) {
//         this.canSpeak = ko.observable(false);
//         this.canWrite = ko.observable(false);
//         this.canRead = ko.observable(false);
        
//         this.chosenLanguage = ko.observable(this.possibleLanguages[0])

//         this.isLoading = ko.observable(false)
//     }
    
//     Init (chosenLanguage? : LearnedLanguage | undefined) {
//         if (chosenLanguage) {
//             const index = this.possibleLanguages.findIndex((data)=>data.Payload.Name == chosenLanguage.Name)

//             if (index == -1) throw "Undefined language being searched!"

//             this.chosenLanguage(this.possibleLanguages[index])
//             this.canSpeak(chosenLanguage.canSpeak)
//             this.canWrite(chosenLanguage.canWrite)
//             this.canRead(chosenLanguage.canRead)
//         }
//         return Promise.resolve()
//     }
    
//     Evaluate () {return new LearnedLanguage(this.chosenLanguage().Payload.Name, this.canSpeak(), this.canRead(), this.canWrite())} // new Language()
// }