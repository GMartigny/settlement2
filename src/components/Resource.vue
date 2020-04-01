<template>
    <div class="resource" v-tooltip="this">
        {{ amount }}
        {{ data.name }}
    </div>
</template>

<script>
    import tooltip from "../tooltip-directive";

    export default {
        name: "Resources",
        directives: {
            tooltip,
        },
        props: ["data"],
        computed: {
            amount () {
                return this.$store.getters["resource/howMuch"](this.data);
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
