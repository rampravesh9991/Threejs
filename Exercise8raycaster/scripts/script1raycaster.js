import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log(THREE);
console.log(dat);
console.log(OrbitControls);

//scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight('white', 0.1);
const directionalLight = new THREE.DirectionalLight('white', 0.4);
scene.add(ambientLight, directionalLight);

//object
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32,32),
    new THREE.MeshStandardMaterial(
        {
            // wireframe : true
        }
    )
)
const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32,32),
    new THREE.MeshStandardMaterial(
        {
            // wireframe : true
        }
    )
)
const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32,32),
    new THREE.MeshStandardMaterial(
        {
            // wireframe : true
        }
    )
)
object1.position.x = -2;
object3.position.x = 2;
scene.add(object1, object2, object3);

//raycaster
const raycaster = new THREE.Raycaster();


/*
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();

raycaster.set(rayOrigin, rayDirection);

const intersect = raycaster.intersectObject(object2);
console.log(intersect);

const intersects = raycaster.intersectObjects([object1, object2, object3])
console.log(intersects);
*/


//viewport
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}

//screen responsiveness
window.addEventListener('resize', () =>
{
    //update viewport
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    //updatecamera
    camera.aspect = size.width / size.height;

    //object responsiveness
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
})
const mouse = new THREE.Vector2()
window.addEventListener('mousemove',(event) =>
{
    mouse.x = event.clientX / size.width * 2 - 1;
    mouse.y = -(event.clientY / size.height * 2 - 1);
    // console.log(mouse.y);
})
window.addEventListener('click',() =>
{
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case object1:
                console.log('click on object 1');
                break;
            case object2:
                console.log('click on object 2');
                break;
            case object3:
                console.log('click on object 3');
                break;
        }
    }
})

//fullscreen
window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement){
        canvas.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
})


//camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const clock =  new THREE.Clock();
let currentIntersect  = null;
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    //animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

    //cast a ray
    raycaster.setFromCamera(mouse, camera);
    const objectToTest = [object1, object2, object3];
    const intersects = raycaster.intersectObjects(objectToTest);

    for(const object of objectToTest)
    {
        object.material.color.set('#ff0000');
    }

    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff');
    }

    /*
    //cast a ray
    const rayOrigin = new THREE.Vector3(-3, 0, 0);
    const rayDirection = new THREE.Vector3(1, 0, 0);
    rayDirection.normalize();

    raycaster.set(rayOrigin, rayDirection);

    const objectToTest = [object1, object2, object3];
    const intersects = raycaster.intersectObjects(objectToTest);
    
    //color changing ball   
    for(const object of objectToTest)
    {
        object.material.color.set('#ff0000');
    }

    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff');
    }
    */

    //mouseenter, mouseleave
    if(intersects.length)
    {
        if(!currentIntersect)
        {
            console.log('mouseenter');
        }
        currentIntersect = intersects[0];
    }
    else
    {
        if(currentIntersect)
        {
            console.log('mouseleave');
        }
        currentIntersect = null;
    }

    //update controls
    controls.update();

    //renderer
    renderer.render(scene, camera);

    //loop
    window.requestAnimationFrame(tick);
}
tick()
