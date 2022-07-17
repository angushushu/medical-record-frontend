<template>
    <div class="container">
        <!-- 修改科别 -->
        <el-dialog
        v-model="editDialogVisible"
        title="诊断详情"
        width="30%"
        center
        :destroy-on-close="true"
        :before-close="editDiagClose"
        >
            <el-form>
                <el-form-item label="代码" style="margin-bottom:.5rem !important;">
                    <el-input v-model="tempDgData.code" style="margin-left: 1rem !important"></el-input>
                </el-form-item>
                <el-form-item label="名称" style="margin-bottom:.5rem !important">
                    <el-input v-model="tempDgData.label"></el-input>
                </el-form-item>
                <el-form-item label="描述" style="margin-bottom:.5rem !important">
                    <el-input v-model="tempDgData.description" :autosize="{ minRows: 3, maxRows:6 }" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDiagClose">取消</el-button>
                    <el-button type="primary" @click="editDg" v-loading.fullscreen.lock="loading">
                        修改
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加诊断 -->
        <el-dialog
        v-model="addDialogVisible"
        title="添加诊断"
        width="30%"
        center
        :destroy-on-close="true"
        :before-close="addDiagClose"
        >
            <el-form>
                <el-form-item label="值" style="margin-bottom:.5rem !important;">
                    <el-input v-model="tempDgData.code" style="margin-left: 1rem !important"></el-input>
                </el-form-item>
                <el-form-item label="名称" style="margin-bottom:.5rem !important">
                    <el-input v-model="tempDgData.label"></el-input>
                </el-form-item>
                <el-form-item label="描述" style="margin-bottom:.5rem !important">
                    <el-input v-model="tempDgData.description" :autosize="{ minRows: 3, maxRows:6 }" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addDiagClose">取消</el-button>
                    <el-button type="primary" @click="addDg" v-loading.fullscreen.lock="loading">
                        添加
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-row justify="space-between">
            <span style="margin-top:1rem">
                <el-button class="rename-dgstd" @click="rename()">{{name}}</el-button>
            </span>
            <span>
                <el-button class="add-dg" @click="append(data)">添加诊断</el-button>
                <el-button class="add-dg" @click="applyDgStd(id)">应用</el-button>
                <el-button class="remove-dgstd" @click="removeDgStd(id)">删除</el-button>
            </span>
            
        </el-row>

        <el-tree
        :data="list"
        :props="defaultProps"
        v-model="list"
        node-key="code"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        v-loading.lock="loading"
        :height="200"
        >
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span style="padding-top:2px">
                        <el-tooltip
                            class="box-item"
                            effect="light"
                            placement="right"
                            :show-after="600"
                        >
                            <template #content>
                                代码: {{data.code}}<br>
                                拼音：{{data.pinyin}}<br>
                                描述: {{data.description}}
                            </template>
                            <el-button class="check-node" @click="handleDgClick(data)">[{{data.code}}] {{ node.label }}</el-button>
                        </el-tooltip>
                    </span>
                    <span>
                        <circle-close-filled
                        class="remove-node"
                        @click="removeNode(node,data)"
                        v-loading.fullscreen.lock="loading"
                        ></circle-close-filled>
                    </span>
                </span>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import axios from "axios"
import { onUnmounted, reactive, ref, watch } from "vue"
import { onMounted } from "vue-demi"
import { useRoute } from "vue-router"
import { CirclePlusFilled, CircleCloseFilled } from "@element-plus/icons-vue"
import { throwError } from 'element-plus/lib/utils'

const router = useRoute()
const route = useRoute()
let list = ref([])
const loading = ref(false)

let editingDgData = ref(null)
let tempDgData = ref(null)
// let appendData = ref(null)

let id = ref(router.params.id)
let name = ref('')
const emit = defineEmits(['list-change'])
let editDialogVisible = ref(false)
let addDialogVisible = ref(false)

const handleNodeClick = () => {
  console.log('clicked node')
    // centerDialogVisible = ref(true)
}
const handleDgClick = (data)=>{
    tempDgData.value = Object.assign({},data)
    editingDgData.value = data
    
    console.log('tempDgData')
    console.log(tempDgData)
    editDialogVisible.value = true
}
const updateData = async ()=>{
    if(router.path==='/edit-standards/upload-json-sp') // 不知道为啥路由变了还会运行
        return
    id.value = router.params.id
    console.log(router.path)
    console.log('这里是'+id.value)
    loading.value = true
    await axios
        .get('/api/v1/get-dgstd/',{params:{id:id.value}})
        .then(response=>{
                console.log('response:',response)
                name.value = response.data.dgstd.name
                list.value.length=0
                response.data.dgstd.diag.forEach(dg=>{
                    list.value.push(dg)
                })
                loading.value = false
        })
        .catch(error=>{
            console.log(error)
            loading.value = false
        })
}
const defaultProps = {
    label: 'label',
}
const append = (data) => {
    tempDgData.value = {code:'',label:'',description:''}
    addDialogVisible.value = true
    console.log('tempDgData:',tempDgData)
    // appendData = data
    // console.log('appendData:',appendData)
}
const rename = async ()=>{
    await ElMessageBox.prompt('请输入标准新名称', '重命名', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputErrorMessage: '你有问题啊',
        inputValue: name.value,
    })
    .then(({ value }) => {
        ElMessage({
            type: 'success',
            message: `重命名为:${value}`,
        })
        // console.log('现在的名字：',name.value)
        name.value = value
        console.log('现在的名字：',name.value)
        updateDgs()
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '动作已取消',
        })
    })
}
const updateDgs = async () => {
    console.log('when updating, name:',name.value)
    loading.value = true
    await axios.post('api/v1/update-standard/dgstd/',{'id':id.value,'name':name.value,'diag':list.value})
        .then(response=>{
            console.log('submitted and got response:')
            console.log(response)
            emit('list-change','stay')
            loading.value = false
        })
        .catch(error=>{
            console.log(error)
            loading.value = false
        })
}
const removeNode = async (node, data) => {
    loading.value = true
    node.remove()
    console.log('new list:')
    console.log(list)
    await updateDgs()
}
const applyDgStd = async(id) => {
    console.log('applying '+id)
    await ElMessageBox.confirm(
        '这将改变病案首页的科别标准，你确定吗？',
        '警告！',
        {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        }
    ).then(() => {
        loading.value = true
        axios.post('api/v1/set-standard/dgstd/',{id:id})
            .then(response=>{
                console.log(response)
                emit('list-change','stay')
            })
            .catch(error=>{
                console.log(error)
            })
        loading.value = false
        ElMessage({
            type: 'success',
            message: '标准更改成功',
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '动作已取消',
        })
    })
    
}
const removeDgStd = async (id) => {
    console.log('removing '+id)
    await axios.post('api/v1/remove-dgstd',{id:id})
        .then(response=>{
            console.log(response)
            emit('list-change','111')
        })
        .catch(error=>{
            console.log(error)
        })
}

