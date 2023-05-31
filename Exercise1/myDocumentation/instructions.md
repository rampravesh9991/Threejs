# Transform Objects
### There are 4 positions to transform objects
* position
* scale
* rotation
* quaternion

All classes that inherit from the Object3D possess those properties like PerspectiveCamera or Mesh

Those properties will be compiled in matrices, you don't need to understand matrices

## Move Objects
* Position has three properties
  * x : left-right
  * y : up-down
  * z : front-back

* The distance of 1 unit is arbitrary too, you should think of 1 according to what you are building(1cm, 1m, 1km etc);

> mesh contains object, so the changing position of mesh will change the position of object

```javascript
//positioning
mesh.position.x = 2;
mesh.position.y = -1;
mesh.position.z = 3;
    //or
mesh.position.set(2,-1,3);

//it will give you length from center of the scene to the current position of object
mesh.position.length();
```

* position inherit from Vector3 which has many useful methods, You can get the length of a vector.
* you can get the distance from another Vector3

### How to find the distance from object to camera?
console.log(mesh.position.distanceTo(new THREE.Vector3(0,1,2)))
```javascript
//Initialize camera before this command
console.log(mesh.position.distanceTo(camera.position))
```
you can normalize it's value, normalize : (x,y,z) -> 1

```javascript
mesh.position.normalize();
console.log(mesh.position.length()) //it's 1
```
* You can change all three values of x,y and z at once by using the **set(...)** method

```javascript
mesh.position.set(x,y,z);
```

## Axes Helper
* Positioning things in space can be hard, One good solution is to use the **AxesHelper** to display a colored line for each axis;

```javascript
const axisHelper = new THREE.AxesHelper(2); //2X axis size
scene.add(axisHelper);
```
## Scale Objects
* scale has three properties
  * x
  * y
  * x

```javascript
mesh.scale.x = 1.5;
mesh.scale.y = 0.2;
mesh.scale.z = 1;
    //or
mesh.scale.set(1.5,0.1,1);
```

## Rotate Objects
* With **rotation** or with **quaternion**
* updating one will automatically update the other
* **rotation** also has x, y and z properties but it's Euler.
* when you change the x, y and z properties you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick

```javascript
mesh.rotate.x = 0;
mesh.rotate.y = 1;
mesh.rotate.z = 0;

//mesh.rotation.y = 3.14159; {half rotation, 2*pie = full rotation}
//mesh.rotation.y = Math.PI;
//mesh.rotation.x = Math.PI * 0.25;
//reorder rotation
mesh.rotation.reorder('YXZ');
```

