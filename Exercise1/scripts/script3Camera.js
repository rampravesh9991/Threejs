import * as THREE from "three";
import {gsap} from "gsap";

console.log(THREE);
console.log(gsap);

//cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
    // console.log(cursor);
})

//scene
const scene = new THREE.Scene();

//group
const group = new THREE.Group();
scene.add(group);

//axes helper
const axes = new THREE.AxesHelper(2);
scene.add(axes);

//green cube
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "green"})
)
cube1.position.x = -2;
// group.add(cube1);

//orange cube
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "orange"})
)
group.add(cube2);

//lime cube
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : "lime"})
)
cube3.position.x = 2;
// group.add(cube3);

//viewport
const size = {
    width : 800,
    height : 600
}

//camera 
const camera = new THREE.PerspectiveCamera(75, size.width/size.height,1,1000);
// const aspectRatio = size.width/size.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,1,-1,0.1,100);
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width, size.height);

//Animation  && clock
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //update objects
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 5;
    camera.lookAt(cube2.position);

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();