const addDiagClose = ()=>{
    addDialogVisible.value = false
    // editingDgData.value = null
    console.log('addDiagClose()')
    console.log(addDialogVisible)
}
const addDg = async ()=>{
    console.log('addDg()')
    await ElMessageBox.confirm(
        '这样做将增加一个诊断，你确定吗',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        console.log('确认了')
        // 检查重复code
        list.value.forEach(dg => {
            if(dg.code==tempDgData.value.code){
                ElMessage({
                    type: 'error',
                    message: '代码已存在',
                })
                throw "code exist"
            }
        });
        const newChild = { 
            code: tempDgData.value.code, 
            label: tempDgData.value.label, 
            description: tempDgData.value.description, 
            // children: [] 
        }
        console.log('newChild:', newChild)
        // console.log('appendData:',appendData)
        // if(!appendData){
        list.value.push(newChild)
        console.log('list',list)
        // } else {
        //     if(!appendData.children) {
        //         appendData.children = []
        //     }
        //     console.log('tempDgData:',tempDgData)
        //     appendData.children.push(newChild)
        // }
        // console.log('pushed appendData:', appendData)
        list.value = [...list.value]
        console.log('list:', list.value)
        ElMessage({
            type: 'success',
            message: '修改成功',
        })
        updateDgs()
        addDiagClose()
    })
    .catch(() => {
        console.log('取消了')
        ElMessage({
            type: 'info',
            message: '动作已取消',
        })
    })
}
const editDiagClose = ()=>{
    editDialogVisible.value = false
    // editingDgData.value = null
    console.log('editDiagClose()')
    console.log(editDialogVisible)
}
const editDg = async ()=>{
    await ElMessageBox.confirm(
        '这样做将改变标准内容，你确定吗',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        console.log('确认了')
        editingDgData.value.code = tempDgData.value.code // 检查code是否重复？
        editingDgData.value.label = tempDgData.value.label
        editingDgData.value.description = tempDgData.value.description
        console.log('list')
        console.log(list)
        ElMessage({
            type: 'success',
            message: '修改成功',
        })
        updateDgs()
        editDiagClose()
    })
    .catch(() => {
        console.log('取消了')
        ElMessage({
            type: 'info',
            message: '已取消',
        })
    })
}
// reactive(()=>updateData())
watch(
    ()=>route.path,
    (current, previous)=>{
        console.log(previous+'->'+current)
        updateData()
    }
)
onMounted(updateData)
</script>

<style>
.container {
    padding-left: 5rem;
    padding-right: 5rem;
}
.el-button.remove-dgstd {
    margin: 1rem 0 1rem 1rem;
    border: 1px solid rgb(219, 219, 219) !important;
    background-color: rgb(219, 219, 219) !important;
    /* border-radius: 1rem !important; */
}
.el-button.remove-dgstd:hover {
    color: rgb(255, 255, 255) !important;
    border: 1px solid rgb(201, 45, 45) !important;
    background-color: rgb(201, 45, 45) !important;
}
.el-button.add-sp1 {
    margin: 1rem 0 1rem 1rem;
    /* border-radius: 1rem !important; */
}
.custom-tree-node {
    /* height: 80%; */
    width:100%;
    display:flex;
    justify-content:space-between;
}
.add-node {
    width: 1em;
    margin-right: 8px;
    padding-top:9px;
    color: rgb(197, 197, 197) !important;
}
.add-node:hover {
    color: rgb(100, 100, 100) !important;
}
.remove-node {
    width: 1em;
    margin-right: 8px;
    padding-top:9px;
    color: rgb(197, 197, 197) !important;
}
.remove-node:hover {
    color: rgb(201, 45, 45) !important;
}
.rename-dgstd {
    font-size: 150%;
    font-weight: bold;
    padding-left: 0%;
    border: 0px !important;
    background-color: transparent !important;
}
.rename-dgstd:hover {
    font-weight: bold;
    color: rgb(0, 133, 133) !important;
    padding-left: 0%;
    border: 0px !important;
    background-color: transparent !important;
}
.check-node {
    border: 0ch !important;
    background-color: transparent !important;
}
.check-node:hover {
    border: 0ch !important;
    background-color: transparent !important;
    color: rgb(0, 133, 133) !important;
    font-weight: bold;
}
.el-dialog--center .el-dialog__body {
    padding: 0rem 1rem 1rem 1rem !important;
}
.el-textarea__inner {
    top:5px !important;
}
</style>