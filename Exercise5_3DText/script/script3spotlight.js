import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//textures
const textureLoader = new THREE.TextureLoader();
// const bakedShadow = textureLoader.load('../static/textures/bakedShadow.jpg');
const simpleShadow = textureLoader.load('../static/textures/simpleShadow.jpg');

//scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight('white', 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.2);
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

//spotLight
const spotLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI * 3);

spotLight.castShadow = true;
spotLight.position.set(2,2,2);
scene.add(spotLight);
scene.add(spotLight.target);
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
//feild view
spotLight.shadow.camera.fov = 30;
//near and far values
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

//pointlight
const pointLight = new THREE.PointLight(0xffffff, 0.4);
pointLight.castShadow = true;
pointLight.position.set(-1,1,0);
scene.add(pointLight);

pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
 
//lightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1);
scene.add(directionalLightHelper);

//lightHelper - help debug
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);

//visibility
directionalLightCameraHelper.visible = false;
spotLightCameraHelper.visible = false;
pointLightCameraHelper.visible = false;
scene.add(pointLightCameraHelper);
scene.add(directionalLightCameraHelper);
scene.add(spotLightCameraHelper);

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
    new THREE.MeshStandardMaterial()
)
plane.receiveShadow = true;
plane.position.y = -1;
plane.rotation.x = Math.PI * -0.5;
scene.add(sphere,plane);

//simple shadow
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2,2),
    new THREE.MeshBasicMaterial({
      color : "black",
      transparent : true,
      alphaMap : simpleShadow
    })
  )
  sphereShadow.rotation.x = - Math.PI * 0.5;
  sphereShadow.position.y = plane.position.y + 0.01;
  scene.add(sphereShadow);
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
// renderer.shadowMap.enabled = true;
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

    //update the sphere
    sphere.position.x = Math.cos(elapsedTime) * 3;
    sphere.position.z = Math.sin(elapsedTime) * 3;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    //update the shadow
    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;
    // sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 0.5;

    //renderer
    renderer.render(scene,camera);

    //animation
    window.requestAnimationFrame(tick);
}
tick()
