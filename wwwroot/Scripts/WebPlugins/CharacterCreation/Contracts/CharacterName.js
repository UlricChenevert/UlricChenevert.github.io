export class CharacterName {
    Name;
    Bynames;
    Epithets;
    showByname;
    showEpithets;
    constructor(Name, Bynames, Epithets, showByname = false, showEpithets = false) {
        this.Name = Name;
        this.Bynames = Bynames;
        this.Epithets = Epithets;
        this.showByname = showByname;
        this.showEpithets = showEpithets;
    }
}
