export class Language {
    Name;
    Description;
    Popularity;
    constructor(Name, Description, Popularity) {
        this.Name = Name;
        this.Description = Description;
        this.Popularity = Popularity;
    }
}
export class LearnedLanguage {
    Name;
    canSpeak;
    canRead;
    canWrite;
    constructor(Name, canSpeak, canRead, canWrite) {
        this.Name = Name;
        this.canSpeak = canSpeak;
        this.canRead = canRead;
        this.canWrite = canWrite;
    }
}
