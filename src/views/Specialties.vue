<template>
    <div class="container">
        <el-tree
        :data="list"
        :props="defaultProps"
        v-model="list"
        @node-click="handleNodeClick"
        >
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                    <a @click="append(data)"> Append </a>
                    <a @click="remove(node, data)"> Delete </a>
                </span>
                </span>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios"
import { reactive, watch } from "vue"
import { onMounted } from "vue-demi"
import { useRoute } from "vue-router"

// interface Tree {
//     value: string
//     label: string
//     children?: Tree[]
// }
const router = useRoute()
const route = useRoute()
let list = reactive([])
let name = router.params.name
const handleNodeClick = (data) => {
//   console.log(data)
}
const updateData = async ()=>{
    name = router.params.name
    console.log('这里是'+name)
    await axios
        .get('/api/v1/get-spstd/',{params:{name:name}})
        .then(
            response=>{
                list.length=0
                response.data.spstd.specialty1.forEach(sp1=>{
                    // console.log(sp1)
                    sp1.children = sp1.specialty2
                    sp1.children.forEach(sp2=>{
                        // console.log(sp2)
                        sp2.children = sp2.specialty3
                    })
                    list.push(sp1)
                })
            // console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
}
const defaultProps = {
  children: 'children',
  label: 'label',
}

const append = (data) => {
}

const remove = async (node, data) => {
    node.remove()
    console.log('new list:')
    console.log(list)
    await axios.post('api/v1/update-standard/specialty/',{'name':name,'specialty1':list})
        .then(response=>{
            console.log('submitted and got response:')
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    // let parent = node.parent
    // if(!parent.parent){
    //     console.log('specialty1')
    //     console.log(parent.data)
    //     node.remove()
    //     console.log(data)
    // } else if(!((parent=parent.parent).parent)){
    //     console.log('specialty2')
    // } else if(!((parent=parent.parent).parent)) {
    //     console.log('specialty3')
    // }
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