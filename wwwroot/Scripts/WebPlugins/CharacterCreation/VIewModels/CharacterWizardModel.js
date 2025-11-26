import { Utility } from "../../../WebCore/Utility.js";
import { Wizard } from "../../../WebCore/ViewModels/Wizard.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { BackgroundViewModel } from "./BackgroundViewModel.js";
import { CharacterSheetModel } from "./CharacterSheetModel.js";
import { EntryConfigurationModel } from "./GenerationMethodModel.js";
import { PropensityViewModel } from "./PropensityViewModel.js";
import { SkillsModel } from "./SkillsModel.js";
export class CharacterWizardModel extends Wizard {
    constructor() {
        const globalCharacterData = new ConfiguredCharacterData();
        const panels = [];
        super(panels, "Heartbreaker Character Creator");
        panels.push(Utility.BundleViewAndModel(new EntryConfigurationModel(globalCharacterData, this.next.bind(this))), Utility.BundleViewAndModel(new PropensityViewModel(globalCharacterData)), Utility.BundleViewAndModel(new BackgroundViewModel(globalCharacterData)), Utility.BundleViewAndModel(new SkillsModel(globalCharacterData, [7, 8, 8, 9, 9, 10])), Utility.BundleViewAndModel(new CharacterSheetModel(globalCharacterData)));
    }
}
