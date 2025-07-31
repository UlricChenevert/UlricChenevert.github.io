import { IHTMLInjectable } from "../../../Framework/IPartialViewModel.js"
import { Ages } from "../Configuration/BackgroundData.js"
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js"
import { AgeType } from "../Contracts/TaggedData.js"
import {ko} from "../../../Libraries/ko.js"
import { Utility } from "../../../WebCore/Utility.js"

export class BackgroundViewModel implements ICharacterWizardViewModel, IHTMLInjectable {
    ViewUrl = "PartialViews/BackgroundView.html"

    FriendlyName = "Background"

    ChosenAge : ko.Observable<AgeType>


    PossibleAges = Ages

    constructor() {
        this.ChosenAge = ko.observable(Ages[0])
    }

    Randomize () {
        this.ChosenAge(Utility.RandomElement(Ages))
    }
    
    Evaluate () {
        return {}
    }

    init(): Promise<any> {
        return Promise.resolve()
    }
}