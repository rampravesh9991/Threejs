import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//gui
const gui = new dat.GUI();

//scene
const scene = new THREE.Scene();

//Galaxy
const parameters = {};
parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () =>
{
    //destroy old galaxy
    if(points != null){
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }

    //geometry
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    
    for(let i = 0; i < parameters.count; i++){
        const i3 = i * 3;
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin; 
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
        
        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;
        
        // positions[i3 + 0] = (Math.random() - 0.5) * 3;
        // positions[i3 + 1] = (Math.random() - 0.5) * 3;
        // positions[i3 + 2] = (Math.random() - 0.5) * 3;
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    
    //Material
    material = new THREE.PointsMaterial(
        {
            size : parameters.size,
            sizeAttenuation : true,
            depthWrite : false,
            blending : THREE.AdditiveBlending
        }
        )
        
        //Points
        points = new THREE.Points(geometry, material);
        scene.add(points);
    }
    generateGalaxy();
    
    gui.add(parameters, 'count').min(100).max(10000).step(100).onFinishChange(generateGalaxy);
    gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
    gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
    gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
    gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);


/*
//Galaxy
const parameters = {};
parameters.count = 1000;
parameters.size = 0.02;

const generateGalaxy = () =>
{
    //geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    
    for(let i = 0; i < parameters.count; i++){
        const i3 = i * 3;
        
        positions[i3 + 0] = (Math.random() - 0.5) * 3;
        positions[i3 + 1] = (Math.random() - 0.5) * 3;
        positions[i3 + 2] = (Math.random() - 0.5) * 3;
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    
    //Material
    const material = new THREE.PointsMaterial(
        {
            size : parameters.size,
            sizeAttenuation : true,
            depthWrite : false,
            blending : THREE.AdditiveBlending
        }
        )
        
        //Points
        const points = new THREE.Points(geometry, material);
        scene.add(points);
    }
    generateGalaxy();
    
    gui.add(parameters, 'count').min(100).max(10000).step(100).onFinishChange(generateGalaxy);
    gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
*/
    
//lights
const ambientLight = new THREE.AmbientLight('white',0.1);
const directionalLight = new THREE.DirectionalLight('white',0.5);
scene.add(ambientLight,directionalLight);

//viewport
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize', () =>
{
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    //update camera
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

//responsive
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) =>
{
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height -0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//orbitcontrols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    
    //update controls
    controls.update();

    //renderer
    renderer.render(scene, camera);

    //loop
    window.requestAnimationFrame(tick);
}
tick();