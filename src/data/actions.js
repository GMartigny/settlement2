import { random } from "../math";
import { time } from "./utils";
import buildings from "./buildings";
import resources from "./resources";

const actions = {
    wakeUp: {
        name: "Wake up",
        description: "Awake from your slumber.",
        unlock: () => [
            actions.lookAround.key,
        ],
        lock: () => [
            actions.wakeUp.key,
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
            actions.settle.key,
        ],
        lock: () => [
            actions.lookAround.key,
        ],
        effect: () => [
            [10, resources.water.key],
            [7, resources.food.key],
            [1, resources.component.key],
        ],
    },
    settle: {
        name: "Settle here",
        description: "Prepare a small camp right here.",
        energy: 0.2,
        time: time(200),
        build: () => [
            buildings.forum.key,
        ],
        unlock: () => [
            actions.sleep.key,
            actions.gather.key,
        ],
        lock: () => [
            actions.settle.key,
        ],
        effect ({ $parent }) {
            $parent.$parent.start();
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
            [random(2), resources.water.key],
            [random(2), resources.food.key],
        ],
    },
    craft: {
        name: "Craft",
        description: "Take some shit and turn it into some other shit",
        energy: 0.1,
        time: time(150),
        choices: [
            resources.component.key,
            resources.engine.key,
        ],
    },
};

export default actions;
