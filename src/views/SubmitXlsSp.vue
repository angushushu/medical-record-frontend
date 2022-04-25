<template>
    <div class="container">
        <div style="max-width:59rem !important; margin-left:10% !important; margin-right:auto !important;">
            <el-row justify="center">
                <div class="title" style="margin: 3rem 0">
                    <h1>XLS 标 准 上 传</h1>
                </div>
            </el-row>
            <el-row justify="center">
                <el-upload
                ref="upload"
                action="http://127.0.0.1:8000/api/v1/upload-std/xls-sp/"
                accept=".json"
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
                        仅限xml文件，旧文件将被覆盖
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

// const PARENT_PROVIDE = 'parentProvide'
const upload = ref<UploadInstance>()
const emit = defineEmits(['list-change'])

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

</script>

<style>
.el-upload {
    display: inline !important;
    margin-right: 1rem !important;
}
</style>