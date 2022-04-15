<template>
 <div  id="canvas-frame"></div>
 <div class="" v-if="curPos">
    <el-button size="mini" type="primary" :disabled="btnDisable" class="play" @click="play">play</el-button>
</div> 
 <div class="count"><span v-show="btnDisable">TIME:&nbsp;&nbsp;{{ stepTime }}ms &nbsp;&nbsp;&nbsp;COUNT:&nbsp;&nbsp;{{ stepCount }}</span></div>

</template>

<script setup>
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ref,onMounted,defineExpose,reactive } from "vue";
import { OBJLoader } from "three-obj-mtl-loader";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { ElMessage } from 'element-plus'



onMounted(() => {
//   threeStart()
})
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 6000 / 60);
        };
})();
// const gui = new dat.GUI();
var composer;
var outlinePass;
var effectFXAA;
var selectedObjects;
var renderer; // 渲染器
var bloomComposer;//泛光器
var width; // 页面宽度
var height; // 页面高度
var origPoint = new THREE.Vector3(30,30,0)//原  点
var startPoint;//触发点
var mouse = new THREE.Vector2();//存储鼠标坐标或者触摸坐标
var isRotating = false;//是否正在转动
var intersect;//碰撞光线穿过的元素
var normalize;//触发平面法向量
var movePoint;
var curPos = ref(null);
// var D; // 关羽
var A1,C,A2,A3,A4,D,B1,B2,B3,B4;
var MAP = reactive({
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
})


var btnDisable = ref(false)
var stepTime = ref(0)
var stepCount = ref(0)

let CHESS_LIST = ['A1','A2','A3','A4','B1','B2','B3','B4','C','D']
//转动的六个方向
var xLine = new THREE.Vector3( 1, 0, 0 );//X轴正方向
var xLineAd = new THREE.Vector3( -1, 0, 0 );//X轴负方向
var yLine = new THREE.Vector3( 0, 1, 0 );//Y轴正方向
var yLineAd = new THREE.Vector3( 0, -1, 0 );//Y轴负方向
var zLine = new THREE.Vector3( 0, 0, 1 );//Z轴正方向
var zLineAd = new THREE.Vector3( 0, 0, -1 );//Z轴负方向

