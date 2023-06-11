# Ray Caster
### introduction
* A raycaster can cast a ray in a specific direction and test what objects interacts with it
![raycaster](../static/raycaster.PNG);

### usage
* detects if there is a wall in front of the player
* Test if the laser gun hit something
* test if something is currently under the mouse to simulate mouse events
* show an alert message if the spaceship is heading towards a planet

### create the ray caster
* we can use the **set(...)** method to set the **origin** and the **direction** **Vector3**
* The direction has to be normalized

### cast a ray
* two options
  * **intersectObject()** - to test one object
  * **intersectObject()** - to test array of objects

### result of an intersection
* always an array (even if you are testing only one object), because a ray can go through the same object multiple times [thing about donut]
* each items contains useful information
  * **distance** - distance between the origin of the ray and the collision point
  * **face** - what face of the geometry was hit by the ray
  * **faceIndex** - the index of that face
  * **object** - what object is concerned by the collision
  * **point** - a vector3 of the exact position of the collision
  * **uv** - the uv coordinates in that geometry

### test on each frame
* if we want to test things while they are moving, we have to do the test on each frame
* we are going to animate the spheres and turn them blue when they intersect with them
* now lets update the raycaster in the tick function
* update the material of the object property for each item of the **intersects** array