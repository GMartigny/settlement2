import resources from "./resources";

const specials = {
    health: {
        name: "Health",
        desc: "Useful not die",
        color: "var(--health)",
    },
    energy: {
        name: "Energy",
        desc: "Don't get tired",
        color: "var(--energy)",
    },
    person: {
        energyDegradation: 0.0002,
        need: () => [
            [0.001, resources.water.key],
            [0.0008, resources.food.key],
        ],
        dropRate: 0.001,
    },
};

export default specials;
