<template>
    <div class="resource" v-tooltip="this">
        {{ formatted }}
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
        props: ["data", "amount"],
        computed: {
            formatted () {
                return +this.amount.toFixed(1) === Math.round(this.amount) ?
                    Math.round(this.amount) :
                    this.amount.toFixed(1);
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
