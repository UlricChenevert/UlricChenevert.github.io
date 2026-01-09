import { EntanglementOrganizationTypesEnum, JobSubsetEnum } from "../Contracts/StringTypes.js";
import { EntanglementAffect, RollReservations } from "../Contracts/Entanglements.js";
import { Utility } from "../../../WebCore/Utility.js";
export var CareerData;
(function (CareerData) {
    const generateRelationships = (Destination, RollReservation, chosenName) => {
        return new EntanglementAffect({ id: Utility.idGenerator.newID(), name: chosenName }, Destination, RollReservation);
    };
    CareerData.possibleProfessions = [
        "Skilled & Laborer", "Performer & Scholarly", "Religious", "Martial", "Arcane", "Rogue"
    ];
    CareerData.ProfessionToJobData = {
        "Skilled & Laborer": [
            "Apprentice Artisan", "Apprentice Bureaucrat", "Free Laborer",
            "Apprentice Crafter", "Apprentice Mercantiler", "Escaped Peasant/Thrall"
        ],
        "Performer & Scholarly": ["Acrobat", "Contortionist", "Jester", "Minstrel", "Scholar", "Storyteller/Thespian"],
        Religious: ["Accursed", "Acolyte", "Cultist", "Inquisitor", "Pariah", "Touched/Anchorite"],
        Martial: ["Armiger", "Barbarian", "Mercenary/Hedge", "Prizefighter", "Ruffian/Enforcer", "Woodard/Warden"],
        Arcane: ["Adept/Arcane Apprentice", "Alchemy Apprentice", "Arcane Researcher", "Charlatan", "Dowser", "Warlock"],
        Rogue: ["Fence", "Gambler", "Scoundrel", "Sharp", "Spy", "Street Urchin"]
    };
    CareerData.JobToStoryData = {
        "Apprentice Artisan": {
            Name: "Apprentice Artisan",
            Story: "You were discharged by your master, or absconded with a set of tools...",
            Other: "If your reputation is not widely known, an Artisan can take up a job with a new master in a large city and make 40 coins per week.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest)],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\CC 300dpi 3inW MEN ARTISAN JEWELER LAPIDARY GEMCUTTER Jost Amman cleaned up original.jpg"
        },
        "Apprentice Bureaucrat": {
            Name: "Apprentice Bureaucrat",
            Story: "Some legal documents being transcribed had a critical error...",
            Other: "Since you were discharged, put your lowest roll on Master or Colleagues.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest)],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN SCRIVNER SCRIBE THR.jpg"
        },
        "Free Laborer": {
            Name: "Free Laborer",
            Story: "You worked on the manor of a local lord. You were discharged due to jealousy...",
            Other: "In another town, a Free Laborer can take up a job with a master and make 30 coins per week.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest)],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN AMBLER John Tenniel.jpg"
        },
        "Apprentice Crafter": {
            Name: "Apprentice Crafter",
            Story: "After a lengthy apprenticeship, you had a major falling out with your master...",
            Other: "In another town, a Crafter can take up a job with a master and make 40 coins per week.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest)],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Orc\\CC 300dpi 3inW MEN ORC CRAFTER SMITH Ricardo de Gaspar.jpg"
        },
        "Apprentice Mercantiler": {
            Name: "Apprentice Mercantiler",
            Story: "A client or local authorities accused your master’s business of inaccurate exchanges...",
            Other: "In another town, a Mercantiler can make 40 coins per week.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest)],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW LAWYER ADVOCATE MONEY CHANGER Hans Holbein.jpg"
        },
        "Escaped Peasant/Thrall": {
            Name: "Escaped Peasant/Thrall",
            Story: "Through debt or birth, you were locked into servitude...",
            Other: "Put your lowest roll on Master or Local Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest)],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Halfling\\RR HALFLING VAGABOND THRALL Stocks Leg Chains JE Shields.png"
        },
        "Acrobat": {
            Name: "Acrobat",
            Story: "You are a daredevil that has been jumping from dangerous heights since childhood...",
            Other: "Put your lowest roll on Colleagues or Local Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Lowest, "Former Troupe")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Contortionist": {
            Name: "Contortionist",
            Story: "Since you were a child, you were able to bend the joints of your limbs...",
            Other: "Put your lowest roll on Colleagues or Local Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Lowest, "Former Troupe Leader")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Jester": {
            Name: "Jester",
            Story: "Your sharp wit has cut too close to the truth and insulted your lord...",
            Other: "Earn 10 coins/week on corners, or 20 at a tavern.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest, "Insulted Lord")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Minstrel": {
            Name: "Minstrel",
            Story: "Your love of music led you to run away from a dreary life...",
            Other: "Earn 20 coins/week on corners, or 30 at an inn.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Lowest, "Rival Musician")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Scholar": {
            Name: "Scholar",
            Story: "Now that your apprenticeship is complete, you wanted to seek out new lore...",
            Other: "You can obtain employment as a researcher or tutor for 20 coins per week.",
            AffectedPeople: [],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN SPELLCASTER ACADEMIC SCHOLAR Eugen Neureuther.jpg"
        },
        "Storyteller/Thespian": {
            Name: "Storyteller/Thespian",
            Story: "You were labeled a daft daydreamer and beaten for laziness...",
            Other: "Earn 20 coins/week with a new troupe.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Lowest, "Former Troupe")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Accursed": {
            Name: "Accursed",
            Story: "You have been tainted mentally or physically...",
            Other: "Put lowest roll in Local Religious Authorities or Neighbors.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ReligiousAuthorities, RollReservations.Lowest, "Inquisitor")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Acolyte": {
            Name: "Acolyte",
            Story: "You spent time studying the deeper mysteries of the divine...",
            Other: "Put highest roll in Local Religious Authorities or Neighbors.",
            AffectedPeople: [],
            AffectedOrganization: [generateRelationships(EntanglementOrganizationTypesEnum.ReligiousAuthorities, RollReservations.Highest, "Local Temple")],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Inquisitor": {
            Name: "Inquisitor",
            Story: "Even as a child, you could sense wickedness...",
            Other: "Put highest roll in Local Religious Authorities; lowest in Neighbors.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Neighbors, RollReservations.Lowest, "Local Neighbors")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Pariah": {
            Name: "Pariah",
            Story: "Visions have shown you that current religious teachings are corrupted...",
            Other: "Put lowest roll in Local Religious Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ReligiousAuthorities, RollReservations.Lowest, "Religious Leaders")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Touched/Anchorite": {
            Name: "Touched/Anchorite",
            Story: "You have been chosen for a divine purpose...",
            Other: "Put highest roll on Neighbors. Put lowest roll in Local Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Neighbors, RollReservations.Highest, "Disadvantaged Locals")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Armiger": {
            Name: "Armiger",
            Story: "Through long training you have earned the right to bear arms...",
            Other: "Put highest roll in Master or Local Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Highest, "Suzerain Lord")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Mercenary/Hedge": {
            Name: "Mercenary/Hedge",
            Story: "Extenuating circumstances led to hard choices...",
            Other: "Mercenaries/Bandits make STR/DEX/INT tests weekly.",
            AffectedPeople: [],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Prizefighter": {
            Name: "Prizefighter",
            Story: "You fight competitively and have the scars to prove it...",
            Other: "Put a high roll in Shadow Groups.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ShadowGroups, RollReservations.Highest, "Crime Boss")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Ruffian/Enforcer": {
            Name: "Ruffian/Enforcer",
            Story: "The trick to being a successful bully is to hit hard, fast, and first...",
            Other: "Put highest rolls in Colleagues (Gang) and Shadow Groups.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Highest, "The Gang")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Woodard/Warden": {
            Name: "Woodard/Warden",
            Story: "You patrol and protect your lord's wooded lands...",
            Other: "Put highest roll in Master or Local Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Highest, "Forest Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Adept/Arcane Apprentice": {
            Name: "Adept/Arcane Apprentice",
            Story: "You exhibited talent at an early age and were apprenticed...",
            Other: "Masters magically bind apprentices.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest, "Former Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Alchemy Apprentice": {
            Name: "Alchemy Apprentice",
            Story: "You seek eternal life and turning lead to gold...",
            Other: "Alchemists jealously guard secrets.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ShadowGroups, RollReservations.Lowest, "Alchemy Guild")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Arcane Researcher": {
            Name: "Arcane Researcher",
            Story: "Apprenticed to an academy, you grew bored of abstruse trivia...",
            Other: "Earn 1d4 coins/day in large cities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Lowest, "Academy Master")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Charlatan": {
            Name: "Charlatan",
            Story: "You love flashy entrances and center-stage attention...",
            Other: "Usually harbors criminal connections.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Neighbors, RollReservations.Lowest, "Former Audience")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Dowser": {
            Name: "Dowser",
            Story: "You have a knack for finding water and missing children...",
            Other: "Neighbors should never be your highest entanglement roll.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Neighbors, RollReservations.Lowest, "Suspicious Neighbors")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Warlock": {
            Name: "Warlock",
            Story: "You speak with your familiar and the voices in your head...",
            Other: "If you negotiate servitude, you gain the Arcana 1 Edge.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ShadowGroups, RollReservations.Highest, "Potential Patron")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Halfling\\CC 300dpi 3inW HALFLING WARLOCK Didrik Magnus modified thicker outline.jpg"
        },
        "Fence": {
            Name: "Fence",
            Story: "You can buy, sell, or locate anything...",
            Other: "Earn 10/20 coins per success on INT/WIS/CHA tests.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ShadowGroups, RollReservations.Highest, "Criminal Contacts")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Gambler": {
            Name: "Gambler",
            Story: "An uncanny ability to win games of chance has made you unpopular...",
            Other: "Gain a Compulsion or Addiction drawback.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Neighbors, RollReservations.Lowest, "Sore Losers")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Scoundrel": {
            Name: "Scoundrel",
            Story: "You live by guile and quick reflexes...",
            Other: "Earn 10/20 coins on DEX/WIS/CHA tests.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Highest, "Street Gang")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi MEN SCOUNDREL Tony Johannot modified.jpg"
        },
        "Sharp": {
            Name: "Sharp",
            Story: "You have good eyes, and your guild relies on you as a lookout...",
            Other: "Earn 10/20 coins on DEX/INT/CHA tests.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ShadowGroups, RollReservations.Highest, "Thieves Guild")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Spy": {
            Name: "Spy",
            Story: "You sneak or talk your way anywhere for a price...",
            Other: "Has a mentor/handler.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Master, RollReservations.Highest, "Handler")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Street Urchin": {
            Name: "Street Urchin",
            Story: "Abandoned or orphaned, the street made you sharp...",
            Other: "Has 'Youth' Drawback.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.Colleagues, RollReservations.Highest, "Urchin Gang")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: undefined
        },
        "Cultist": {
            Name: "Cultist",
            Story: "Dark powers whisper in your mind...",
            Other: "Put your lowest roll in Local Religious Authorities.",
            AffectedPeople: [generateRelationships(EntanglementOrganizationTypesEnum.ShadowGroups, RollReservations.Highest, "Cult Cell")],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\PD 300dpi 3inW MEN CLERIC CULTIST Howard Pyle modified.jpg"
        },
        "Barbarian": {
            Name: "Barbarian",
            Story: "In the hinterlands, life is simple...",
            Other: "Reduce starting coins to 0. You have the Drawback: Outlander.",
            AffectedPeople: [],
            AffectedOrganization: [],
            AffectedPlace: [],
            PartialPictureUrl: "Human\\RR WOMEN Martial BARBARIAN Ricardo de Gaspar_0924_1.png"
        },
    };
    CareerData.JobSubsetData = {
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
        "Mercenary/Hedge": [JobSubsetEnum.LordSlain, JobSubsetEnum.Disgraced, JobSubsetEnum.HedgeKnight, JobSubsetEnum.Mercenary, JobSubsetEnum.Bandit],
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
        Fence: [JobSubsetEnum.ThreeTrinketRandom, JobSubsetEnum.OneTrinketChoice],
        Gambler: [JobSubsetEnum.None],
        Scoundrel: [JobSubsetEnum.None],
        Sharp: [JobSubsetEnum.None],
        "Street Urchin": [JobSubsetEnum.None],
    };
})(CareerData || (CareerData = {}));