var raycaster = new THREE.Raycaster();//光线碰撞检测器
var initStatus = [];//魔方初始状态
async function threeStart(){
  initThree();
  initCamera();
  initScene();
  initLight();
  await initObject();
  render();
  //监听鼠标事件
  renderer.domElement.addEventListener('mousedown', startCube, false);
  renderer.domElement.addEventListener('mousemove', moveCube, false );
  renderer.domElement.addEventListener('mouseup', stopCube,false);
  //监听触摸事件
  renderer.domElement.addEventListener('touchstart', startCube, false);
  renderer.domElement.addEventListener('touchmove', moveCube, false);
  renderer.domElement.addEventListener('touchend', stopCube, false);
  //监听keyboard
  window.addEventListener('keydown', keyEvent, false);
  // 视角控制
  controller = new OrbitControls(camera, renderer.domElement);
  controller.target = new THREE.Vector3(0, 0, 0);//设置控制点
  // checkIntersection()

  
}
//开始操作
  function startCube(event){
      getIntersects(event);
      //魔方没有处于转动过程中且存在碰撞物体
      if(!isRotating&&intersect){
          startPoint = intersect.point;//开始转动，设置起始点
          controller.enabled = false;//当刚开始的接触点在魔方上时操作为转动魔方，屏蔽控制器转动
      }else{
          controller.enabled = true;//当刚开始的接触点没有在魔方上或者在魔方上但是魔方正在转动时操作转动控制器
      }
  }
   //滑动操作
      function moveCube(event){
          getIntersects(event);
          if(intersect){
              if(!isRotating&&startPoint){//魔方没有进行转动且满足进行转动的条件
                  movePoint = intersect.point;
                //   console.log('move',movePoint,startPoint)
                  if(!movePoint.equals(startPoint)){//和起始点不一样则意味着可以得到转动向量了
                      isRotating = true;//转动标识置为true
                      var sub = movePoint.sub(startPoint);//计算转动向量
                      var direction = getDirection(sub);//获得方向
                      var elements = getBoxs(intersect,direction);
                      var startTime = new Date().getTime();
                      window.requestAnimFrame(function(timestamp){
                          rotateAnimation(elements,direction,timestamp,0);
                      });
                  }
              }
          }
          event.preventDefault();
      }
      //操作结束
      function stopCube(){
          intersect = null;
          startPoint = null
      }

       function getDirection(vector3){
                var direction;
                //判断差向量和x、y、z轴的夹角
                var xAngle = vector3.angleTo(xLine);
                var xAngleAd = vector3.angleTo(xLineAd);
                var yAngle = vector3.angleTo(yLine);
                var yAngleAd = vector3.angleTo(yLineAd);
                var zAngle = vector3.angleTo(zLine);
                var zAngleAd = vector3.angleTo(zLineAd);
                var minAngle = min([xAngle,xAngleAd,yAngle,yAngleAd,zAngle,zAngleAd]);//最小夹角

                switch(minAngle){
                    case xAngle:
                        direction = 0;//向x轴正方向旋转90度（还要区分是绕z轴还是绕y轴）
                        if(normalize.equals(yLine)){
                            direction = direction+0.1;//绕z轴顺时针
                        }else if(normalize.equals(yLineAd)){
                            direction = direction+0.2;//绕z轴逆时针
                        }else if(normalize.equals(zLine)){
                            direction = direction+0.3;//绕y轴逆时针
                        }else{
                            direction = direction+0.4;//绕y轴顺时针
                        }
                        break;
                    case xAngleAd:
                        direction = 1;//向x轴反方向旋转90度
                        if(normalize.equals(yLine)){
                            direction = direction+0.1;//绕z轴逆时针
                        }else if(normalize.equals(yLineAd)){
                            direction = direction+0.2;//绕z轴顺时针
                        }else if(normalize.equals(zLine)){
                            direction = direction+0.3;//绕y轴顺时针
                        }else{
                            direction = direction+0.4;//绕y轴逆时针
                        }
                        break;
                    case yAngle:
                        direction = 2;//向y轴正方向旋转90度
                        if(normalize.equals(zLine)){
                            direction = direction+0.1;//绕x轴逆时针
                        }else if(normalize.equals(zLineAd)){
                            direction = direction+0.2;//绕x轴顺时针
                        }else if(normalize.equals(xLine)){
                            direction = direction+0.3;//绕z轴逆时针
                        }else{
                            direction = direction+0.4;//绕z轴顺时针
                        }
                        break;
                    case yAngleAd:
                        direction = 3;//向y轴反方向旋转90度
                        if(normalize.equals(zLine)){
                            direction = direction+0.1;//绕x轴顺时针
                        }else if(normalize.equals(zLineAd)){
                            direction = direction+0.2;//绕x轴逆时针
                        }else if(normalize.equals(xLine)){
                            direction = direction+0.3;//绕z轴顺时针
                        }else{
                            direction = direction+0.4;//绕z轴逆时针
                        }
                        break;
                    case zAngle:
                        direction = 4;//向z轴正方向旋转90度
                        if(normalize.equals(yLine)){
                            direction = direction+0.1;//绕x轴顺时针
                        }else if(normalize.equals(yLineAd)){
                            direction = direction+0.2;//绕x轴逆时针
                        }else if(normalize.equals(xLine)){
                            direction = direction+0.3;//绕y轴顺时针
                        }else{
                            direction = direction+0.4;//绕y轴逆时针
                        }
                        break;
                    case zAngleAd:
                        direction = 5;//向z轴反方向旋转90度
                        if(normalize.equals(yLine)){
                            direction = direction+0.1;//绕x轴逆时针
                        }else if(normalize.equals(yLineAd)){
                            direction = direction+0.2;//绕x轴顺时针
                        }else if(normalize.equals(xLine)){
                            direction = direction+0.3;//绕y轴逆时针
                        }else{
                            direction = direction+0.4;//绕y轴顺时针
                        }
                        break;
                    default:
                        break;
                }
                return direction;
            }
            //根据方向获得运动元素
            function getBoxs(target,direction){
                var targetId = target.object.cubeIndex;
                var ids = [];    
                for(var i=0;i<cubes.length;i++){
                    ids.push(cubes[i].cubeIndex);
                }
                var minId = min(ids);
                targetId = targetId-minId;
                var numI = parseInt(targetId/9);
                var numJ = targetId%9;
                var boxs = [];
                //根据绘制时的规律判断 no = i*9+j
                switch(direction){
                    //绕z轴
                    case 0.1:
                    case 0.2:
                    case 1.1:
                    case 1.2:
                    case 2.3:
                    case 2.4:
                    case 3.3:
                    case 3.4:
                        for(var i=0;i<cubes.length;i++){
                            var tempId = cubes[i].cubeIndex-minId;
                            if(numI===parseInt(tempId/9)){
                                boxs.push(cubes[i]);
                            }
                        }
                        break;
                    //绕y轴
                    case 0.3:
                    case 0.4:
                    case 1.3:
                    case 1.4:
                    case 4.3:
                    case 4.4:
                    case 5.3:
                    case 5.4:
                        for(var i=0;i<cubes.length;i++){
                            var tempId = cubes[i].cubeIndex-minId;
                            if(parseInt(numJ/3)===parseInt(tempId%9/3)){
                                boxs.push(cubes[i]);
                            }
                        }
                        break;
                    //绕x轴
                    case 2.1:
                    case 2.2:
                    case 3.1:
                    case 3.2:
                    case 4.1:
                    case 4.2:
                    case 5.1:
                    case 5.2:
                        for(var i=0;i<cubes.length;i++){
                            var tempId = cubes[i].cubeIndex-minId;
                            if(tempId%9%3===numJ%3){
                                boxs.push(cubes[i]);
                            }
                        }
                        break;
                    default:
                        break;
                }
                return boxs;
            }
            //更新位置索引
            function updateCubeIndex(elements){
                for(var i=0;i<elements.length;i++){
                    var temp1 = elements[i];
                    for(var j=0;j<initStatus.length;j++){
                        var temp2 = initStatus[j];
                        if( Math.abs(temp1.position.x - temp2.x)<=cubeParams.len/2 && 
                            Math.abs(temp1.position.y - temp2.y)<=cubeParams.len/2 && 
                            Math.abs(temp1.position.z - temp2.z)<=cubeParams.len/2 ){
                            temp1.cubeIndex = temp2.cubeIndex;
                            break;
                        }
                    }
                }
            }
            /**
             * 旋转动画
             */
            function rotateAnimation(elements,direction,currentstamp,startstamp,laststamp){
                var totalTime = 500;//转动的总运动时间
                if(startstamp===0){
                    startstamp = currentstamp;
                    laststamp = currentstamp;
                }
                if(currentstamp-startstamp>=totalTime){
                    currentstamp = startstamp+totalTime;
                    isRotating = false;
                    startPoint = null;
                    updateCubeIndex(elements);
                }
                switch(direction){
                    //绕z轴顺时针
                    case 0.1:
                    case 1.2:
                    case 2.4:
                    case 3.3:
                        for(var i=0;i<elements.length;i++){
                            rotateAroundWorldZ(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    //绕z轴逆时针
                    case 0.2:
                    case 1.1:
                    case 2.3:
                    case 3.4:
                        for(var i=0;i<elements.length;i++){
                            rotateAroundWorldZ(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    //绕y轴顺时针
                    case 0.4:
                    case 1.3:
                    case 4.3:
                    case 5.4:
                        for(var i=0;i<elements.length;i++){
                            rotateAroundWorldY(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    //绕y轴逆时针
                    case 1.4:
                    case 0.3:
                    case 4.4:
                    case 5.3:
                        for(var i=0;i<elements.length;i++){
                            rotateAroundWorldY(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    //绕x轴顺时针
                    case 2.2:
                    case 3.1:
                    case 4.1:
                    case 5.2:
                        for(var i=0;i<elements.length;i++){
                            rotateAroundWorldX(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    //绕x轴逆时针
                    case 2.1:
                    case 3.2:
                    case 4.2:
                    case 5.1:
                        for(var i=0;i<elements.length;i++){
                            rotateAroundWorldX(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    default:
                        break;
                }
                if(currentstamp-startstamp<totalTime){
                    window.requestAnimFrame(function(timestamp){
                        rotateAnimation(elements,direction,timestamp,startstamp,currentstamp);
                    });
                }
            }
            //绕着世界坐标系的某个轴旋转
            function rotateAroundWorldY(obj,rad){
                var x0 = obj.position.x;
                var z0 = obj.position.z;
                /**
                 * 因为物体本身的坐标系是随着物体的变化而变化的，
                 * 所以如果使用rotateZ、rotateY、rotateX等方法，
                 * 多次调用后就会出问题，先改为Quaternion实现。
                 */
                var q = new THREE.Quaternion(); 
                q.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), rad );
                obj.quaternion.premultiply( q );
                //obj.rotateY(rad);
                obj.position.x = Math.cos(rad)*x0+Math.sin(rad)*z0;
                obj.position.z = Math.cos(rad)*z0-Math.sin(rad)*x0;
            }
            function rotateAroundWorldZ(obj,rad){
                var x0 = obj.position.x;
                var y0 = obj.position.y;
                var q = new THREE.Quaternion(); 
                q.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), rad );
                obj.quaternion.premultiply( q );
                //obj.rotateZ(rad);
                obj.position.x = Math.cos(rad)*x0-Math.sin(rad)*y0;
                obj.position.y = Math.cos(rad)*y0+Math.sin(rad)*x0;
            }
            function rotateAroundWorldX(obj,rad){
                var y0 = obj.position.y;
                var z0 = obj.position.z;
                var q = new THREE.Quaternion(); 
                q.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), rad );
                obj.quaternion.premultiply( q );
                //obj.rotateX(rad);
                obj.position.y = Math.cos(rad)*y0-Math.sin(rad)*z0;
                obj.position.z = Math.cos(rad)*z0+Math.sin(rad)*y0;
            }

            //获取数组中的最小值
            function min(arr){
                var min = arr[0];
                for(var i=1;i<arr.length;i++){
                    if(arr[i]<min){
                        min = arr[i];
                    }
                }
                return min;
            }

        //获取操作焦点以及该焦点所在平面的法向量
        function getIntersects(event){
          //触摸事件和鼠标事件获得坐标的方式有点区别
            if(event.touches){
                var touch = event.touches[0];
                mouse.x = (touch.clientX / width)*2 - 1;
                mouse.y = -(touch.clientY / height)*2 + 1;
            }else{
                mouse.x = (event.clientX / width)*2 - 1;
                mouse.y = -(event.clientY / height)*2 + 1;
            }
            checkIntersection();
        }
        function addSelectedObject( object ) {
            selectedObjects = [];
            selectedObjects.push( object );
        }
        function checkIntersection() {
            raycaster.setFromCamera( mouse, camera );
            // outlinePass.selectedObjects = [D];
            // var intersects = raycaster.intersectObjects( [ scene ], true );
            // console.log('intersects',intersects)
            // if ( intersects.length > 0 ) {

            //     var selectedObject = intersects[ 0 ].object;
            //     addSelectedObject( selectedObject );
            //     outlinePass.selectedObjects = selectedObjects;

            // } else {
            //     // outlinePass.selectedObjects = [];
            // }
        }
function keyEvent(e){
  console.log(e.keyCode);
  let speed = 55;
  if(e.keyCode == '40'){//left
    D.rotation.z = Math.PI
    D.position.x -= speed;
  }
  if(e.keyCode == '38'){//left
    D.rotation.z = 0
    D.position.x += speed;
  }
  if(e.keyCode == '37'){//left
    D.rotation.z = -Math.PI/2
    D.position.y -= speed;
  }
  if(e.keyCode == '39'){//left
    D.rotation.z = Math.PI/2
    D.position.y += speed;
  }
}
function initThree(){
    // console.log(document.getElementsByClassName("main").offsetWidth,document.getElementsByClassName("main").offsetHeight)
  width = document.getElementsByClassName("main")[0].offsetWidth;
  height = document.getElementsByClassName("main")[0].offsetHeight-60;
//   console.log('wh',width,height)
  renderer = new THREE.WebGLRenderer({
    alpha: true, // canvas是否包含alpha (透明度) 默认为 false
    antialias: true,
    precision: 'highp',
  })
  renderer.setSize(width,height)
  // renderer.setClearColor('#ffffff',0);
  renderer.setClearAlpha(0.0)
//   console.log(document.getElementById('canvas-frame'))
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
}
var camera; // 设置正方向和中心点
var controller;//视角控制器
function initCamera(){
  camera = new THREE.PerspectiveCamera(60,width/height,0.1,1000);
//   console.log(width/height)
  // camera.position.set(230,170,130);
  // camera.position.set(0,-170,130);
  camera.position.set(200,0,100);

  camera.up.set(0,0,1); 
  camera.lookAt(origPoint)
  // gui.add(camera.position,'x').min(-1000).max(1000)
  // gui.add(camera.position,'y').min(-1000).max(1000)
  // gui.add(camera.position,'z').min(-1000).max(1000)
}
//创建场景，将元素加入
var scene;
function initScene(){
  scene = new THREE.Scene();
}
//创建光线
var light;
function initLight(){
  light = new THREE.AmbientLight(0xfefefe);
  scene.add(light);
  // add spotlight for the shadows
  // var spotLight = new THREE.SpotLight(0x475353);
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(400,300, -500);
  spotLight.castShadow = true;
  // gui.add(spotLight.position,'x')
  // gui.add(spotLight.position,'y')
  // gui.add(spotLight.position,'z')
  scene.add(spotLight);
}
var cubes;
async function loadA1(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
        loader.load('A.obj', 
        // 资源加载成功后执行的函数 
        //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
        function ( object ) {
        //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                        //该示例中的object为一个group，有多个mesh组成
            object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                    // child.material.map = texture;
                    child.material =objMaterial;
            }
            } );
            object.castShadow = true;
            object.receiveShadow = true;
            object.scale.set(0.007,0.007,0.007);

            var geometry = new THREE.BoxGeometry(105,50,2);
            var material = new THREE.MeshLambertMaterial({color: 0x07689F});
            var mesh = new THREE.Mesh( geometry, material );
            mesh.receiveShadow = true;
            A1 = new THREE.Group();
            A1.add(object)
            A1.add(mesh)
            A1.position.x = -83;
            A1.position.y = -85;
            A1.position.z = 0;
            A1.width = 50
            A1.height = 105
            resolve()
        });
    
    })
}
async function loadA2(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
        loader.load('A.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.007,0.007,0.007);

        var geometry = new THREE.BoxGeometry(105,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        A2 = new THREE.Group();
        A2.add(object)
        A2.add(mesh)
        A2.position.x = -83;
        A2.position.y = 80;
        A2.position.z = 0;
        A2.width = 50
        A2.height = 105
        resolve()
      });

    })
}

