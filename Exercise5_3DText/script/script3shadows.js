import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight('white', 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.4);
directionalLight.position.z = 5;
directionalLight.position.y = 3;
directionalLight.castShadow = true;
scene.add(directionalLight);

//shadowmap optimization
console.log(directionalLight.shadow);
//shadowmap optimization - resolution
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
//shadowmap camera length
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 10;
//shadow map - amplitude(length of each side)
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -5;
//shadow blur
directionalLight.shadow.radius = 10;

//lightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1);
scene.add(directionalLightHelper);

//lightHelper - help debug
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
//visibility
// directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);

//object
const material = new THREE.MeshStandardMaterial();
// material.wireframe = true;
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 32),
    material
)
sphere.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    material
)
plane.receiveShadow = true;
plane.position.y = -1;
plane.rotation.x = Math.PI * -0.5;
scene.add(sphere,plane);

//viewport
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 10;
camera.position.y = 3;
scene.add(camera);

window.addEventListener('resize', () =>
{
    //update viewport
    size.width = window.innerWidth;
    size.height = window.innerHeight

    //update camera
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();
    
    //renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

//fullscreen
window.addEventListener('dblclick',() =>
{
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;
//radius doesn't work with the PCFSoftShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//orbit controls
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX - 0.5;
    cursor.y = -(event.clientY - 0.5);
})

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    //orbit controls
    controls.update();

    //object
    sphere.rotation.x = elapsedTime * 0.25;
    sphere.rotation.y = elapsedTime * 0.25;

    //renderer
    renderer.render(scene,camera);

    //animation
    window.requestAnimationFrame(tick);
}
tick()
