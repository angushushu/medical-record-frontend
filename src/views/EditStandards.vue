<template>
    <el-container>
      <el-aside width="15rem" class="side">
          <el-scrollbar>
            <el-menu
                active-text-color="#84cece"
                background-color="#008585"
                text-color="#fff"
                default-active='/edit-standards/upload-json-sp'
                :default-openeds="['1','1-2']"
                @select="menuSelect"
            >
                <el-sub-menu index="1" class="specialty">
                    <template #title class="specialty-title">科别</template>
                        <el-sub-menu index="1-1" class="check">
                            <template #title>查看&修改</template>
                            <el-menu-item
                            v-for="spstd in spstd_list"
                            :key="spstd.id"
                            :index="'/edit-standards/specialties/'+spstd.id"
                            >
                                {{spstd.name+' ('+spstd.id+')'}}
                            </el-menu-item>
                            
                        </el-sub-menu>
                        <el-sub-menu index="1-2">
                            <template #title>上传标准</template>
                            <el-menu-item index='/edit-standards/upload-json-sp'>
                                上传json
                            </el-menu-item>
                            <el-menu-item index='/edit-standards/upload-xls-sp'>
                                上传xls
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index='' @click="newSpStd">
                            新建标准
                        </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2" class="diag">
                    <template #title class="diag-title">诊断</template>
                        <el-sub-menu index="2-1" class="check">
                            <template #title>查看&修改</template>
                            <el-menu-item
                            v-for="dgstd in dgstd_list"
                            :key="dgstd.id"
                            :index="'/edit-standards/diagnoses/'+dgstd.id"
                            >
                                {{dgstd.name+' ('+dgstd.id+')'}}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2-2">
                            <template #title>上传标准</template>
                            <el-menu-item index='/edit-standards/upload-json-dg'>
                                上传json
                            </el-menu-item>
                            <el-menu-item index='/edit-standards/upload-xls-dg'>
                                上传xls
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index='' @click="newDgStd">
                            新建标准
                        </el-menu-item>
                </el-sub-menu>
                <el-sub-menu
                :key="(i+3).toString()"
                v-for="(tp,i) in types"
                :index="(i+3).toString()" class="diag">
                    <template #title class="diag-title">{{names[tp]}}</template>
                        <el-sub-menu :index="(3+i).toString()+'-1'" class="check">
                            <template #title>查看&修改</template>
                            <el-menu-item
                            v-for="gstd in gstd_list.filter(g=>g.type==tp)"
                            :key="gstd.id"
                            :index="'/edit-standards/general/'+gstd.id"
                            >
                                {{gstd.name+' ('+gstd.id+')'}}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu :index="(3+i).toString()+'-2'">
                            <template #title>上传标准</template>
                            <el-menu-item :index="'/edit-standards/upload-json-g/'+tp">
                                上传json
                            </el-menu-item>
                            <el-menu-item :index="'/edit-standards/upload-xls-g/'+tp">
                                上传xls
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index='' @click="newGStd(tp)">
                            新建标准
                        </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="main">
            <router-view
            :key="key()"
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

let types:string[] = reactive([])
let names = ref({})
interface SpecialtyStd {
    name: string
}
interface DiagStd {
    name: string
}
interface GStd {
    type: string
    name: string
}
let spstd_list:SpecialtyStd[] = reactive([])
let dgstd_list:DiagStd[] = reactive([])
let gstd_list:GStd[] = reactive([])
const router = useRouter()
const route = useRoute()
const key = ()=>route.path+Math.random()
const updateList = async ()=>{
    console.log('updateList')
    let applied_spstd_id = null
    let applied_dgstd_id = null
    // applied gstds
    let applied_gstd_ids = null
    // specialty
    await axios.get('/api/v1/get-standard/specialty')
        .then(response=>{
            console.log('appliedspstd:',response)
            applied_spstd_id = response.data.id
        })
        .catch(error=>{
            console.log(error)
        })
    await axios.get('/api/v1/get-spstds/')
        .then(response=>{
            spstd_list.length = 0
            console.log(response)
            response.data.spstd_list.forEach(l=>{
                if(applied_spstd_id&&l.id===applied_spstd_id)
                    l.name='🔶 '+l.name
                spstd_list.push(l)
            })
            console.log(spstd_list)
        })
        .catch(error=>{
            console.log(error)
        })
    // diag
    await axios.get('/api/v1/get-standard/dgstd')
        .then(response=>{
            console.log('applied_dgstd:',response)
            applied_dgstd_id = response.data.id
        })
        .catch(error=>{
            console.log(error)
        })
    await axios.get('/api/v1/get-dgstds/')
        .then(response=>{
            dgstd_list.length = 0
            console.log(response)
            response.data.dgstd_list.forEach(l=>{
                if(applied_dgstd_id&&l.id===applied_dgstd_id)
                    l.name='🔶 '+l.name
                dgstd_list.push(l)
            })
            console.log(dgstd_list)
        })
        .catch(error=>{
            console.log(error)
        })
    // gstds
    await axios.get('/api/v1/get-standard/gstds')
        .then(response=>{
            console.log('applied_gstds:',response)
            applied_gstd_ids = response.data.standards
            names.value = response.data.names
            console.log('type of names:',typeof(names))
            console.log('names:',names)
            console.log('names[NATIONALITY]:',names['NATIONALITY'])
            console.log('types:',Object.keys(applied_gstd_ids))
            types.length=0
            Object.keys(applied_gstd_ids).forEach(tp=>types.push(tp))
            console.log(types)
        })
    await axios.get('/api/v1/get-all-gstds/')
        .then(response=>{
            gstd_list.length = 0
            console.log('all gstds:',response)
            response.data.gstd_list.forEach(l=>{
                console.log('l:',l)
                if(applied_gstd_ids[l.type]==l.id)
                    l.name='🔶 '+l.name
                gstd_list.push(l)
            })
            console.log('gstd_list:',gstd_list)
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
const newDgStd = async ()=>{
    await axios.post('api/v1/post-standard/dgstd/',{form:{name:'test',diag:[]}})
        .then(response=>{
            console.log('response:',response)
            if(!response)
                return
            let dgstd_data = response.data.dgstd
            console.log('dgstd_data:',dgstd_data)
            let temp_id = dgstd_data.id
            let temp_name = dgstd_data.name
            console.log('temp_id:',temp_id)
            console.log('temp_name:',temp_name)
            dgstd_list.push(dgstd_data)
            router.push('/edit-standards/diagnoses/'+temp_id)
        })
        .catch(error=>{
            console.log(error)
        })
}
const newGStd = async (type)=>{
    await axios.post('api/v1/post-standard/gstd/',{form:{name:'test',type:type,general:[]}})
        .then(response=>{
            console.log('response:',response)
            if(!response)
                return
            let gstd_data = response.data.gstd
            console.log('gstd_data:',gstd_data)
            let temp_id = gstd_data.id
            let temp_name = gstd_data.name
            console.log('temp_id:',temp_id)
            console.log('temp_name:',temp_name)
            gstd_list.push(gstd_data)
            // 根据type决定跳转连接
            router.push('/edit-standards/general/'+temp_id)
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
                router.replace({path: '/edit-standards/upload-json-sp'})
            }
            console.log(spstd_list)
        })
    
}
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
    height: 100%;
}

</style>