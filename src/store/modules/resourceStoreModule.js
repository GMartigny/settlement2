import { commonGetters, commonMutations, mutations } from "./commons";

export default {
    namespaced: true,
    state: {
        list: [],
    },
    getters: {
        ...commonGetters,
        howMuch: ({ list }, { byName }) => ({ name }) => {
            const index = byName(name);
            if (index >= 0) {
                const { amount } = list[index];
                return +amount.toFixed(1);
            }
            return 0;
        },
    },
    mutations: {
        ...commonMutations,
        setAmount ({ list }, { index, amount }) {
            list[index].amount = Math.max(amount, 0);
        },
    },
    actions: {
        add ({ getters, commit }, { resource, amount }) {
            const index = getters.byName(resource.name);
            if (index < 0) {
                commit(mutations.push, {
                    item: {
                        ...resource,
                        amount,
                    },
                });
            }
            else if (amount > 0) {
                const target = getters.byIndex(index);
                commit("setAmount", {
                    index,
                    amount: target.amount + amount,
                });
            }
        },
        consume ({ getters, commit }, { resource, amount }) {
            const index = getters.byName(resource.name);
            if (index >= 0) {
                const target = getters.byIndex(index);
                commit("setAmount", {
                    index,
                    amount: target.amount - amount,
                });
            }
        },
    },
};
