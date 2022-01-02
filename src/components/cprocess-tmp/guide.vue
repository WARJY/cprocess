<template>
    <el-dialog title="使用说明" append-to-body :visible.sync="guideDialogVisible" width="800px">
        <div class="process-guide-container">
            <el-row type="flex">
                <el-steps
                    class="guide-step"
                    direction="vertical"
                    process-status="process"
                    finish-status="process"
                    :active="currentStep"
                >
                    <el-step
                        v-for="(item,index) in guideList"
                        :key="index"
                        :title="item.label"
                        @click.native="handleStep(index)"
                    ></el-step>
                </el-steps>
                <div class="guide-content">
                    <div v-for="(item,index) in guideList" :key="index">
                        <img v-if="currentStep===index" class="gif" :src="item.src" />
                    </div>
                </div>
            </el-row>
            <el-row type="flex" class="guide-option">
                <div style="flex:1">
                    <el-checkbox v-model="noMore" @change="handleNomore"></el-checkbox>
                    <span class="no-more">下次不再展示导航</span>
                </div>
                <el-button type="warning" size="medium" @click="guideDialogVisible=false">关闭</el-button>
                <el-button type="primary" size="medium" @click="handleForward">上一条</el-button>
                <el-button type="primary" size="medium" @click="handleNext">下一条</el-button>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
import storage from 'cutil/src/storage'
import canvas from '@/assets/guide/canvas.gif'
import node from '@/assets/guide/node.gif'
import group from '@/assets/guide/group.gif'
import action from '@/assets/guide/action.gif'
import run from '@/assets/guide/run.gif'
import quick from '@/assets/guide/quick.gif'

storage.baseKey = "svc_frontend_"

export default {
    name: "",
    data() {
        return {
            guideDialogVisible: false,
            currentStep: 0,
            guideList: [
                { label: "操作画布", src: canvas },
                { label: "操作节点", src: node },
                { label: "创建批次", src: group },
                { label: "创建任务", src: action },
                { label: "并行串行", src: run },
                { label: "快捷操作", src: quick },
            ],
            noMore: false
            /* DATA APPEND FLAG, dont del this line */
        }
    },
    computed: {
        /* COMPUTED APPEND FLAG, dont del this line */
    },
    mounted(){
        let guided = storage.getStorage("guided")
        if(!guided) this.guideDialogVisible = true
    },
    methods: {
        toggle() {
            this.guideDialogVisible = !this.guideDialogVisible
        },
        handleStep(index) {
            this.currentStep = index
        },
        handleNext() {
            if (this.currentStep < 5) this.currentStep += 1
        },
        handleForward(){
            if (this.currentStep > 0) this.currentStep -= 1
        },
        handleNomore(value){
            storage.setStorage("guided", value, 1000000)
        }
        /* METHOD APPEND FLAG, dont del this line */
    },
    /* OPTION APPEND FLAG, dont del this line */
}
</script>

<style lang="scss" scoped>
.process-guide-container {
    .guide-step {
        width: 130px;
    }
    .guide-content {
        flex: 1;
        background-color: #eee;
        height: 500px;
        .gif {
            width: 100%;
            height: 100%;
        }
    }
    .guide-option {
        margin-top: 20px;
        .no-more {
            margin-left: 8px;
        }
    }
}
</style>

<style lang="scss">
.process-guide-container {
    .el-step {
        cursor: pointer;
    }
    .el-step__main {
        padding-bottom: 10px;
    }
}
</style>