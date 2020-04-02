import actions from "./actions";

const buildings = {
    wreckage: {
        name: "Wreckage",
        unlock: () => [
            actions.wakeUp.key,
        ],
    },
    forum: {
        name: "Forum",
        upgrade: () => [
            buildings.wreckage.key,
        ],
        unlock: () => [
            actions.sleep.key,
            actions.gather.key,
        ],
    },
};

export default buildings;
