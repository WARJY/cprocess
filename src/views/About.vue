<template>
    <div class="container">
        <cprocess ref="cprocess" width="100%" height="800px" :data="data" :option="option" />
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
            option: {
                menu: {
                    addAction: false,
                },
            }
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    mounted() {
        // this.initBatch()
    },
    methods: {
        handleExport() {
            this.$refs.cprocess.export()
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