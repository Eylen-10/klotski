
<script setup>
import { ref,onMounted,nextTick } from "vue";
import  axios  from 'axios';
import { ElMessage } from 'element-plus'
import { txt } from '../consts/index'
onMounted(() => {
  // 初始化
  getPosition();
})
let posObj = []
let CHESS_LIST = ['A1','A2','A3','A4','B1','B2','B3','B4','C','D']
var posList = []
var totalNum = ref(0)
var stepCount = ref(0)
var stepTime = ref(0)
var curPage = 1
var str = null;
var btnDisable = ref(false)
var isLoading = ref(false)
var renderComponent = ref(true);
var A1 = ref();
var A2 = ref();
var A3 = ref();
var A4 = ref();
var B1 = ref();
var B2 = ref();
var B3 = ref();
var B4 = ref();
var C = ref();
var D = ref();
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
function forceRerender() {
  renderComponent = false;

    return new Promise((resolve)=> {
        nextTick().then(() => {
            renderComponent = true;
            resolve();
        });
    })
  // 从 DOM 中删除 my-component 组件

  
}
function animate(element,direction,target){
        clearInterval(element.timer1);
        element.timer1=setInterval(function(){//element是一个对象，对象点出来的属性有且只有一个，避免多次点击按钮产生多个定时器
            var current=parseInt(element.style[direction]);    //获取当前位置，数字类型，没有px。
            //不可以用element.style.left，因为该写法只能获取到行内样式，不能获取到<style></style>标签内的样式
            var step=5;//每次移动的距离
            step=current<target?step:-step;//step的正负表示了向左或是向右移动
            current+=step;    //计算移动到的位置，数字类型，没有px                
            if(Math.abs(target-current)>Math.abs(step)){//当离目标位置的距离大于一步移动的距离
                element.style[direction]=current+"px";//移动
            
            }else{//当间距小于一步的距离，则清理定时器，把元素直接拿到目标位置
                clearInterval(element.timer1);
                element.style[direction]=target+"px";
                
            }
        },10);
    }
