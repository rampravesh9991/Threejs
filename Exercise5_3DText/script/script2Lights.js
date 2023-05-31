import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//gui
const gui = new dat.GUI();

//scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight('white',0.3);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white',0.3);
directionalLight.position.set(3,4,-3);
// scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
// scene.add(hemisphereLight);

//Distance and decay property of point light, decay should be lower than distance
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10,2);
pointLight.position.set(2,2,0)
// scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff,2,6,-6);
rectAreaLight.position.set(-1.5, 0, 1.5);
//vectro3 is 0,0,0
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

//color, intensity, distance, angle, penumbra(sharpness), decay
const spotLight = new THREE.SpotLight(0x78ff00,0.5,10,Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0,2,3);
//rotate spotlight, the target is not in our scene so the position is not working, we have to add the target
spotLight.target.position.y = -4;
//adding target into the scene
scene.add(spotLight.target);
scene.add(spotLight);

gui.add(ambientLight,'intensity').min(0).max(1).step(0.001);

//light Helpers
//parameters - concerned light, size of helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight,0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
window.requestAnimationFrame(() =>
{
    spotLightHelper.update();
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
//don't know why but it's not working
window.requestAnimationFrame(() =>
{
    // rectAreaLightHelper.position.x(rectAreaLight.position.x);
    // rectAreaLightHelper.position.y(rectAreaLight.position.y);
    // rectAreaLightHelper.position.z(rectAreaLight.position.z);

    // rectAreaLightHelper.rotation.x(rectAreaLight.rotation.x);
    // rectAreaLightHelper.rotation.y(rectAreaLight.rotation.y);
    // rectAreaLightHelper.rotation.z(rectAreaLight.rotation.z);

    rectAreaLightHelper.position.copy(rectAreaLight.position);
    rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
    rectAreaLightHelper.update();
})
//object
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
// material.wireframe = true;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7,12,24),
    material
)
sphere.position.x = -2;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5,0.2,8,32),
    material
)
torus.position.x = 2;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(),
    material
)

plane.position.y = -1;
plane.rotation.x = Math.PI * -0.5;
plane.scale.x = 7;
plane.scale.y = 7;

scene.add(sphere, cube, torus, plane);


//viewport
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize', () =>
{
    //update viewport
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    //update camera
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(size.width, size,height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

//fullscreen
window.addEventListener('dbclick',() =>
{
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})

//cursor 
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX - 0.5;
    cursor.y = -(event.clientY - 0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 7;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);

//OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    //object 
    sphere.rotation.x = elapsedTime * 0.25;
    sphere.rotation.y = elapsedTime * 0.25;

    cube.rotation.x = elapsedTime * 0.25;
    cube.rotation.y = elapsedTime * 0.25;

    torus.rotation.x = elapsedTime * 0.25;
    torus.rotation.y = elapsedTime * 0.25;

    //update controls
    controls.update();

    //renderer
    renderer.render(scene,camera);

    //animation
    window.requestAnimationFrame(tick);
}
tick();
