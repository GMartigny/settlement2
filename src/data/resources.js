import buildings from "./buildings";

const resources = {
    // SPECIAL
    room: {
        name: "Room",
        desc: "A place for someone in the camp.",
        order: 0,
    },
    ruins: {
        name: "Location",
        desc: "Directions to a point of interest found earlier.",
        order: 80,
        dropRate: 0.6,
    },
    quartz: {
        name: "Quartz cristal",
        desc: "A rough uncut gem of quartz. Quite valuable !",
        dropRate: 10,
        order: 77,
    },
    // GATHERABLES
    // COMMON
    water: {
        name: "Water",
        desc: "Water is definitely important to survive in this harsh environment.",
        dropRate: 100,
        order: 10,
    },
    food: {
        name: "Food",
        desc: "Everyone need food to keep his strength.",
        dropRate: 90,
        order: 20,
    },
    rock: {
        name: "Rock",
        desc: "There's rocks everywhere ! Why would you bring this back ?",
        dropRate: 100,
        order: 30,
    },
    scrap: {
        name: "Scrap metal",
        desc: "An old rusty piece of metal.",
        dropRate: 60,
        order: 40,
    },
    // UNCOMMON
    bolts: {
        name: "Nuts and bolts",
        desc: "Little metal nuts and bolts to fasten anything in place.",
        dropRate: 65,
        order: 50,
    },
    sand: {
        name: "Sand",
        desc: "Just pure fine sand.",
        dropRate: 50,
        order: 55,
    },
    oil: {
        name: "Fuel",
        desc: "About a liter of gas-oil.",
        dropRate: 20,
        order: 60,
    },
    // RARE
    medication: {
        name: "Medication",
        desc: "An unlabeled medication, hope it's still good.",
        dropRate: 7,
        order: 70,
    },
    electronic: {
        name: "Electronics",
        desc: "Some basic micro-electronics components.",
        dropRate: 10,
        order: 80,
    },
    // CRAFTABLE
    // BASIC
    stone: {
        name: "Smooth stone",
        desc: "A round and well polish stone.",
        need: () => [
            [3, resources.rock.key],
        ],
        dropRate: 100,
        order: 90,
    },
    glass: {
        name: "Glass pane",
        desc: "A see-through building component.",
        require: () => [
            buildings.furnace.key,
        ],
        need: () => [
            [4, resources.sand.key],
        ],
        dropRate: 60,
        order: 100,
    },
    component: {
        name: "Component",
        desc: "Some mechanical parts for others craftables.",
        need: () => [
            [2, resources.scrap.key],
            [2, resources.bolts.key],
        ],
        dropRate: 120,
        order: 110,
    },
    tool: {
        name: "Tool",
        desc: "The basic for any tinkerer.",
        need: () => [
            [1, resources.component.key],
            [2, resources.rock.key],
        ],
        dropRate: 90,
        order: 111,
    },
    // COMPLEX
    brick: {
        name: "Brick",
        desc: "Will give walls for larger constructions.",
        require: () => [
            buildings.well.key,
        ],
        need: () => [
            [1, resources.stone.key],
            [1, resources.tool.key],
        ],
        dropRate: 80,
        order: 120,
    },
    circuit: {
        name: "Circuit",
        desc: "That's a little rough, but it's actually a functioning circuit board.",
        need: () => [
            [2, resources.scrap.key],
            [2, resources.component.key],
            [3, resources.electronic.key],
        ],
        dropRate: 60,
        order: 114,
    },
    metalPipe: {
        name: "Metal pipe",
        desc: "Forged from junk metal.",
        require: () => [
            buildings.forge.key,
        ],
        need: () => [
            [4, resources.scrap.key],
            [1, resources.tool.key],
        ],
        dropRate: 80,
        order: 115,
    },
    // COMPLEX
    furniture: {
        name: "Furniture",
        desc: "A proper settlement needs better than pile of trash for table and seats.",
        need: () => [
            buildings.workshop,
        ],
        consume: () => [
            [2, resources.glass],
            [2, resources.metalPipe],
        ],
        dropRate: 40,
        order: 116,
    },
    jewelry: {
        name: "Jewelry",
        desc: "A really beautiful ornament useful for trading.",
        require: () => [
            buildings.furnace.key,
        ],
        need: () => [
            [4, resources.electronic.key],
            [2, resources.quartz.key],
        ],
        dropRate: 40,
        order: 117,
    },
    engine: {
        name: "Engine",
        desc: "Amazing what can be done with all those scraps !",
        require: () => [
            buildings.workshop.key,
        ],
        need: () => [
            [10, resources.oil.key],
            [5, resources.tool.key],
            [5, resources.metalPipe.key],
        ],
        dropRate: 30,
        order: 120,
    },
    computer: {
        name: "Computer",
        desc: "Well, Internet is down since 2024 but it can still be useful.",
        require: () => [
            buildings.workshop.key,
        ],
        need: () => [
            [10, resources.component.key],
            [7, resources.tool.key],
            [3, resources.circuit.key],
        ],
        dropRate: 20,
        order: 130,
    },
};

export default resources;

const gatherables = [
    resources.food,
    resources.water,
    resources.rock,
    resources.scrap,
    resources.bolts,
    resources.sand,
    resources.oil,
    resources.medication,
    resources.electronic,
];
const craftables = [
    resources.stone,
    resources.glass,
    resources.component,
    resources.tool,
    resources.brick,
    resources.circuit,
    resources.metalPipe,
    resources.jewelry,
    resources.engine,
    resources.computer,
];

export {
    gatherables,
    craftables,
};
