import { random, selectMultiple } from "../math";
import { hours, days } from "./utils";
import buildings from "./buildings";
import resources, { craftables, gatherables } from "./resources";
import locations from "./locations";

const buildingDone = (store, func, getter = "done") => !func ||
    func().every(key => store.getters[`building/${getter}`](key));

const actions = {
    wakeUp: {
        name: "Wake up",
        desc: "Awake from your slumber.",
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
        desc: "Take a look at your surrounding.",
        time: hours(1),
        unlock: () => [
            actions.settle.key,
        ],
        lock: () => [
            actions.lookAround.key,
        ],
        effect: () => [
            [2, resources.component.key],
            [8, resources.water.key],
            [6, resources.food.key],
            [3, resources.rock.key],
        ],
    },
    settle: {
        name: "Settle here",
        desc: "Prepare a small camp right here.",
        energy: 0.2,
        time: hours(2),
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
        order: 1,
    },
    sleep: {
        name: "Sleep",
        desc: "Get some rest to restore energy.",
        time: hours(7),
        effect ({ $parent }) {
            $parent.updateEnergy(1);
            $parent.updateHealth(0.05);
        },
        unlock: () => [
            actions.heal.key,
        ],
        order: 5,
    },
    heal: {
        name: "Heal",
        desc: "I really hope those pills are still good.",
        time: hours(2),
        energy: 0.02,
        need: () => [
            [2, resources.medication.key],
        ],
        effect ({ $parent, $store }) {
            let heal = 1;
            const hasPharma = $store.getters["building/exists"](buildings.pharmacy.key);
            if (!hasPharma && random() < (2 / 5)) {
                heal = -0.1;
            }
            $parent.updateHealth(heal);
        },
        order: 6,
    },
    gather: {
        name: "Gather resources",
        desc: "Go out to bring back resources, that's the best way to survive.",
        energy: 0.25,
        time: hours(4),
        effect: ({ $store }) => selectMultiple(
            [2, 4], gatherables.filter(({ require }) => buildingDone($store, require)),
        ),
        unlock: () => [
            actions.roam.key,
            actions.craft.key,
        ],
    },
    roam: {
        name: "Roam",
        desc: "Explore the surroundings hoping to find ruins.",
        energy: 0.3,
        time: hours(5),
        need: () => [
            [1, resources.water.key],
        ],
        effect () {
            if (random() < resources.ruins.dropRate) {
                return [
                    [1, resources.ruins.key],
                ];
            }
            return [];
        },
        unlock: () => [
            actions.explore.key,
        ],
        order: 10,
    },
    explore: {
        name: "Explore",
        desc: "Remember that ruin found the other day ? Let's see what can be gather there.",
        time: days(1),
        energy: 0.9,
        need: () => [
            [2, resources.water.key],
            [1, resources.food.key],
            [1, resources.ruins.key],
        ],
        choices: ({ $store }) => [
            ...$store.getters["locations/list"],
        ],
        effect: (_, choice) => [
            ...selectMultiple([8, 10], locations[choice].giveList()),
        ],
        order: 20,
    },
    craft: {
        name: "Craft",
        desc: "Use some resources to tinker something useful.",
        energy: 0.1,
        time: hours(4),
        choices: ({ $store }) => craftables
            // Filter by requirements
            .filter(({ require }) => buildingDone($store, require)),
        effect: (_, data) => [
            [1, data.key],
        ],
        unlock: () => [
            actions.build.key,
        ],
        order: 30,
    },
    build: {
        name: "Build",
        desc: "Put together some materials to come up with what looks like a building.",
        choices: ({ $store }) => {
            return Object.values(buildings)
                // Filter by requirements
                .filter(({ require }) => buildingDone($store, require))
                // Filter by upgrade presence
                .filter(({ upgrade }) => buildingDone($store, upgrade, "exists"))
                // Filter by already done
                .filter(({ key }) => !$store.getters["building/done"](key));
        },
        effect ({ $store }, choice) {
            $store.dispatch("building/add", {
                building: choice,
            });
        },
    },
    drawFromRiver: {
        name: "Draw water",
        desc: "Get some water from the river.",
        time: hours(8),
        energy: 0.5,
        effect: () => [
            [random([2, 6]), resources.water.key],
        ],
        order: 60,
    },
    drawFromWell: {
        name: "Draw water",
        desc: "Get some water from our well.",
        time: hours(2),
        energy: 0.2,
        effect: () => [
            [random([2, 3]), resources.water.key],
        ],
        order: 60,
    },
    drawFromPump: {
        name: "Draw water",
        desc: "Get some water at the pump.",
        time: hours(2),
        energy: 0.1,
        effect: () => [
            [3, resources.water.key],
        ],
        order: 60,
    },
    harvestPlot: {
        name: "Harvest crops",
        desc: "It's not the biggest vegetables, but it'll fill our stomachs.",
        time: hours(4),
        need: () => [
            [1, resources.water.key],
        ],
        effect: () => [
            [random([0.5, 2]), resources.food.key],
        ],
        order: 70,
    },
    harvestField: {
        name: "Harvest crops",
        desc: "Decent looking vegetables from our field will help us to survive.",
        time: hours(6),
        need: () => [
            [2, resources.water.key],
        ],
        effect: () => [
            [random([4, 5]), resources.food.key],
        ],
        order: 70,
    },
};

export default actions;
