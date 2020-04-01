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
            @click="start"
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
                v-for="sub in data.choices" :key="sub.name"
                :data="sub"
            />
        </div>
    </div>
</template>

<script>
    import tooltip from "../tooltip-directive";
    import { wait, cancel } from "../timer";

    export default {
        name: "Action",
        directives: {
            tooltip,
        },
        props: ["data"],
        data () {
            return {
                isRunning: false,
                showOptions: false,
            };
        },
        computed: {
            style () {
                return {
                    animationDuration: `${this.data.time}ms`,
                };
            },
            state () {
                return {
                    multiple: Boolean(this.data.choices),
                    running: this.isRunning,
                    disabled: this.isDisabled(),
                };
            },
        },
        methods: {
            start () {
                if (this.state.disabled) {
                    return;
                }

                const consume = this.data.needs && this.data.needs(this);
                if (consume) {
                    consume.forEach(([amount, resource]) => this.$store.dispatch("resource/consume", {
                        resource,
                        amount,
                    }));
                }

                this.$emit("start", this.data);
                this.isRunning = wait(this.end, this.data.time);
            },
            end () {
                const earn = this.data.effect && this.data.effect(this);
                if (earn) {
                    earn.forEach(([amount, resource]) => this.$store.dispatch("resource/add", {
                        resource,
                        amount,
                    }));
                }

                const build = this.data.build && this.data.build(this);
                if (build) {
                    build.forEach(building => this.$store.dispatch("building/add", {
                        building,
                    }));
                }

                this.$emit("end", this.data);
                this.isRunning = false;
            },
            isDisabled () {
                // The person is already doing something
                if (this.$parent.isBusy) {
                    return true;
                }

                // The person don't have enough energy
                const { energy, needs } = this.data;
                if (energy && energy > this.$parent.data.energy) {
                    return true;
                }

                // Need don't match
                if (needs) {
                    return Boolean(needs(this).find(([amount, data]) => {
                        const has = this.$store.getters["resource/howMuch"](data);
                        return has < amount;
                    }));
                }

                return false;
            }
        },
        destroyed () {
            cancel(this.isRunning);
        },
    }
</script>

<style scoped lang="less">
    // Stop animation when game is paused
    .isPaused .action {
        animation-play-state: paused;
    }

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

                &:after {
                    content: "";
                    position: absolute;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: rgba(255, 255, 255, .7);
                    animation: run linear 1;
                    animation-duration: inherit;
                    animation-play-state: inherit;

                    @keyframes run {
                        from {
                            width: 100%;
                        }
                        to {
                            width: 0;
                        }
                    }
                }
            }

            &.disabled {
                cursor: initial;

                &:before {
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
