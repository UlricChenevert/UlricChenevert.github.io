import { Utility } from "../../../WebCore/Utility.js"
import { Wizard } from "../../../WebCore/ViewModels/Wizard.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { possibleDeities } from "../Configuration/DietiesData.js"
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "../Configuration/TaggedNameData.js"
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js"
import { RaceType } from "../Contracts/StringTypes.js"
import { BackgroundViewModel } from "./BackgroundViewModel.js"
import { CharacterSheetModel } from "./CharacterSheetModel.js"
import { EntryConfigurationModel } from "./GenerationMethodModel.js"
import { NamePickerModel } from "./NamePickerModel.js"
import { PropensityViewModel } from "./PropensityViewModel.js"
import { ReligionPickerModel } from "./ReligionPickerModel.js"
import { SkillsModel } from "./SkillsModel.js"

export class CharacterWizardModel extends Wizard {

    characterPanels: IPartialViewModel<ICharacterWizardViewModel<void, void>>[]
    characterData : ConfiguredCharacterData

    constructor() {
        
        const panels : IPartialViewModel<ICharacterWizardViewModel<void, void>>[] = []
        
        super(panels, "Heartbreaker Character Creator")
        
        this.characterData = new ConfiguredCharacterData()

        panels.push(
            Utility.BundleViewAndModel(new EntryConfigurationModel(this.characterData, this.next.bind(this), this.Randomize.bind(this))), 
            Utility.BundleViewAndModel(new PropensityViewModel(this.characterData)),
            Utility.BundleViewAndModel(new BackgroundViewModel(this.characterData)),
            Utility.BundleViewAndModel(new SkillsModel(this.characterData)),
            Utility.BundleViewAndModel(new ReligionPickerModel(this.characterData, possibleDeities)),
            Utility.BundleViewAndModel(new NamePickerModel(this.characterData, TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData)),
            Utility.BundleViewAndModel(new CharacterSheetModel(this.characterData)),
        )

        this.characterPanels = panels
    }

    async Randomize (race? : RaceType) : Promise<void> {
        // Really shitty code, but I am rushing and I need to 
        // inject the race data into the global state. This makes having a
        // random function for the global state unnecessary and makes it 
        // so that I can just worry about randomizing on a local view model level

        // Called from first panel, causes recursive loop
        // await this._waitInitialization(this.characterPanels[0])
        await this._waitInitialization(this.characterPanels[1])

        if (race)
            this.characterData.Race(race)

        for (let i = 2; i < this.panels.length; i++) 
            await this._waitInitialization(this.characterPanels[i])

        return Promise.resolve()
    }

    async _waitInitialization(panel : IPartialViewModel<ICharacterWizardViewModel<void, void>>) {
        await panel.Model.Init()
        panel.Model.Randomize()
        panel.Model.Evaluate()
    }
}

