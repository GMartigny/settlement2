import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";

import resources from "./modules/resourcesStoreModule";
import person from "./modules/personStoreModule";
import tooltip from "./modules/tooltipStoreModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        resources,
        person,
        tooltip,
    },
});
