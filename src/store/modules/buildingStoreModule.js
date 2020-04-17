import { commonGetters, commonMutations, mutations } from "./commons";
import { buildings } from "../../data";

const isBuildingDone = list => (key) => {
    if (list.includes(key)) {
        return true;
    }

    return list.some((built) => {
        const { upgrade } = buildings[built];
        if (upgrade) {
            const upgraded = upgrade();
            return isBuildingDone(upgraded)(key);
        }
        return false;
    });
};

export default {
    namespaced: true,
    state: {
        list: [],
    },
    getters: {
        ...commonGetters,
        done: ({ list }) => isBuildingDone(list),
    },
    mutations: {
        ...commonMutations,
    },
    actions: {
        add ({ getters, dispatch, commit }, { building }) {
            commit(mutations.push, {
                item: building,
            });

            const data = buildings[building];

            const unlock = (data.unlock && data.unlock()) || [];
            unlock.forEach(action => dispatch("action/add", {
                action,
            }, {
                root: true,
            }));

            const upgrade = (data.upgrade && data.upgrade()) || [];
            upgrade.forEach((removed) => {
                const index = getters.indexOf(removed);
                if (index >= 0) {
                    commit(mutations.remove, {
                        index,
                    });
                }
            });

            const effect = (data.effect && data.effect()) || [];
            effect.forEach(([amount, resource]) => dispatch("resource/add", {
                amount,
                resource,
            }, {
                root: true,
            }));
        },
    },
};
