export class Language {
    constructor(public Name : string, public Description : string, public Popularity: number) {}
}

export class LearnedLanguage {
    constructor(public Name : string, public canSpeak : boolean, public canRead : boolean, public canWrite : boolean) {}
}