async function loadA3(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
       loader.load('A.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.007,0.007,0.007);
        // object.postion.z = 1;

        var geometry = new THREE.BoxGeometry(105,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        A3 = new THREE.Group();
        A3.add(object)
        A3.add(mesh)
        A3.position.x =27;
        A3.position.y = -85;
        A3.position.z = 0 ;
        A3.width = 50;
        A3.height = 105;
        resolve()
      });

    })
}
async function loadA4(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
        loader.load('A.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.007,0.007,0.007);

        var geometry = new THREE.BoxGeometry(105,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        A4 = new THREE.Group();
        A4.add(object)
        A4.add(mesh)
        A4.position.x = 27;
        A4.position.y = 80;
        A4.position.z = 0;
        A4.width = 50;
        A4.height = 105;
        resolve()
      });

    })
}

async function loadB1(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
        loader.load('C.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.005,0.005,0.005);

        var geometry = new THREE.BoxGeometry(50,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        B1 = new THREE.Group();
        B1.add(object)
        B1.add(mesh)
        B1.position.x = -0.5;
        B1.position.y = -30 ;
        B1.position.z = 0;
        B1.width = 50;
        B1.height = 50;
        resolve();
      });

    })
}
async function loadB2(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
         loader.load('C.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.005,0.005,0.005);

        var geometry = new THREE.BoxGeometry(50,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        B2 = new THREE.Group();
        B2.add(object)
        B2.add(mesh)
        B2.position.x = 54.5;
        B2.position.y = -30  ;
        B2.position.z = 0;
        B2.width = 50;
        B2.height = 50;
        resolve();
      });

    })
}
async function loadB3(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
          loader.load('C.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.005,0.005,0.005);

        var geometry = new THREE.BoxGeometry(50,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        B3 = new THREE.Group();
        B3.add(object)
        B3.add(mesh)
        B3.position.x = 109.5;
        B3.position.y = -85;
        B3.position.z = 0;
        B3.width = 50;
        B3.height = 50;
        resolve();
      });

    })
}

