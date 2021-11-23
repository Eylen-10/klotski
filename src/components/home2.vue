<template>
    <div class="content" v-loading="isLoading">
        <div class="header">
            <span>KLOTSKI 3D</span>
        </div>
        <div class="main">
            <Klotski ref="klot"/>  
        </div>
        <div class="pag">
            <el-pagination
                class=""
                background
                :pager-count="5"
                layout="prev, pager, next"
                :page-size="1"
                @current-change="handleCurrentChange"
                :total="totalNum">
                </el-pagination>
        </div>
    </div>
</template>
<script setup>
import Klotski from './Three2.vue'
import { onMounted,ref } from 'vue'
import  axios  from 'axios';

onMounted(() => {
  getPosition()
})
var isLoading = ref(false)
var totalNum = ref(0)
var curPage = 1
var posObj = ref()
var posList = [];
var klot = ref();
function handleCurrentChange(val){
    if(curPage != val){
        curPage = val;
        posObj.value = posList[val]
        klot.value.changePosition(posList[curPage]);
    }
}
function getPosition(){
    isLoading.value = true;
    axios.get('steps.txt').then(res=>{
        if(res.status==200){
            let lines = res.data.split('\r\n')
            for(let i=0;i<lines.length;i++){
                let temp = lines[i].split(':')
                posList.push({
                    pos:temp[0].split(','),
                    step : temp[1],
                })
            }
            // posObj = posList[curPage];
            totalNum.value = lines.length-1;
            posObj.value = posList[curPage]
            klot.value.initPosition(posList[curPage]);
        }
        isLoading.value = false;
    }).catch(e=>{
        isLoading.value = false;
    })
}
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
.count{
    font-size:12px;
    line-height:30px;
    height:30px;
}
.header{
    font-size:20px;
    height:20px;
    margin:10px;
    font-weight:bold;
}
</style>