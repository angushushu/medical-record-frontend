<template>
    <el-container>
      <el-aside width="200px" class="side">
          <el-scrollbar>
            <el-menu
                default-active='/edit-standards/specialties'
                @select="menuSelect"
            >
                <el-menu-item index='/edit-standards/specialties'>
                    科别
                </el-menu-item>
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