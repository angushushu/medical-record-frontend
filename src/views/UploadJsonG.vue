<template>
    <div class="container">
        <div style="max-width:59rem !important; margin-left:10% !important; margin-right:auto !important;">
            <el-row justify="center">
                <div class="title" style="margin: 3rem 0">
                    <h1>JSON {{type_name.split('').join(' ')}} 标 准 上 传</h1>
                </div>
            </el-row>
            <el-row justify="center">
                <el-upload
                ref="upload"
                action="http://127.0.0.1:8000/api/v1/upload-std/json-g/"
                accept=".json"
                :data={type:type}
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="submitDone"
                :auto-upload="false"
                style="width:30rem !important"
                >
                    <template #trigger>
                    <el-button type="primary">选择</el-button>
                    </template>
                    <el-button class="ml-3" type="success" @click="submitUpload">
                    上传
                    </el-button>
                    <template #tip>
                    <div class="el-upload__tip text-red" style="margin-top:.7rem">
                        仅限
                        <el-tooltip
                        class="box-item"
                        effect="light"
                        placement="bottom">
                            <template #content>点击下载json格式标准</template>
                            <el-link :href="''+proxy.$api+'upload-std/g-json-example'" rel="external nofollow">.json</el-link>
                        </el-tooltip>
                        文件
                    </div>
                    </template>
                </el-upload>
            </el-row>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { useRoute } from 'vue-router'
import axios from 'axios'

const router = useRoute()
// const PARENT_PROVIDE = 'parentProvide'
const upload = ref<UploadInstance>()
const emit = defineEmits(['list-change'])
const {proxy} = getCurrentInstance()
const type = router.params.type
const type_name = ref('')

const getTypeName = async()=>{
    await axios.get('/api/v1/get-type-name',{params:{type:type}})
        .then(response=>{
            console.log('type_name:',response.data)
            type_name.value = response.data
        })
        .catch(error=>{
            console.log(error)
        })
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
//   instance.parent.methods.updateData()
}

const submitDone = ()=>{
    emit('list-change','111')
}
onMounted(getTypeName)
</script>

<style>
.el-upload {
    display: inline !important;
    margin-right: 1rem !important;
}
</style>