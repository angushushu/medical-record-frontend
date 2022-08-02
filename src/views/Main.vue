<template>
<div class="container">
    
    <div style="max-width:59rem !important; margin-left:auto !important; margin-right:auto !important;">
        <div class="title" style="margin-top: 3rem">
            <h1>病 案 管 理 页</h1>
        </div>
        <el-row>
            <el-table :data="filterTableData" style="width: 100%">
                <!-- <el-table-column label="org_code" prop="org_code" />
                <el-table-column label="org_name" prop="org_name" /> -->
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="年龄" prop="age" />
                <el-table-column label="性别" prop="gender" />
                <!-- <el-table-column label="入院" prop="admit_time" />
                <el-table-column label="出院" prop="release_time" /> -->
                <el-table-column label="id" prop="id" />
                <el-table-column align="right">
                <template #header>
                    <el-input v-model="query" size="small" placeholder="检索" @change="updateData"/>
                </template>
                <template #default="scope">
                    <el-button size="small" style="margin:0" @click="handleSettle(scope.$index, scope.row)"
                    >导出</el-button>
                    <el-button size="small" style="margin:0" @click="handleEdit(scope.$index, scope.row)"
                    >查看</el-button
                    >
                    <el-button
                    class="cancel"
                    size="small"
                    type="danger"
                    style="margin:0"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
                </el-table-column>
            </el-table>        
        </el-row>
        <el-row justify="end" style="width:100%">
            <el-button class="add-homepage" @click="handleAdd">+ 病案</el-button>
        </el-row>
        <el-row justify="center" style="margin-top: 1rem !important;">
            <el-pagination
            hide-on-single-page
            :page-size="10"
            :hide-on-single-page=false
            layout="prev, pager, next"
            v-model:current-page="current_page"
            @current-change="updateData()"
            :total="total_count" />
        </el-row>
    </div>
    
</div>


</template>

<script lang="ts" setup>
// 姓名，年龄，性别，出入院日期
import axios from 'axios'
import { computed, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// let total_count = 1
interface Homepage {
    name: string
    age: string
    gender: string
    admit_time: string
    release_time: string

    // org_code: string
    // org_name: string
    id: string
}
const router = useRouter()
const total_count = ref(1)
const current_page = ref(1)
const tableData: Homepage[] = reactive([])
const query = ref('')
const filterTableData = computed(() => {
        // updateData()
        return tableData.filter(
            (data) =>
            !query.value ||
            data.name.toLowerCase().includes(query.value.toLowerCase())
        )
    })
onMounted(()=>{document.title = '病案管理页'})
const updateData = onMounted(async ()=>{
    console.log('current_page', current_page.value)
    await axios
        .get('/api/v1/get-homepages/',{params:{page:current_page.value, query:query.value}})
        .then(response=>{
            tableData.length = 0 // 清空
            response.data.homepages.forEach(e=>{
                // 针对空变量写空 （仅测试）
                if(e.age === "请先输入其他信息")
                    e.age = ''
                tableData.push(e)
            })
            total_count.value = response.data.total_count
            console.log(response.data.total_count)
            console.log(tableData)
        })
        .catch(error=>{
            console.log(error)
        })
})
// onMounted(updateData)
const handleSettle  = (index: number, row: Homepage) => {
    console.log(row.id)
    router.push('/new-settle/'+row.id)
}
const handleEdit = (index: number, row: Homepage) => {
    console.log(index, row)
    router.push('/homepage/'+row.id)
}
const handleDelete = async (index: number, row: Homepage) => {
    console.log(row.id)
    await axios
        .get('/api/v1/del-homepage/',{params:{id:row.id}})
        .then(response=>{ // 可以改一下
            console.log(response)
            updateData()
        })
        .catch(error=>{
            console.log(error)
        })
}
const handleAdd = () => {
    router.push('/homepage')
}

</script>

<style>
.add-homepage {
    margin-right: 12px !important;
    margin-top: 12px !important;
}
.el-pager li.is-active {
    color: rgb(255, 255, 255) !important;
    background-color: rgb(0, 133, 133) !important;
    border: 5px solid rgb(255, 255, 255) !important;
}
.el-pager li:hover {
    color: rgb(0, 133, 133);
}
</style>