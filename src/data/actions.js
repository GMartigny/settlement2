import { random } from "../math";
import { time } from "./utils";
import buildings from "./buildings";
import resources from "./resources";

const actions = {
    wakeUp: {
        name: "Wake up",
        description: "Awake from your slumber.",
        unlock: () => [
            actions.lookAround,
        ],
        lock: () => [
            actions.wakeUp,
        ],
        effect ({ $parent }) {
            $parent.updateEnergy(0.4);
            $parent.updateHealth(0.6);
        },
    },
    lookAround: {
        name: "Look around",
        description: "Take a look at your surrounding.",
        time: time(60),
        unlock: () => [
            actions.settle,
        ],
        lock: () => [
            actions.lookAround,
        ],
        effect: () => [
            [10, resources.water],
            [7, resources.food],
            [1, resources.component],
        ],
    },
    settle: {
        name: "Settle here",
        description: "Prepare a small camp right here.",
        energy: 0.2,
        time: time(200),
        build: () => [
            buildings.forum,
        ],
        unlock: () => [
            actions.sleep,
            actions.gather,
        ],
        lock: () => [
            actions.settle,
        ],
        effect ({ $parent }) {
            $parent.isReady = true;
        },
    },
    sleep: {
        name: "Sleep",
        description: "Take a little nap.",
        time: time(200),
        effect ({ $parent }) {
            $parent.updateEnergy(1);
            $parent.updateHealth(0.05);
        },
    },
    gather: {
        name: "Gather",
        description: "Take a look around and grab stuff.",
        energy: 0.6,
        time: time(99),
        effect: () => [
            [random(2), resources.water],
            [random(2), resources.food],
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

export default actions;
