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
    },
    actions: {
        add ({ getters, dispatch, commit }, { building }) {
            commit(mutations.push, {
                item: building,
            });

            const unlock = building.unlock && building.unlock();
            if (unlock) {
                unlock.forEach(action => dispatch("action/add", {
                    action,
                }, {
                    root: true,
                }));
            }

            const upgrade = building.upgrade && building.upgrade();
            if (upgrade) {
                upgrade.forEach((removed) => {
                    const index = getters.byName(removed);
                    if (index >= 0) {
                        commit(mutations.remove, {
                            index,
                        });
                    }
                });
            }
        },
    },
};
