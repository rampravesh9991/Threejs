console.log(THREE);

//Scene
const scene = new THREE.Scene();

//yello cuble
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color : 'yellow'});
const mesh = new THREE.Mesh(geometry, material);

//Positioning
// mesh.position.x = -1;
// mesh.position.y = -2;
// mesh.position.z =-1;
mesh.position.set(-1,-2,-1);
scene.add(mesh);
console.log(mesh.position.length());

//Scale
// mesh.scale.x = 1.5;
// mesh.scale.y = 0.1;
// mesh.scale.z = 1;

mesh.scale.set(4,0.1,1);

//rotation
mesh.rotation.x = 0;
mesh.rotation.y = 0.4;
mesh.rotation.z = 0;

//mesh.rotation.y = 3.14159; {half rotation, 2*pie = full rotation}

//AxisHelper
const axisHelper = new THREE.AxesHelper(2); // 2X axis size
scene.add(axisHelper);

//viewport
const size = {
    width : 800,
    height : 600 
}

//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);
// camera.lookAt(new THREE.Vector3(2,1,-1));
camera.lookAt(mesh.position);

console.log(mesh.position.distanceTo(camera.position)); // distance from object to camera

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width, size.height);
renderer.render(scene,camera);