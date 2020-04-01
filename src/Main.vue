<template>
    <main :class="state">
        <transition name="slide-down">
            <div class="resources" v-show="resources.length">
                <Resources
                    v-for="resource in resources" :key="resource.name"
                    :data="resource"
                />
            </div>
        </transition>
            <div class="persons">
                <Person
                    v-for="person in persons" :key="person.name"
                    :data="person"
                    ref="persons"
                />
            </div>
        <Tooltip ref="tooltip" />
    </main>
</template>

<script>
    import Resources from "./components/Resource.vue";
    import Person from "./components/Person.vue";
    import Tooltip from "./components/Tooltip.vue";
    import { specials, actions, buildings } from "./data";
    import { wait, pauseAll, restartAll } from "./timer";

    export default {
        data () {
            return {
                isPaused: false,
            };
        },
        computed: {
            state () {
                return {
                    isPaused: this.isPaused,
                };
            },
            resources () {
                return this.$store.getters["resource/list"];
            },
            persons () {
                return this.$store.getters["person/list"];
            }
        },
        components: {
            Resources,
            Person,
            Tooltip,
        },
        methods: {
            update (previousTime) {
                requestAnimationFrame((time) => {
                    // Compute time elapsed since last tick
                    const passed = time - previousTime;
                    const tickLength = 1000 / 60;
                    const ticks = passed / tickLength;
                    const passedOn = (ticks % 1) * tickLength;
                    if (ticks > 0 && !this.isPaused) {
                        const todo = Math.floor(ticks);
                        this.updatePersons(todo);
                        this.updateResources(todo);
                    }
                    this.update(time - passedOn);
                });
            },
            updateResources (tick) {
                // Persons resource consumption
                const needs = specials.person.needs();
                needs.forEach(([amount, resource]) => {
                    // Runs out, hit person's energy instead
                    if (this.$store.getters["resource/howMuch"](resource) === 0) {
                        this.$refs.persons.forEach((person) => {
                            if (person.isReady) {
                                person.updateEnergy(-amount * tick);
                            }
                        });
                    }
                    else {
                        this.$store.dispatch("resource/consume", {
                            amount: amount * this.persons.length * tick,
                            resource,
                        });
                    }
                });
            },
            updatePersons (tick) {
                // Energy degradation
                const { energyDegradation } = specials.person;
                this.$refs.persons.forEach((person) => {
                    if (person.isReady && person.isBusy !== actions.sleep.name) {
                        person.updateEnergy(-energyDegradation * tick);
                    }
                });
            },
            togglePause () {
                if (this.isPaused) {
                    restartAll();
                }
                else {
                    pauseAll();
                }
                this.isPaused = !this.isPaused;
            },
        },
        created () {
            window.addEventListener("keypress", ({ code }) => {
                if (code === "Space") {
                    this.togglePause();
                }
            });

            this.$store.dispatch("building/add", {
                building: buildings.wreckage,
            });
            wait(() => {
                this.$store.dispatch("person/add", {
                    person: {
                        name: "Joe",
                        health: 0,
                        energy: 0,
                    }
                });
                requestAnimationFrame(this.update);
            }, 1000);
        },
    };
</script>

<style scoped lang="less">
    main {
        color: #222;

        &.isPaused:after {
            content: "Paused";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .5);
            color: #fff;
            font-size: 3em;
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: 0 0 .1em;
        }

        .resources {
            position: relative;
            padding: 1em;
            background: rgba(0, 0, 0, .4);
            box-shadow: 0 0 4px rgba(0, 0, 0, .5);
            transition: all ease-out .5s;

            &.slide-down-enter {
                // FIXME: can do better (fixed value)
                margin-bottom: -50px;
                transform: translate3d(0, -50px, 0);
            }
        }

        .persons {
            padding: 1em;
        }
    }
</style>
