import { IPartialViewModel, IWizardModel } from "../../../Framework/Contracts/ViewModel.js"
import { Utility } from "../../../WebCore/Utility.js"
import { Wizard } from "../../../WebCore/ViewModels/Wizard.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { BackgroundViewModel } from "./BackgroundViewModel.js"
import { CharacterSheetModel } from "./CharacterSheetModel.js"
import { EntryConfigurationModel } from "./GenerationMethodModel.js"
import { ItemConfigModel } from "./ItemModel.js"
import { PropensityViewModel } from "./PropensityViewModel.js"
import { RelationshipsConfigModel } from "./RelationshipsModel.js"


export class CharacterWizardModel extends Wizard {

    constructor() {
        const globalCharacterData = new ConfiguredCharacterData()

        const panels : IPartialViewModel<IWizardModel<void, void>>[] = []

        super(panels, "Heartbreaker Character Creator")

        panels.push(
            Utility.BundleViewAndModel(new EntryConfigurationModel(globalCharacterData, this.next.bind(this))), 
            Utility.BundleViewAndModel(new PropensityViewModel(globalCharacterData)),
            Utility.BundleViewAndModel(new BackgroundViewModel(globalCharacterData)),
            Utility.BundleViewAndModel(new ItemConfigModel(globalCharacterData)),
            Utility.BundleViewAndModel(new RelationshipsConfigModel(globalCharacterData)),
            Utility.BundleViewAndModel(new CharacterSheetModel(globalCharacterData))
        )
    }
}

