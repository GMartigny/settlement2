import { mutations } from "./commons";

export default {
    namespaced: true,
    state: {
        list: {},
    },
    getters: {
        list: ({ list }) => list,
        exists: ({ list }) => resources => Object.prototype.hasOwnProperty.call(list, resources),
        howMuch: ({ list }) => (resource) => {
            if (list[resource]) {
                return +list[resource].toFixed(1);
            }
            return 0;
        },
    },
    mutations: {
        [mutations.push] (state, { resource, amount }) {
            state.list = {
                ...state.list,
                [resource]: amount,
            };
        },
        changeAmount ({ list }, { resource, amount }) {
            list[resource] += Math.max(amount, -list[resource]);
        },
    },
    actions: {
        add ({ getters, commit }, { resource, amount }) {
            const exists = getters.exists(resource);
            if (exists) {
                commit("changeAmount", {
                    resource,
                    amount,
                });
            }
            else if (amount > 0) {
                commit(mutations.push, {
                    resource,
                    amount,
                });
            }
        },
        consume ({ getters, commit }, { resource, amount }) {
            const exists = getters.exists(resource);
            if (exists) {
                commit("changeAmount", {
                    resource,
                    amount: -amount,
                });
            }
        },
    },
};
