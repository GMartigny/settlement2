import { getByIndex, getIndexByName } from "./utils";

const commonGetters = {
    list: ({ list }) => list,
    byName: ({ list }) => getIndexByName(list),
    byIndex: ({ list }) => getByIndex(list),
    exists: (_, { byName }) => ({ name }) => byName(name) >= 0,
};

const mutations = {
    push: "push",
    remove: "remove",
};

const commonMutations = {
    [mutations.push] ({ list }, { item }) {
        list.push(item);
    },
    [mutations.remove] ({ list }, { index }) {
        list.splice(index, 1);
    },
};

export {
    commonGetters,
    commonMutations,
    mutations,
};