* Be careful, when you rotate on x axis, you might also rotate the other axis.
* The rotation goes by default in the x,y and z order and you can get strange result like an axis is not working anymore
* This is called *gimble lock*
* **How to fix this?**
* You can change this order by using the **reorder(...)** method 
* **object.rotation.reorder('xyz);**
* do it before changing the rotation
  
> Euler is easy to understand but the axis order can be problematic. This is why most engines and 3D softwares use **Quaternion**


## Quaternion
* Quaternion also expresses a rotation, but in more mathematical way
* **Quaternion** updates when you change the **rotation**
  
## Look At This
* **Object3D** instances have a **lookAt(...)** method which rotates the object so that its -z faces the target you provided
* The target must be a **Vector3**

```javascript
//camera looking at the center of the scene, try changing x,y or z value
camera.lookAt(new THREE.Vector3(0,0,0));

//How to look at the object
camera.lookAt(mesh.position);
```

## Combining Transformation
* You can combine position, rotation (or quaternion), and scale in any order
---
---


```javascript
//Script 1
```
## Scene Graph
* You can put objects inside groups and use position, rotation (or quaternion), and scale on those groups
* to do that use **Group** class
  
```javascript
//add group to the scene
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color : "hot pink"})
)
group.add(cube1);
//you can add lots of cubes and add it into group, and then can change the position, scale and rotation of the group
group.position.y = 1;
```
## Animations
* Animating is like doing stop motion
  * move the object 
  * take a picture
  * move the object bit more
  * take a picture 
  * etc

* most screen run at **60 frames** per second (FPS),but not always 
* Your animation must look like the same regardless of the framerate
* we need to update objects and do a render on each frame
* we are going to do that in a function and call this function with

```javascript
window.requestAnimationFrame(...)
```
## Request Animation Frame 
* The purpose of **requestAnimationFrame** is to call the function provided on the next frame
* We are going to call the same function on each new frame.
* Create a **tick** function and call it
* In the function call it again but using

```javascript
//Animation - Infinite loop
const tick = () =>{
  console.log("tick");
  window.requestAnimationFrame(tick);
}
tick();
```

```javascript
//Animation - group of boject
const tick = () =>{
    //update objects
    group.position.x += 0.01

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();
```
> Note : Unfortunately the higher the framerate, the faster the rotation

## Time : Adaptation to the FrameRate
* We need to know how much time it's been since the last tick
* Use **Date.now()** to get the current **timestamp**

```javascript
//Animation - //time ~ milliseconds
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
```
> Note : the cube will rotate at the same speed, regardless of the framerate

## Clock : Adaptation to the FrameRate
* Three.js has a built-in solution named **Clock**
* Instantiate a **Clock** and use its **getElapsedTime()** method

```javascript
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
    cube3.position.y = Math.sin(elapsedTime);
    cube3.position.x = Math.cos(elapsedTime);
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(cube2.position);

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();
```
* Another method is **getDelta(...)**, but do not use it
---
---


```javascript
//Script 2
```
## Using a Library
> why? if you want to have more control, create tweens, create timelines, etc you can use library like **GSAP**

* Add GSAP to the dependencies with **npm install --save gsap@3.5.1**

## Magic of Documentation ~ online server problem resoved - webpack/vite
```bash
npm install --save three
//in.js file
import * as THREE from 'three';

//like a webpack online server
npm install --save-dev vite
```
```
npm install --save gsap
//in .js file
import { gsap } from "gsap";
//run server
npx vite
```
* create a **tween** with gsap
```javascript
//animation will start after 1 sec and run for 1 sec and cube will move to position x
gsap.to(cube2.position, { duration : 1, delay : 1, x : 2})
//after 1st second cube will move to pos 0
gsap.to(cube2.position, { duration : 1, delay : 2, x : 0})
```
> GreenSock has his own tick, so you don't need to tell him

## Choosing the right solution
* it depends on your project and your preferences
---
---
```javascript
                  //Script 3
```
## Camera
* we created a **Perspective camera**, but there are other types of cameras
* **Camera** is an abstract class You're not supposed to use it directly

### Array Camera ->pubg, mini Military etc
* **ArrayCamera** render the scene from multiple cameras on specific areas of the render

### Stereo Camera -> Parallax Effect, VR
* **StereoCamera** render the scene through two cameras that mimic the eye to create a **Parallax Effect**
* use with devices like VR headset, red and blue glasses or cardbord

### Cube Camera -> Environment map
* The **CubeCamera** do 6 renderes, each one facing a different direction.
* Can render the surrounding for things like **environment map**, **reflection** or **shadow map**

### Orthographic Camera
* **OrthographicCamera** render the scene without perspective

### Perspective Camera
* **PerspectiveCamera** render the scene with perspective

>We are going to use the **OrthographicCamera** and **PerspectiveCamera**

### Perspective Camera :
We didn't use all the possible parameters **PerspectiveCamera**
* first parameter
  * Field of view
    * Verticle vision angle
    * in degrees
    * also called *fov*
  * Aspect Ratio
    * The width of the render divided by the height of the render.
  * Near and Far
    * The 3rd and 4th parameters called **near** and **far**, correspond to how close and how far the camera can see.
    * Any object or part of the object closer then *near* or further than *far* will not show up
```javascript
const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 1, 1000);
//(degree, width/height, min, max)
console.log(camera.position.length());
//set this position on max, or lower it
```
> Note : don't use extreme values like **0.0001** and **999999** to prevent z - fighting.

### Orthographic Camera
**OrthographicCamera** differs from **PerspectiveCamera** by it's lack of perspective
Objects has same size regardless of their distance to the camera

* Parameters
  * Instead of a field of view, we provide how far the camera can see in each direction(**left**, **right**, **top** and **bottom**);
  * then the **near** and **far**

```javascript
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100);
//(left,right,top,bottom,near,far)
```
> Notice : The cube looks flat, It's because we are rendering a square area into a rectangle canvas, we need to use the canvas ratio (width/height);

* Create a **aspectRatio** variable

### Custom Controls
*let's get back to **PerspectiveCamera**

* We want to control the camera position with the mouse
  * Comment the **OrthographicCamera**
  * Uncomment the **PerspectiveCamera**
  * Move the camera so it faces the cube
  * remove the mesh rotation in the tick function

* First we need the mouse coordinates on the page
* Listen to the **mousemove** event with **addEventListener** and retrieve the **event.clientX** and **event.clientY**
```javascript
//cursor
window.addEventListener('mousemove',(event) => {
    console.log(event.clientX, event.clientY);
})
```
* Those values are in pixel and it's better to adjust them
* We want a value with an amplitude of 1 and that can be both negative and positive
> note : pixel calculate whole screen, this is a problem

```javascript
//cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / size.width;
    console.log(cursor);
})
```
* Now while the mouse hover hover canvas it will be 0 < 1;
* but i want to left side to be negative and right side positive;

```javascript
//cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = event.clientY / size.height - 0.5;
    console.log(cursor);
})
```
> Range left : -0.5 < 0 && right: 0 > 0.5

* Update the camera **Position** in the **tick** function with the cursor coordinates
* The y axis must be negated because the cursor.y is positive when going down while the three.js y is positive when going up

```javascript
window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / size.width - 0.5;
    cursor.y = -(event.clientY / size.height - 0.5);
    console.log(cursor);
})
```
```javascript
//Animation  && clock
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //update objects
    // cube2.rotation.y = elapsedTime;

    //update Camera
    camera.position.x = cursor.x * 10;
    camera.position.y = cursor.y * 10;
    // camera.lookAt(new THREE.Vector3());
    //or
    camera.lookAt(cube2.position);

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();
```
> Notice : all seems good by camera still cannot see behind the cube;
* move camera around the center of the scene by using Math.sin(...), Math.cos(...) and Math.PI

> Error : Math.sin() caused camera to go inside cube and i was unable to see anything. 
> camera.position.x = Math.sin(cursor.x) * 2;
> Now it's visible

```javascript
//Animation  && clock
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //update objects
    camera.position.x = Math.sin(cursor.x * 10) * 3;
    camera.position.z = Math.cos(cursor.x * 10) * 3;
    camera.lookAt(cube2.position);

    //render
    renderer.render(scene,camera);
    window.requestAnimationFrame(tick);
}
tick();
```
> issue : we only want 4 face not 6 face;


```javascript
camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
camera.position.y = cursor.y * 5;
```
* three.js has integrats multiple classes called control to help you do the same and much more.

## Built in Controls
* There are many controls in the three.js Documentation

### Device Orientation Control
* **DeviceOrientationControl** will automatically retrieve the device orientation if your device, OS, and browser allow it and rotate the camera accordingly
* Useful it to create immersive universe or VR experiences

### Fly Controls
* **FlyControls** enable moving the camera like if you were on a spaceship. You can rotate on all 3 axes, go forward and go backward

### First Person Control
* **FirstPersonControl** is like **FlyingControls**, but with a fixed up axis, doesn't work like in "FPS" games

### Pointer Lock Controls
* **PointerLockControls** uses the ** pointer lock javascript API**, Hard to use and almost only handles the pointer lock and camera rotation

### Orbit Controls
* **OrbitControls** similar to the controls we made with more features.

### Trackball Controls
* **Trackball Controls** is like **Orbit Controls** without the verticle angle limit.

### Transform Controls
* **TransformControls** has nothing to do with camera

### Drag Controls
* **DragControls** has nothing to do with camera

> We will only use the **OrbitControls** but feel free to test the other classes