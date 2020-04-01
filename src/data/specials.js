import resources from "./resources";

const specials = {
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
    person: {
        energyDegradation: 0.0002,
        needs: () => [
            [0.001, resources.water],
            [0.0005, resources.food],
        ],
    },
};

export default specials;