async function loadB4(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
         loader.load('C.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.005,0.005,0.005);

        var geometry = new THREE.BoxGeometry(50,50,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        B4 = new THREE.Group();
        B4.add(object)
        B4.add(mesh)
        B4.position.x = 109.5;
        B4.position.y = -30;
        B4.position.z = 0;
        B4.width = 50;
        B4.height = 50;
        resolve()
      });

    })
}

async function loadD(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
        loader.load('C.obj', 
      // 资源加载成功后执行的函数 
      //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
      function ( object ) {
      //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                      //该示例中的object为一个group，有多个mesh组成
          object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                    // child.material.map = texture;
                    child.material =objMaterial;
            }
          } );
          object.castShadow = true;
          object.receiveShadow = true;
          object.scale.set(0.01,0.01,0.01);

          var geometry = new THREE.BoxGeometry(105,105,2);
          var material = new THREE.MeshLambertMaterial({color: 0x07689F});
          var mesh = new THREE.Mesh( geometry, material );
          mesh.receiveShadow = true;
          D = new THREE.Group();
          D.add(object)
          D.add(mesh)
          D.position.x = -83;
          D.position.y = -2.5;
          D.position.z = 0;
          D.width = 105;
          D.height = 105;
          resolve()
        });

    })
}

async function loadC(){
    let loader = new OBJLoader();
    var objMaterial =  new THREE.MeshLambertMaterial({color: 0x07689F});
    return await new Promise((resolve,reject)=>{
          //导入资源
  loader.load('D.obj', 
    // 资源加载成功后执行的函数 
    //@params object 传入的模型，只能是单个模型，也可能是一个group,视构建的model而定 
    function ( object ) {
    //taverse函数为遍历object的每个子mesh，传入的child为每个mesh
                    //该示例中的object为一个group，有多个mesh组成
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
                  // child.material.map = texture;
                  child.material =objMaterial;
          }
        } );
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.7,0.7,0.7);

        var geometry = new THREE.BoxGeometry(50,105,2);
        var material = new THREE.MeshLambertMaterial({color: 0x07689F});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.receiveShadow = true;
        C = new THREE.Group();
        C.add(object)
        C.add(mesh)
        C.position.x = 109.5;
        C.position.y = 52.5;
        C.position.z = 0;
        C.width = 105;
        C.height = 50;
        resolve()
      });

    })
}



