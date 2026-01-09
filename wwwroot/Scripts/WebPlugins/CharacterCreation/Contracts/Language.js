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
    Language;
    canSpeak;
    canRead;
    canWrite;
    constructor(Language, canSpeak, canRead, canWrite) {
        this.Language = Language;
        this.canSpeak = canSpeak;
        this.canRead = canRead;
        this.canWrite = canWrite;
    }
}
