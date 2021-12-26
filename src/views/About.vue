<template>
    <div class="container">
        <button @click="addItem">addItem</button>
        <button @click="addGroup">addGroup</button>
        <div id="canvas" class="canvas"></div>
    </div>
</template>

<script>
import { Graph, Node, Edge, Shape, Addon } from '@antv/x6'
import { debounce } from 'lodash'
import data from './data.js'

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
    mounted() {
        this.initBatch()
    },
    methods: {
        init() {
            // 定义节点
            class TreeNode extends Node {
                collapsed = false

                postprocess() {
                    this.toggleCollapse(false)
                }

                isCollapsed() {
                    return this.collapsed
                }

                toggleButtonVisibility(visible) {
                    this.attr('buttonGroup', {
                        display: visible ? 'block' : 'none',
                    })
                }

                toggleCollapse(collapsed) {
                    const target = collapsed == null ? !this.collapsed : collapsed
                    if (!target) {
                        this.attr('buttonSign', {
                            d: 'M 1 5 9 5 M 5 1 5 9',
                            strokeWidth: 1.6,
                        })
                    } else {
                        this.attr('buttonSign', {
                            d: 'M 2 5 8 5',
                            strokeWidth: 1.8,
                        })
                    }
                    this.collapsed = target
                }
            }

            TreeNode.config({
                zIndex: 2,
                markup: [
                    {
                        tagName: 'g',
                        selector: 'buttonGroup',
                        children: [
                            {
                                tagName: 'rect',
                                selector: 'button',
                                attrs: {
                                    'pointer-events': 'visiblePainted',
                                },
                            },
                            {
                                tagName: 'path',
                                selector: 'buttonSign',
                                attrs: {
                                    fill: 'none',
                                    'pointer-events': 'none',
                                },
                            },
                        ],
                    },
                    {
                        tagName: 'rect',
                        selector: 'body',
                    },
                    {
                        tagName: 'text',
                        selector: 'label',
                    },
                ],
                attrs: {
                    body: {
                        refWidth: '100%',
                        refHeight: '100%',
                        strokeWidth: 1,
                        fill: '#EFF4FF',
                        stroke: '#5F95FF',
                    },
                    label: {
                        textWrap: {
                            ellipsis: true,
                            width: -10,
                        },
                        textAnchor: 'middle',
                        textVerticalAnchor: 'middle',
                        refX: '50%',
                        refY: '50%',
                        fontSize: 12,
                    },
                    buttonGroup: {
                        refX: '100%',
                        refY: '50%',
                    },
                    button: {
                        fill: '#5F95FF',
                        stroke: 'none',
                        x: -10,
                        y: -10,
                        height: 20,
                        width: 30,
                        rx: 10,
                        ry: 10,
                        cursor: 'pointer',
                        event: 'node:collapse',
                    },
                    buttonSign: {
                        refX: 5,
                        refY: -5,
                        stroke: '#FFFFFF',
                        strokeWidth: 1.6,
                    },
                }
            })

            // 定义边
            class TreeEdge extends Shape.Edge {
                isHidden() {
                    const node = this.getTargetNode()
                    return !node || !node.isVisible()
                }
            }

            TreeEdge.config({
                zIndex: 1,
                attrs: {
                    line: {
                        stroke: '#A2B1C3',
                        strokeWidth: 1,
                        targetMarker: {
                            name: 'block',
                            args: { size: 6 }
                        },
                    },
                }
            })

            // 注册
            Node.registry.register('tree-node', TreeNode, true)
            Edge.registry.register('tree-edge', TreeEdge, true)

            // 初始化画布
            const graph = new Graph({
                container: document.getElementById('canvas'),
                async: true,
                scroller: true,
                interacting: true,
                sorting: 'approx',
                selecting: {
                    enabled: true,
                    rubberband: true,
                    showNodeSelectionBox: true,
                    strict: true
                },
                connecting: {
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
                },
                history: {
                    enabled: true,
                },
            })

            graph.on('node:collapse', ({ node }) => {
                node.toggleCollapse()
                const collapsed = node.isCollapsed()
                const run = (pre) => {
                    const succ = graph.getSuccessors(pre, { distance: 1 })
                    if (succ) {
                        succ.forEach((node) => {
                            node.toggleVisible(!collapsed)
                            if (!node.isCollapsed()) {
                                run(node)
                            }
                        })
                    }
                }
                run(node)
            })
            graph.on('cell:selected', (args) => {
            })

            const start = new Date().getTime()
            const nodes = data.nodes.map(({ leaf, ...metadata }) => {
                const node = new TreeNode(metadata)
                if (leaf) {
                    node.toggleButtonVisibility(leaf === false)
                }
                return node
            })
            const edges = data.edges.map(
                (edge) =>
                    new TreeEdge({
                        source: edge.source,
                        target: edge.target,
                    }),
            )

            graph.resetCells([...nodes, ...edges])

            graph.unfreeze({
                progress({ done }) {
                    if (done) {
                        const time = new Date().getTime() - start
                        console.log(time)
                        graph.unfreeze({
                            batchSize: 50,
                        })
                        graph.zoomToFit({ padding: 24 })
                    }
                },
            })
        },
        initBatch() {
            // 初始化画布
            const graph = new Graph({
                container: document.getElementById('canvas'),
                async: true,
                scroller: true,
                interacting: true,
                sorting: 'approx',
                selecting: {
                    enabled: true,
                    rubberband: true,
                    showNodeSelectionBox: true,
                    strict: true
                },
                connecting: {
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
                resizing: {
                    enabled: true,
                },
            })
            graph.on('node:change:position', debounce(data => {
                if (!data.node._parent) return
                console.log(data)
                let parent = data.node._parent
                if (parent.data.rePosition === true) {
                    let parentSize = parent.size()
                    let parentPosition = parent.position()
                    parent._children.sort((a, b) => {
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
            }, 500))
            this.graph = graph

            const parent = graph.addNode({
                x: 80,
                y: 40,
                width: 320,
                height: 300,
                zIndex: 1,
                data: {
                    parent: true,
                    rePosition: true
                }
            })

            new Array(3).fill(0).forEach((item, index) => {
                const child = graph.addNode({
                    x: 120,
                    y: 80 * (index + 1),
                    width: 220,
                    height: 60,
                    zIndex: 10,
                    label: `Child\n(${index})`,
                    attrs: {
                        body: {
                            fill: 'green',
                        },
                        label: {
                            fill: '#fff',
                        },
                    }
                })
                parent.addChild(child)
            })

        },
        addItem() {
            const child = this.graph.addNode({
                x: 120,
                y: 80,
                width: 120,
                height: 60,
                zIndex: 10,
                label: 'Child\n(embedded)',
                attrs: {
                    body: {
                        fill: 'green',
                    },
                    label: {
                        fill: '#fff',
                    },
                },
            })
        },
        addGroup() {
            const parent = this.graph.addNode({
                x: 80,
                y: 40,
                width: 320,
                height: 240,
                zIndex: 1,
                label: 'Parent',
                data: {
                    parent: true
                }
            })
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="scss">
.canvas {
    width: 100%;
    height: 800px;
    background-color: #eee;
}

.selected {
    background-color: #000;
}
</style>