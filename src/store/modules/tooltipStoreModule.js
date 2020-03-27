export default {
    namespaced: true,
    state: {
        shown: false,
        data: null,
        position: null,
    },
    mutations: {
        setShown (state, shown) {
            state.shown = shown;
        },
        setData (state, data) {
            state.data = data;
        },
        setPosition (state, position) {
            state.position = position;
        },
    },
    actions: {
        show ({ commit }, data) {
            commit("setShown", true);
            commit("setData", data);
        },
        move ({ commit }, position) {
            commit("setPosition", position);
        },
        hide ({ commit }) {
            commit("setShown", false);
            commit("setData", null);
            commit("setPosition", null);
        },
    },
};
