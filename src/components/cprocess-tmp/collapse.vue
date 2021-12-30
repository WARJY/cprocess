<template>
    <div class="collapse-container" @click.prevent="handleCollapse">
        <span v-if="collapsed">+</span>
        <span v-else>-</span>
    </div>
</template>

<script>
export default {
    name: "Collapse",
    props: {
        collapsed: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    methods: {
        handleCollapse(e){
            this.$emit("collapse")
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="stylus" scoped>
.collapse-container{
    width: 16px;
    height: 16px;
    line-height: 16px;
    border: solid 1px #999;
    border-radius: 2px;
    color: #000;
    background-color: #ccc;
    cursor: pointer;
    font-size: 16px;
}
</style>