async function play(){
    var t1 = new Date().getTime()
    btnDisable.value = true;
    let playIndex = curPage;
    initPosition()
    var stepList = []
    if(posObj.step && posObj.step != '[]'){
        stepList = (posObj.step).replace('[(','').replace(')]','').split('), (')
    }
    var chess;
    var t2 = new Date().getTime()
    console.log('play',stepList.length,t2-t1)
    stepTime.value = t2-t1
    for(let i=0;i<stepList.length;i++){
        if(playIndex != curPage){
            console.log('returns')
            stepCount.value = 0;
            return;
        }
        let temp = stepList[i].split(', ')
        chess = MAP[CHESS_LIST[temp[0]]];
        // console.log(chess.top,chess.left)
        chess.value.style.top = chess.top + 'px'
        chess.value.style.left = chess.left + 'px'
        let action = temp[1];
        let speed = '100px';
        if(action == '0'){//up
            let target = (chess.top - 100)
            animate(chess.value,'top',target)
            // chess.style.top  = parseInt(chess.style.top) + 'px'
            // console.log((parseInt(chess.style.top) - 100) + 'px')
            // Velocity(chess.value,{
            //     top : target + 'px'
            // },{
            //     duration:300
            // })
            await sleep(300);
            chess.top = target

        }else if(action == '1'){//right
            // chess.style.left = (parseInt(chess.style.left) + 100) + 'px'
            let target  = (chess.left+100)
            animate(chess.value,'left',target)

            // let target = (parseInt(chess.style.left) + 100)
            // console.log(target + 'px')
            // Velocity(chess.value,{
            //     left : target + 'px'
            // },{
            //     duration:300
            // })
            await sleep(300);
            chess.left = target

        }else if(action == '2'){//down
            // chess.style.top  = parseInt(chess.style.top) + 'px'
            let target = (chess.top + 100)
            animate(chess.value,'top',target)
            // console.log(target + 'px')
            // Velocity(chess.value,{
            //     top : target + 'px'
            // },{
            //     duration:300
            // })
            await sleep(300);
            chess.top = target
        }else if(action == '3'){//left
            // chess.style.left  = parseInt(chess.style.left) + 'px'
            let target = (chess.left - 100)
            animate(chess.value,'left',target)
            // console.log(target + 'px')
            // Velocity(chess.value,{
            //     left : target + 'px'
            // },{
            //     duration:300,
            // })
            await sleep(300);
            // chess.style.left = target + 'px'
            chess.left = target
        }
        // console.log(Velocity,22)

        
        stepCount.value = i+1;
    }
    // btnDisable.value = false;

    ElMessage({
        message:"成功",
        type:"success"
    })
    
    
}
function sleep(time){
    return new Promise((resolve)=> setTimeout(resolve,time))
}
function handleCurrentChange(val){
    if(curPage != val){
        stepCount.value = 0;
        btnDisable.value = false;
        curPage = val;
        posObj = posList[val]
        initPosition();
    }
    
}
function getPosition(){
    let lines = txt.split('\n');
    for(let i=0;i<lines.length;i++){
        let temp = lines[i].split(':')
        posList.push({
            pos:temp[0].split(','),
            step : temp[1],
        })
    }
    posObj = posList[curPage];
    totalNum.value = lines.length-1;
}
function initPosition(){
    isLoading.value = true;
    for(let i=0;i<posObj.pos.length;i++){
        let x = (posObj.pos[i]%4)*100;
        let y= (Math.floor(posObj.pos[i]/4))*100;
        // MAP[CHESS_LIST[i]].style.top = '400px'
        if(MAP[CHESS_LIST[i]].value.timer1){
            clearInterval(MAP[CHESS_LIST[i]].value.timer1)
        }
        MAP[CHESS_LIST[i]].left = x
        MAP[CHESS_LIST[i]].top = y
        MAP[CHESS_LIST[i]].value.style.left = x + 'px'
        MAP[CHESS_LIST[i]].value.style.top = y + 'px'
    }
    isLoading.value = false;


}

// var newFile = new Blob('klotski.bin');
//   console.log(newFile.name); // test.jpeg
//   console.log(newFile.type);
</script>
<template>
    <div class="content" v-loading="isLoading" v-if="renderComponent">
        <div class="header">
            <span>KLOTSKI</span>
        </div>
        <transition-group name="cell" tag="div" class="container main">
            <div class="item A A1" ref="A1" key="A1">A1</div>
            <div class="item A A2" ref="A2" key="A2">A2</div>
            <div class="item A A3" ref="A3" key="A3">A3</div>
            <div class="item A A4" ref="A4" key="A4">A4</div>
            <div class="item B B1" ref="B1" key="B1">B1</div>
            <div class="item B B2" ref="B2" key="B2">B2</div>
            <div class="item B B3" ref="B3" key="B3">B3</div>
            <div class="item B B4" ref="B4" key="B4">B4</div>
            <div class="item C" ref="C" key="C">C</div>
            <div class="item D" ref="D" key="D">D</div>
        </transition-group>
        <div class="pagination">
            <div class="f1">
                <el-button size="mini" type="primary" :disabled="btnDisable" class="play" @click="play">play</el-button>
            </div> 
            <div class="count"><span v-show="btnDisable">TIME:&nbsp;&nbsp;{{ stepTime }}ms &nbsp;&nbsp;&nbsp;COUNT:&nbsp;&nbsp;{{ stepCount }}</span></div>
            <el-pagination
                class="pag"
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
    
}
.f1{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
}
.count{
    font-size:12px;
    line-height:30px;
    height:30px;
}
.el-button{
    margin-top:10px !important;
}
.item{
    position:absolute;
    border:1px solid white;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    display:border-box;
}
.cell-enter,.cell-leave-to{
            opacity:  0;/*透明度*/
            transform: translateX(150px);
        }
         /*入场(离场)动画的时间段   */
        .cell-enter-active,.cell-leave-active{
            transition: all 0.8s ease;

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