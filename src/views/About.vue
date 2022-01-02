<template>
    <div class="container">
        <button @click="handleExport">导出</button>
        <button @click="handleValidate">验证</button>
        <cprocess ref="cprocess" width="100%" height="800px" />
    </div>
</template>

<script>
import Cprocess from '@/components/cprocess/index.vue'

export default {
    name: "",
    components: {
        Cprocess
    },
    data() {
        return {
            data: {},
            option: {}
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    mounted() {
        // this.initBatch()
        this.setJSONData()
    },
    methods: {
        handleExport() {
            let data = this.$refs.cprocess.export(true)
            console.log(data)
        },
        setJSONData() {
            let data = {
                "cells": [
                    {
                        "position": {
                            "x": 230,
                            "y": 250
                        },
                        "size": {
                            "width": 280,
                            "height": 130
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "be17f946-98b0-404c-96c0-18241b25e2bb",
                        "zIndex": 1,
                        "data": {
                            "type": "group",
                            "parent": true,
                            "rePosition": true,
                            "reSize": true
                        },
                        "component": "Cgroup",
                        "portMarkup": [
                            {
                                "tagName": "circle",
                                "selector": "portBody",
                                "attrs": {
                                    "r": 4,
                                    "magnet": true,
                                    "stroke": "#31d0c6",
                                    "fill": "#fff",
                                    "strokeWidth": 2
                                }
                            }
                        ],
                        "ports": {
                            "groups": {
                                "in": {
                                    "position": {
                                        "name": "left"
                                    }
                                },
                                "out": {
                                    "position": {
                                        "name": "right"
                                    }
                                }
                            },
                            "items": [
                                {
                                    "id": "in",
                                    "group": "in"
                                },
                                {
                                    "id": "out",
                                    "group": "out"
                                }
                            ]
                        },
                        "children": [
                            "75b95f1a-4dae-4010-aa0a-4ca107e79b0e"
                        ]
                    },
                    {
                        "position": {
                            "x": 580,
                            "y": 260
                        },
                        "size": {
                            "width": 280,
                            "height": 130
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "329b6aef-c227-4683-a0f2-ec5fed759254",
                        "zIndex": 1,
                        "data": {
                            "type": "group",
                            "parent": true,
                            "rePosition": true,
                            "reSize": true
                        },
                        "component": "Cgroup",
                        "portMarkup": [
                            {
                                "tagName": "circle",
                                "selector": "portBody",
                                "attrs": {
                                    "r": 4,
                                    "magnet": true,
                                    "stroke": "#31d0c6",
                                    "fill": "#fff",
                                    "strokeWidth": 2
                                }
                            }
                        ],
                        "ports": {
                            "groups": {
                                "in": {
                                    "position": {
                                        "name": "left"
                                    }
                                },
                                "out": {
                                    "position": {
                                        "name": "right"
                                    }
                                }
                            },
                            "items": [
                                {
                                    "id": "in",
                                    "group": "in"
                                },
                                {
                                    "id": "out",
                                    "group": "out"
                                }
                            ]
                        },
                        "children": [
                            "9b02dd8a-4221-410b-88c8-e9a9130b175e"
                        ]
                    },
                    {
                        "position": {
                            "x": 20,
                            "y": 290
                        },
                        "size": {
                            "width": 100,
                            "height": 50
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "e49f00ef-b26b-46df-82f4-dd37f907fccd",
                        "zIndex": 10,
                        "component": "Cchildren",
                        "data": {
                            "type": "start",
                            "name": "开始"
                        },
                        "portMarkup": [
                            {
                                "tagName": "circle",
                                "selector": "portBody",
                                "attrs": {
                                    "r": 4,
                                    "magnet": true,
                                    "stroke": "#31d0c6",
                                    "fill": "#fff",
                                    "strokeWidth": 2
                                }
                            }
                        ],
                        "ports": {
                            "groups": {
                                "out": {
                                    "position": {
                                        "name": "right"
                                    }
                                }
                            },
                            "items": [
                                {
                                    "id": "out",
                                    "group": "out"
                                }
                            ]
                        }
                    },
                    {
                        "position": {
                            "x": 940,
                            "y": 290
                        },
                        "size": {
                            "width": 100,
                            "height": 50
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "d8727d1c-107f-4f0b-b717-b11bf1fa1583",
                        "zIndex": 10,
                        "component": "Cchildren",
                        "data": {
                            "type": "end",
                            "name": "结束"
                        },
                        "portMarkup": [
                            {
                                "tagName": "circle",
                                "selector": "portBody",
                                "attrs": {
                                    "r": 4,
                                    "magnet": true,
                                    "stroke": "#31d0c6",
                                    "fill": "#fff",
                                    "strokeWidth": 2
                                }
                            }
                        ],
                        "ports": {
                            "groups": {
                                "in": {
                                    "position": {
                                        "name": "left"
                                    }
                                }
                            },
                            "items": [
                                {
                                    "id": "in",
                                    "group": "in"
                                }
                            ]
                        }
                    },
                    {
                        "position": {
                            "x": 245,
                            "y": 290
                        },
                        "size": {
                            "width": 250,
                            "height": 50
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "75b95f1a-4dae-4010-aa0a-4ca107e79b0e",
                        "zIndex": 10,
                        "component": "Cchildren",
                        "parent": "be17f946-98b0-404c-96c0-18241b25e2bb",
                        "data": {
                            "type": "action",
                            "name": "1"
                        }
                    },
                    {
                        "position": {
                            "x": 595,
                            "y": 300
                        },
                        "size": {
                            "width": 250,
                            "height": 50
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "9b02dd8a-4221-410b-88c8-e9a9130b175e",
                        "zIndex": 10,
                        "component": "Cchildren",
                        "parent": "329b6aef-c227-4683-a0f2-ec5fed759254",
                        "data": {
                            "type": "action",
                            "name": "2"
                        }
                    },
                    {
                        "position": {
                            "x": 240,
                            "y": 470
                        },
                        "size": {
                            "width": 280,
                            "height": 130
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "b69c6316-f3bd-460a-9614-f006729397e9",
                        "data": {
                            "type": "group",
                            "parent": true,
                            "rePosition": true,
                            "reSize": true
                        },
                        "component": "Cgroup",
                        "portMarkup": [
                            {
                                "tagName": "circle",
                                "selector": "portBody",
                                "attrs": {
                                    "r": 4,
                                    "magnet": true,
                                    "stroke": "#31d0c6",
                                    "fill": "#fff",
                                    "strokeWidth": 2
                                }
                            }
                        ],
                        "ports": {
                            "groups": {
                                "in": {
                                    "position": {
                                        "name": "left"
                                    }
                                },
                                "out": {
                                    "position": {
                                        "name": "right"
                                    }
                                }
                            },
                            "items": [
                                {
                                    "id": "in",
                                    "group": "in"
                                },
                                {
                                    "id": "out",
                                    "group": "out"
                                }
                            ]
                        },
                        "children": [
                            "33ad91fa-b44a-4e0b-b7f5-bbe0d50a8dd1"
                        ],
                        "zIndex": 11
                    },
                    {
                        "position": {
                            "x": 255,
                            "y": 510
                        },
                        "size": {
                            "width": 250,
                            "height": 50
                        },
                        "view": "vue-shape-view",
                        "shape": "vue-shape",
                        "id": "33ad91fa-b44a-4e0b-b7f5-bbe0d50a8dd1",
                        "component": "Cchildren",
                        "parent": "b69c6316-f3bd-460a-9614-f006729397e9",
                        "zIndex": 12,
                        "data": {
                            "type": "action",
                            "name": "3"
                        }
                    },
                    {
                        "shape": "edge",
                        "id": "c58428a2-8558-4a6f-b7da-cb25dccb4712",
                        "source": {
                            "cell": "e49f00ef-b26b-46df-82f4-dd37f907fccd",
                            "port": "out"
                        },
                        "target": {
                            "cell": "be17f946-98b0-404c-96c0-18241b25e2bb",
                            "port": "in"
                        },
                        "zIndex": 13,
                    },
                    {
                        "shape": "edge",
                        "id": "f629b4ab-1dee-4984-be84-d19c93badee7",
                        "source": {
                            "cell": "be17f946-98b0-404c-96c0-18241b25e2bb",
                            "port": "out"
                        },
                        "target": {
                            "cell": "329b6aef-c227-4683-a0f2-ec5fed759254",
                            "port": "in"
                        },
                        "zIndex": 14
                    },
                    {
                        "shape": "edge",
                        "id": "76bfb9e3-a231-4456-b413-3695898dc328",
                        "source": {
                            "cell": "329b6aef-c227-4683-a0f2-ec5fed759254",
                            "port": "out"
                        },
                        "target": {
                            "cell": "d8727d1c-107f-4f0b-b717-b11bf1fa1583",
                            "port": "in"
                        },
                        "zIndex": 15
                    },
                    {
                        "shape": "edge",
                        "id": "39e4c043-709f-487a-aeeb-5122693a1407",
                        "source": {
                            "cell": "e49f00ef-b26b-46df-82f4-dd37f907fccd",
                            "port": "out"
                        },
                        "target": {
                            "cell": "b69c6316-f3bd-460a-9614-f006729397e9",
                            "port": "in"
                        },
                        "zIndex": 16
                    }
                ]
            }
            this.$refs.cprocess.setJSONData(data)
        },
        handleValidate(){
            this.$refs.cprocess.validate()
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