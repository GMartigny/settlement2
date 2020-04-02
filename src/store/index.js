import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";

import resource from "./modules/resourceStoreModule";
import person from "./modules/personStoreModule";
import tooltip from "./modules/tooltipStoreModule";
import action from "./modules/defaultActionStoreModule";
import building from "./modules/buildingStoreModule";

Vue.use(Vuex);

const saveKey = "stlmt";

const saltLength = 6;

const getSalt = length => Math.random().toString(36).slice(2, 2 + length);

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
                const { r, p, a, b } = JSON.parse(atob(saveData.slice(saltLength)));
                this.replaceState({
                    ...state,
                    resource: r,
                    person: p,
                    action: a,
                    building: b,
                });
            }
        },
        clear () {
            // eslint-disable-next-line no-use-before-define
            unsubscriber();
            localStorage.clear();
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        },
    },
});

const unsubscriber = store.subscribe(({ type }, { resource: r, person: p, action: a, building: b }) => {
    if (!type.startsWith("tooltip")) {
        const salt = getSalt(saltLength);
        const jsonString = btoa(JSON.stringify({
            r, p, a, b,
        }));
        localStorage.setItem(saveKey, `${salt}${jsonString}`);
    }
});

export default store;
