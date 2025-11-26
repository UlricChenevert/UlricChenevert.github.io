import { DispositionType, RelationshipType, PronounType, SourceTypes, SocialRelationships } from "./StringTypes";

export class Entanglements {
    constructor(public Attitudes : DispositionType, public Type : RelationshipType, public Source : SourceTypes, public Name? : PronounType) {}
}

export type RelationshipModel = {Name?: PronounType, Disposition : DispositionType, Source : SourceTypes}

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