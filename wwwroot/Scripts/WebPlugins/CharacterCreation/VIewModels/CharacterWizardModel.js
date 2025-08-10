import { Wizard } from "../../../WebCore/ViewModels/Wizard.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { BackgroundViewModel } from "./BackgroundViewModel.js";
import { PropensityViewModel } from "./PropensityViewModel.js";
export class CharacterWizardModel extends Wizard {
    constructor() {
        const globalCharacterData = new ConfiguredCharacterData();
        super([
            new PropensityViewModel(globalCharacterData),
            new BackgroundViewModel(globalCharacterData),
            new BackgroundViewModel(globalCharacterData),
            new BackgroundViewModel(globalCharacterData),
        ]);
    }
}
