<template>
    <div class="resource" v-tooltip="this">
        {{ formatted }}
        {{ data.name }}
    </div>
</template>

<script>
    import tooltip from "../tooltip-directive";
    import { resources } from "../data";

    export default {
        name: "Resources",
        directives: {
            tooltip,
        },
        props: ["amount"],
        computed: {
            data () {
                return resources[this.$vnode.key];
            },
            formatted () {
                return +this.amount.toFixed(1);
            }
        }
    }
</script>

<style scoped lang="less">
    .resource {
        display: inline-block;
        margin: 0 .5em;
        color: #fff;
    }
</style>
