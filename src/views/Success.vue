<template>
    <div class="container">
        <h2 style="margin-top:20%">感谢您，您真牛屄</h2>
        <el-button type="success" @click="toHomePage">回到管理页</el-button>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted() {
        document.title = '成功'
    },
    methods: {
        toHomePage(){
            this.$router.push('/')
        }
    }
}
</script>

<style>
.container {
    text-align: center;
    vertical-align: middle;
    font-family: SimSun;
    height: 100%;
}
</style>