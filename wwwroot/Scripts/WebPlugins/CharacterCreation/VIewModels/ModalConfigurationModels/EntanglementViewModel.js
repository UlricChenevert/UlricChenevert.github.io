import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { AttitudesTypes, OrganizationEntanglementsGroup, OrganizationPropertyMap, OrganizationTypes, RollReservations } from "../../Contracts/Entanglements.js";
import { EntanglementUtility } from "../../Utility/EntanglementUtility.js";
import { LockableObjectPickerModel } from "../LockableObjectPickerModel.js";
export class EntanglementCreationModel {
    GlobalCharacterData;
    FriendlyName = "Entanglement";
    ViewUrl = "Not Implemented";
    isLoading;
    Pickers;
    ConfiguredEntanglements;
    SortedUnselectedAttitudes;
    PossibleAttitudes;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleAttitudes = [];
        for (let i = 0; i < OrganizationTypes.length; i++)
            this.PossibleAttitudes.push(Utility.RandomElement(AttitudesTypes));
        this.SortedUnselectedAttitudes = ko.observableArray(this.PossibleAttitudes.map(x => x).sort());
        this.Pickers = {};
        for (let i = 0; i < OrganizationTypes.length; i++) {
            this.Pickers[OrganizationTypes[i]] =
                bundledEntanglementPicker(OrganizationTypes[i], this.SortedUnselectedAttitudes, this.GlobalCharacterData, this.SortedUnselectedAttitudes()[i]);
        }
        this.ConfiguredEntanglements = ko.observable(new OrganizationEntanglementsGroup(EntanglementUtility.generatePerson(), EntanglementUtility.generatePerson(), EntanglementUtility.generateOrganization(), EntanglementUtility.generateOrganization(), EntanglementUtility.generateOrganization(), EntanglementUtility.generatePlace(), EntanglementUtility.generateOrganization()));
        this.SortedUnselectedAttitudes.subscribe(() => {
            this.ConfiguredEntanglements(this.DetermineEntanglements());
        });
        this.isLoading = ko.observable(false);
    }
    Init() {
        const storyEntanglements = this.GlobalCharacterData.EntanglementAffects();
        this.SortedUnselectedAttitudes;
        // Initializes the pickers with the high/low roll
        storyEntanglements.forEach((entanglement) => {
            // Find the corresponding type
            this.Pickers[entanglement.Payload.Destination];
            // Grab highest/lowest role
            const attitudes = (entanglement.Payload.RollReservation == RollReservations.Highest) ?
                this.SortedUnselectedAttitudes()[this.SortedUnselectedAttitudes.length - 1] :
                this.SortedUnselectedAttitudes()[0];
            // I don't need to worry about reiniting it because it will lock and it won't replace the selected value
            // Init the corresponding model
            this.Pickers[entanglement.Payload.Destination].Model.Init(attitudes);
        });
        if (this.GlobalCharacterData.OrganizationEntanglements())
            this.ConfiguredEntanglements(this.GlobalCharacterData.OrganizationEntanglements());
        for (let i = 0; i < OrganizationTypes.length; i++) {
            initializeEntanglementPicker(this.Pickers[OrganizationTypes[i]], this.ConfiguredEntanglements()[OrganizationPropertyMap[OrganizationTypes[0]]]);
        }
        return Promise.resolve();
    }
    chooseRandomly() {
        const selection = Utility.shuffle(this.SortedUnselectedAttitudes().map(x => x));
        this.ClearChildren();
        for (let i = 0; i < OrganizationTypes.length; i++) {
            this.Pickers[OrganizationTypes[i]].Model.Init(selection[0]);
        }
    }
    Randomize() {
        this.chooseRandomly();
        this.Evaluate();
    }
    Evaluate() {
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
    return Utility.BundleViewAndModel(new LockableObjectPickerModel(Name, unselectedValues, characterData, finalDefaultValue, (value) => `${Name} : ${value}`, (value) => `${Name} : ${value}`));
};
const combineEntanglementWithAttitude = (attitude, sourceEntanglement) => {
    if (sourceEntanglement === undefined)
        throw "Unexpected state for source entanglement";
    sourceEntanglement.Attitudes = attitude;
    return sourceEntanglement;
};
