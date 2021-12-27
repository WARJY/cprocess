<template>
    <div class="children-container">
        <span class="title">{{name}}</span>
        <!-- <collapse class="icon-collapse" :collapsed="collapsed" @collapse="handleCollapse" /> -->
    </div>
</template>

<script>
import Collapse from '@/components/cprocess/collapse.vue'

export default {
    name: "Cchildren",
    components: {
        Collapse
    },
    inject: ['getGraph', 'getNode'],
    props: {
        name: {
            type: String,
            default: () => ""
        }
    },
    data() {
        return {
            collapsed: false
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    methods: {
        handleCollapse() {
            let graph = this.getGraph()
            let node = this.getNode()
            graph.trigger("node:collapse", { node, vm: this })
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="scss" scoped>
.children-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #ddd;
    border-radius: 10px;
    box-shadow: 2px 2px 10px #999;
    .title {
        font-size: 15px;
        text-align: left;
        position: relative;
        left: 0;
        background-color: #ddd;
        padding: 6px 12px;
        position: absolute;
        font-weight: bold;
    }
    .icon-collapse {
        position: absolute;
        right: 8px;
        top: 8px;
    }
}
</style>
