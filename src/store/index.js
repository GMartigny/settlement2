import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";

import resource from "./modules/resourceStoreModule";
import person from "./modules/personStoreModule";
import tooltip from "./modules/tooltipStoreModule";
import action from "./modules/defaultActionStoreModule";
import building from "./modules/buildingStoreModule";

Vue.use(Vuex);

const saveKey = "stlmt";

const store = new Vuex.Store({
    modules: {
        resource,
        person,
        tooltip,
        action,
        building,
    },
    actions: {
        initialize ({ state }) {
            const saveData = localStorage.getItem(saveKey);
            if (saveData) {
                const { r, p, a, b } = JSON.parse(atob(saveData));
                this.replaceState({
                    ...state,
                    resource: r,
                    person: p,
                    action: a,
                    building: b,
                });
            }
        },
    },
});

store.subscribe((_, { resource: r, person: p, action: a, building: b }) => {
    localStorage.setItem(saveKey, btoa(JSON.stringify({
        r, p, a, b,
    })));
});

export default store;
