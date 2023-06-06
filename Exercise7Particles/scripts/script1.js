import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from "dat.gui";

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//textures
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load('../static/particles/2.png');

//gui
const gui = new dat.GUI();

//scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight('white', 0.1);
const directionalLight = new THREE.DirectionalLight('white', 0.4);
scene.add(ambientLight,directionalLight);

//object
// const particlesGeometry = new THREE.SphereGeometry(1,32,32);
// const particlesMaterial = new THREE.PointsMaterial({
//     size : 0.02,
//     sizeAttenuation : true
// })
// console.log(Math.floor(Math.random() * 10) - 5);
// const particlesGeometry = new THREE.BufferGeometry()
// const particlesMaterial = new THREE.PointsMaterial({
//     size : 0.02,
//     sizeAttenuation : true
// })
// const vertices = new Float32Array(
//     [
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,

//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5,
//         Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5,Math.floor(Math.random() * 10) - 5
//     ]
// )
// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// //points
// const particles = new THREE.Points(particlesGeometry,particlesMaterial);
// scene.add(particles);

const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
    size : 0.1,
    sizeAttenuation : true,
    // color : 'red',
    // map : particlesTexture,
    transparent : true, 
    alphaMap : particlesTexture,
    // alphaTest : 0.001,
    // depthTest : false,
    depthWrite : false,
    blending : THREE.AdditiveBlending,
    vertexColors : true
})
const count = 20000;
//array size = count * 3[3 values required to create a single vertex]
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() -0.5) * 10;
    colors[i] = Math.random();
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors,3))
const particles = new THREE.Points(particlesGeometry,particlesMaterial);
scene.add(particles);

//viewport
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}

//responsiveness - fullscreen
window.addEventListener('resize', () =>
{
    //update viewport
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    //update camera
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();

    //renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
})
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
window.addEventListener('mousemove',(event) =>
{
    cursor.x = event.clientX/ size.width - 0.5;
    cursor.y = -(event.clientY/ size.height - 0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));

//OrbitControls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    //particles
    // particles.rotation.y = elapsedTime * 0.2;
    particlesGeometry.attributes.position.needsUpdate = true;
    for(let i = 0; i < count; i++){
        const i3 = i * 3;
        const x =  particlesGeometry.attributes.position.array[i3]; 
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
    }

    //update controls
    controls.update();

    //renderer
    renderer.render(scene,camera);

    //animation loop
    window.requestAnimationFrame(tick);
}
tick();