async function initObject(){
    var geometry2 = new THREE.BoxGeometry(50,50,1);
      for ( var i = 0; i < 5; i ++ ) {
        for(var j = 0;j<4;j++){
          var material = new THREE.MeshLambertMaterial({color: 0xffffff,opacity: 1});
          var mesh = new THREE.Mesh( geometry2, material );
          mesh.receiveShadow = true;
          mesh.position.x = i*55 - 110;
          mesh.position.y = j*55 - 85;
          mesh.position.z = 0;
          scene.add( mesh );
        }
    }
  return await Promise.all([
      loadA1(),
      loadA2(),
      loadA3(),
      loadA4(),
      loadB1(),
      loadB2(),
      loadB3(),
      loadB4(),
      loadC(),
      loadD()
    ])
  .then(function(values){
      scene.add(A1)
      scene.add(A2)
      scene.add(A3)
      scene.add(A4)
      scene.add(B1)
      scene.add(B2)
      scene.add(B3)
      scene.add(B4)
      scene.add(C)
      scene.add(D)
  })
 
    
}
function render(){
  renderer.autoClear = false 
//   renderer.clear()
  camera.layers.set(0)
  renderer.render(scene,camera);
  renderer.shadowMapEnabled = true;
  window.requestAnimationFrame(render);
}

