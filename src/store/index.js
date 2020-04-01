import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";

import resource from "./modules/resourceStoreModule";
import person from "./modules/personStoreModule";
import tooltip from "./modules/tooltipStoreModule";
import action from "./modules/defaultActionStoreModule";
import building from "./modules/buildingStoreModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        resource,
        person,
        tooltip,
        action,
        building,
    },
});
