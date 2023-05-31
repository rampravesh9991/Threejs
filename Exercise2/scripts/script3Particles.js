import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log(THREE);
console.log(OrbitControls);

//canvas
const canvas = document.querySelector('.webgl');

//scene 
const scene = new THREE.Scene();

//green cube
// const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);

//creating own geometry
const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2

	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const material = new THREE.MeshBasicMaterial({
    color : 'green',
    wireframe : true
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

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
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
})
//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 4;
scene.add(camera);

//Orbit controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width, size.height);

//Animation - clock
const clock = new THREE.Clock();
const tick = () => 
{
    const elapsedTime = clock.getElapsedTime();

    //update controls
    controls.update();

    //update renderer
    renderer.render(scene,camera);

    //animation loop
    window.requestAnimationFrame(tick);
}
tick();