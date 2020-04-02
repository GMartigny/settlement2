<template>
    <transition appear name="slide-in">
        <div class="person">
            <div class="name">{{ data.name }}</div>
            <div class="bars">
                <Bar :data="specials.health" :percentage="data.health" />
                <Bar :data="specials.energy" :percentage="data.energy" />
            </div>
            <div>
                <Action
                    v-for="action in data.actions" :key="action"
                    @start="startAction"
                    @end="endAction"
                />
            </div>
        </div>
    </transition>
</template>

<script>
    import Action from "./Action.vue";
    import Bar from "./Bar.vue";
    import { specials } from "../data";

    export default {
        name: "Person",
        props: ["data"],
        data () {
            return {
                specials,
                isBusy: false,
            };
        },
        components: {
            Bar,
            Action,
        },
        methods: {
            startAction ({ name, energy }) {
                if (energy) {
                    this.updateEnergy(-energy);
                }
                this.isBusy = name;
            },
            endAction ({ unlock, lock }) {
                this.isBusy = false;

                const unlocked = unlock && unlock(this);
                if (unlocked) {
                    unlocked.forEach(action => this.$store.dispatch("person/addAction", {
                        person: this.data,
                        action,
                    }));
                }

                const locked = lock && lock(this);
                if (locked) {
                    locked.forEach(action => this.$store.dispatch("person/removeAction", {
                        person: this.data,
                        action,
                    }));
                }
            },
            updateEnergy (amount) {
                this.$store.dispatch("person/updateEnergy", {
                    person: this.data,
                    amount,
                });
            },
            updateHealth (amount) {
                this.$store.dispatch("person/updateHealth", {
                    person: this.data,
                    amount,
                });
            },
        },
    };
</script>

<style scoped lang="less">
    .person {
        padding: 1em;
        background: rgba(0, 0, 0, .6);
        transition: transform ease-out .5s;

        &.slide-in-enter, &.slide-in-leave-to {
            transform: translate3d(-100%, 0, 0);
        }

        .name {
            padding-bottom: 1em;
            color: #f8f8f8;
        }

        .bars {
            position: relative;
            padding-bottom: 1em;

            .bar {
                margin-bottom: .3em;
            }
        }
    }
</style>
