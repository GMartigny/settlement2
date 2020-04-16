import resources from "./resources";
import actions from "./actions";

const locations = {
    // NEAR
    mountain: {
        name: "Mountain",
        desc: "A nearby mountain that may contains some basic building resources",
        giveList: () => [
            resources.rock,
            resources.scrap,
            resources.component,
        ],
        dropRate: 90,
    },
    desert: {
        name: "Desert",
        desc: "Not much to find in a desert, but that's for sure the best place to get sand.",
        giveList: () => [
            resources.scrap,
            resources.oil,
            resources.sand,
        ],
        dropRate: 100,
    },
    hangar: {
        name: "Hangar",
        desc: "A huge hangar. It was certainly raided before by others, but there may be something to grab.",
        giveList: () => [
            resources.food,
            resources.medication,
            resources.glass,
        ],
        dropRate: 80,
    },
    // FAR
    river: {
        name: "River",
        desc: "Quite rare to find water on those wastelands. This is a valuable location to find.",
        unlock: () => [
            actions.drawFromRiver,
        ],
        giveList: () => [
            resources.water,
            resources.bolts,
            resources.stone,
        ],
        dropRate: 30,
    },
    ruin: {
        name: "Old ruin",
        desc: "This is a huge underground network of rooms linked by narrow hallways. " +
            "This should have provided shelter a long time ago.",
        giveList: () => [
            resources.electronic,
            resources.component,
            resources.tool,
        ],
        dropRate: 50,
    },
    // EPIC
    building: {
        name: "buried building",
        desc: "Digging up this building, uncover stuff preserved from looting and environment.",
        giveList: () => [
            resources.medication,
            resources.glass,
            resources.circuit,
        ],
        dropRate: 10,
    },
    spaceship: {
        name: "old wreckage",
        desc: "This rusty vehicle remains was in good enough shape in order to allow to find useful parts inside.",
        giveList: () => [
            resources.electronic,
            resources.tool,
            resources.furniture,
        ],
        dropRate: 5,
    },
};

export default locations;

const near = [
    locations.mountain,
    locations.desert,
];

const far = [
    locations.river,
    locations.ruin,
];

const epic = [
    locations.building,
    locations.spaceship,
];

export {
    near,
    far,
    epic,
};
