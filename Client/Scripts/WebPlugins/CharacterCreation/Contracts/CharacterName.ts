export class CharacterName {
    constructor (
        public Name : string | undefined, 
        public Bynames : string, 
        public Epithets : string,
        public showByname = false,
        public showEpithets = false,
    ) {}
}