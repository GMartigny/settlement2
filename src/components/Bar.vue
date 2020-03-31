<template>
    <div
        class="bar"
        :class="state"
        :style="style"
        v-tooltip="this"
    />
</template>

<script>
    import tooltip from "../tooltip-directive";

    export default {
        name: "Bar",
        directives: {
            tooltip,
        },
        props: ["data", "percentage"],
        computed: {
            style () {
                return {
                    width: `${this.percentage * 100}%`,
                    backgroundColor: this.data.color,
                };
            },
            state () {
                return {
                    warning: this.percentage < 0.2,
                };
            }
        },
    };
</script>

<style scoped lang="less">
    .bar {
        @height: 6px;
        height: @height;
        border-radius: 99px;

        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: @height;
            background-color: inherit;
            opacity: .2;
            border-radius: 99px;
        }

        &.warning {
            animation: blink ease infinite 1s alternate;

            @keyframes blink {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0.2;
                }
            }
        }
    }
</style>
