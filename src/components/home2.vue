<template>
    <div class="content">
        <div class="main">
            <Klotski/>  
        </div>
        <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000">
        </el-pagination>
    </div>
</template>
<script setup>
import Klotski from './Three2.vue'

</script>
<style>
.content{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
}
.main{
    width:100%;
    flex:1;
}
.pagination{
    height:30px;
    margin:10px;
}
</style>