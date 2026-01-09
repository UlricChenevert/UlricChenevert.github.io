import { Utility } from "../../../WebCore/Utility.js";
import { EntanglementOrganizationTypesEnum, DispositionsEnum } from "./StringTypes.js";
export class Entanglements {
    Identifier;
    Attitudes;
    Type;
    constructor(Identifier, Attitudes, Type) {
        this.Identifier = Identifier;
        this.Attitudes = Attitudes;
        this.Type = Type;
    }
}
export class OrganizationEntanglementsGroup {
    Colleagues;
    Family;
    CivicAuthorities;
    ReligiousAuthorities;
    Master;
    Neighbors;
    ShadowGroups;
    constructor(Colleagues, Family, CivicAuthorities, ReligiousAuthorities, Master, Neighbors, ShadowGroups) {
        this.Colleagues = Colleagues;
        this.Family = Family;
        this.CivicAuthorities = CivicAuthorities;
        this.ReligiousAuthorities = ReligiousAuthorities;
        this.Master = Master;
        this.Neighbors = Neighbors;
        this.ShadowGroups = ShadowGroups;
    }
}
export class EntanglementAffect {
    Identifier;
    Destination;
    RollReservation;
    constructor(Identifier, Destination, RollReservation) {
        this.Identifier = Identifier;
        this.Destination = Destination;
        this.RollReservation = RollReservation;
    }
}
export const createEntanglementPreview = (type, entanglement) => (entanglement) ? `(${type}) ${entanglement.Identifier.name} - ${entanglement.Attitudes}` : "";
export class EntanglementSlots {
    Colleague;
    Family;
    Civic;
    Religious;
    Master;
    Neighbor;
    ShadowOrganization;
}
export var RollReservations;
(function (RollReservations) {
    RollReservations[RollReservations["Lowest"] = 0] = "Lowest";
    RollReservations[RollReservations["Highest"] = 1] = "Highest";
})(RollReservations || (RollReservations = {}));
export const AttitudesTypes = [
    DispositionsEnum.Aggressive,
    DispositionsEnum.Hostile,
    DispositionsEnum.Negative,
    DispositionsEnum.Disinterested,
    DispositionsEnum.Receptive,
    DispositionsEnum.Friendly,
];
export const OrganizationTypes = [
    EntanglementOrganizationTypesEnum.Colleagues,
    EntanglementOrganizationTypesEnum.Family,
    EntanglementOrganizationTypesEnum.CivicAuthorities,
    EntanglementOrganizationTypesEnum.ReligiousAuthorities,
    EntanglementOrganizationTypesEnum.Master,
    EntanglementOrganizationTypesEnum.Neighbors,
    EntanglementOrganizationTypesEnum.ShadowGroups
];
export const RandomAttitudes = OrganizationTypes.map(_ => Utility.RandomElement(AttitudesTypes));
export const OrganizationPropertyMap = {
    [EntanglementOrganizationTypesEnum.Colleagues]: "Colleagues",
    [EntanglementOrganizationTypesEnum.Family]: "Family",
    [EntanglementOrganizationTypesEnum.CivicAuthorities]: "CivicAuthorities",
    [EntanglementOrganizationTypesEnum.ReligiousAuthorities]: "ReligiousAuthorities",
    [EntanglementOrganizationTypesEnum.Master]: "Master",
    [EntanglementOrganizationTypesEnum.Neighbors]: "Neighbors",
    [EntanglementOrganizationTypesEnum.ShadowGroups]: "ShadowGroups"
};
