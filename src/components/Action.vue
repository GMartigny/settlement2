<template>
    <div
        class="action-wrapper"
        @mouseover="showOptions = state.running || true"
        @mouseleave="showOptions = false"
    >
        <button
            class="action"
            :class="state"
            :style="style"
            @click="run"
            v-tooltip="this"
        >
            <span class="name">{{ data.name }}</span>
        </button>
        <div
            class="options"
            v-if="state.multiple"
            v-show="showOptions"
        >
            <Action
                v-for="(sub, index) in data.choices" :key="index"
                :data="sub"
            />
        </div>
    </div>
</template>

<script>
    import tooltip from "../tooltip-directive";

    export default {
        name: "Action",
        directives: {
            tooltip,
        },
        props: ["available", "data"],
        data () {
            return {
                state: {
                    multiple: Boolean(this.data.choices),
                    running: false,
                    disabled: this.isDisabled(),
                },
                showOptions: false,
                timeout: null,
            };
        },
        computed: {
            style () {
                return {
                    animationDuration: `${this.data.time}ms`,
                };
            },
        },
        methods: {
            run () {
                console.log(this.data.name);
                // this.$emit("action/run", this.data);
                const earn = this.data.effect && this.data.effect();
                if (earn) {
                    earn.forEach(([amount, resource]) => {
                        this.$store.dispatch("resources/addResource", {
                            amount,
                            resource,
                        });
                    });
                }
            },
            isDisabled () {
                const { energy, needs } = this.data;
                if (energy && energy > this.available) {
                    return true;
                }

                if (needs) {
                    return Boolean(needs().find(([amount, data]) => {
                        const has = this.$store.getters["resources/howMuch"](data);
                        return has < amount;
                    }));
                }

                return false;
            }
        },
    }
</script>

<style scoped lang="less">
    .action-wrapper {
        position: relative;
        display: inline-block;
        padding-right: 1em;

        .action {
            position: relative;
            border: none;
            text-align: left;
            padding: .75em 1.5em;
            background: var(--main-color);
            cursor: pointer;
            font-weight: bold;
            color: #fff;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
            outline: none;

            &.multiple {
                cursor: default;

                &:after {
                    content: "▼";
                    margin-left: 1em;
                    float: right;
                }
            }

            &:not(.multiple):not(.disabled):not(.running):active {
                transform: translate(1px, 1px);
                box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
            }

            &.running {
                color: #999;
                box-shadow: none;
            }

            &.disabled {
                cursor: initial;

                &:after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-color: rgba(0, 0, 0, .5);
                }
            }
        }

        .options {
            position: absolute;
            top: 100%;

            .action-wrapper {
                display: block;
                padding-top: .5em;

                .action {
                    width: 100%;
                }
            }
        }
    }

    @keyframes running {
        from {

        }
        to {

        }
    }
</style>
