import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//Textures
const textureLoader = new THREE.TextureLoader();

//door - textures
const doorColorTexture = textureLoader.load('../static/textures/door/color.jpg');
const doorAlphaTextures = textureLoader.load('../static/textures/door/alpha.jpg');
const doorAmbientTextures = textureLoader.load('../static/textures/door/ambientOcclusion.jpg');
const doorHeightTextures = textureLoader.load('../static/textures/door/height.jpg');
const doorMetalnessTextures = textureLoader.load('../static/textures/door/metalness.jpg');
const doorNormalTextures = textureLoader.load('../static/textures/door/normal.jpg');
const doorRoughnessTextures = textureLoader.load('../static/textures/door/roughness.jpg');

//brick - textures
const brickAmbientOcclusionTexture = textureLoader.load('../static/textures/bricks/ambientOcclusion.jpg');
const brickColorTexture = textureLoader.load('../static/textures/bricks/color.jpg');
const brickNormalTexture = textureLoader.load('../static/textures/bricks/normal.jpg');
const brickRoughnessTexture = textureLoader.load('../static/textures/bricks/roughness.jpg');

//grass - textures
const grassAmbientOcclusionTexture = textureLoader.load('../static/textures/grass/ambientOcclusion.jpg');
const grassColorTexture = textureLoader.load('../static/textures/grass/color.jpg');
const grassNormalTexture = textureLoader.load('../static/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('../static/textures/bricks/roughness.jpg');
grassColorTexture.repeat.set(8,8);
grassAmbientOcclusionTexture.repeat.set(8,8);
grassNormalTexture.repeat.set(8,8);
grassRoughnessTexture.repeat.set(8,8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;


//gui
const gui = new dat.GUI;

//scene
const scene = new THREE.Scene();

//fog
const fog = new THREE.Fog('#262837', 1,15);
scene.fog = fog;

//light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.01);
scene.add(ambientLight);
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.2);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46',1,7);
doorLight.position.set(0,2.2,2.7);

//light - gui
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Night');
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('Moon Light');
gui.add(moonLight.position,'x').min(-3).max(3).step(0.01);
gui.add(moonLight.position,'y').min(-3).max(3).step(0.01);
gui.add(moonLight.position,'z').min(-3).max(3).step(0.01);

//Group House
const house = new THREE.Group();
scene.add(house);
house.add(doorLight); 

//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color : '#b35f45'})
)
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 1/2;
house.add(roof);

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial(
        {
            map : brickColorTexture,
            aoMap : brickAmbientOcclusionTexture,
            normalMap : brickNormalTexture,
            roughnessMap : brickRoughnessTexture
        }
    )
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array),2);
walls.position.y = 1.25;
house.add(walls);

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2),
    new THREE.MeshStandardMaterial(
        {
            map : doorColorTexture,
            transparent : true,
            alphaMap : doorAlphaTextures,
            //for aoMap provide uv coordinates -> displacement
            aoMap : doorAmbientTextures,
            displacementMap : doorHeightTextures,
            displacementScale : 0.1,
            normalMap : doorNormalTextures,
            metalnessMap : doorMetalnessTextures,
            roughnessMap : doorRoughnessTextures
        }
    )
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array),2);
door.position.z = 2 + 0.1;
door.position.y = 1;
house.add(door);

//floor
const material = new THREE.MeshStandardMaterial();

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial(
        {
            map : grassColorTexture,
            aoMap : grassAmbientOcclusionTexture,
            normalMap : grassNormalTexture,
            roughnessMap : grassRoughnessTexture
        }
    )
)
plane.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array),2);
plane.rotation.x = - Math.PI * 0.5;
scene.add(plane);

//bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16);
const bushMaterial = new THREE.MeshStandardMaterial({color : "green"});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5,0.5,0.5);
bush1.position.set(0.8,0.2,2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25,0.25,0.25);
bush2.position.set(1.4,0.1,2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4,0.4,0.4);
bush3.position.set(-0.8,0.1,2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15,0.15,0.15);
bush4.position.set(-1,0.05,2.6);
house.add(bush1, bush2, bush3, bush4)

//grave
const graves = new THREE.Group();
scene.add(graves);
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color : "brown"});

for(let i = 0; i < 50; i++){
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    //create the mesh
    const grave  = new THREE.Mesh(graveGeometry, graveMaterial);

    //position
    grave.position.set(x, 0.3, z);

    //rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    graves.add(grave);
}

// ghosts
const ghost1 = new THREE.PointLight ("#ff00ff",2,3);
scene.add(ghost1);
const ghost2 = new THREE.PointLight ("#00ffff",2,3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight ("#ffff00",2,3);
scene.add(ghost3);

//viewPort
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
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
})
//fullscree
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/ size.height);
camera.position.z = 10;
camera.position.y = 4;
scene.add(camera);

//cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) =>
{
    cursor.x = event.clientX - 0.5;
    cursor.y = -(event.clientY - 0.5);
})

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);

//Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
renderer.setClearColor('#262837');

//Animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    //ghost
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime) * 3;

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) + (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) + (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    //update controls
    controls.update();

    //renderer
    renderer.render(scene,camera);

    //animation
    window.requestAnimationFrame(tick);
}
tick();
