import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//textures loader
const textrueLoader = new THREE.TextureLoader();
//loading textures
const doorColorTexture = textrueLoader.load('../static/textures/door/color.jpg');

//Environment texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
//loading environment texture [p = +ve in graph and n = -ve in graph]
const environmentMapTexture = cubeTextureLoader.load(
    [
        '../static/textures/environmentMaps/0/px.jpg',
        '../static/textures/environmentMaps/0/nx.jpg',
        '../static/textures/environmentMaps/0/py.jpg',
        '../static/textures/environmentMaps/0/ny.jpg',
        '../static/textures/environmentMaps/0/pz.jpg',
        '../static/textures/environmentMaps/0/nz.jpg'
    ]
);

//scene
const scene = new THREE.Scene();

//GUI
const gui = new dat.GUI();

//objects
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh();
sphere.geometry = new THREE.SphereGeometry(0.5, 64, 64);
sphere.material = material;
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material
)

const geo = new THREE.TorusGeometry(0.3, 0.2, 64, 128);
const torus = new THREE.Mesh(geo, material);
torus.position.x = 1.5;

scene.add(sphere,plane,torus);

//uv coordinates
console.log(torus.geometry);
// 2 for no of values in single vertex
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2)); 

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)); 

torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2)); 

//light : ambient, point
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight('white', 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// viewport -> fullscreen
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
    cursor.y = -(event.clientY / size.height - 0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 10);
camera.position.z = 5;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);

//orbitControls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

//Animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elspsedTime = clock.getElapsedTime();
    //orbitcontrols
    controls.update();

    //object animation
    sphere.rotation.x = elspsedTime * 0.25;
    sphere.rotation.y = elspsedTime * 0.25;

    plane.rotation.x = elspsedTime * 0.25;
    plane.rotation.y = elspsedTime * 0.25;

    torus.rotation.x = elspsedTime * 0.25;
    torus.rotation.y = elspsedTime * 0.25;

    //animation
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();