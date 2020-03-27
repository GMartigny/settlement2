import { actions } from "../../data";

export default {
    namespaced: true,
    state: {
        list: [
            {
                name: "Gwen",
                health: 0.9,
                energy: 0.4,
                actions: [
                    actions.forage,
                    actions.gather,
                    actions.craft,
                ],
            },
        ],
    },
    getters: {
        available ({ list }) {
            return list;
        },
    },
};
