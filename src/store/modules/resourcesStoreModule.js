import { resources } from "../../data";

export default {
    namespaced: true,
    state: {
        list: [
            {
                type: resources.water,
                amount: 10,
            },
            {
                type: resources.nuts,
                amount: 2,
            },
            {
                type: resources.component,
                amount: 1,
            },
        ],
    },
    mutations: {
        push ({ list }, resource) {
            list.push(resource);
        },
        increment ({ list }, { index, amount }) {
            list[index].amount += amount;
        },
    },
    actions: {
        addResource ({ state, commit }, { amount, resource }) {
            const index = state.list.findIndex(({ type }) => resource.name === type.name);
            if (index < 0) {
                commit("push", {
                    type: resource,
                    amount,
                });
            }
            else {
                commit("increment", {
                    index,
                    amount,
                });
            }
        },
    },
    getters: {
        available ({ list }) {
            return list.filter(({ amount }) => amount > 0);
        },
        howMuch: ({ list }) => ({ name }) => {
            const resource = list.find(({ type }) => type.name === name);
            return resource ? resource.amount : 0;
        },
    },
};
