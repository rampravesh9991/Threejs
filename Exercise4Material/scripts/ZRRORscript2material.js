import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

//importing door textures
import dColor from '../static/textures/door/color.jpg';
import dAlpha from '../static/textures/door/alpha.jpg';
import dAmbient from '../static/textures/door/ambientOcclusion.jpg';
import dHeight from '../static/textures/door/height.jpg';
import dNormal from '../static/textures/door/normal.jpg';
import dMetalness from '../static/textures/door/metalness.jpg';
import dRoughness from '../static/textures/door/roughness.jpg';

//importing matcaps textures
import mcaps1 from '../static/textures/matcaps/1.png';
import mcaps2 from '../static/textures/matcaps/2.png';
import mcaps3 from '../static/textures/matcaps/3.png';
import mcaps4 from '../static/textures/matcaps/4.png';
import mcaps5 from '../static/textures/matcaps/5.png';
import mcaps6 from '../static/textures/matcaps/6.png';
import mcaps7 from '../static/textures/matcaps/7.png';
import mcaps8 from '../static/textures/matcaps/8.png';

//importing gradient textures
import grad1 from '../static/textures/gradients/3.jpg';
import grad2 from '../static/textures/gradients/5.jpg';

console.log(THREE);
console.log(OrbitControls);

//textures
const loadingManager = new THREE.LoadingManager();
const textrueLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textrueLoader.load(dColor);
const doorAlphaTexture = textrueLoader.load(dAlpha);
const doorAmbientOcclusionTexture = textrueLoader.load(dAmbient);
const doorHeightTexture = textrueLoader.load(dHeight);
const doorNormalTexture = textrueLoader.load(dNormal);
const doorMetalnessTexture = textrueLoader.load(dMetalness);
const doorRoughnessTexture = textrueLoader.load(dRoughness);

const matcapsTesture = textrueLoader.load(mcaps2);

const gradientTexture = textrueLoader.load(grad1);
//scene
const scene = new THREE.Scene();

//GUI
const gui = new dat.GUI();

//objects
const material = new THREE.MeshMatcapMaterial();
// material.shininess = 100
//specular : color of reflection light
material.specular = new THREE.Color(0x1188ff);
material.metalness = 0.45;
material.roughness = 0.65;
material.map = matcapsTesture;

//material -> gui
gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,16,16),
    material
)
sphere.position.x = -1.5;
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,16,32),
    material
)
torus.position.x = 1.5;
scene.add(sphere, plane,torus)

//Ambient light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

//point light
const pointLight = new THREE.PointLight('white', 3);
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
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 2;
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
    const elapsedTime = clock.getElapsedTime();
    sphere.rotation.x = elapsedTime;
    plane.rotation.x = elapsedTime;
    torus.rotation.x = elapsedTime;

    sphere.rotation.y = elapsedTime;
    plane.rotation.y = elapsedTime;
    torus.rotation.y = elapsedTime;

    //orbit controls update
    controls.update();

    //renderer
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();