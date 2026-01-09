"use strict";
// import { Observable } from "../../../Framework/Knockout/knockout.js";
// import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
// import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
// import { StoryModel } from "../Contracts/TaggedData.js";
// import { ko } from "../../../Framework/Knockout/ko.js";
// import { Utility } from "../../../WebCore/Utility.js";
// import { DeityCreationModel } from "./DeityPickerModel.js";
// import { Deity } from "../Contracts/Diety.js";
// export class ReligionPickerModel implements ICharacterWizardViewModel<void, Deity[]> {
//     readonly ViewUrl = "PartialViews/ReligionPickerView.html";
//     FriendlyName = "Religion" 
//     isLoading: Observable<boolean>;
//     isMonotheist : Observable<boolean>
//     primaryDeity : IPartialViewModel<DeityCreationModel>
//     secondaryDeity : IPartialViewModel<DeityCreationModel> 
//     thirdDeity : IPartialViewModel<DeityCreationModel>
//     constructor (
//         public GlobalCharacterData : ConfiguredCharacterData, 
//         public PossibleReligions : Deity[]
//     ) {
//         this.isMonotheist = ko.observable(false)
//         this.primaryDeity = Utility.BundleViewAndModel(new DeityCreationModel(PossibleReligions, "Primary Deity"))
//         this.secondaryDeity = Utility.BundleViewAndModel(new DeityCreationModel(PossibleReligions, "Secondary Deity"))
//         this.thirdDeity = Utility.BundleViewAndModel(new DeityCreationModel(PossibleReligions, "Third Deity"))
//         this.isLoading = ko.observable(false)
//     }
//     async Init () {
//         this.primaryDeity.Model.Init()
//         this.isMonotheist(this.GlobalCharacterData.IsMonotheist())
//         if (!this.isMonotheist()) {
//             await this.secondaryDeity.Model.Init()
//             await this.thirdDeity.Model.Init()
//         }
//         return Promise.resolve()
//     }
//     Evaluate () {
//         const newDeities = [this.primaryDeity.Model.Evaluate()]
//         if (!this.isMonotheist()) {
//             newDeities.push((this.secondaryDeity as IPartialViewModel<DeityCreationModel>).Model.Evaluate())
//             newDeities.push((this.thirdDeity as IPartialViewModel<DeityCreationModel>).Model.Evaluate())
//         }
//         this.GlobalCharacterData.Deities(newDeities)
//         return newDeities
//     }
//     Randomize () {
//         this.primaryDeity.Model.Randomize()
//         if (!this.isMonotheist()) {
//             this.secondaryDeity?.Model.Randomize()
//             this.thirdDeity?.Model.Randomize()
//         }
//     }
//     checkGlobalStory(sourceOfTruth : StoryModel[], check : StoryModel) {
//         return sourceOfTruth.some((story)=>{return story.Name == check.Name})
//     }
// }
