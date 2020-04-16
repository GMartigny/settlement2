import { mutations } from "./commons";
import { resources } from "../../data";

export default {
    namespaced: true,
    state: {
        list: [
            // [amount, resourceKey]
        ],
    },
    getters: {
        list: ({ list }) => list,
        exists: ({ list }) => resourceKey => list.some(([, key]) => key === resourceKey),
        howMuch: ({ list }) => (resourceKey) => {
            const found = list.find(([, key]) => key === resourceKey);
            if (found) {
                return +found[0].toFixed(1);
            }
            return 0;
        },
    },
    mutations: {
        [mutations.push] ({ list }, { resource, amount }) {
            list.push([
                amount, resource,
            ]);
            list.sort(([, a], [, b]) => resources[a].order - resources[b].order);
        },
        changeAmount ({ list }, { resource, amount }) {
            const couple = list.find(([, key]) => key === resource);
            couple.splice(0, 1, couple[0] + Math.max(amount, -couple[0]));
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
