<template>
    <div
        class="action-wrapper"
    >
        <button
            class="action"
            :class="state"
            :style="style"
            @click="start()"
            v-tooltip="this"
        >
            <span class="name">{{ data.name }}</span>
        </button>
        <div
            class="options"
            v-if="state.multiple"
        >
            <Action
                v-for="sub in choices" :key="sub.key"
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
        props: ["data"],
        directives: {
            tooltip,
        },
        data () {
            return {
                isRunning: false,
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
            choices () {
                return this.data.choices(this).sort(({ order: a }, { order: b }) => a - b);
            },
            person () {
                if (this.$parent.data.health !== undefined) {
                    return this.$parent;
                }
                return this.$parent.person;
            },
            energy () {
                if (this.$parent.data.health !== undefined) {
                    return this.data.energy || 0;
                }
                return (this.data.energy || 0) + this.$parent.energy;
            },
            time () {
                if (this.$parent.data.health !== undefined) {
                    return this.data.time || 0;
                }
                return (this.data.time || 0) + this.$parent.time;
            }
        },
        methods: {
            start (choice) {
                if (this.state.disabled || (this.state.multiple && !choice)) {
                    return;
                }

                if (this.$parent.start) {
                    return this.$parent.start(this.data);
                }

                const need = (this.data.need && this.data.need(this)) || [];
                if (choice) {
                    need.push(...((choice.need && choice.need(this)) || []));
                }
                need.forEach(([amount, resource]) => this.$store.dispatch("resource/consume", {
                    resource,
                    amount,
                }));

                this.$emit("start", this, choice);
                if (this.time) {
                    this.isRunning = wait(this.end.bind(this, choice), this.time);
                }
                else {
                    this.end(choice);
                }
            },
            end (choice) {
                const earn = (this.data.effect && this.data.effect(this, choice)) || [];
                if (choice) {
                    earn.push(...((choice.effect && choice.effect(this, choice)) || []));
                }
                earn.forEach(([amount, resource]) => this.$store.dispatch("resource/add", {
                    resource,
                    amount,
                }));

                const build = this.data.build && this.data.build(this) || [];
                if (choice) {
                    build.push(...((choice.build && choice.build(this)) || []));
                }
                build.forEach(building => this.$store.dispatch("building/add", {
                    building,
                }));

                this.$emit("end", this.data);
                this.isRunning = false;
            },
            isDisabled () {
                // The person is already doing something
                if (this.person.isBusy) {
                    return true;
                }

                // The person don't have enough energy
                if (this.energy > this.person.data.energy) {
                    return true;
                }

                // Need don't match
                if (this.data.need) {
                    return Boolean(this.data.need(this).find(([amount, key]) => {
                        const has = this.$store.getters["resource/howMuch"](key);
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

            &:focus {
                outline: 1px solid #fff;
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

            &.running {
                color: #999;
                box-shadow: none;

                &:before {
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
        }

        .options {
            display: none;
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

        &:hover .options, &:focus-within .options {
            display: block;
        }
    }

    @keyframes running {
        from {

        }
        to {

        }
    }
</style>
