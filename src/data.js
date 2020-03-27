import { random } from "./math";

const time = x => x * (1000 / 60);

const special = {
    health: {
        name: "Health",
        description: "Useful not die",
        color: "var(--health)",
    },
    energy: {
        name: "Energy",
        description: "Don't get tired",
        color: "var(--energy)",
    },
};

const resources = {
    water: {
        name: "Water",
        description: "Don't get dehydrated !",
    },
    food: {
        name: "Food",
        description: "Yumm",
    },
    nuts: {
        name: "Nuts",
        description: "",
    },
    component: {
        name: "Component",
        description: "Simple composition of random part.",
        needs: () => [
            [2, resources.nuts],
        ],
    },
    engine: {
        name: "Engine",
        description: "Vroom vroom",
        needs: () => [
            [2, resources.component],
        ],
    },
};

const actions = {
    forage: {
        name: "Forage",
        description: "Find food in bush or whatever.",
        energy: 0.1,
        time: time(60),
        effect: () => [
            [1, resources.food],
        ],
    },
    gather: {
        name: "Gather",
        description: "Take a look around and grab stuff.",
        energy: 0.6,
        time: time(99),
        effect: () => [
            [random(2), resources.water],
        ],
    },
    craft: {
        name: "Craft",
        description: "Take some shit and turn it into some other shit",
        energy: 0.1,
        time: time(150),
        choices: [
            resources.component,
            resources.engine,
        ],
    },
};

export {
    special,
    resources,
    actions,
};
