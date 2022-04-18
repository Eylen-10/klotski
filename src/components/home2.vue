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
import { txt } from '../consts/index'
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
    let lines = txt.split('\n')
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
</script>
<style>
/* .content{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
}
.main{
    width:100%;
    flex:1;
}


.header{
    font-size:20px;
    height:20px;
    margin:10px;
    font-weight:bold;
} */
.count{
    font-size:12px;
    line-height:30px;
    height:30px;
}
.content{
    /* width:100%;
    height:100%; */
    display:flex;
    flex-direction:column;
    align-items:center;
    padding-top: 5vh;
}
.pagination{
    height:30px;
    margin:20px;
}
.header{
    font-size:32px;
    height:20px;
    margin:50px;
    line-height: 40px;
    letter-spacing: 10px;
    font-weight:bold;
     text-shadow:
    /* White glow */
    0 0 7px #999,
    0 0 10px #999,
    0 0 21px #999,
    /* Green glow */
    0 0 42px #c0cdcb,
    0 0 82px #c0cdcb,
    0 0 92px #c0cdcb,
    0 0 102px #c0cdcb,
    0 0 151px #c0cdcb;
}
.main{
    width:800px;
    height:420px;
    margin-bottom: 20px;
    /* padding:10px 10px 30px 10px; */
    /* background: rgba(255, 255, 255, 0.1); */
    /* position:relative; */
    /* border:1px solid white; */
}
.el-button{
    margin-top:20px !important;
    background: transparent !important;
    border: 1px solid white !important;
    border-radius: 5px !important;
    overflow: hidden;
}
.el-button:hover{
    background-color: rgba(255,255,255,0.2) !important; 
}
.el-button--primary.is-disabled{
    color:#999 !important;
    border-color:#999 !important;
}
.el-pagination .btn-prev,.el-pagination .number,.el-pagination .more,.el-pagination .btn-next{
    background: rgba(255,255,255,0.1) !important;
}
.el-pagination .btn-prev:hover,.el-pagination .number:hover,.el-pagination .more:hover,.el-pagination .btn-next:hover{
    color:rgba(255,255,255,1) !important;
    background: rgba(255,255,255,0.5) !important;
}
</style>