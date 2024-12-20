// I know it is weird to put it in a object, but think about it. 
// Pre-defined state at startup doesn't need to be in a json file

export const GraphicsConfig = {
    "displayLength" : 100, 
    "LoadLength" : 10,
    Representation : {
        "Blank" : '&#x0020;',
        "Character" : '&#x1338;',
        "NPC" : '&#x1330;',
        "Water" : '&#x2248;',
        "Null" : "&#x0",
        "Animal" : "&#x040B;", // I really want "&#x12B8;"
        "Path" : ".",
        "PineTree" : "&#x219F;",
        "Hill" : "&#x02C4;",
        "Mountain" : "&#xx0668;",
        "Grass" : "&#x02F5;",
        "Shrine" : "&#x127E;",
        "Farmland":"&#x2583;",
        "Hut":"&#x03C0;",
        "SmallHouse":"&#x21D1;",
        "LargeHouse":"&#x220F;",
        "LoadingBar" : "o"
    }
};