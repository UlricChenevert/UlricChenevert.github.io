import { SelectionPackage, TaggedObservableSelectionPackage } from "../Contracts/TaggedData.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Races } from "../Configuration/DispositionData.js";
import { Abilities } from "../Contracts/Abilities.js";
import { OrganizationEntanglementsGroup } from "../Contracts/Entanglements.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { ItemData } from "./ItemData.js";
import { ReligionData } from "./DietiesData.js";
import { CareerData } from "./CareerData.js";
import { createTaggedData, innateSourceTag } from "../Utility/TagUtility.js";
export class ConfiguredCharacterData {
    Name;
    Race;
    // Age: Observable<AgeType>
    // Morality: Observable<MoralityTypes>
    // Order: Observable<OrderTypes>
    // EconomicBackground: Observable<DevelopmentalEnvironmentType>
    // ChildhoodBackground: Observable<StoryModel | undefined>
    // AdultBackground: Observable<StoryModel | undefined>
    // ElderBackground: Observable<StoryModel | undefined>
    Profession;
    JobBackground;
    Job;
    JobSubset;
    Abilities;
    LanguageSelections;
    ItemSelections;
    TrinketSelections;
    OrganizationEntanglements;
    EntanglementAffects;
    ReligionSelections;
    IsMonotheist;
    EdgeSelections;
    SkillsSelection;
    SpellSelection;
    CorruptionSelection;
    DrawbacksSelection;
    Class;
    Level;
    HitDie;
    HitPoints;
    Gender;
    constructor() {
        this.Race = ko.observable(Races[0]);
        this.Profession = ko.observable("Skilled & Laborer");
        this.Job = ko.observable(CareerData.ProfessionToJobData["Skilled & Laborer"][0]);
        this.JobBackground = ko.observable(CareerData.JobToStoryData["Apprentice Artisan"]);
        this.JobSubset = ko.observable(JobSubsetEnum.Jeweler);
        this.Abilities = ko.observable(new Abilities(0, 0, 0, 0, 0, 0));
        this.LanguageSelections = EmptyTaggedObservableSelectionPackageFactory();
        this.ItemSelections = TaggedObservableSelectionPackageFactory(ItemData.UniversalStartingGear, innateSourceTag);
        this.TrinketSelections = TaggedObservableSelectionPackageFactory(ItemData.TrinketSelection, innateSourceTag);
        this.OrganizationEntanglements = ko.observable(new OrganizationEntanglementsGroup(undefined, undefined, undefined, undefined, undefined, undefined));
        this.EntanglementAffects = ko.observableArray([]);
        this.Name = ko.observable(new CharacterName("", "", ""));
        this.ReligionSelections = TaggedObservableSelectionPackageFactory(ReligionData.ReligionSelection, innateSourceTag);
        this.IsMonotheist = ko.observable(false);
        this.EdgeSelections = EmptyTaggedObservableSelectionPackageFactory();
        this.SkillsSelection = EmptyTaggedObservableSelectionPackageFactory();
        this.SpellSelection = EmptyTaggedObservableSelectionPackageFactory();
        this.CorruptionSelection = EmptyTaggedObservableSelectionPackageFactory();
        this.DrawbacksSelection = EmptyTaggedObservableSelectionPackageFactory();
        this.Class = ko.observable("");
        this.Level = ko.observable(0);
        this.HitDie = ko.observable(1);
        this.HitPoints = ko.observable(4);
        this.Gender = ko.observable(undefined);
    }
}
export const TaggedObservableSelectionPackageFactory = (original, tags = {}) => {
    const originalMapping = (original.OverridePossibleChoiceSelection) ?
        original.OverridePossibleChoiceSelection : new Map();
    return ko.observable(new TaggedObservableSelectionPackage(ko.observableArray(original.FixedSelection.map(x => createTaggedData(tags, x))), ko.observableArray(original.ChoiceSelection.map(x => createTaggedData(tags, x))), ko.observableArray(original.OverrideSelection.map(x => createTaggedData(tags, x))), originalMapping));
};
export const EmptyTaggedObservableSelectionPackageFactory = () => {
    return TaggedObservableSelectionPackageFactory(new SelectionPackage([], [], []));
};
