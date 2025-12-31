import { DispositionType, JobSubset, JobSubsetEnum, JobType, ProfessionType } from "../Contracts/StringTypes.js";
import { StoryModel } from "../Contracts/TaggedData.js";
import { RelationshipModel } from "../Contracts/Entanglements.js";
import { Utility } from "../../../WebCore/Utility.js";


export namespace CareerData {
    const generateRelationships = (disposition : DispositionType, chosenName? : string) : RelationshipModel  =>{
        return {Identifier: {id: Utility.idGenerator.newID(), name: chosenName}, Disposition: disposition}
    }

    export const possibleProfessions : ProfessionType[] = [
        "Skilled & Laborer" , "Performer & Scholarly" , "Religious" , "Martial" , "Arcane" , "Rogue"
    ]

    export const ProfessionToJobData : Record<ProfessionType, JobType[]> = {
        "Skilled & Laborer": [
            "Apprentice Artisan", "Apprentice Bureaucrat", "Free Laborer", 
            "Apprentice Crafter", "Apprentice Mercantiler", "Escaped Peasant/Thrall"],
        "Performer & Scholarly": ["Acrobat", "Contortionist", "Jester", "Minstrel", "Scholar", "Storyteller/Thespian"],
        Religious: ["Accursed", "Acolyte", "Cultist", "Inquisitor", "Pariah", "Touched/Anchorite"],
        Martial: ["Armiger", "Barbarian", "Mercentary/Hedge", "Prizefighter", "Ruffian/Enforcer", "Woodard/Warden"],
        Arcane: ["Adept/Arcane Apprentice", "Alchemy Apprentice", "Arcane Researcher", "Charlatan", "Dowser", "Warlock"],
        Rogue: ["Fence", "Gambler", "Scoundrel", "Sharp", "Spy", "Street Urchin"]
    }

