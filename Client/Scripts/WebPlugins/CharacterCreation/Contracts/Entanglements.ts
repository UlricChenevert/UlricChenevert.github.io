import { Utility } from "../../../WebCore/Utility.js";
import { DispositionType, PronounType, NameType, EntanglementOrganizationTypesEnum, EntanglementOrganizationTypes, DispositionsEnum } from "./StringTypes.js";

export class Entanglements {
    constructor(public Identifier : PronounType, public Attitudes : DispositionsEnum, public Type : NameType) {}
}

export class OrganizationEntanglementsGroup {
    constructor(
        public Colleagues? : Entanglements, 
        public Family? : Entanglements, 
        public CivicAuthorities? : Entanglements,
        public ReligiousAuthorities? : Entanglements,
        public Master? : Entanglements,
        public Neighbors? : Entanglements,
        public ShadowGroups? : Entanglements,
    ) {}
}

export class EntanglementAffect {
    constructor(
        public Identifier : PronounType,
        public Destination : EntanglementOrganizationTypesEnum,
        public RollReservation : RollReservations
    ) 
    {}
}

export const createEntanglementPreview = (type : EntanglementOrganizationTypesEnum, entanglement? : Entanglements) : string => 
    (entanglement)? `(${type}) ${entanglement.Identifier.name} - ${entanglement.Attitudes}` : ""
    

export class EntanglementSlots {
    Colleague: EntanglementAffect | undefined
    Family: EntanglementAffect | undefined
    Civic: EntanglementAffect | undefined
    Religious: EntanglementAffect | undefined
    Master: EntanglementAffect | undefined
    Neighbor: EntanglementAffect | undefined
    ShadowOrganization: EntanglementAffect | undefined
} 

export enum RollReservations {Lowest, Highest}

export type RelationshipModel = {Identifier: PronounType, Disposition : DispositionType}

export const AttitudesTypes : DispositionsEnum[] = [
    DispositionsEnum.Aggressive,
    DispositionsEnum.Hostile,
    DispositionsEnum.Negative,
    DispositionsEnum.Disinterested,
    DispositionsEnum.Receptive,
    DispositionsEnum.Friendly,
]

export const OrganizationTypes : EntanglementOrganizationTypes[] = [
    EntanglementOrganizationTypesEnum.Colleagues,
    EntanglementOrganizationTypesEnum.Family,
    EntanglementOrganizationTypesEnum.CivicAuthorities,
    EntanglementOrganizationTypesEnum.ReligiousAuthorities,
    EntanglementOrganizationTypesEnum.Master,
    EntanglementOrganizationTypesEnum.Neighbors,
    EntanglementOrganizationTypesEnum.ShadowGroups
]

export const RandomAttitudes = OrganizationTypes.map(_=>Utility.RandomElement(AttitudesTypes))

export const OrganizationPropertyMap: Record<EntanglementOrganizationTypesEnum, keyof OrganizationEntanglementsGroup> = {
    [EntanglementOrganizationTypesEnum.Colleagues]: "Colleagues",
    [EntanglementOrganizationTypesEnum.Family]: "Family",
    [EntanglementOrganizationTypesEnum.CivicAuthorities]: "CivicAuthorities",
    [EntanglementOrganizationTypesEnum.ReligiousAuthorities]: "ReligiousAuthorities",
    [EntanglementOrganizationTypesEnum.Master]: "Master",
    [EntanglementOrganizationTypesEnum.Neighbors]: "Neighbors",
    [EntanglementOrganizationTypesEnum.ShadowGroups]: "ShadowGroups"
};