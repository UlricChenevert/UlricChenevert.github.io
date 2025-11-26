import { ko } from "../../../Framework/Knockout/ko.js";
import { LearnedLanguage } from "../Contracts/Language.js";
export class LanguageModel {
    possibleLanguages;
    FriendlyName = "Languages";
    ViewUrl = "PartialViews/LanguageView.html";
    isLoading;
    chosenLanguage;
    canSpeak;
    canWrite;
    canRead;
    constructor(possibleLanguages) {
        this.possibleLanguages = possibleLanguages;
        this.canSpeak = ko.observable(false);
        this.canWrite = ko.observable(false);
        this.canRead = ko.observable(false);
        this.chosenLanguage = ko.observable(this.possibleLanguages[0]);
        this.isLoading = ko.observable(false);
    }
    Init(chosenLanguage) {
        if (chosenLanguage) {
            const index = this.possibleLanguages.findIndex((data) => data.Payload.Name == chosenLanguage.Name);
            if (index == -1)
                throw "Undefined language being searched!";
            this.chosenLanguage(this.possibleLanguages[index]);
            this.canSpeak(chosenLanguage.canSpeak);
            this.canWrite(chosenLanguage.canWrite);
            this.canRead(chosenLanguage.canRead);
        }
        return Promise.resolve();
    }
    Evaluate() { return new LearnedLanguage(this.chosenLanguage().Payload.Name, this.canSpeak(), this.canRead(), this.canWrite()); } // new Language()
}
