<template>
    <div class="container">
        <c-menu v-bind="option.menu" @action="handleAction" />
        <div id="cprocess-canvas" class="canvas" :style="canvasStyle"></div>
    </div>
</template>

<script>
import '@antv/x6-vue-shape'
import CMenu from './menu.vue'
import Cgroup from '../cprocess-tmp/Cgroup.vue'
import Cchildren from '../cprocess-tmp/Cchildren.vue'
import { group, action } from '../cprocess-tmp/shape.js'
import { Graph, Node, Edge, Shape, Addon } from '@antv/x6'
import { merge } from 'lodash'

let uid = 0

export default {
    name: "Cprocess",
    components: {
        CMenu,
        Cgroup,
        Cchildren
    },
    props: {
        type: {
            type: String,
            default: () => "nest"
        },
        width: {
            type: String,
            default: () => "100px"
        },
        height: {
            type: String,
            default: () => "100px"
        },
        data: {
            type: Object,
            default: () => { }
        },
        option: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            currentOption: {
                group: JSON.parse(JSON.stringify(group)),
                action: JSON.parse(JSON.stringify(action)),
                components: {
                    Cgroup,
                    Cchildren
                }
            }
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        canvasStyle() {
            return {
                width: this.width,
                height: this.height
            }
        }
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val, old) {
                if (!val) return
                // this.setData(val)
            }
        }
    },
    mounted() {
        this.initOption()
        this.registCpt()
        this.init()
        this.initEvent()
    },
    methods: {
        initOption() {
            merge(this.currentOption, this.option)
            let container = document.getElementById("cprocess-canvas")
            let { offsetWidth, offsetHeight } = container
            this.currentOption.group.x = offsetWidth / 2
            this.currentOption.group.y = offsetHeight / 2
            this.currentOption.action.x = offsetWidth / 2
            this.currentOption.action.y = offsetHeight / 2
        },
        registCpt() {
            if (!this.currentOption.components) return
            Object.keys(this.currentOption.components).forEach((key, index) => {
                let cpt = this.currentOption.components[key]
                let name = cpt.name
                Graph.registerVueComponent(
                    name,
                    {
                        template: `<${name}></${name}>`,
                        components: {
                            [name]: cpt,
                        },
                    },
                    true
                );
            })
        },
        init() {
            const graph = new Graph({
                container: document.getElementById('cprocess-canvas'),
                async: true,
                interacting: true,
                sorting: 'approx',
                panning: {
                    enabled: true,
                    eventTypes: ['rightMouseDown']
                },
                grid: {
                    size: 10,
                    visible: true,
                },
                keyboard: {
                    enabled: true,
                },
                clipboard: {
                    enabled: true,
                },
                resizing: {
                    enabled(node) {
                        return node?.data?.parent === true
                    }
                },
                mousewheel: {
                    enabled: true,
                    modifiers: ['ctrl', 'meta'],
                },
                translating: {
                    restrict: true,
                },
                selecting: {
                    enabled: true,
                    rubberband: true,
                    strict: true
                },
                connecting: {
                    snap: true,
                    allowBlank: false,
                    allowLoop: false,
                    allowNode: false,
                    anchor: 'orth',
                    connector: 'rounded',
                    connectionPoint: 'boundary',
                    router: {
                        name: 'metro',
                        args: {
                            offset: 24,
                            direction: 'H',
                        },
                    },
                    validateConnection({ sourceMagnet, targetMagnet, targetCell }) {
                        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') return false
                        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') return false
                        return true
                    },
                },
                history: {
                    enabled: true,
                },
                embedding: {
                    enabled: true,
                    findParent({ node }) {
                        const bbox = node.getBBox()
                        return this.getNodes().filter((node) => {
                            // 只有 data.parent 为 true 的节点才是父节点
                            const data = node.getData()
                            if (data && data.parent) {
                                const targetBBox = node.getBBox()
                                return bbox.isIntersectWithRect(targetBBox)
                            }
                            return false
                        })
                    }
                },
            })
            this.graph = graph
        },
        initEvent() {
            this.graph.on('edge:mouseenter', this.handleEdgeMmouseenter)
            this.graph.on('edge:mouseleave', this.handleEdgeMmouseLeave)
            this.graph.on('node:selected', this.handleNodeSelected)
            this.graph.on('node:unselected', this.handleNodeUnselected)
            this.graph.on('tool:addAction', this.handleToolAddAction)
        },
        handleEdgeMmouseenter({ cell }) {
            cell.addTools([
                {
                    name: 'source-arrowhead',
                },
                {
                    name: 'button-remove',
                },
                {
                    name: 'target-arrowhead',
                    args: {
                        attrs: {
                            fill: 'red',
                        },
                    },
                },
            ])
        },
        handleEdgeMmouseLeave({ cell }) {
            cell.removeTools()
        },
        handleNodeSelected({ cell }) {
            cell.addTools([
                { name: "boundary" },
                {
                    name: 'button-remove',
                    args: {
                        x: "100%",
                        offset: {
                            x: 10,
                            y: -10
                        }
                    },
                }
            ])
            this.$emit("node:selected", cell)
        },
        handleNodeUnselected({ cell }) {
            cell.removeTools()
        },
        handleToolAddAction({ node }) {
            let action = this.handleAddAction(node)
            node.trigger("rePosition", { parent: node, child: action })
        },
        handleAction(type) {
            if (type === "addAction") this.handleAddAction()
            if (type === "addGroup") this.handleAddGroup()
            if (type === "undo") this.handleUndo()
            if (type === "redo") this.handleRedo()
            if (type === "copy") this.handleCopy()
            if (type === "paste") this.handlePaste()
            if (type === "zoomin") this.handleZoomIn()
            if (type === "zoomout") this.handleZoomOut()
        },
        handleAddAction(target) {
            let template = JSON.parse(JSON.stringify(this.currentOption.action))
            let action = this.graph.addNode(template)
            if (target) action.addTo(target)
            this.$emit("addAction")
            return action
        },
        handleAddGroup() {
            let template = JSON.parse(JSON.stringify(this.currentOption.group))
            this.graph.addNode(template)
            this.$emit("addGroup")
        },
        handleUndo() {
            this.graph.undo()
        },
        handleRedo() {
            this.graph.redo()
        },
        handleCopy() {
            let cells = this.graph.getSelectedCells()
            this.graph.copy(cells)
        },
        handlePaste() {
            const cells = this.graph.paste()
            this.graph.cleanSelection()
            this.graph.select(cells)
        },
        handleZoomIn() {
            let zoom = this.graph.zoom()
            this.graph.zoomTo(zoom + 0.2)
        },
        handleZoomOut() {
            let zoom = this.graph.zoom()
            this.graph.zoomTo(zoom - 0.2)
        },
        setData(cell, data) {
            cell.setData(data)
        },
        setJSONData(data) {
            if (!this.graph || !data) return
            this.graph.fromJSON(data)
        },
        export() {
            return this.graph.toJSON()
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>
