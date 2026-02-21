import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { OrganizationEntanglementsGroup, OrganizationPropertyMap, OrganizationTypes, RandomAttitudes, RollReservations } from "../../Contracts/Entanglements.js";
import { Dispositions, DispositionsEnum } from "../../Contracts/StringTypes.js";
import { EntanglementUtility } from "../../Utility/EntanglementUtility.js";
import { LockableObjectPickerModel } from "../LockableObjectPickerModel.js";
export class EntanglementCreationModel {
    GlobalCharacterData;
    FriendlyName = "Entanglement";
    ViewUrl = "PartialViews/EntanglementsConfigurationView.html";
    isLoading;
    Pickers;
    ConfiguredEntanglements;
    SortedUnselectedAttitudes;
    PossibleAttitudes;
    OrganizationTypes = OrganizationTypes;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleAttitudes = RandomAttitudes.map(x => x);
        this.SortedUnselectedAttitudes = ko.observableArray(this.PossibleAttitudes.map(x => x).sort((a, b) => {
            return Dispositions[a].roll - Dispositions[b].roll;
        }));
        this.Pickers = {};
        for (let i = 0; i < OrganizationTypes.length; i++) {
            this.Pickers[OrganizationTypes[i]] =
                bundledEntanglementPicker(OrganizationTypes[i], this.SortedUnselectedAttitudes, this.GlobalCharacterData, DispositionsEnum.Disinterested);
        }
        this.ConfiguredEntanglements = ko.observable(new OrganizationEntanglementsGroup(EntanglementUtility.generatePlace(this.PossibleAttitudes[0]), EntanglementUtility.generatePerson(this.PossibleAttitudes[1]), EntanglementUtility.generateOrganization(this.PossibleAttitudes[2]), EntanglementUtility.generateOrganization(this.PossibleAttitudes[3]), EntanglementUtility.generatePerson(this.PossibleAttitudes[4]), EntanglementUtility.generatePlace(this.PossibleAttitudes[5]), EntanglementUtility.generateShadowOrganization(this.PossibleAttitudes[6])));
        this.SortedUnselectedAttitudes.subscribe((newValue) => {
            newValue.sort((a, b) => { return Dispositions[a].roll - Dispositions[b].roll; });
            if (newValue.length != 0)
                return;
            this.ConfiguredEntanglements(this.DetermineEntanglements());
        });
        this.isLoading = ko.observable(false);
    }
    Init() {
        this.ClearChildren();
        const storyEntanglements = this.GlobalCharacterData.EntanglementAffects();
        // Initializes the pickers with the high/low roll
        storyEntanglements.forEach((entanglement) => {
            // Grab highest/lowest role
            const attitudes = (entanglement.Payload.RollReservation == RollReservations.Highest) ?
                this.SortedUnselectedAttitudes()[this.SortedUnselectedAttitudes.length - 1] :
                this.SortedUnselectedAttitudes()[0];
            // I don't need to worry about reiniting it because it will lock and it won't replace the selected value
            // Find the corresponding type
            // Init the corresponding model
            this.Pickers[entanglement.Payload.Destination].Model.Init(attitudes);
            this.Pickers[entanglement.Payload.Destination].Model.isUnlockableByUser(false);
        });
        const globalCopy = this.GlobalCharacterData.OrganizationEntanglements();
        OrganizationTypes.forEach((organizationType) => {
            const globalEntanglement = globalCopy[OrganizationPropertyMap[organizationType]];
            if (globalEntanglement === undefined)
                return;
            const localCopy = this.ConfiguredEntanglements()[OrganizationPropertyMap[organizationType]];
            localCopy.Identifier = globalEntanglement.Identifier;
            localCopy.Attitudes = globalEntanglement.Attitudes;
            localCopy.Type = globalEntanglement.Type;
            this.Pickers[organizationType].Model.Init(globalEntanglement.Attitudes);
        });
        return Promise.resolve();
    }
    chooseRandomly() {
        this.ClearChildren();
        const selection = Utility.shuffle(this.SortedUnselectedAttitudes().map(x => x));
        for (let i = 0; i < OrganizationTypes.length; i++) {
            const modelReference = this.Pickers[OrganizationTypes[i]].Model;
            if (!modelReference.isUnlockableByUser())
                continue; // Already has a value provided
            this.Pickers[OrganizationTypes[i]].Model.Init(selection.pop());
        }
    }
    Randomize() {
        this.Init();
        this.chooseRandomly();
        this.Evaluate();
    }
    Evaluate() {
        this.ConfiguredEntanglements(this.DetermineEntanglements());
        this.GlobalCharacterData.OrganizationEntanglements(this.ConfiguredEntanglements());
        return this.ConfiguredEntanglements();
    }
    DetermineEntanglements() {
        const legacyEntanglements = this.ConfiguredEntanglements();
        for (let i = 0; i < OrganizationTypes.length; i++) {
            initializeEntanglementPicker(this.Pickers[OrganizationTypes[i]], this.ConfiguredEntanglements()[OrganizationPropertyMap[OrganizationTypes[i]]]);
        }
        return new OrganizationEntanglementsGroup(...OrganizationTypes.map(x => {
            return combineEntanglementWithAttitude(this.Pickers[x].Model.Evaluate(), legacyEntanglements[OrganizationPropertyMap[x]]);
        }));
    }
    ClearChildren() {
        for (let i = 0; i < OrganizationTypes.length; i++) {
            this.Pickers[OrganizationTypes[i]].Model.clear();
        }
    }
}
const initializeEntanglementPicker = (picker, ConfiguredEntanglement) => {
    if (ConfiguredEntanglement)
        picker.Model.Init(ConfiguredEntanglement.Attitudes);
};
const bundledEntanglementPicker = (Name, unselectedValues, characterData, DefaultValue) => {
    const finalDefaultValue = (DefaultValue) ? DefaultValue : unselectedValues()[0];
    return Utility.BundleViewAndModel(new LockableObjectPickerModel(Name, unselectedValues, characterData, finalDefaultValue, (value) => `${value}`, (value) => `${value}`));
};
const combineEntanglementWithAttitude = (attitude, sourceEntanglement) => {
    if (sourceEntanglement === undefined)
        throw "Unexpected state for source entanglement";
    sourceEntanglement.Attitudes = attitude;
    return sourceEntanglement;
};
