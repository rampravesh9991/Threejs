import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
console.log(THREE);
console.log(OrbitControls);
console.log(imageSource);
//scene 
const scene = new THREE.Scene();

//textures
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () =>
{
  console.log("Loading started");
}
loadingManager.onLoaded = () =>
{
  console.log('loading finished');
}
loadingManager.onProgress = () =>
{
  console.log('loading progressing');
}
loadingManager.onError = () =>
{
  console.log('loading error');
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const lionTexture = textureLoader.load('../src/lion.jpg')
const appleTexture = textureLoader.load('../src/apple.png')
const bitCoinTexture = textureLoader.load('../src/bitcoin.jpg')
const patternTexture = textureLoader.load('../src/minecraft.png')
// patternTexture.repeat.x = 2;
// patternTexture.repeat.y = 3;
patternTexture.wrapS = THREE.RepeatWrapping;
patternTexture.wrapT = THREE.RepeatWrapping;
// patternTexture.rotation = Math.PI * 0.25;
//corner design
// lionTexture.wrapS = THREE.RepeatWrapping;
// lionTexture.wrapT = THREE.RepeatWrapping;
// lionTexture.offset.x = 0.5;
// lionTexture.offset.y = 0.5;
// patternTexture.minFilter = THREE.NearestFilter;//for big pixels
patternTexture.magFilter = THREE.NearestFilter; //for smaller pixels

//cube
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1,1,1),
    new THREE.MeshBasicMaterial({map : patternTexture})
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
const camera = new THREE.PerspectiveCamera(75, size.width/ size.height, 0.25,5);
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