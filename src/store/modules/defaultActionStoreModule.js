import { commonGetters, commonMutations } from "./commons";

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
        add ({ getters, commit }, { action }) {
            const exists = getters.exists(action);
            if (!exists) {
                commit("push", {
                    item: action,
                });
            }
        },
        removeAction ({ getters, commit }, { action }) {
            const index = getters.byName(action.name);
            if (index >= 0) {
                commit("remove", {
                    index,
                });
            }
        },
    },
};
