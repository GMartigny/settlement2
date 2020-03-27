import Vue from "vue";

import Main from "./Main.vue";
import store from "./store";
import "./style.less";

const container = document.createElement("div");
document.body.appendChild(container);

const app = new Vue({
    store,
    components: {
        Main,
    },
    template: "<Main />",
});
app.$mount(container);
