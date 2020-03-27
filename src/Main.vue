<template>
    <main>
        <div class="resources">
            <Resources
                v-for="({ type, amount }, index) in resources" :key="index"
                :data="type"
                :amount="amount"
            />
        </div>
        <div class="persons">
            <Person
                v-for="(person, index) in persons" :key="index"
                :person="person"
            />
        </div>
        <Tooltip ref="tooltip" />
    </main>
</template>

<script>
    import Resources from "./components/Resource.vue";
    import Person from "./components/Person.vue";
    import Tooltip from "./components/Tooltip.vue";

    export default {
        computed: {
            resources () {
                return this.$store.getters["resources/available"];
            },
            persons () {
                return this.$store.getters["person/available"];
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
                    const passed = time - previousTime;
                    const tickLength = 1000 / 60;
                    const ticks = passed / tickLength;
                    const passedOn = (ticks % 1) * tickLength;
                    if (ticks > 0) {
                        const todo = Math.floor(ticks);
                    }
                    this.update(time - passedOn);
                });
            },
        },
        created () {
            this.update(0);
        }
    };
</script>

<style scoped lang="less">
    main {
        color: #222;

        .resources {
            padding: 1em;
            background: rgba(0, 0, 0, .4);
            box-shadow: 0 0 4px rgba(0, 0, 0, .5);
        }

        .persons {
            padding: 1em;
        }
    }
</style>
