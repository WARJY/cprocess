<template>
    <div
        class="tool-container"
        @contextmenu.prevent="onContextmenu"
    ></div>
</template>

<script>
import Vue from 'vue'
import Contextmenu from "vue-contextmenujs"
Vue.use(Contextmenu)

export default {
    name: "",
    props: {
        type: {
            type: String,
            default: () => "group"
        }
    },
    data() {
        return {
            groupMenu: [
                {
                    label: "添加任务",
                    onClick: () => {
                        this.$emit("toolAction", "addAction")
                    }
                },
                {
                    label: "添加串行批次",
                    onClick: () => {
                        this.$emit("toolAction", "addGroupRow")
                    }
                },
                {
                    label: "添加并行批次",
                    onClick: () => {
                        this.$emit("toolAction", "addGroupCol")
                    }
                },
            ],
            childrenMenu: [
                {
                    label: "配置",
                    onClick: () => {
                        this.$emit("toolAction", "setAction")
                    }
                }
            ]
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    methods: {
        onContextmenu(event) {
            this.$contextmenu({
                items: this.type === "group" ? this.groupMenu : this.childrenMenu,
                event,
                customClass: "custom-class",
                zIndex: 3,
                minWidth: 230
            });
            return false;
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="scss" scoped>
.tool-container {
    width: 100%;
    height: 100%;
}
</style>
