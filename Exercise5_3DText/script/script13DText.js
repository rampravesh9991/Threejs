import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

console.log(THREE);
console.log(OrbitControls);
console.log(dat);

//Scene 
const scene = new THREE.Scene();

//axesHelper
const axes = new THREE.AxesHelper();
scene.add(axes);

//texture
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('../static/textures/3.png');

//light
const pointLight = new THREE.PointLight('white', 0.5);
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(pointLight,ambientLight);

//Fonts
const fontLoader = new FontLoader();
fontLoader.load(
    '../static/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        console.log(font);
        const textGeometry = new TextGeometry(
            'Divyanshi',
            {
                font : font,
                size : 0.5,
                height : 0.2,
                curveSegments : 3,
                bevelEnabled : true,
                bevelThickness : 0.03,
                bevelSize : 0.02,
                bevelOffset : 0,
                bevelSegments : 1
            }
        );
        textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     //bevel size and bevel thickness
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )
        //or
        textGeometry.center();
        console.log(textGeometry.boundingBox);

        const material = new THREE.MeshMatcapMaterial({matcap : matcapTexture});
        // const textMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture});
        // textMaterial.wireframe = true;
        const text = new THREE.Mesh(textGeometry, material);
        // text.position.x = -1.5;
        scene.add(text);   
        
        //optimise
        //for 100 taking 2ms and for 1000 8ms and for 10K 52ms
        const donutGeometry = new THREE.TorusGeometry(0.3,0.2, 20, 45);
        // const donutMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture});
        console.time('donuts');

        //create 100 donuts
        for(let i = 0; i < 100; i++){
            //for 100 taking 49ms and for 1000 219ms and for 10K 3144ms
            // const donutGeometry = new THREE.TorusGeometry(0.3,0.2, 20, 45);
            // const donutMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture});
            // const donut = new THREE.Mesh(donutGeometry, donutMaterial);
            const donut = new THREE.Mesh(donutGeometry, material);
            //add randomness in their position
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            //adding random rotation to each
            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            //adding random scale
            /*
            //not desired output
            donut.scale.x = Math.random()
            donut.scale.y = Math.random()
            donut.scale.z = Math.random()
            */

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);
            scene.add(donut);
        }
        console.timeEnd('donuts');
    }
)

//object
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshStandardMaterial()
)
// scene.add(cube);

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
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

//cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX - 0.5;
    cursor.y = -(event.clientY - 0.5);
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);

//Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//animation - clock
const clock = new THREE.Clock();
const tick = () =>
{
    //update OrbitControls
    controls.update();

    //render
    renderer.render(scene, camera);

    //animation loop
    window.requestAnimationFrame(tick);
}
tick();