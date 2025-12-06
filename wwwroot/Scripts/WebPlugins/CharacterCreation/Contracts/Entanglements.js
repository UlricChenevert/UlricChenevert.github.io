export class Entanglements {
    Attitudes;
    Type;
    Source;
    Name;
    constructor(Attitudes, Type, Source, Name) {
        this.Attitudes = Attitudes;
        this.Type = Type;
        this.Source = Source;
        this.Name = Name;
    }
}
export const AttitudesTypes = [
    "Aggressive",
    "Hostile",
    "Negative",
    "Disinterested",
    "Unknown",
    "Receptive",
    "Friendly",
];
export const OrganizationTypes = [
    "Colleagues",
    "Family",
    "Local Civic Authorities",
    "Local Religious Authorities",
    "Master/Mentor/Lord",
    "Neighbors/Local Inhabitants",
    "Shadow Groups"
];
