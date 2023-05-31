import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { gsap } from 'gsap';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);
console.log(gsap);

//Debug UI
const gui = new dat.GUI();
const parameters = {
    //notice the color is not quoted
    color : 0xff8050,
    spin : () =>
    {
        gsap.to(cube1.rotation, {duration : 1, y : cube1.rotation.y + Math.PI * 2})
        // gsap.to(cube1.rotation, {duration : 1, y : 10}) work only 1 time
    }
}
gui
   .addColor(parameters,'color')
   .onChange(() =>
   {
    cube1.material.color.set(parameters.color)
   })
gui 
   .add(parameters, 'spin') //click on it
//scene
const scene = new THREE.Scene();

//cube1 
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color : parameters.color,
        wireframe : true
    })
)
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({
//     color : 'violet',
//     wireframe : true
// })
// const cube1 = new THREE.Mesh(geometry,material);
scene.add(cube1);
//debug mesh {small y} // 3 style 
gui.add(cube1.position, 'x', -3, 3, 0.01);
gui.add(cube1.position, 'y').min(-3).max(3).step(0.01);
gui
.add(cube1.position, 'z')
.min(-3)
.max(3)
.step(0.01)
.name('elevation')

//debug
gui
   .add(cube1, 'visible')
   
gui
   .add(cube1.material, 'wireframe')

//viewport
const size = {
    width : 800,
    height : 600
}

const cursor = {
    x : 0,
    y : 0
}

window.addEventListener('mousemove', (event) => 
{
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/ size.height);
camera.position.z = 3;
scene.add(camera);

//renderer 
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width, size.height);

//OrbitController
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const tick = () =>
{
    controls.update();

    //renderer
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();