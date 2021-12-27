<template>
    <div class="container">
        <div id="canvas" class="canvas" :style="canvasStyle"></div>
    </div>
</template>

<script>
import { Graph, Node, Edge, Shape, Addon } from '@antv/x6'
import '@antv/x6-vue-shape'

export default {
    name: "Cprocess",
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
            default: () => {
                components: { }
            }
        }
    },
    data() {
        return {
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
                this.setData(val)
            }
        }
    },
    mounted() {
        this.registCpt()
        this.init()
    },
    methods: {
        registCpt() {
            if (!this.option.components) return
            Object.keys(this.option.components).forEach((key, index) => {
                let cpt = this.option.components[key]
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
            // 初始化画布
            const graph = new Graph({
                container: document.getElementById('canvas'),
                async: true,
                interacting: true,
                sorting: 'approx',
                grid: true,
                translating: {
                    restrict: true,
                },
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
            this.graph = graph

            graph.on('node:collapse', ({ node, vm }) => {
                vm.collapsed = true
            })
        },
        setData(data) {
            if (!this.graph || !data) return
            this.graph.fromJSON(data)
        },
        export() {
            console.log(JSON.stringify(this.graph.toJSON()))
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>
