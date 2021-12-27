<template>
    <div class="children-container">
        <!-- <span class="title">{{name}}</span> -->
        <!-- <collapse class="icon-collapse" :collapsed="collapsed" @collapse="handleCollapse" /> -->
    </div>
</template>

<script>
import Collapse from '@/components/cprocess/collapse.vue'
import { debounce } from 'lodash'

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
    mounted() {
        // let node = this.getNode()
        // node.on('change:position', debounce(data => {
        //     console.log(data)
        //     if (!data.cell._parent) return
        //     let parent = data.cell._parent
        //     if (parent.data.rePosition === true) {
        //         let parentSize = parent.size()
        //         let parentPosition = parent.position()
        //         parent.children.sort((a, b) => {
        //             let aY = a.position().y
        //             let bY = b.position().y
        //             return aY - bY
        //         }).forEach((child, index) => {
        //             let childSize = child.size()
        //             let childX = parentPosition.x + (parentSize.width - childSize.width) / 2
        //             let childYPer = (parentSize.height - (childSize.height * parent._children.length)) / (parent._children.length + 1)
        //             child.position(childX, parentPosition.y + (childYPer + childSize.height) * index + childYPer)
        //         })
        //     }
        // }, 500))
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
