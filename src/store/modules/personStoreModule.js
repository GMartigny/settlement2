import { commonGetters, commonMutations, mutations } from "./commons";

export default {
    namespaced: true,
    state: {
        list: [],
    },
    getters: {
        ...commonGetters,
        byName: ({ list }) => name => list.findIndex(person => person.name === name),
    },
    mutations: {
        ...commonMutations,
        setEnergy ({ list }, { index, value }) {
            list[index].energy = Math.min(value, 1);
        },
        setHealth ({ list }, { index, value }) {
            list[index].health = Math.min(value, 1);
        },
        pushAction ({ list }, { index, action }) {
            list[index].actions.push(action);
        },
        removeAction ({ list }, { index, actionIndex }) {
            list[index].actions.splice(actionIndex, 1);
        },
    },
    actions: {
        add ({ rootGetters, commit }, { person }) {
            const actions = [...rootGetters["action/list"]];
            commit(mutations.push, {
                item: {
                    ...person,
                    actions,
                },
            });
        },
        updateEnergy ({ getters, dispatch, commit }, { person, amount }) {
            const index = getters.byName(person.name);
            if (index >= 0) {
                const target = getters.byIndex(index);
                commit("setEnergy", {
                    index,
                    value: target.energy + amount,
                });

                // Without energy, hit health
                if (target.energy < 0) {
                    const healthReduction = target.energy;
                    // Order matter here, updateHealth can remove the person
                    commit("setEnergy", {
                        index,
                        value: 0,
                    });
                    dispatch("updateHealth", {
                        person,
                        amount: healthReduction,
                    });
                }
            }
        },
        updateHealth ({ getters, commit }, { person, amount }) {
            const index = getters.byName(person.name);
            if (index >= 0) {
                const target = getters.byIndex(index);
                commit("setHealth", {
                    index,
                    value: target.health + amount,
                });

                if (target.health < 0) {
                    commit(mutations.remove, {
                        index,
                    });
                }
            }
        },
        addAction ({ getters, commit }, { person, action }) {
            const index = getters.byName(person.name);
            if (index >= 0) {
                const target = getters.byIndex(index);
                const hasAction = target.actions.includes(action);
                if (!hasAction) {
                    commit("pushAction", {
                        index,
                        action,
                    });
                }
            }
        },
        removeAction ({ getters, commit }, { person, action }) {
            const index = getters.byName(person.name);
            if (index >= 0) {
                const target = getters.byIndex(index);
                const actionIndex = target.actions.indexOf(action);
                commit("removeAction", {
                    index,
                    actionIndex,
                });
            }
        },
    },
};
