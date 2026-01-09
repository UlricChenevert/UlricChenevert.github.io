import { PronounType } from "./StringTypes.js";

export class Deity {
    constructor (public Pronoun : PronounType, public Description : string, public SymbolPath? : string, public RunePath? : string) {}
}