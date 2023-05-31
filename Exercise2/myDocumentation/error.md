script2.geometry.js
* Error1 : caught TypeError: THREE.Geometry is not a constructor
* **resolved :** THREE.GEometry() was replaced by THREE.BufferGeometry();
* This is one more reason to read documentation

* Uncaught RangeError: Maximum call stack size exceeded
> issue : window.requestAnimationFrame(tick());
> resolved : window.requestAnimationFrame(tick);

> issue : git related -------------------
```bash 
$ git push
fatal: The current branch three has no upstream branch.
To push the current branch and set the remote as upstream
```
> **resolved** I was in child branch and trying to push it in main branch.

> $ git push origin branchName

* Error 2 : script2material.js:87 Uncaught TypeError: Class constructor OrbitControls cannot be invoked without 'new'
> resolved : i forgot mentioning new in OrbitControls