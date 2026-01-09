// I know it is weird to put it in a object, but think about it. 
// Pre-defined state at startup doesn't need to be in a json file
export const GraphicsConfig = {
    MapCreation: {
        RecreateOnStartup: true,
        Thresholds: {
            mountain: 0.6,
            hill: 0.5,
            grassland: 0.3,
            water: 0.0
        }
    },
    Colors: {
        Background: { red: 0, green: 0, blue: 0 },
        Player: { red: 255, green: 0, blue: 0 },
        Villages: { red: 0, green: 255, blue: 0 },
        NPC: { red: 28, green: 92, blue: 28 }
    },
    "DisplaySize": 50,
    Generation: {
        resolution: 32, //128,
        WorldBorder: 1e3, //1e4,
        GenerationSize: 2e3, //1e4 * 2 // double size of world border
        Seed: 1000
    },
    "GameSpeedMilliseconds": 100,
    Loading: {
        LoadingBarSize: 10,
        CellGridWidth: 3
    },
    Representation: {
        Blank: '&#x0020;',
        Character: '&#x1338;',
        NPC: '&#x1330;',
        Water: '_', //&#x2248;
        Null: "&#x0000;",
        Animal: "&#x040B;", // I really want "&#x12B8;"
        Path: ".",
        PineTree: "&#x219F;",
        Hill: "^", //
        Mountain: "A", //&#x22C0;
        Grass: " ", // &#x02F5;
        Shrine: "&#x127E;",
        Farmland: "&#x2583;",
        SmallHouse: "&#x21D1;",
        Hut: "&#x03C0;",
        LargeHouse: "&#x220F;",
        LoadingBar: "o"
    }
};