    export const JobToStoryData : Record<JobType, StoryModel<JobType>> = {
        "Apprentice Artisan": {
            Name: "Apprentice Artisan",
            Story: "You were discharged by your master, or absconded with a set of tools. They were either cruel and stingy, jealous of your genius, or blamed you for something valuable that disappeared.",
            Other: "If your reputation is not widely known, an Artisan can take up a job with a new master in a large city and make 40 coins per week.",
            AffectedPeople: [generateRelationships("Hostile", "Former Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\CC 300dpi 3inW MEN ARTISAN JEWELER LAPIDARY GEMCUTTER Jost Amman cleaned up original.jpg"
        },
        "Apprentice Bureaucrat": {
            Name: "Apprentice Bureaucrat",
            Story: "Some legal documents being transcribed had a critical error and you were blamed even though you pointed out that the original documents had the same error. To save face, your master blamed you.",
            Other: "Since you were discharged, put your lowest roll on Master or Colleagues. You can make 40 coins per week in a large city.",
            AffectedPeople: [generateRelationships("Hostile", "Former Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN SCRIVNER SCRIBE THR.jpg"
        },
        "Free Laborer": {
            Name: "Free Laborer",
            Story: "You worked on the manor of a local lord. You were discharged due to jealousy of other laborers or because the lord believed that you injured their property.",
            Other: "In another town, a Free Laborer can take up a job with a master and make 30 coins per week.",
            AffectedPeople: [generateRelationships("Hostile", "Former Employer")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN AMBLER John Tenniel.jpg"
        },
        "Apprentice Crafter": {
            Name: "Apprentice Crafter",
            Story: "After a lengthy apprenticeship, you had a major falling out with your master. It may have been due to their jealousy or that of another apprentice. Now you are on the streets.",
            Other: "In another town, a Crafter can take up a job with a master and make 40 coins per week.",
            AffectedPeople: [generateRelationships("Hostile", "Former Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Orc\\CC 300dpi 3inW MEN ORC CRAFTER SMITH Ricardo de Gaspar.jpg"
        },
        "Apprentice Mercantiler": {
            Name: "Apprentice Mercantiler",
            Story: "A client or local authorities accused your master’s business of inaccurate exchanges or tax evasion. Someone had to be blamed and it fell to you.",
            Other: "In another town, a Mercantiler can make 40 coins per week. If working with shady characters, prioritize Shadow Groups in Entanglements.",
            AffectedPeople: [generateRelationships("Hostile", "Former Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW LAWYER ADVOCATE MONEY CHANGER Hans Holbein.jpg"
        },
        "Escaped Peasant/Thrall": {
            Name: "Escaped Peasant/Thrall",
            Story: "Through debt or birth, you were locked into servitude. Through providence or assistance, you have escaped and finally broke the chains.",
            Other: "Put your lowest roll on Master or Local Authorities. You can make 20 coins per week if your background remains unknown.",
            AffectedPeople: [generateRelationships("Hostile", "Former Owner")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Halfling\\RR HALFLING VAGABOND THRALL Stocks Leg Chains JE Shields.png"
        },

        "Acrobat": {
            Name: "Acrobat",
            Story: "You are a daredevil that has been jumping from dangerous heights since childhood. You joined travelling entertainers, but recently left due to professional jealousy, a bad relationship, or accusations of theft.",
            Other: "Put your lowest roll on Colleagues or Local Authorities. Consider high Shadow Groups. Earn 20 coins/week on corners, or 30 with a troupe (plus room/board).",
            AffectedPeople: [generateRelationships("Negative", "Former Troupe")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        // --- PERFORMER ---
        Contortionist: {
            Name: "Contortionist",
            Story: "Since you were a child, you were able to bend the joints of your limbs in disturbing configurations. Recently, you had to leave your troupe because of professional jealousy, a relationship gone bad, or accusations of theft.",
            Other: "Put your lowest roll on Colleagues or Local Authorities. Consider high Shadow Groups. Earn 20 coins/week on corners, or 30 with a troupe. Crit Success on INT/WIS/CHA doubles amount; Crit Failure halves it.",
            AffectedPeople: [generateRelationships("Negative", "Former Troupe Leader")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Jester": {
            Name: "Jester",
            Story: "Your sharp wit has cut too close to the truth and insulted your lord or someone important to them, so you have been sent packing.",
            Other: "Earn 10 coins/week on corners, or 20 at a tavern. Success on INT/WIS/CHA tests can double earnings; Critical Failure halves it.",
            AffectedPeople: [generateRelationships("Hostile", "Insulted Lord")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Minstrel": {
            Name: "Minstrel",
            Story: "Your love of music led you to run away from a dreary life. A disagreement with locals or a rival musician has led you to start a new adventure.",
            Other: "Earn 20 coins/week on corners, or 30 at an inn. Successful CHA tests double money and provide free food/drinks.",
            AffectedPeople: [generateRelationships("Negative", "Rival Musician")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Scholar: {
            Name: "Scholar",
            Story: "Now that your apprenticeship is complete, you wanted to seek out new lore in the world rather than research minutiae and sit in a dark room reading dusty scrolls.",
            Other: "You can obtain employment as a researcher or tutor for 20 coins per week, usually including room and board.",
            AffectedPeople: [],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN SPELLCASTER ACADEMIC SCHOLAR Eugen Neureuther.jpg"
        },
        "Storyteller/Thespian": {
            Name: "Storyteller/Thespian",
            Story: "You were labeled a daft daydreamer and beaten for laziness, so you joined a troupe. Recently, you left due to jealousy, a failed relationship, or accusations of theft.",
            Other: "Earn 20 coins/week with a new troupe including food/drink/lodging. Critical INT/WIS/CHA success doubles earnings.",
            AffectedPeople: [generateRelationships("Negative", "Former Troupe")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        // --- RELIGIOUS ---
        Accursed: {
            Name: "Accursed",
            Story: "You have been tainted mentally or physically through study of arcane, profane, and divine powers. Many believe this indicates a taint on your soul. Only you know the truth.",
            Other: "Put lowest roll in Local Religious Authorities or Neighbors. In Step 8 - Corruption, roll 1d20 (effect) and 1d6 (severity).",
            AffectedPeople: [generateRelationships("Hostile", "Inquisitor")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Acolyte: {
            Name: "Acolyte",
            Story: "You spent time studying the deeper mysteries of the divine. You may have been an offering, an orphan, or sent by family too poor to feed you.",
            Other: "Put highest roll in Local Religious Authorities or Neighbors. Earn 30 coins/week performing blessings/ceremonies with temple approval.",
            AffectedPeople: [],
            AffectedOrganization: [generateRelationships("Friendly", "Local Temple")],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Inquisitor: {
            Name: "Inquisitor",
            Story: "Even as a child, you could sense wickedness. Now trained, you root out profane powers and heresy, no matter the cost.",
            Other: "Put highest roll in Local Religious Authorities; lowest in Neighbors due to paranoia. Earn 30 coins/week plus meals/drinks investigating for a temple.",
            AffectedPeople: [generateRelationships("Hostile", "Local Neighbors")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Pariah: {
            Name: "Pariah",
            Story: "Visions have shown you that current religious teachings are corrupted. Because you discussed these flaws, you are now being persecuted.",
            Other: "Put lowest roll in Local Religious Authorities. If heretical, Inquisitors may be sent. You can impersonate an Acolyte in other towns to earn 30 coins/week.",
            AffectedPeople: [generateRelationships("Hostile", "Religious Leaders")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Touched/Anchorite": {
            Name: "Touched/Anchorite",
            Story: "You have been chosen for a divine purpose and have helped the disadvantaged. This acclaim causes consternation with authorities who wish to use you as a puppet.",
            Other: "Put highest roll on Neighbors. Put lowest roll in Local Authorities or Local Religious Authorities. Inquisitors may question you.",
            AffectedPeople: [generateRelationships("Friendly", "Disadvantaged Locals")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },

        // --- MARTIAL ---
        Armiger: {
            Name: "Armiger",
            Story: "Through long training you have earned the right to bear arms. A lord knighted you and allowed you to establish a coat of arms.",
            Other: "Put highest roll in Master or Local Authorities. Personal guards earn 30 coins per successful STR/DEX/CON test; Crit Failure requires Wounded Table roll.",
            AffectedPeople: [generateRelationships("Disinterested", "Suzerain Lord")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Mercentary/Hedge": {
            Name: "Mercentary/Hedge",
            Story: "Extenuating circumstances led to hard choices. You may be a knight in exile, or a field-trained talent with no allegiance due to bad luck.",
            Other: "Mercenaries/Bandits make STR/DEX/INT tests weekly: 10 coins per success, 20 per Crit. Crit Failure requires Wounded Table roll.",
            AffectedPeople: [],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Prizefighter: {
            Name: "Prizefighter",
            Story: "You fight competitively and have the scars to prove it. Your career is often tainted by criminal elements.",
            Other: "Put a high roll in Shadow Groups. May start with 10d6 extra coins but owe a crime boss double. Earn 15 coins per successful STR/DEX/CON test.",
            AffectedPeople: [generateRelationships("Negative", "Crime Boss")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Ruffian/Enforcer": {
            Name: "Ruffian/Enforcer",
            Story: "The trick to being a successful bully is to hit hard, fast, and first. You run with a rough crowd or work as muscle for hire.",
            Other: "Put highest rolls in Colleagues (Gang) and Shadow Groups; lowest in Local Authorities. Start with 4x coins. Earn 10 coins per STR/DEX/WIS success.",
            AffectedPeople: [generateRelationships("Friendly", "The Gang")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Woodard/Warden": {
            Name: "Woodard/Warden",
            Story: "You patrol and protect your lord's wooded lands from poachers and timber thieves.",
            Other: "Put highest roll in Master or Local Authorities. If discharged, lord will seek your arrest within a 25-mile radius.",
            AffectedPeople: [generateRelationships("Disinterested", "Forest Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },// --- ARCANE ---
        "Adept/Arcane Apprentice": {
            Name: "Adept/Arcane Apprentice",
            Story: "You exhibited talent at an early age and were apprenticed to a spellcaster to control the imaginary forces around us.",
            Other: "Masters magically bind apprentices; revealing their nature causes unconsciousness and memory loss. Public knowledge of your magic grants Disadvantage on Local Authority reactions.",
            AffectedPeople: [generateRelationships("Disinterested", "Former Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Alchemy Apprentice": {
            Name: "Alchemy Apprentice",
            Story: "You seek eternal life and turning lead to gold. You left your master because they withheld lore, or perhaps they died in a laboratory explosion.",
            Other: "Alchemists jealously guard secrets. You can earn 40 coins/week in cities, but must pay Guild dues. Freelancing without approval leads to 'accidents'.",
            AffectedPeople: [generateRelationships("Negative", "Alchemy Guild")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Arcane Researcher": {
            Name: "Arcane Researcher",
            Story: "Apprenticed to an academy, you grew bored of abstruse trivia and began forbidden research. You were discharged when your experiments were discovered.",
            Other: "Earn 1d4 coins/day in large cities. Magic is dangerous; roll 1d20 for Corruption effect and 1d6 for severity in Step 8.",
            AffectedPeople: [generateRelationships("Negative", "Academy Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Charlatan: {
            Name: "Charlatan",
            Story: "You love flashy entrances and center-stage attention. Your claims of spirits and teleportation are exaggerated, but you believe it's harmless fun.",
            Other: "Earn 1 coin/day on corners, or 1-2 with a troupe plus lodging. Usually harbors criminal connections.",
            AffectedPeople: [generateRelationships("Disinterested", "Former Audience")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Dowser: {
            Name: "Dowser",
            Story: "You have a knack for finding water and missing children. Your uncanny ability unnerves neighbors, making them distrustful.",
            Other: "Earn 2d10 coins/week in urban or high-travel rural areas. Neighbors should never be your highest entanglement roll.",
            AffectedPeople: [generateRelationships("Negative", "Suspicious Neighbors")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Warlock: {
            Name: "Warlock",
            Story: "You speak with your familiar and the voices in your head more than people. You dress in dark shades, pursuing a profane sponsorship.",
            Other: "If you negotiate servitude, you gain the Arcana 1 Edge at 1st Level. Different masters grant specific proficiencies and corruption swaps.",
            AffectedPeople: [generateRelationships("Disinterested", "Potential Patron")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Halfling\\CC 300dpi 3inW HALFLING WARLOCK Didrik Magnus modified thicker outline.jpg"
        },

        // --- ROGUE ---
        Fence: {
            Name: "Fence",
            Story: "You can buy, sell, or locate anything. Recent attention from authorities suggests it is time to relocate.",
            Other: "Roll on Trinkets table 3 times. Earn 10/20 coins per success on INT/WIS/CHA tests. Crit failure results in a 2d10 coin fine/bribe.",
            AffectedPeople: [generateRelationships("Friendly", "Criminal Contacts")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Gambler: {
            Name: "Gambler",
            Story: "An uncanny ability to win games of chance has made you unpopular in local taverns. Sore losers are forcing you to move on.",
            Other: "Gain a Compulsion or Addiction drawback. Earn 10/40 coins on INT/WIS/CHA tests. Crit results mean an attack; roll Wounded with Advantage.",
            AffectedPeople: [generateRelationships("Negative", "Sore Losers")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Scoundrel: {
            Name: "Scoundrel",
            Story: "You live by guile and quick reflexes. You may run with a gang or hide among traveling entertainers to find victims.",
            Other: "Earn 10/20 coins on DEX/WIS/CHA tests. Discovery leads to combat; KO results in arrest.",
            AffectedPeople: [generateRelationships("Friendly", "Street Gang")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi MEN SCOUNDREL Tony Johannot modified.jpg"
        },
        Sharp: {
            Name: "Sharp",
            Story: "You have good eyes, and your guild relies on you as a lookout to keep the crew safe.",
            Other: "Earn 10/20 coins on DEX/INT/CHA tests. Crit failure leads to combat/arrest.",
            AffectedPeople: [generateRelationships("Friendly", "Thieves Guild")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Spy: {
            Name: "Spy",
            Story: "You sneak or talk your way anywhere for a price. Patrons hire you to track opponents or steal secrets.",
            Other: "Has a mentor/handler. Earn 15/30 coins on DEX/INT/CHA tests. Working alone makes discovery more dangerous.",
            AffectedPeople: [generateRelationships("Friendly", "Handler")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Street Urchin": {
            Name: "Street Urchin",
            Story: "Abandoned or orphaned, the street made you sharp. You are not yet an adult and must survive by your wits.",
            Other: "Has 'Youth' Drawback (stat adjustments). Earn 10/20 coins on DEX/INT/CHA tests. Usually part of an informal gang.",
            AffectedPeople: [generateRelationships("Friendly", "Urchin Gang")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        Cultist: {
            Name: "Cultist",
            Story: "Dark powers whisper in your mind. You now have the urge to seek out deeper forbidden lore and find others with similar interests.",
            Other: "Put your lowest roll in Local Religious Authorities. If secret, you can impersonate an Acolyte for 30 coins per week.",
            AffectedPeople: [generateRelationships("Receptive", "Cult Cell")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN CLERIC CULTIST Howard Pyle modified.jpg"
        },
        Barbarian: {
            Name: "Barbarian",
            Story: "In the hinterlands, life is simple. You have travelled to more settled areas out of curiosity, wanderlust, or because you were banished.",
            Other: "Reduce starting coins to 0. You have the Drawback: Outlander.",
            AffectedPeople: [],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\RR WOMEN Martial BARBARIAN Ricardo de Gaspar_0924_1.png"
        },
    }
    
    export const JobSubsetData : Record<JobType, JobSubset[]> = {
        // PERFOMER
        Contortionist: [JobSubsetEnum.None],
        Acrobat: [JobSubsetEnum.None],
        Jester: [JobSubsetEnum.None],
        Minstrel: [JobSubsetEnum.None],
        "Storyteller/Thespian": [JobSubsetEnum.None],
        Scholar: [JobSubsetEnum.None],
        // RELIGIOUS
        Acolyte: [JobSubsetEnum.Brewer, JobSubsetEnum.Farmer, JobSubsetEnum.Herder, JobSubsetEnum.Oratory, JobSubsetEnum.Theology, JobSubsetEnum.Vintner],
        Inquisitor: [JobSubsetEnum.Esoterica, JobSubsetEnum.Oratory, JobSubsetEnum.Theology],
        Accursed: [JobSubsetEnum.None],
        Cultist: [JobSubsetEnum.None],
        Pariah: [JobSubsetEnum.None],
        "Touched/Anchorite": [JobSubsetEnum.None],
        // MARTIAL
        Armiger: [JobSubsetEnum.ActiveService, JobSubsetEnum.Freelance],
        "Mercentary/Hedge": [JobSubsetEnum.LordSlain, JobSubsetEnum.Disgraced, JobSubsetEnum.HedgeKnight, JobSubsetEnum.Mercenary, JobSubsetEnum.Bandit],
        "Woodard/Warden": [JobSubsetEnum.ActiveService, JobSubsetEnum.Discharged],
        Barbarian: [JobSubsetEnum.None],
        Prizefighter: [JobSubsetEnum.None],
        "Ruffian/Enforcer": [JobSubsetEnum.None],
        // OTHERS
        "Apprentice Artisan": [JobSubsetEnum.Jeweler, JobSubsetEnum.Arbalist],
        "Apprentice Bureaucrat": [JobSubsetEnum.Scrivener, JobSubsetEnum.Advocate, JobSubsetEnum.Cartographer, JobSubsetEnum.Inspector, JobSubsetEnum.Interpreter],
        "Free Laborer": [JobSubsetEnum.Ambler, JobSubsetEnum.Chef],
        "Apprentice Crafter": [JobSubsetEnum.Smith, JobSubsetEnum.Carpenter],
        "Apprentice Mercantiler": [JobSubsetEnum.MoneyChanger],
        "Escaped Peasant/Thrall": [JobSubsetEnum.HouseServant, JobSubsetEnum.Farmhand, JobSubsetEnum.Laborer, JobSubsetEnum.Sailor],
        "Adept/Arcane Apprentice": [JobSubsetEnum.IxianRaver, JobSubsetEnum.IxianArchon, JobSubsetEnum.Dragon, JobSubsetEnum.Lich, JobSubsetEnum.Wizard],
        Warlock: [JobSubsetEnum.IxianRaver, JobSubsetEnum.IxianArchon, JobSubsetEnum.ElderGod, JobSubsetEnum.Lich, JobSubsetEnum.Moloch, JobSubsetEnum.Kain],
        Spy: [JobSubsetEnum.DisguiseSpecialist, JobSubsetEnum.BurglarSpecialist],
        "Alchemy Apprentice": [JobSubsetEnum.None],
        "Arcane Researcher": [JobSubsetEnum.None],
        Charlatan: [JobSubsetEnum.None],
        Dowser: [JobSubsetEnum.None],
        Fence: [JobSubsetEnum.None],
        Gambler: [JobSubsetEnum.None],
        Scoundrel: [JobSubsetEnum.None],
        Sharp: [JobSubsetEnum.None],
        "Street Urchin": [JobSubsetEnum.None],
    }
}
