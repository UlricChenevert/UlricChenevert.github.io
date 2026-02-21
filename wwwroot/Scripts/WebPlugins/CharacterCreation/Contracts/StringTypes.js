export var DispositionsEnum;
(function (DispositionsEnum) {
    DispositionsEnum["Aggressive"] = "Aggressive";
    DispositionsEnum["Hostile"] = "Hostile";
    DispositionsEnum["Negative"] = "Negative";
    DispositionsEnum["Disinterested"] = "Disinterested";
    DispositionsEnum["Receptive"] = "Receptive";
    DispositionsEnum["Friendly"] = "Friendly";
})(DispositionsEnum || (DispositionsEnum = {}));
export const Dispositions = {
    [DispositionsEnum.Aggressive]: { name: DispositionsEnum.Aggressive, roll: 1 },
    [DispositionsEnum.Hostile]: { name: DispositionsEnum.Hostile, roll: 2 },
    [DispositionsEnum.Negative]: { name: DispositionsEnum.Negative, roll: 3 },
    [DispositionsEnum.Disinterested]: { name: DispositionsEnum.Disinterested, roll: 4 },
    [DispositionsEnum.Receptive]: { name: DispositionsEnum.Receptive, roll: 5 },
    [DispositionsEnum.Friendly]: { name: DispositionsEnum.Friendly, roll: 6 }
};
export var EntanglementOrganizationTypesEnum;
(function (EntanglementOrganizationTypesEnum) {
    EntanglementOrganizationTypesEnum["Colleagues"] = "Colleagues";
    EntanglementOrganizationTypesEnum["Family"] = "Family";
    EntanglementOrganizationTypesEnum["CivicAuthorities"] = "Local Civic Authorities";
    EntanglementOrganizationTypesEnum["ReligiousAuthorities"] = "Local Religious Authorities";
    EntanglementOrganizationTypesEnum["Master"] = "Master";
    EntanglementOrganizationTypesEnum["Neighbors"] = "Neighbors";
    EntanglementOrganizationTypesEnum["ShadowGroups"] = "Shadow Groups";
})(EntanglementOrganizationTypesEnum || (EntanglementOrganizationTypesEnum = {}));
export var JobSubsetEnum;
(function (JobSubsetEnum) {
    JobSubsetEnum["None"] = "None";
    // Skilled & Laborer
    JobSubsetEnum["Jeweler"] = "Jeweler";
    JobSubsetEnum["Arbalist"] = "Arbalist";
    JobSubsetEnum["Scrivener"] = "Scrivener";
    JobSubsetEnum["Advocate"] = "Advocate/Beadle";
    JobSubsetEnum["Cartographer"] = "Cartographer";
    JobSubsetEnum["Inspector"] = "Inspector/Reeve";
    JobSubsetEnum["Interpreter"] = "Interpreter";
    JobSubsetEnum["Smith"] = "Smith";
    JobSubsetEnum["Carpenter"] = "Carpenter";
    JobSubsetEnum["MoneyChanger"] = "Money Changer";
    JobSubsetEnum["Ambler"] = "Ambler";
    JobSubsetEnum["Chef"] = "Chef";
    // Escaped Thrall
    JobSubsetEnum["HouseServant"] = "House Servant";
    JobSubsetEnum["Farmhand"] = "Farmhand";
    JobSubsetEnum["Laborer"] = "Laborer";
    JobSubsetEnum["Sailor"] = "Sailor (Conscript)";
    // Religious (Acolyte/Inquisitor)
    JobSubsetEnum["Brewer"] = "Brewer";
    JobSubsetEnum["Farmer"] = "Farmer";
    JobSubsetEnum["Herder"] = "Herder";
    JobSubsetEnum["Oratory"] = "Oratory";
    JobSubsetEnum["Theology"] = "Theology";
    JobSubsetEnum["Vintner"] = "Vintner";
    JobSubsetEnum["Esoterica"] = "Esoterica";
    // Martial (Armiger/Mercenary/Woodard)
    JobSubsetEnum["ActiveService"] = "Active Service";
    JobSubsetEnum["Freelance"] = "Freelance";
    JobSubsetEnum["LordSlain"] = "Lord Slain/Captured";
    JobSubsetEnum["Disgraced"] = "Disgraced";
    JobSubsetEnum["HedgeKnight"] = "Hedge Knight";
    JobSubsetEnum["Mercenary"] = "Mercenary";
    JobSubsetEnum["Bandit"] = "Bandit";
    JobSubsetEnum["Discharged"] = "Discharged";
    // Adept / Warlock Masters
    JobSubsetEnum["IxianRaver"] = "Ixian Raver";
    JobSubsetEnum["IxianArchon"] = "Ixian Archon";
    JobSubsetEnum["Dragon"] = "Dragon";
    JobSubsetEnum["Lich"] = "Lich";
    JobSubsetEnum["Wizard"] = "Wizard";
    JobSubsetEnum["ElderGod"] = "Elder God (Ghoelb)";
    JobSubsetEnum["Moloch"] = "Moloch";
    JobSubsetEnum["Kain"] = "Kain";
    JobSubsetEnum["ThreeTrinketRandom"] = "Three trinkets random";
    JobSubsetEnum["OneTrinketChoice"] = "One trinket choice";
    // Spy Specializations
    JobSubsetEnum["DisguiseSpecialist"] = "Disguise Specialist";
    JobSubsetEnum["BurglarSpecialist"] = "Burglar Specialist";
})(JobSubsetEnum || (JobSubsetEnum = {}));
// | JobSubsetEnum.Jeweler 
// | JobSubsetEnum.Arbalist
// | JobSubsetEnum.Scrivener
// | JobSubsetEnum.Advocate
// | JobSubsetEnum.Cartographer
// | JobSubsetEnum.Inspector
// | JobSubsetEnum.Interpreter
// | JobSubsetEnum.Smith
// | JobSubsetEnum.Carpenter
// | JobSubsetEnum.MoneyChanger
// | JobSubsetEnum.Ambler
// | JobSubsetEnum.Chef
// | JobSubsetEnum.HouseServant
// | JobSubsetEnum.Farmhand
// | JobSubsetEnum.Laborer
// | JobSubsetEnum.Sailor
// | JobSubsetEnum.None;
