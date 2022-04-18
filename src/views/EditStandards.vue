<template>
    <el-container>
      <el-aside width="200px" class="side">
          <el-scrollbar>
            <el-menu
                default-active='/edit-standards/specialties'
                :default-openeds="['/edit-standards/specialties']"
                @select="menuSelect"
            >
                <el-sub-menu index="1">
                    <template #title>科别</template>
                    <el-sub-menu index="1-1">
                        <template #title>查看&修改</template>
                        <el-menu-item index="1-1-1">sp1</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item-group>
                        <el-menu-item index='/edit-standards/specialties'>
                            查看&修改
                        </el-menu-item>
                        <el-menu-item index='/edit-standards/submit-specialties'>
                            上传json
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                
            </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()
const menuSelect = (val)=>{
    console.log(val)
    router.push(val)
}
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