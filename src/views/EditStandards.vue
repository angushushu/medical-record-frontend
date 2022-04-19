<template>
    <el-container>
      <el-aside width="200px" class="side">
          <el-scrollbar>
            <el-menu
                default-active='/edit-standards/submit-specialties'
                :default-openeds="['1']"
                @select="menuSelect"
            >
                <el-sub-menu index="1">
                    <template #title>科别</template>
                    <el-menu-item-group>
                        <el-sub-menu
                    index="1-1"
                    >
                        <template #title>查看&修改</template>
                            <el-menu-item
                            v-for="spstd in spstd_list"
                            :key="spstd.name"
                            :index="'/edit-standards/specialties/'+spstd.name"
                            >
                            {{spstd.name}}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index='/edit-standards/submit-specialties'>
                            上传json
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                
            </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="main">
            <router-view
            @onSaveOk="paymentTest"
            ></router-view>
          
      </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import axios from "axios"
import { provide, ref } from "vue"
import { onMounted, reactive, watch } from "vue-demi"
import { useRouter, useRoute } from "vue-router"

interface SpecialtyStd {
    name: string
}
let spstd_list:SpecialtyStd[] = reactive([])
const router = useRouter()
const route = useRoute()
const updateData = async ()=>{
    console.log('updateData')
    await axios.get('/api/v1/get-spstds/')
        .then(response=>{
            spstd_list.length = 0
            console.log(response)
            response.data.spstd_list.forEach(l=>{
                spstd_list.push(l)
            })
            console.log(spstd_list)
        })
        .catch(error=>{
            console.log(error)
        })
}
const menuSelect = (val)=>{
    console.log(val)
    router.push(val)
        .then(()=>{
            console.log("let's update here")
            updateData()
        })
}

// const paymentDlg = ref(null)
const paymentTest = (content)=>{console.log(content)}
// const test = ()=>{
//     console.log('test')
// }

// const root = ref(null)
// const PARENT_PROVIDE = 'parentProvide'
// provide(PARENT_PROVIDE, root)
// provide(`${PARENT_PROVIDE}/test`, test)
onMounted(updateData)
</script>

<style>
.el-container {
    margin-bottom: 40px;
    height: 100%;
}
#app {
    height: 100%;
}
body, html {
    margin: 0px !important;
    height: 100% !important;
}
.side {
    background-color: aqua;
}
.main {
    background-color: aquamarine;
}
</style>