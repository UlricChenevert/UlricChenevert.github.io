import { IPartialViewModel, IWizardModel } from "../../../Framework/Contracts/ViewModel.js"
import { Utility } from "../../../WebCore/Utility.js"
import { Wizard } from "../../../WebCore/ViewModels/Wizard.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { BackgroundViewModel } from "./BackgroundViewModel.js"
import { EntryConfigurationModel } from "./GenerationMethodModel.js"
import { ItemModel } from "./ItemModel.js"
import { PropensityViewModel } from "./PropensityViewModel.js"


export class CharacterWizardModel extends Wizard {

    constructor() {
        const globalCharacterData = new ConfiguredCharacterData()

        const panels : IPartialViewModel<IWizardModel<void, void>>[] = []

        super(panels, "Character Creator")

        panels.push(
            Utility.BundleViewAndModel(new EntryConfigurationModel(globalCharacterData, this.next.bind(this))), 
            Utility.BundleViewAndModel(new PropensityViewModel(globalCharacterData)),
            Utility.BundleViewAndModel(new BackgroundViewModel(globalCharacterData)),
            Utility.BundleViewAndModel(new ItemModel(globalCharacterData)))
    }
}

