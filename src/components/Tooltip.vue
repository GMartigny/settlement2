<template>
    <div
        class="tooltip"
        v-show="shown"
        :style="style"
    >
        <h1 class="name">{{ name }}</h1>
        <p class="description">
            {{ description }}
        </p>
        <ul
            class="needs"
            v-show="needs"
        >
            <li
                v-for="([amount, data]) in needs"
                class="resource"
                :class="{ hasEnough: hasEnough(amount, data) }"
            >
                <span v-if="!hasEnough(amount, data)">
                    {{ $store.getters["resource/howMuch"](data) }} /
                </span>{{ amount }}
                {{ data.name }}
            </li>
        </ul>
        <div class="time">
            {{ time }}
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import pretty from "pretty-ms";

    export default {
        name: "Tooltip",
        computed: {
            ...mapState("tooltip", ["shown", "data", "position"]),
            name () {
                return this.data && this.data.name;
            },
            description () {
                return this.data && this.data.description;
            },
            needs () {
                return this.data && this.data.needs && this.data.needs();
            },
            time () {
                return this.data && this.data.time && pretty(this.data.time, {
                    unitCount: 2,
                });
            },
            style () {
                const margin = 10;
                const left = this.position && (this.position.x + margin);
                const top = this.position && (this.position.y + margin);
                return {
                    transform: `translate3d(${left}px, ${top}px, 0)`,
                };
            },
        },
        methods: {
            hasEnough (amount, data) {
                return amount <= this.$store.getters["resource/howMuch"](data);
            }
        }
    };
</script>

<style scoped lang="less">
    .tooltip {
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        padding: 1em;
        box-shadow: 0 0 16px rgba(0, 0, 0, .5);
        max-width: 300px;

        .name {
            font-size: 1.1em;
            font-weight: bold;
            margin: 0;
        }

        .description {
            margin: 0;
        }

        .needs {
            list-style: none;
            padding: 1em 0 0 0;
            margin: 0;

            .resource {
                padding-left: 1em;
                color: var(--red);

                &:before {
                    content: "✘ ";
                }

                &.hasEnough {
                    color: inherit;

                    &:before {
                        content: "✔ ";
                    }
                }
            }
        }

        .time {
            color: #333;
            text-align: right;
            font-style: italic;
        }
    }
</style>
