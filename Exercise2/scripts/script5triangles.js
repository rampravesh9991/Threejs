import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//scene
const scene = new THREE.Scene();

//group
const group = new THREE.Group();
// scene.add(group);

//cube1
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : 'green'})
)
group.add(cube1);

//------------------Create Bunch of Triangles------------------
const geometry = new THREE.BufferGeometry();
const count = 50; //total no of triangles

//triangles * axis * vertices
const positionsArray = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++){
    positionsArray[i] = (Math.random() - 0.5) * 4;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({
    color : 'violet',
    wireframe : true
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width,  size.height);

//OrbitController
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animate - clock
const clock = new THREE.Clock();
const tick = () =>
{
    controls.update();

    //renderer 
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();