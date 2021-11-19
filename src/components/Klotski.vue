<template>

</template>
<script>
import * as THREE from 'three' 
import { Stats } from 'stats.js'
import { GUI } from 'dat.gui'
// import { dat } from 'dat.gui'
// import { OrbitControls } from 'three-orbitcontrols'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { onMounted } from 'vue'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "three-obj-mtl-loader";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';



// window.onload = init;

// 变量 end

let camera, scene, renderer;
let geometry, material, mesh;
let loader;
var gy;

window.onload = init;

function init() {
	camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.y = 400;
    camera.position.x = 400;
	camera.position.z = 1000;

    // camera.lookAt({
    //     x:0,
    //     y:0,
    //     z:0
    // })

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 200, 200, 10 );
	material = new THREE.MeshBasicMaterial({color: 0xffffff})
	mesh = new THREE.Mesh( geometry, material );

    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = i*210;
            mesh.position.y = j*210;
            mesh.position.z = 0;
	        scene.add( mesh );

        }
    }

    loader = new OBJLoader();
    // load a resource
	var    objMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff})
    // loader.setMaterials(objMaterial)

    loader.load(
	// resource URL
	'GY.obj',
	// called when resource is loaded
	function ( object ) {
        object.children.forEach(function(child){
            child.material = material
        })
        gy = object;
        gy.position.x = 10; 
        scene.add( gy );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened',error );

	}
    );






    

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(new THREE.Color(0x000000))
	// renderer.setAnimationLoop( animation );
    renderer.render( scene, camera );
	document.body.appendChild( renderer.domElement );

}
function animation( time ) {
	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;
	renderer.render( scene, camera );
}
</script>
<style>
#three-container{

} 
</style>