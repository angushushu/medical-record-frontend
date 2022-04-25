<template>
    <el-container>
      <el-aside width="15rem" class="side">
          <el-scrollbar>
            <el-menu
                active-text-color="#84cece"
                background-color="#008585"
                text-color="#fff"
                default-active='/edit-standards/submit-specialties'
                :default-openeds="['1']"
                @select="menuSelect"
            >
                <el-sub-menu index="1" class="specialty">
                    <template #title class="specialty-title">科别</template>
                    <!-- <el-menu-item-group> -->
                        <el-sub-menu index="1-1" class="check">
                            <template #title>查看&修改</template>
                            <el-menu-item
                            v-for="spstd in spstd_list"
                            :key="spstd.id"
                            :index="'/edit-standards/specialties/'+spstd.id"
                            >
                                {{spstd.name+' ('+spstd.id+')'}}
                                <!-- <div v-html="spstd.name+' ('+spstd.id+')'"></div> -->
                            </el-menu-item>
                            
                        </el-sub-menu>
                        <el-menu-item index='/edit-standards/submit-specialties'>
                            上传json
                        </el-menu-item>
                        <el-menu-item index='' @click="newSpStd">
                            新建标准
                        </el-menu-item>
                            
                            <!-- <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item> -->
                        <!-- </el-sub-menu> -->
                        <!-- <el-sub-menu
                        index="1-1"
                        > -->
                        
                    <!-- </el-menu-item-group> -->
                </el-sub-menu>

                
            </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="main">
            <router-view
            @listChange="update"
            ></router-view>
          
      </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import axios from "axios"
import { h, provide, ref, render } from "vue"
import { onMounted, reactive, watch } from "vue-demi"
import { useRouter, useRoute } from "vue-router"


interface SpecialtyStd {
    name: string
}
let spstd_list:SpecialtyStd[] = reactive([])
const router = useRouter()
const route = useRoute()
const updateList = async ()=>{
    console.log('updateList')
    let applied_id = null
    await axios.get('/api/v1/get-standard/specialty')
        .then(response=>{
            console.log('appliedspstd:',response)
            applied_id = response.data.id
        })
        .catch(error=>{
            console.log(error)
        })
    await axios.get('/api/v1/get-spstds/')
        .then(response=>{
            spstd_list.length = 0
            console.log(response)
            response.data.spstd_list.forEach(l=>{
                if(applied_id&&l.id===applied_id)
                    l.name='🔶 '+l.name
                spstd_list.push(l)
            })
            console.log(spstd_list)
        })
        .catch(error=>{
            console.log(error)
        })
}
const newSpStd = async ()=>{
    await axios.post('api/v1/post-standard/specialty/',{form:{name:'test',specialty:[]}})
        .then(response=>{
            // spstd_list.length = 0
            
            console.log('response:',response)
            if(!response)
                return
            let spstd_data = response.data.spstd
            console.log('spstd_data:',spstd_data)
            let temp_id = spstd_data.id
            let temp_name = spstd_data.name
            console.log('temp_id:',temp_id)
            console.log('temp_name:',temp_name)
            spstd_list.push(spstd_data)
            router.push('/edit-standards/specialties/'+temp_id)
            // response.data.spstd_list.forEach(l=>{
            //     spstd_list.push(l)
            // })
        })
        .catch(error=>{
            console.log(error)
        })
}
const menuSelect = (val)=>{
    console.log('going to:',val)
    router.push(val)
}
const update = async (content)=>{
    spstd_list.length = 0
    console.log('content:')
    console.log(content)
    await updateList()
        .then(()=>{
            if(content!=='stay'){
                console.log('updateList finished, replacing route')
                router.replace({path: '/edit-standards/submit-specialties'})
            }
            // if(content==='stay'){
            //     console.log('updateList finished, stay where you are')
            // }else{
            //     console.log('updateList finished, replacing route')
            //     router.replace({path: '/edit-standards/submit-specialties'})
            // }
            console.log(spstd_list)
        })
    
}
// onMounted(updateList)
onMounted(()=>{
    document.title = '病案首页标准'
    updateList();
})
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
    background-color: white;
}
.main {
    box-shadow: 2px 0px 5px #dbdbdb inset;
    border-left: 0px solid #f5f7fa !important;
}
.el-menu {
    border-right: 0px;
    /* --el-menu-border-color: white; */
    height: 100%;
    /* color: #84cece; */
}

</style>