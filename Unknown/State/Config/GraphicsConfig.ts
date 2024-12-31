// I know it is weird to put it in a object, but think about it. 
// Pre-defined state at startup doesn't need to be in a json file

export const GraphicsConfig = {
    MapCreation : {
        RecreateOnStartup : true,
        Thresholds : {
            mountain : 0.6,
            hill : 0.5,
            grassland : 0.3,
            water : 0.0
        }
    },
    "DisplaySize" : 100, 
    LoadingScene : {
        "LoadingBarSize" : 10},
    Representation : {
        "Blank" : '&#x0020;',
        "Character" : '&#x1338;',
        "NPC" : '&#x1330;',
        "Water" : '_',//&#x2248;
        "Null" : "&#x0000;",
        "Animal" : "&#x040B;", // I really want "&#x12B8;"
        "Path" : ".",
        "PineTree" : "&#x219F;",
        "Hill" : "^", //
        "Mountain" : "A", //&#x22C0;
        "Grass" : " ", // &#x02F5;
        "Shrine" : "&#x127E;",
        "Farmland":"&#x2583;",
        "Hut":"&#x03C0;",
        "SmallHouse":"&#x21D1;",
        "LargeHouse":"&#x220F;",
        "LoadingBar" : "o"
    }
};