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

export default resources;
