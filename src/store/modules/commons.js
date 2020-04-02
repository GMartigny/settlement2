const commonGetters = {
    list: ({ list }) => list,
    indexOf: ({ list }) => key => list.indexOf(key),
    byIndex: ({ list }) => index => list[index],
    exists: ({ list }) => key => list.includes(key),
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
