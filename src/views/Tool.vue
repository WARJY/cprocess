<template>
    <div class="tool-container" @contextmenu.prevent="onContextmenu"></div>
</template>

<script>
import Vue from 'vue'
import Contextmenu from "vue-contextmenujs"
Vue.use(Contextmenu)

export default {
    name: "",
    data() {
        return {
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    methods: {
        onContextmenu(event) {
            this.$contextmenu({
                items: [
                    {
                        label: "返回(B)",
                        onClick: () => {
                            this.message = "返回(B)";
                            console.log("返回(B)");
                        }
                    },
                ],
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
