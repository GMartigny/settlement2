<template>
    <div class="person">
        <div class="name">{{ person.name }}</div>
        <div class="bars">
            <Bar :data="special.health" :percentage="person.health" />
            <Bar :data="special.energy" :percentage="person.energy" />
        </div>
        <div>
            <Action
                v-for="(data, index) in person.actions" :key="index"
                :available="person.energy"
                :data="data"
            />
        </div>
    </div>
</template>

<script>
    import Action from "./Action.vue";
    import Bar from "./Bar.vue";
    import { special } from "../data";

    export default {
        name: "Person",
        props: ["person"],
        data () {
            return {
                special,
            };
        },
        components: {
            Bar,
            Action,
        }
    };
</script>

<style scoped lang="less">
    .person {
        padding: 1em;
        background: rgba(0, 0, 0, .6);

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
