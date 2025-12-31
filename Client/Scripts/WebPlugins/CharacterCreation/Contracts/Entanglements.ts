import { DispositionType, PronounType, SocialRelationships, NameType } from "./StringTypes";

export class Entanglements {
    constructor(public Identifier : PronounType, public Attitudes : DispositionType, public Type : NameType) {}
}

export type RelationshipModel = {Identifier: PronounType, Disposition : DispositionType}

export const AttitudesTypes : DispositionType[] = [
    "Aggressive",
    "Hostile",
    "Negative",
    "Disinterested",
    "Unknown",
    "Receptive",
    "Friendly",
]

export const OrganizationTypes : SocialRelationships[] = [
    "Colleagues",
    "Family",
    "Local Civic Authorities",
    "Local Religious Authorities",
    "Master/Mentor/Lord",
    "Neighbors/Local Inhabitants",
    "Shadow Groups"
]