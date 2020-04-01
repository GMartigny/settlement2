import actions from "./actions";

const buildings = {
    wreckage: {
        name: "Wreckage",
        unlock: () => [
            actions.wakeUp,
        ],
    },
    forum: {
        name: "Forum",
        upgrade: () => [
            buildings.wreckage,
        ],
        unlock: () => [
            actions.sleep,
            actions.gather,
        ],
    },
};

export default buildings;
