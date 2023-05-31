import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log(THREE);
console.log(OrbitControls);

//canvas
const canvas = document.querySelector('.webgl');

//scene 
const scene = new THREE.Scene();

//axes
const axes = new THREE.AxesHelper(2);
scene.add(axes);

//green cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color : 'green'});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//viewport
const size = {
    width : 800,
    height : 600
}

//cursor 
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
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;
scene.add(camera);

//Orbit controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width, size.height);

//Animation - clock
const clock = new THREE.Clock();
const tick = () => 
{
    const elapsedTime = clock.getElapsedTime();

    //update controls
    controls.update();

    //update renderer
    renderer.render(scene,camera);

    //animation loop
    window.requestAnimationFrame(tick);
}
tick();