async function initPosition(posObj){
    await threeStart()
    await changePosition(posObj)
}
async function changePosition(posObj){
    curPos.value = posObj;
    btnDisable.value = false;
    await sleep(300);
    for(let i=0;i<posObj.pos.length;i++){
        let chess;
        if(CHESS_LIST[i] == 'A1'){
            chess = A1
        }else if(CHESS_LIST[i] == 'A2'){
            chess = A2
        }else if(CHESS_LIST[i] == 'A3'){
            chess = A3
        }else if(CHESS_LIST[i] == 'A4'){
            chess = A4
        }else if(CHESS_LIST[i] == 'B1'){
            chess = B1
        }else if(CHESS_LIST[i] == 'B2'){
            chess = B2
        }else if(CHESS_LIST[i] == 'B3'){
            chess = B3
        }else if(CHESS_LIST[i] == 'B4'){
            chess = B4
        }else if(CHESS_LIST[i] == 'C'){
            chess = C
        }else if(CHESS_LIST[i] == 'D'){
            chess = D
        }
        if(chess.timer1){
            clearInterval(chess.timer1)
        }
        
        let y = (posObj.pos[i]%4)*55 + chess.width/2-110;
        let x= (Math.floor(posObj.pos[i]/4))*55 + chess.height/2-135.5
        console.log(CHESS_LIST[i],'x',x,'y',y)
        chess.x = x 
        chess.y = y
        chess.position.x = x
        chess.position.y = y
    }
}
async function play(){
    let posObj = curPos.value;
    stepCount.value = 0;
    var t1 = new Date().getTime()
    btnDisable.value = true;
    // let playIndex = curPage;
    // initPosition()
    var stepList = []
    if(posObj.step && posObj.step != '[]'){
        stepList = (posObj.step).replace('[(','').replace(')]','').split('), (')
    }
    var chess;
    var t2 = new Date().getTime()
    stepTime.value = t2-t1
    for(let i=0;i<stepList.length;i++){
        if(!btnDisable.value){
            console.log('returns')
            // stepCount.value = 0;
            return;
        }
        let temp = stepList[i].split(', ')
        if(CHESS_LIST[temp[0]] == 'A1'){
            chess = A1
        }else if(CHESS_LIST[temp[0]] == 'A2'){
            chess = A2
        }else if(CHESS_LIST[temp[0]] == 'A3'){
            chess = A3
        }else if(CHESS_LIST[temp[0]] == 'A4'){
            chess = A4
        }else if(CHESS_LIST[temp[0]] == 'B1'){
            chess = B1
        }else if(CHESS_LIST[temp[0]] == 'B2'){
            chess = B2
        }else if(CHESS_LIST[temp[0]] == 'B3'){
            chess = B3
        }else if(CHESS_LIST[temp[0]] == 'B4'){
            chess = B4
        }else if(CHESS_LIST[temp[0]] == 'C'){
            chess = C
        }else if(CHESS_LIST[temp[0]] == 'D'){
            chess = D
        }
        chess.position.x = chess.x
        chess.position.y = chess.y
        let action = temp[1];
        if(action == '0'){//up
            let target = (chess.x - 55)
            animate(chess,'x',target)
            await sleep(300);
            chess.x = target

        }else if(action == '1'){//right
            let target  = (chess.y+55)
            animate(chess,'y',target)
            await sleep(300);
            chess.y = target

        }else if(action == '2'){//down
            let target = (chess.x + 55)
            animate(chess,'x',target)
            await sleep(300);
            chess.x = target
        }else if(action == '3'){//y
            let target = (chess.y - 55)
            animate(chess,'y',target)
            await sleep(300);
            chess.y = target
        }

        
        stepCount.value = i+1;
    }

    ElMessage({
        message:"成功",
        type:"success"
    })
}
function animate(element,direction,target){
    clearInterval(element.timer1);
    element.timer1=setInterval(function(){//element是一个对象，对象点出来的属性有且只有一个，避免多次点击按钮产生多个定时器
        var current=parseInt(element.position[direction]);    //获取当前位置，数字类型，没有px。
        //不可以用element.style.left，因为该写法只能获取到行内样式，不能获取到<style></style>标签内的样式
        var step=5;//每次移动的距离
        step=current<target?step:-step;//step的正负表示了向左或是向右移动
        current+=step;    //计算移动到的位置，数字类型，没有px                
        if(Math.abs(target-current)>Math.abs(step)){//当离目标位置的距离大于一步移动的距离
            element.position[direction]=current;//移动
        
        }else{//当间距小于一步的距离，则清理定时器，把元素直接拿到目标位置
            clearInterval(element.timer1);
            element.position[direction]=target;
            
        }
    },10);
}
function sleep(time){
    return new Promise((resolve)=> setTimeout(resolve,time))
}
defineExpose({
   initPosition,
   changePosition,
   play,
})
</script>

<style>
#canvas-frame{
    outline: none;
    /* background: white; */
}
</style> 