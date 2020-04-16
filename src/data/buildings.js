import actions from "./actions";
import resources from "./resources";
import specials from "./specials";
import { hours, days } from "./utils";

const buildings = {
    // SPECIAL
    wreckage: {
        name: "Wreckage",
        desc: "Remainings of a car.",
        unlock: () => [
            actions.wakeUp.key,
        ],
    },
    forum: {
        name: "Forum",
        desc: "The center and start of our settlement.",
        upgrade: () => [
            buildings.wreckage.key,
        ],
        unlock: () => [
            actions.sleep.key,
            actions.gather.key,
        ],
        effect: () => [
            [1, resources.room.key],
        ],
    },
    // SMALL
    furnace: {
        name: "Furnace",
        desc: "Survival require to craft as much as to gather things.",
        time: hours(7),
        need: () => [
            [8, resources.rock.key],
            [2, resources.oil.key],
        ],
        order: 15,
    },
    forum1: {
        name: "Forum+1",
        desc: "Add 1 room to the forum.",
        time: hours(2),
        upgrade: () => [
            buildings.forum.key,
        ],
        need: () => [
            [6, resources.bolts.key],
            [4, resources.scrap.key],
        ],
        effect: () => [
            [1, resources.room.key],
        ],
        order: 10,
    },
    plot: {
        name: "Farm plot",
        desc: "A little arranged plot of soil to grow some food.",
        time: hours(9),
        need: () => [
            [5, resources.food.key],
            [10, resources.sand.key],
        ],
        unlock: () => [
            actions.harvestPlot.key,
        ],
        order: 12,
    },
    pharmacy: {
        name: "Pharmacy",
        desc: "Maybe we should avoid letting medications rot in plain sunlight !",
        time: hours(6),
        need: () => [
            [5, resources.medication.key],
            [4, resources.component.key],
        ],
        order: 16,
    },
    well: {
        name: "Well",
        desc: "Just a large hole into the ground.",
        time: hours(16),
        need: () => [
            [10, resources.rock.key],
            [4, resources.tool.key],
        ],
        effect: () => [
            [5, resources.water.key],
        ],
        unlock: () => [
            actions.drawFromWell.key,
        ],
        lock: () => [
            actions.drawFromRiver.key,
        ],
        order: 13,
    },
    // MEDIUM
    forum2: {
        name: "Forum+2",
        desc: "Add 1 room to the camp again.",
        time: hours(5),
        need: () => [
            [10, resources.sand.key],
            [2, resources.stone.key],
            [3, resources.glass.key],
        ],
        upgrade: () => [
            buildings.forum1.key,
        ],
        effect: () => [
            [1, resources.room.key],
        ],
        order: 20,
    },
    field: {
        name: "Field",
        desc: "A larger crop field to produce more food.",
        time: hours(10),
        lock: () => [
            actions.harvestPlot.key,
        ],
        unlock: () => [
            actions.harvestField.key,
        ],
        need: () => [
            [20, resources.food.key],
            [5, resources.tool.key],
            [3, resources.medication.key],
        ],
        upgrade: () => [
            buildings.plot.key,
        ],
        order: 25,
    },
    forge: {
        name: "Forge",
        desc: "A good upgrade to the furnace.",
        time: hours(10),
        need: () => [
            [10, resources.stone.key],
            [6, resources.oil.key],
            [2, resources.tool.key],
        ],
        upgrade: () => [
            buildings.furnace.key,
        ],
        order: 27,
    },
    // BIG
    workshop: {
        name: "Workshop",
        desc: "Having a dedicated place for the crafting work would allow to make more complex crafts.",
        time: days(1),
        energy: 90,
        require: () => [
            buildings.forge.key,
        ],
        need: () => [
            [6, resources.scrap.key],
            [5, resources.glass.key],
            [10, resources.tool.key],
            [15, resources.brick.key],
        ],
        order: 35,
    },
    forum3: {
        name: "Forum+3",
        desc: "Add 2 rooms to the camp for more persons.",
        time: hours(6),
        need: () => [
            [10, resources.brick.key],
            [2, resources.furniture.key],
            [6, resources.glass.key],
        ],
        upgrade: () => [
            buildings.forum2.key,
        ],
        effect: () => [
            [2, resources.room.key],
        ],
        order: 30,
    },
    radio: {
        name: "Radio-station",
        desc: "Putting together a radio could allow to contact other people around the camp.",
        time: hours(6),
        require: () => [
            buildings.workshop.key,
        ],
        need: () => [
            [4, resources.circuit.key],
            [1, resources.computer.key],
        ],
        effect () {
            // TODO: not sure that works
            specials.person.dropRate = 0.1;
        },
        order: 37,
    },
    pump: {
        name: "Water pump",
        desc: "A buried contraption that collect water from the earth moisture.",
        time: days(1),
        energy: 120,
        need: () => [
            [20, resources.stone.key],
            [5, resources.metalPipe.key],
            [1, resources.engine.key],
        ],
        upgrade: () => [
            buildings.well.key,
        ],
        unlock: () => [
            actions.drawFromPump.key,
        ],
        lock: () => [
            actions.drawFromRiver.key,
            actions.drawFromWell.key,
        ],
        order: 36,
    },
    trading: { // TODO: merge with radio
        name: "Trading post",
        desc: "Since the radio station bring a handful of merchant, better take advantage of it.",
        time: days(0.8),
        energy: 70,
        require: () => [
            buildings.radio.key,
        ],
        need: () => [
            [2, resources.glass.key],
            [10, resources.brick.key],
            [2, resources.furniture.key],
        ],
        unlock: () => [
            actions.exchange.key,
        ],
        order: 38,
    },
    module: {
        name: "Car",
        desc: "This should be enough to hit the road and head towards a better place.",
        time: days(1.5),
        energy: 90,
        require: () => [
            buildings.workshop.key,
        ],
        need: () => [
            [15, resources.oil.key],
            [5, resources.furniture.key],
            [1, resources.computer.key],
            [2, resources.engine.key],
        ],
        unlock: () => [
            actions.launch.key,
        ],
        order: 40,
    },
};

export default buildings;
