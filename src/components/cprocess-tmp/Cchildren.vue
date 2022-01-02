<template>
    <div class="children-container">
        <span
            v-if="name"
            class="title"
        >{{name}}</span>
        <span
            v-else
            class="title empty"
        >尚未配置</span>
        <tool type="children" @toolAction="handleToolAction" />
        <!-- <collapse class="icon-collapse" :collapsed="collapsed" @collapse="handleCollapse" /> -->
    </div>
</template>

<script>
import Tool from './Tool.vue'
// import Collapse from './collapse.vue'
import { debounce } from 'lodash'

export default {
    name: "Cchildren",
    components: {
        Tool
        // Collapse
    },
    inject: ['getGraph', 'getNode'],
    data() {
        return {
            name: "",
            collapsed: false
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    mounted() {
        this.init()
        this.initEvent()
    },
    methods: {
        init() {
            let node = this.getNode()
            this.name = node.data?.name
        },
        initEvent() {
            let node = this.getNode()
            node.on('change:position', debounce(this.rePosition, 500))
            node.on('change:data', ({ cell }) => {
                this.name = cell.data.name
            })
        },
        handleCollapse() {
            let graph = this.getGraph()
            let node = this.getNode()
            graph.trigger("node:collapse", { node, vm: this })
        },
        rePosition(data) {
            let node = this.getNode()
            if (!data.cell._parent) return
            let parent = data.cell._parent
            parent.trigger("rePosition", { parent: parent, child: node })
        },
        handleToolAction(type) {
            let graph = this.getGraph()
            let node = this.getNode()
            graph.trigger(`tool:${type}`, { node, vm: this })
        },
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
    border-radius: 4px;
    box-shadow: 0 2px 6px 0 rgba(32, 45, 64, 0.08);
    border: 1px solid #dadfe6;
    background: #fff;
    border-top: 3px solid #adbacc;
    overflow: hidden;

    .title {
        font-size: 15px;
        line-height: 24px;
        text-align: left;
        position: relative;
        left: 0;
        padding: 6px 12px;
        font-weight: bold;
        text-align: center;

        &.empty {
            color: #ccc;
        }
    }

    .icon-collapse {
        position: absolute;
        right: 8px;
        top: 8px;
    }
}
</style>
