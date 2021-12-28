<template>
    <el-row type="flex" class="menu-container">
        <el-tooltip v-for="(item,index) in optionList" :key="index" :content="item.label">
            <div class="menu-item" @click="handleClick(item.name)">
                <i :class="item.icon" />
            </div>
        </el-tooltip>
    </el-row>
</template>

<script>
export default {
    name: "",
    props: {
        addAction: {},
        addGroup: {},
        undo: {},
        redo: {},
        copy: {},
        paste: {},
        zoomin: {},
        zoomout: {},
    },
    data() {
        return {
            optionList: [
                { name: "addAction", label: "添加任务", icon: "el-icon-plus" },
                { name: "addGroup", label: "添加任务组", icon: "el-icon-folder-add" },
                { name: "undo", label: "撤销", icon: "el-icon-refresh-left" },
                { name: "redo", label: "重做", icon: "el-icon-refresh-right" },
                { name: "copy", label: "复制", icon: "el-icon-copy-document" },
                { name: "paste", label: "粘贴", icon: "el-icon-document-copy" },
                { name: "zoomin", label: "放大", icon: "el-icon-zoom-in" },
                { name: "zoomout", label: "缩小", icon: "el-icon-zoom-out" },
            ]
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    mounted(){
        this.optionList = this.optionList.filter((item,index)=>{
            let key = item.name
            if(this[key] === false) return false
            return true
        })
    },
    methods: {
        handleClick(type){
            this.$emit("action", type)
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="scss" scoped>
.menu-container {
    width: 100%;
    background-color: #f5f5f5;
    position: relative;
    z-index: 2;
    font-size: 16px;
    padding: 4px;
    box-sizing: border-box;
    .menu-item {
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        &:hover {
            background-color: #e0e0e0;
            font-weight: bold;
        }
    }
}
</style>