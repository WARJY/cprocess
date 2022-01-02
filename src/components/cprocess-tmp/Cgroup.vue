<template>
    <div class="group-container">
        <!-- <span class="title">任务组{{name}}：</span> -->
        <!-- <collapse class="icon-collapse" :collapsed="collapsed" @collapse="handleCollapse" /> -->
        <tool @toolAction="handleToolAction" />
    </div>
</template>

<script>
import Tool from './Tool.vue'
// import Collapse from './collapse.vue'

export default {
    name: "Cgroup",
    components: {
        // Collapse,
        Tool
    },
    inject: ['getGraph', 'getNode'],
    data() {
        return {
            name: 1,
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
            node.on("rePosition", this.handleReposition)
        },
        handleReposition({ parent, child }) {
            setTimeout(() => {
                let node = this.getNode()
                if (parent !== node) return
                if (parent.data.reSize === true) {
                    let parentSize = parent.size()
                    let childSize = child.size()
                    if (parentSize.height < childSize.height * parent.children.length + 80) {
                        parent.resize(parentSize.width, childSize.height * parent.children.length + 80)
                    }
                }
                if (parent.data.rePosition === true) {
                    let parentSize = parent.size()
                    let parentPosition = parent.position()
                    parent.children.sort((a, b) => {
                        let aY = a.position().y
                        let bY = b.position().y
                        return aY - bY
                    }).forEach((child, index) => {
                        let childSize = child.size()
                        let childX = parentPosition.x + (parentSize.width - childSize.width) / 2
                        let childYPer = (parentSize.height - (childSize.height * parent._children.length)) / (parent._children.length + 1)
                        child.position(childX, parentPosition.y + (childYPer + childSize.height) * index + childYPer)
                    })
                }
            }, 100)
        },
        handleToolAction(type) {
            let graph = this.getGraph()
            let node = this.getNode()
            graph.trigger(`tool:${type}`, { node, vm: this })
        },
        handleCollapse() {
            let graph = this.getGraph()
            let node = this.getNode()
            graph.trigger("node:collapse", { node, vm: this })
        },
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="scss" scoped>
.group-container {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 2px 6px 0 rgba(32, 45, 64, 0.08);
    border: 1px solid #dadfe6;
    background: #fff;
    border-top: 3px solid #adbacc;

    .title {
        font-size: 15px;
        text-align: left;
        position: relative;
        left: 0;
        padding: 6px 12px;
        font-weight: bold;
        text-align: center;
    }

    .icon-collapse {
        position: absolute;
        right: 8px;
        top: 8px;
    }
}
</style>
