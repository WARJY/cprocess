<template>
    <div class="container">
        <c-menu v-bind="menuOption" @action="handleAction" />
        <div id="cprocess-canvas" class="canvas" :style="canvasStyle"></div>
    </div>
</template>

<script>
import '@antv/x6-vue-shape'
import CMenu from '../cprocess-tmp/menu.vue'
import Cgroup from '../cprocess-tmp/Cgroup.vue'
import Cchildren from '../cprocess-tmp/Cchildren.vue'
import { group, action, start, end } from '../cprocess-tmp/shape.js'
import { Graph, Shape } from '@antv/x6'
import { merge } from 'lodash'

let name = 1

export default {
    name: "Cprocess",
    components: {
        CMenu,
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
            nodeOption: {
                group: JSON.parse(JSON.stringify(group)),
                action: JSON.parse(JSON.stringify(action)),
                components: {
                    Cgroup,
                    Cchildren
                }
            },
            graphOption: {
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
                    global: true
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
                    highlight: true,
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
                    validateConnection: ({ sourceMagnet, sourceCell, targetMagnet, targetCell }) => {
                        let nodeType = targetCell.data?.type
                        let inEdges = this.graph.getConnectedEdges(targetCell, {
                            incoming: true
                        })
                        // 结束阶段只有一个前置节点
                        if (nodeType === "end" && inEdges.length > 0) return false

                        if (nodeType === "group") {
                            // 每个group只有一个前置节点
                            if (inEdges.length > 0) return false

                            // 并行的group中只能有一个出口
                            let inSource = this.graph.getPredecessors(sourceCell, {
                                distance: 1
                            })
                            if (inSource.length > 0) {
                                let colActions = this.graph.getSuccessors(inSource[0], {
                                    distance: 1
                                }).filter((item, index) => {
                                    return item.id !== sourceCell.id
                                })
                                let exit = false
                                colActions.forEach((col, index) => {
                                    let colSuccessors = this.graph.getSuccessors(col, {
                                        distance: 1
                                    })
                                    if (colSuccessors.length > 0) exit = true
                                })
                                if (exit === true) return false
                            }
                        }
                        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') return false
                        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') return false
                        return true
                    },
                },
                history: {
                    enabled: true,
                    beforeAddCommand(event, args) {
                        if (args.key === "tools") return false
                    },
                },
                embedding: {
                    enabled: true,
                    findParent({ node }) {
                        const bbox = node.getBBox()
                        if (node.data?.parent === true) return []
                        return this.getNodes()?.filter((node) => {
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
        },
        menuOption() {
            return this.option?.menu || {}
        }
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val, old) {
                if (!val) return
            }
        }
    },
    mounted() {
        this.initOption()
        this.registCpt()
        this.init()
        this.initPoint()
        this.initEvent()
        this.initKeyboard()
    },
    methods: {
        initOption() {
            merge(this.nodeOption, this.option?.node)
            merge(this.graphOption, this.option?.graph)

            this.nodeOption.group.x = 100
            this.nodeOption.group.y = 100
            this.nodeOption.action.x = 100
            this.nodeOption.action.y = 100
        },
        registCpt() {
            if (!this.nodeOption.components) return
            Object.keys(this.nodeOption.components).forEach((key, index) => {
                let cpt = this.nodeOption.components[key]
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
                ...this.graphOption,
                container: document.getElementById('cprocess-canvas'),
            })
            this.graph = graph
        },
        initPoint() {
            let { offsetWidth, offsetHeight } = document.getElementById("cprocess-canvas")
            this.startNode = this.graph.addNode({
                ...start,
                x: 20,
                y: offsetHeight / 2 - 50
            })
            this.endNode = this.graph.addNode({
                ...end,
                x: offsetWidth - 120,
                y: offsetHeight / 2 - 50
            })
        },
        initEvent() {
            this.graph.on('edge:selected', this.handleEdgeMmouseenter)
            this.graph.on('edge:unselected', this.handleEdgeMmouseLeave)
            this.graph.on('node:selected', this.handleNodeSelected)
            this.graph.on('node:unselected', this.handleNodeUnselected)

            this.graph.on('tool:addAction', this.handleToolAddAction)
            this.graph.on('tool:addGroupRow', this.handleToolAddGroupRow)
            this.graph.on('tool:addGroupCol', this.handleToolAddGroupCol)
            this.graph.on('tool:setAction', this.handleSetAction)
        },
        initKeyboard() {
            this.graph.bindKey('ctrl+c', this.handleCopy)
            this.graph.bindKey('ctrl+v', this.handlePaste)
            this.graph.bindKey('ctrl+z', this.handleUndo)
            this.graph.bindKey('ctrl+y', this.handleRedo)
            this.graph.bindKey('del', this.handleRemove)
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
            this.$emit("edge:selected", cell)
        },
        handleEdgeMmouseLeave({ cell }) {
            cell.removeTools()
            this.$emit("edge:unselected", cell)
        },
        handleNodeSelected({ cell }) {
            cell.addTools([{ name: "boundary" }])
            if (cell.data?.type !== "start" && cell.data?.type !== "end") {
                cell.addTools([
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
            }
            this.$emit("node:selected", cell)
        },
        handleNodeUnselected({ cell }) {
            cell.removeTools()
        },
        handleToolAddAction({ node }) {
            let action = this.handleAddAction(node)
            node.trigger("rePosition", { parent: node, child: action })
        },
        handleToolAddGroupRow({ node }) {
            let group = this.handleAddGroup()
            let groupX = 0
            let groupY = 0

            let nodePosition = node.position()
            groupX = nodePosition.x + 400
            groupY = nodePosition.y

            let edges = this.graph.getConnectedEdges(node).filter((item, index) => {
                return item.source.cell === node.id
            })
            if (edges.length > 0) {
                let edgeNodes = edges.map((item, index) => {
                    return this.graph.getCellById(item.target.cell)
                }).sort((a, b) => {
                    let aPosition = a.position()
                    let bPosition = b.position()
                    return aPosition.y - bPosition.y
                })
                let last = edgeNodes[edgeNodes.length - 1]
                groupY = last.position().y + 150
            }

            group.position(groupX, groupY)
            const edge = new Shape.Edge({
                source: { cell: node.id, port: 'out' },
                target: { cell: group.id, port: 'in' },
            })
            this.graph.addEdge(edge)
        },
        handleToolAddGroupCol({ node }) {
            let group = this.handleAddGroup()
            let groupX = 0
            let groupY = 0

            let nodePosition = node.position()
            groupX = nodePosition.x
            groupY = nodePosition.y + 150
            group.position(groupX, groupY)

            let edges = this.graph.getIncomingEdges(node)
            if (edges.length > 0) {
                let source = edges[0]
                let sourceNode = this.graph.getCellById(source.source.cell)
                let targetEdges = this.graph.getOutgoingEdges(sourceNode)
                let targetNodes = targetEdges.map((item, index) => {
                    return this.graph.getCellById(item.target.cell)
                }).sort((a, b) => {
                    let aPosition = a.position()
                    let bPosition = b.position()
                    return aPosition.y - bPosition.y
                })
                let last = targetNodes[targetNodes.length - 1]
                group.position(groupX, last.position().y + 150)

                const edge = new Shape.Edge({
                    source: { cell: sourceNode.id, port: 'out' },
                    target: { cell: group.id, port: 'in' },
                })
                this.graph.addEdge(edge)
            }
        },
        handleSetAction({ node }) {
            this.graph.select([node])
            this.$emit("tool:setAction", node)
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
            let template = JSON.parse(JSON.stringify(this.nodeOption.action))

            template.data.name = name
            name += 1

            let action = this.graph.addNode(template)
            if (target) action.addTo(target)
            this.$emit("addAction")
            return action
        },
        handleAddGroup() {
            let template = JSON.parse(JSON.stringify(this.nodeOption.group))
            let group = this.graph.addNode(template)
            this.$emit("addGroup")
            return group
        },
        handleUndo() {
            this.graph.undo()
        },
        handleRedo() {
            this.graph.redo()
            this.graph.cleanSelection()
        },
        handleCopy() {
            let cells = this.graph.getSelectedCells()
            cells = cells.filter((item, index) => {
                return item.data?.type !== "start" && item.data?.type !== "end"
            })

            let pasteTarget = ""
            let firstParent = cells[0]?.parent
            if (firstParent && firstParent !== null) {
                let every = cells.every((cell, index) => {
                    return cell.parent === firstParent
                })
                if (every) pasteTarget = firstParent
            }
            this.pasteTarget = pasteTarget

            this.graph.copy(cells)
        },
        handlePaste() {
            const cells = this.graph.paste()
            this.graph.select(cells)
            this.graph.cleanSelection()
            if (this.pasteTarget) {
                cells.forEach((cell, index) => {
                    this.pasteTarget.embed(cell)
                })
                this.pasteTarget.trigger("rePosition", { parent: this.pasteTarget, child: cells[0] })
            }
        },
        handleRemove() {
            let cells = this.graph.getSelectedCells()
            cells = cells.filter((item, index) => {
                return !["start", "end"].includes(item.data?.type)
            })
            this.graph.removeCells(cells)
        },
        handleZoomIn() {
            let zoom = this.graph.zoom()
            this.graph.zoomTo(zoom + 0.2)
        },
        handleZoomOut() {
            let zoom = this.graph.zoom()
            this.graph.zoomTo(zoom - 0.2)
        },
        validate() {
            let startNode = this.graph.getRootNodes().find((item, index) => {
                return item.data?.type === "start"
            })
            let endNode = this.graph.getLeafNodes().find((item, index) => {
                return item.data?.type === "end"
            })
            let flag = this.graph.isSuccessor(startNode, endNode, {
                deep: true
            })
            return flag
        },
        setData(cell, data) {
            cell.setData(data)
        },
        setJSONData(data) {
            if (!this.graph || !data) return
            this.graph.fromJSON(data)
        },
        export(array) {
            if (array) return this.format()
            return this.graph.toJSON()
        },
        format() {
            let startNode = this.graph.getRootNodes().find((item, index) => {
                return item.data?.type === "start"
            })

            let result = []
            let index = 1
            let successors = this.graph.getSuccessors(startNode, {
                distance: 1
            })
            while (successors.length > 0) {
                if (successors.length === 1 && successors[0].data?.type === "end") return
                result.push(successors)
                let next = successors.find((item, index) => {
                    return this.graph.getSuccessors(item, {
                        distance: 1
                    })?.length > 0
                })
                successors = this.graph.getSuccessors(next, {
                    distance: index
                })
                index += 1
            }
            return result
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>
