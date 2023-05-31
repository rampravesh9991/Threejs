import * as THREE from 'three';
console.log(THREE);
//scene
const scene = new THREE.Scene();

//green rectangle
// const geometry = new THREE.BoxGeometry(3,2,1);
// const material = new THREE.MeshBasicMaterial({color : "green"});
// const mesh = new THREE.Mesh(geometry,material);
// mesh.rotation.z = 3.14/2;
// mesh.rotation.y = 0.9;

//Group
const group = new THREE.Group();
scene.add(group);
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color : "hotpink"})
)
group.add(cube1);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color : "lightblue"})
)
cube2.position.x = 2;
group.add(cube2);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color : "lightgreen"})
)
cube3.position.x = -2;
group.add(cube3);
group.position.y = 2

//AxisHelper
const axes = new THREE.AxesHelper(2);
scene.add(axes);

//viewport
const size = {
    width : 800,
    height : 600
}

//camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 5;
camera.position.y = 8
scene.add(camera);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width, size.height);

//Animation - //time ~ milliseconds
/*
let time = Date.now();
const tick = () =>{
    //time
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    console.log(deltaTime);
    //update objects
    group.rotation.y += 0.001 * deltaTime;

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();
*/
//Animation - //clock ~ seconds
const clock = new THREE.Clock();

const tick = () =>{
    //clock
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);

    //update objects
    //not increasing/decreasing speed in group
    //Math.PI = revolution per second
    cube1.rotation.y = elapsedTime * Math.PI * 2;
    cube1.position.y = Math.sin(elapsedTime);
    cube2.position.y = Math.sin(elapsedTime);

    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(cube2.position);

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();