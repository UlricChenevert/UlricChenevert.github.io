export class Language {
    constructor(public Name : string, public Description : string, public Popularity: number) {}
}

export class LearnedLanguage {
    constructor(public Language : Language, public canSpeak : boolean, public canRead : boolean, public canWrite : boolean) {}
}