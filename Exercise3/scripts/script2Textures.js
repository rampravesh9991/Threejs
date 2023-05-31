import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import imageSource from '../src/apple.png'
console.log(THREE);
console.log(OrbitControls);
console.log(imageSource);
//scene 
const scene = new THREE.Scene();

//textures
//method 1 - backend work
/*
const image = new Image();
const texture = new THREE.Texture(image);
image.addEventListener('load', () =>
{
  texture.needsUpdate = true;
})
image.src = '../src/lion.jpg'
*/
//method 2
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('../src/lion.jpg')

//cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({map : texture})
)
scene.add(cube);

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
window.addEventListener('mousemove',(event) =>
{
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/ size.height, 1,5);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width, size.height);

//orbit controller
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    controls.update();

    //render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();