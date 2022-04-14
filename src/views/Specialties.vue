<template>
    <div class="container">
        <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
    />
    </div>
</template>

<script lang="ts" setup>
import axios from "axios"
import { reactive } from "vue"
import { onMounted } from "vue-demi"

// interface Tree {
//     label: string
//     children?: Tree[]
// }
let data = reactive([])
const handleNodeClick = (data) => {
  console.log(data)
}
const updateData = onMounted(async ()=>{
    await axios
        .get('/api/v1/get-standards/')
        .then(
            response=>{
                data.length=0
                response.data.specialty1_list.forEach(sp1=>{
                    console.log(sp1)
                    sp1.children = sp1.specialty2
                    sp1.children.forEach(sp2=>{
                        console.log(sp2)
                        sp2.children = sp2.specialty3
                    })
                    data.push(sp1)
                })
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
})
const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>