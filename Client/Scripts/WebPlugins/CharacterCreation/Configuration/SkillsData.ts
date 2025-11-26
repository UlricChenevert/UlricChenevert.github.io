import { Skill } from "../Contracts/Skill";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData";

export const SkillsData : MultiTaggedCharacterData<Skill>[] = [
    {
        Tags:[{
            Profession:{Class:"Adventurer"}
        }],
        Payload: new Skill("Jeweler", " You can evaluate, appraise, repair, and make jewelry and decorations out of fine metals like gold, silver, platinum, & gems.")
    }
] 