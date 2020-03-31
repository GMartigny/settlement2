import { getIndexByName, getByIndex } from "./utils";

export default {
    namespaced: true,
    state: {
        list: [],
    },
    getters: {
        available ({ list }) {
            return list;
        },
        howMuch: ({ list }, { byName }) => ({ name }) => {
            const index = byName(name);
            if (index >= 0) {
                const { amount } = list[index];
                return +amount.toFixed(1);
            }
            return 0;
        },
        byName: ({ list }) => getIndexByName(list),
        byIndex: ({ list }) => getByIndex(list),
    },
    mutations: {
        push ({ list }, resource) {
            list.push(resource);
        },
        setAmount ({ list }, { index, amount }) {
            list[index].amount = Math.max(amount, 0);
        },
    },
    actions: {
        addResource ({ getters, commit }, { resource, amount }) {
            const index = getters.byName(resource.name);
            if (index < 0) {
                commit("push", {
                    ...resource,
                    amount,
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
        consumeResource ({ getters, commit }, { resource, amount }) {
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
