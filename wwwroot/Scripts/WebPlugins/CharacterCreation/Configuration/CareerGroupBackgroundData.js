import { Spell } from "../Contracts/Spell.js";
import { filterOnProfessionData, randomTaggedData } from "../Utility/FilterUtility.js";
import { TaggedEdgesData } from "./EdgesData.js";
import { GenerationType } from "./NameData.js";
import { SpellData } from "./SpellsData.js";
import { TaggedLanguageData } from "./LanguageOptions.js";
import { barbarianWholeTag, cultistWholeTag, scholarTag, scoundrelWholeTag, warlockWholeTag } from "../Utility/TagUtility.js";
var JobTypes;
(function (JobTypes) {
    JobTypes["Jeweler"] = "Jeweler";
    JobTypes["Arbalist"] = "Arbalist";
    JobTypes["Scrivener"] = "Scrivener";
    JobTypes["Advocate"] = "Advocate/Beadle";
    JobTypes["Cartographer"] = "Cartographer";
    JobTypes["Inspector"] = "Inspector/Reeve";
    JobTypes["Interpreter"] = "Interpreter";
})(JobTypes || (JobTypes = {}));
export const possibleJobs = [
    "Jeweler", "Arbalist", "Scrivener", "Advocate/Beadle", "Cartographer", "Inspector/Reeve",
    "Interpreter", "Rat Catcher", "Smith", "Carpenter", "Cooper/Wheelwright", "Leatherworker",
    "Mason", "Swordsmith", "Money Changer", "Assayer", "Brewer", "Herbalist", "Peddler",
    "Vintner", "Ambler", "Chef", "Farmer", "Fisher", "Herder", "Wagoner", "Escaped Thrall",
    "House Servant", "Farmhand", "Laborer", "Sailor (Conscript)", "Warlock", "Scoundrel", "Barbarian", "Cultist", "Scholar"
];
export const possibleClasses = ["Adventurer", "Bard", "Cleric", "Fighter", "Magic User", "Thief"];
const generateScholarBackground = (jobName, PictureUrl) => ({
    Tags: { Profession: { Class: "Adventurer", Job: jobName } },
    Payload: {
        Name: jobName,
        Story: "Some legal documents being transcribed had a critical error and you were blamed even though you pointed out that the original documents had the same error. To save face, your master blamed you. You were either discharged or left in the night with your supplies.",
        OrganizationNames: [ /* Master/Colleagues */],
        OrganizationRelations: ["Hostile"],
        Languages: randomTaggedData(TaggedLanguageData),
        Other: "If your reputation is not widely known, a Bureaucrat can take up a job with a new master in a large city and make 40 coins per week.",
        PartialPictureUrl: PictureUrl
    }
});
export const ClassBackgrounds = [
    {
        Tags: { Profession: { Class: "Adventurer", Job: JobTypes.Jeweler } },
        Payload: {
            Name: JobTypes.Jeweler,
            Story: "You were discharged by your master, " + GenerationType.PersonName + ", or absconded with a set of tools. They were either cruel and stingy, jealous of your genius, or blamed you for something valuable that disappeared.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "If your reputation is not widely known, an Artisan can take up a job with a new master in a large city and make 40 coins per week.",
            PartialPictureUrl: "Human\\CC 300dpi 3inW MEN ARTISAN JEWELER LAPIDARY GEMCUTTER Jost Amman cleaned up original.jpg"
        }
    },
    // --- Arbalist Background (Shares story with Jeweler) ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: JobTypes.Arbalist } },
        Payload: {
            Name: JobTypes.Arbalist,
            Story: "You were discharged by your master, " + GenerationType.PersonName + ", or absconded with a set of tools. They were either cruel and stingy, jealous of your genius, or blamed you for something valuable that disappeared.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "If your reputation is not widely known, an Artisan can take up a job with a new master in a large city and make 40 coins per week.",
            PartialPictureUrl: "Human\\PD MEN ARBALIST CROSSBOW MAKER Leslie L Brook.jpg"
        }
    },
    // --- Scrivener Background ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: JobTypes.Scrivener } },
        Payload: {
            Name: JobTypes.Scrivener,
            Story: "Some legal documents being transcribed had a critical error and you were blamed even though you pointed out that the original documents had the same error. To save face, your master, " + GenerationType.PersonName + ", blamed you. You were either discharged or left in the night with your supplies.",
            PeopleNames: [ /* Master/Colleagues */],
            PeopleRelations: ["Hostile"],
            Spells: filterOnProfessionData(SpellData, JobTypes.Scrivener),
            Languages: filterOnProfessionData(TaggedLanguageData, JobTypes.Scrivener),
            Other: "Since you were discharged, put your lowest roll on **Master or Colleagues** in Step 4 - Entanglements. If your reputation is not widely known, a Bureaucrat can take up a job with a new master in a large city and make 40 coins per week.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN SCRIVNER SCRIBE THR.jpg"
        }
    },
    // --- Advocate/Beadle Background (Shares story with Scrivener) ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: JobTypes.Advocate } },
        Payload: {
            Name: JobTypes.Advocate,
            Story: "Some legal documents being transcribed had a critical error and you were blamed even though you pointed out that the original documents had the same error. To save face, your master blamed you. You were either discharged or left in the night with your supplies.",
            OrganizationNames: [ /* Master/Colleagues */],
            OrganizationRelations: ["Hostile"],
            Languages: randomTaggedData(TaggedLanguageData),
            Other: "If your reputation is not widely known, a Bureaucrat can take up a job with a new master in a large city and make 40 coins per week.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW LAWYER ADVOCATE MONEY CHANGER Hans Holbein.jpg"
        }
    },
    // --- Cartographer Background (Shares story with Scrivener) ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: JobTypes.Cartographer } },
        Payload: {
            Name: JobTypes.Cartographer,
            Story: "Some legal documents being transcribed had a critical error and you were blamed even though you pointed out that the original documents had the same error. To save face, your master blamed you. You were either discharged or left in the night with your supplies.",
            OrganizationNames: [ /* Master/Colleagues */],
            OrganizationRelations: ["Hostile"],
            Languages: randomTaggedData(TaggedLanguageData),
            Other: "If your reputation is not widely known, a Bureaucrat can take up a job with a new master in a large city and make 40 coins per week.",
            PartialPictureUrl: "Human\\PD 300dpi 3in W MEN CARTOGRAPHER Jost Amman.jpg"
        }
    },
    generateScholarBackground(JobTypes.Inspector, "Human\\PD 300dpi 3inW MEN INQUISITOR INSPECTOR BUREAUCRAT REEVE Sword Scroll Walery Eljasz-Radzikowski.jpg"),
    generateScholarBackground(JobTypes.Interpreter),
    // --- Rat Catcher Background (Shares story with Scrivener, different gear/skill set) ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Rat Catcher" } },
        Payload: {
            Name: "Rat Catcher",
            Story: "Some legal documents being transcribed had a critical error and you were blamed even though you pointed out that the original documents had the same error. To save face, your master blamed you. You were either discharged or left in the night with your supplies.",
            PeopleNames: [ /* Master/Colleagues */],
            PeopleRelations: ["Hostile"],
            Edges: randomTaggedData(TaggedEdgesData), // Assuming an 'Edges' constructor
            Other: "Your anonymity has opened underworld contacts and opportunities for you. In Step 4 - Entanglements, put your highest in **Shadow Groups**. As a Rat Catcher, you make **20 coins** per week."
        }
    },
    // --- Smith Background ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Smith" } },
        Payload: {
            Name: "Smith",
            Story: "You have always loved working with your hands and making things that you saw in your mind. After a lengthy apprenticeship, you had a major falling out with your master. It may have been due to their jealousy or that of another apprentice. There could also have been a real or imagined violation of trust. Now you are on the streets.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "Since you were discharged, put your lowest roll on **Master or Colleagues** in Step 4 - Entanglements. In another town, a Crafter can take up a job with a master and make 40 coins per week.",
            PartialPictureUrl: "Orc\\CC 300dpi 3inW MEN ORC CRAFTER SMITH Ricardo de Gaspar.jpg"
        }
    },
    // --- Carpenter Background (Shares story with Smith) ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Carpenter" } },
        Payload: {
            Name: "Carpenter",
            Story: "You have always loved working with your hands and making things that you saw in your mind. After a lengthy apprenticeship, you had a major falling out with your master. It may have been due to their jealousy or that of another apprentice. There could also have been a real or imagined violation of trust. Now you are on the streets.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "Since you were discharged, put your lowest roll on **Master or Colleagues** in Step 4 - Entanglements. In another town, a Crafter can take up a job with a master and make 40 coins per week.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN CARPENTER cropped Jost Amman.jpg"
        }
    },
    // --- Money Changer Background ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Money Changer" } },
        Payload: {
            Name: "Money Changer",
            Story: "You were good with numbers and organization even as a small child. Years were spent apprenticing to learn how to value various precious currencies, as well as the math and processes to track complex monetary transactions and calculate interest. A client or local authorities accused your master’s business of inaccurate exchanges, money laundering, or evasion of taxes and fees. Someone had to be blamed and it fell to you. Now you are out on the street.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "Since you were discharged, put your lowest roll on **Master or Colleagues** in Step 4 - Entanglements. In another town, a Mercantiler can take up a job with a new master and make 40 coins per week. If you have been working with shady characters to cheat exchange rates or avoid taxes and fees, put your highest roll on **Shadow Groups** for Step 4 - Entanglements.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW LAWYER ADVOCATE MONEY CHANGER Hans Holbein.jpg"
        }
    },
    // --- Ambler Background ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Ambler" } },
        Payload: {
            Name: "Ambler",
            Story: "You worked on the manor of a local lord training and breaking horses. You were discharged due to jealousy of other laborers or because the lord believed that you injured their prize stallion.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "Since you were discharged, put your lowest roll on **Master or Colleagues** in Step 4 - Entanglements. In another town, a Free Laborer can take up a job with a master and make 30 coins per week.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN AMBLER John Tenniel.jpg"
        }
    },
    // --- Chef Background (Shares story with Ambler) ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Chef" } },
        Payload: {
            Name: "Chef",
            Story: "You worked on the manor of a local lord training and breaking horses. You were discharged due to jealousy of other laborers or because the lord believed that you injured their prize stallion.",
            PeopleNames: [],
            PeopleRelations: ["Hostile"],
            Other: "Since you were discharged, put your lowest roll on **Master or Colleagues** in Step 4 - Entanglements. You can make **1 coin per day** in a kitchen or tavern.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN CHEF COOK Honoré-Victorin Daumier.jpg"
        }
    },
    // --- Escaped Thrall Background ---
    {
        Tags: { Profession: { Class: "Adventurer", Job: "Escaped Thrall" } },
        Payload: {
            Name: "Escaped Thrall",
            Story: "Through debt or birth, you were locked into servitude. Through providence or assistance of a friend, you have escaped and finally broke the chains that bind and got the boot off of your neck. This may be your only chance to have a life you choose.",
            PeopleNames: [],
            PeopleRelations: ["Hostile", "Negative"],
            Edges: randomTaggedData(TaggedEdgesData),
            Other: "Since you are an escapee from forced servitude, put your lowest roll on **Master or Local Authorities** for Step 4 - Entanglements. If your background remains unknown, you can make **20 coins per week** with your Skill. In another town, you can take up a job with an unscrupulous new master that is aware of your status but you will only be able to get free meals and sleep in the shed.",
            PartialPictureUrl: "Halfling\\RR HALFLING VAGABOND THRALL Stocks Leg Chains JE Shields.png"
        }
    },
    {
        Tags: { Profession: scholarTag },
        Payload: {
            Name: "Scholar",
            Story: "You have always loved and been drawn to stories and ways to gain more knowledge. At a young age, you learned to read from a relative or a mentor who noted your intelligence and hunger for knowlege. You were then apprenticed to another Scholar to learn and research. Now that your apprenticeship is complete, you wanted to seek out new lore in the world rather than research minutiae and sit in a dark room reading dusty scrolls and tomes.",
            PeopleNames: [],
            PeopleRelations: [],
            Spells: [new Spell("Comprehend Languages", "You can speak, read, and write an unknown language for the duration of the spell.")],
            Languages: randomTaggedData(TaggedLanguageData),
            Other: "Depending upon your Skills, you should be able to obtain employment as a researcher or tutor for **20 coins per week**. You will and also have food, drink, and a place to sleep if you are in residence or live-in.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN SPELLCASTER ACADEMIC SCHOLAR Eugen Neureuther.jpg"
        }
    },
    // --- Cultist Background ---
    {
        Tags: cultistWholeTag,
        Payload: {
            Name: "Cultist",
            Story: "Dark powers whisper in your mind and have led you down a path of intriguing and often disturbing research. You now have the urge to seek out deeper forbidden lore and find others with similar interests.",
            PeopleNames: [ /* Cultist Group */],
            PeopleRelations: ["Receptive"],
            Spells: [],
            Languages: randomTaggedData(TaggedLanguageData),
            Other: "For Step 4 - Entanglements, put your lowest roll in **Local Religious Authorities** if you have not kept your beliefs and power secret. Put your highest roll in a group consisting of like-minded cultists (**Colleagues**, **Family**, **Master**, or **Shadow Groups**). If you maintain the secrecy of your cultish beliefs, you can impersonate an Acolyte and earn **30 coins per week**.",
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN CLERIC CULTIST Howard Pyle modified.jpg"
        }
    },
    // --- Barbarian Background ---
    {
        Tags: barbarianWholeTag,
        Payload: {
            Name: "Barbarian",
            Story: "In the hinterlands, fighting is much less constrained and life is simple. You have travelled to more settled areas out of curiosity, wanderlust, or because you were banished.",
            PeopleNames: [],
            PeopleRelations: [],
            Other: "For Step 5 - Starting Equipment, reduce your starting coins to **0**. You have the Drawback **Outlander**. For Step 4 - Entanglements, put a high roll **Family**. If banished, put a low roll on **Family or Local Authorities (the chief/elders)**. Develop a narrative of why you left or were banished.",
            PartialPictureUrl: "Human\\RR WOMEN FIGHTER BARBARIAN Ricardo de Gaspar_0924_1.png"
        }
    },
    // --- Warlock Background ---
    {
        Tags: warlockWholeTag,
        Payload: {
            Name: "Warlock",
            Story: "You speak with your familiar and the voice in your head more than you speak with people and that makes them nervous. It does not help that you also dress like it is Hallow’s Eve. Those people have nothing to be nervous about, yet.",
            Spells: [],
            Languages: randomTaggedData(TaggedLanguageData),
            Other: "You prefer black (or very dark shades of gray) for all of your clothing. You are pursuing sponsorship from a profane/extraplanar being. For Step 4 - Entanglements, put your lowest three rolls in **Neighbors**, **Local Authorities**, and **Local Religious Authorities**. Reeves and Inquisitors may keep you under surveillance. See the rules for your Master (Ixian Raver, Ixian Archon, Elder God, Lich, Moloch, or Kain).",
            PartialPictureUrl: "Halfling\\CC 300dpi 3inW HALFLING WARLOCK Didrik Magnus modified thicker outline.jpg"
        }
    },
    // --- Scoundrel Background ---
    {
        Tags: scoundrelWholeTag,
        Payload: {
            Name: "Scoundrel",
            Story: "You make your way through guile, wits, and quick reflexes, often to the detriment of others.",
            OrganizationNames: [],
            OrganizationRelations: ["Friendly", "Hostile"],
            Other: "You may work with an informal gang, a thieves guild, or tag along with itinerant entertainment troupes to find victims. Making money as a pickpocket can be lucrative but is dangerous. See rules for weekly income and risk.",
            PartialPictureUrl: "Human\\PD 300dpi MEN SCOUNDREL Tony Johannot modified.jpg"
        }
    },
];
