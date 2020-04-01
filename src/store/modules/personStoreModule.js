import { getIndexByName } from "./utils";
import { commonGetters, commonMutations, mutations } from "./commons";

export default {
    namespaced: true,
    state: {
        list: [],
    },
    getters: {
        ...commonGetters,
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
        removeAction ({ list }, { index, action }) {
            const person = list[index];
            const actionIndex = getIndexByName(person.actions)(action.name);
            person.actions.splice(actionIndex, 1);
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
                const hasAction = getIndexByName(target.actions)(action.name) >= 0;
                if (!hasAction) {
                    commit("pushAction", {
                        index,
                        action,
                    });
                }
            }
        },
        removeAction ({ getters, commit }, { person, action }) {
            // FIXME: code repetition to check person existence (monad ?)
            const index = getters.byName(person.name);
            if (index >= 0) {
                commit("removeAction", {
                    index,
                    action,
                });
            }
        },
    },
};
