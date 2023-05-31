import * as THREE from "three";
import { gsap } from "gsap";

console.log(THREE);
console.log(gsap);
//scene
const scene = new THREE.Scene();
//AxesHelper
const axes = new THREE.AxesHelper(2);
scene.add(axes);

//group
const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "blue"})
)
cube1.position.x = 2;
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "red"})
)
cube2.position.x = -2
group.add(cube2);

//viewport
const size = {
    width : 800,
    height : 600
}

//camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 4;
scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width,size.height);

//gsap -> tween
gsap.to(cube2.position, { duration : 1, delay : 1, x : 2})
gsap.to(cube2.position, { duration : 1, delay : 2, x : 0})

//Animation & clock
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);

    //update objects
    cube1.rotation.y = elapsedTime * Math.PI;
    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();