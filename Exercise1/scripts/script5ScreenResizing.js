import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
console.log(THREE);
console.log(gsap);
console.log(OrbitControls);

//Scene 
const scene = new THREE.Scene();

//AxesHelper
const axes = new THREE.AxesHelper(2);
// scene.add(axes);

//Group
const group = new THREE.Group();
scene.add(group);

//white cube
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "white"})
)
group.add(cube1);

//cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
})

//viewport
const size = {
    // width : 800,
    // height : 600
    width : window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize', () =>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectMatrix();

    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})
//FullScreen
window.addEventListener('dblclick',() => 
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen();
    }
    else
    {
        document.exitFullscreen();
    }
})
//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width, size.height);
//Pixel ratio
// renderer.setPixelRatio(window.devicePixelRatio);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

//camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 4;
scene.add(camera);

//Orbit Controls
const controls = new OrbitControls(camera,canvas);
// controls.target.y = 2;
// controls.update();
controls.enableDamping = true;

//Animation & clock
const clock = new THREE.Clock();
const tick = () => {
    const elspsedTime = clock.getElapsedTime();
    // console.log(elspsedTime);

    //update controls
    controls.update(); 

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();