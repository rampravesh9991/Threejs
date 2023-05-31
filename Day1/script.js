//it will show us the we have access to three js object
console.log(THREE);

const scene = new THREE.Scene();

//Red Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color : 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes - viewport
const sizes = {
    width : 800,
    height : 600
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); //degree, viewport
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
console.log(canvas); 
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera)