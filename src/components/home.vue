
<script setup>
import { ref,onMounted } from "vue";
import  axios  from 'axios';
import { ElMessage } from 'element-plus'
onMounted(() => {
  // 初始化
  getPosition();
})
let posObj = []
let CHESS_LIST = ['A1','A2','A3','A4','B1','B2','B3','B4','C','D']
var posList = []
var totalNum = ref(0)
var stepCount = ref(0)
var curPage = 1
var str = null;
var btnDisable = ref(false)
var isLoading = ref(false)
async function play(){
    btnDisable.value = true;
    let playIndex = curPage;
    initPosition()
    var stepList = []
    if(posObj.step && posObj.step != '[]'){
        stepList = (posObj.step).replace('[(','').replace(')]','').split('), (')
    }
    for(let i=0;i<stepList.length;i++){
        if(playIndex != curPage){
            btnDisable.value = false;
            return;
        }
        let temp = stepList[i].split(', ')
        let chess = document.getElementsByClassName(CHESS_LIST[temp[0]])[0];
        let action = temp[1];
        let speed = '100px';
        if(action == '0'){//up
            chess.style.top = (parseInt(chess.style.top) - 100) + 'px'
        }else if(action == '1'){//right
            chess.style.left = (parseInt(chess.style.left) + 100) + 'px'
        }else if(action == '2'){//down
            chess.style.top = (parseInt(chess.style.top) + 100) + 'px'
        }else if(action == '3'){//left
            chess.style.left = (parseInt(chess.style.left) - 100) + 'px'
        }
        await sleep(100);
        stepCount.value = i+1;
    }
    btnDisable.value = false;

    ElMessage({
        message:"成功",
        type:"success"
    })
}
function sleep(time){
    return new Promise((resolve)=> setTimeout(resolve,time))
}
function handleCurrentChange(val){
    stepCount.value = 0;
    btnDisable.value = false;
    curPage = val;
    posObj = posList[val]
    initPosition();
}
function getPosition(){
    isLoading.value = true;
    axios.get('steps.txt').then(res=>{
        if(res.status==200){
            let lines = res.data.split('\n')
            for(let i=0;i<lines.length;i++){
                let temp = lines[i].split(':')
                posList.push({
                    pos:temp[0].split(','),
                    step : temp[1],
                })
            }
            posObj = posList[curPage];
            totalNum.value = lines.length-1;
            initPosition();
        }
        isLoading.value = false;
    }).catch(e=>{
        isLoading.value = false;
    })
}
function initPosition(){
    let A1 = document.getElementsByClassName('A1')[0]
    let A2 = document.getElementsByClassName('A2')[0]
    let A3 = document.getElementsByClassName('A3')[0]
    let A4 = document.getElementsByClassName('A4')[0]
    let B1 = document.getElementsByClassName('B1')[0]
    let B2 = document.getElementsByClassName('B2')[0]
    let B3 = document.getElementsByClassName('B3')[0]
    let B4 = document.getElementsByClassName('B4')[0]
    let C = document.getElementsByClassName('C')[0]
    let D = document.getElementsByClassName('D')[0]
    let MAP = {
        'A1' : A1,
        'A2' : A2,
        'A3' : A3,
        'A4' : A4,
        'B1' : B1,
        'B2' : B2,
        'B3' : B3,
        'B4' : B4,
        'C' : C,
        'D' : D
    }
    // console.log(222,pos)
    for(let i=0;i<posObj.pos.length;i++){
        let x = (posObj.pos[i]%4)*100;
        let y= (Math.floor(posObj.pos[i]/4))*100;
        // MAP[CHESS_LIST[i]].style.top = '400px'
        MAP[CHESS_LIST[i]].style.left = x + 'px'
        MAP[CHESS_LIST[i]].style.top = y + 'px'
    }
}

// var newFile = new Blob('klotski.bin');
//   console.log(newFile.name); // test.jpeg
//   console.log(newFile.type);
</script>
<template>
    <div class="content" v-loading="isLoading">
        <div class="header">
            <span>KLOTSKI</span>
        </div>
        <div class="main">
            <div class="item A A1"></div>
            <div class="item A A2"></div>
            <div class="item A A3"></div>
            <div class="item A A4"></div>
            <div class="item B B1"></div>
            <div class="item B B2"></div>
            <div class="item B B3"></div>
            <div class="item B B4"></div>
            <div class="item C"></div>
            <div class="item D"></div>
        </div>
        <div class="pagination">
            <div class="f1">
                <el-button size="mini" type="primary" :disabled="btnDisable" class="play" @click="play">play</el-button>
                <div class="count">步骤总计：{{stepCount}}</div>
            </div> 
            <el-pagination
                class="pag"
                background
                layout="prev, pager, next"
                :page-size="1"
                @current-change="handleCurrentChange"
                :total="totalNum">
                </el-pagination>
        </div>
        
    </div>
</template>
<style>
.content{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
}
.header{
    font-size:20px;
    height:20px;
    margin:10px;
    font-weight:bold;
}
.main{
    width:400px;
    height:500px;
    margin:10px;
    background:#ccc;
    position:relative;
}
.pagination{
    height:30px;
    
}
.pag{
    margin:10px;
}
.f1{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
}
.count{
    font-size:12px;
    display:inline-box;
    width:100px;
}
.play{
}
.item{
    position:absolute;
    border:1px solid white;
}
.A{
    width:100px;
    height:200px;
    background:#26BAEE;
}
.B{
    width:100px;
    height:100px;
    background:#9FE8FA;
}
.C{
    width:200px;
    height:100px;
    background:#B2EBF2;
}
.D{
    width:200px;
    height:200px;
    background:#07689F;
}
.A1{
    top:0;
    left:0;
}
.A2{
    top:200px;
    left:0;
}
.A3{
    top:0;
    left:300px;
}
.A4{
    top:200px;
    left:300px;
}
.D{
    top:0px;
    left:100px;
}
.C{
    top:200px;
    left:100px;
}
.B1{
    top:400px;
    left:0;
}
.B2{
    top:300px;
    left:100px;
}
.B3{
    top:300px;
    left:200px;
}
.B4{
    top:400px;
    left:300px;
}
</style>