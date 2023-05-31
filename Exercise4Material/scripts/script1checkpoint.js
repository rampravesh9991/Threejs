import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import pattern from '../../Exercise3/src/pattern1.png'; 

console.log(THREE);
console.log(OrbitControls);

//scene
const scene = new THREE.Scene();

//texture
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const patternTexture = textureLoader.load(pattern);
patternTexture.minFilter = THREE.NearestFilter;

//cube geometry
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map : patternTexture})
)
cube.position.x = 3;
scene.add(cube);
//torusgeometry
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(2,1,16,30),
    new THREE.MeshBasicMaterial({map : patternTexture})
)
torus.position.x = -3;
scene.add(torus);
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
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

//full screen
window.addEventListener('dblclick', () =>
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
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = - (event.clientY / size.height - 0.5);
})

//camera 
const camera = new THREE.PerspectiveCamera(100, size.width / size.height);
camera.position.z = 8;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

//orbit control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    controls.update();

    //renderer
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();