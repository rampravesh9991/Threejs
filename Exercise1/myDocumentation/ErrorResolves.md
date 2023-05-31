Error 1 : script4Controls.js:1 Uncaught SyntaxError: Cannot use import statement outside a module (at script4Controls.js:1:1)
* solution : <script src="./scripts/script4Controls.js" type="module"></script>

Error 2 : 
I was trying to run npm package **three**, 
I tried to use **import** but it showed me error - node module
I used brute force method to run three, by downloading three.min.js in my folder. 
but now one more problem apper, **gsap** it's npm - and i don't know why import is not working on this as well
then i go through three **documentation** there i found **vite** an online server
when i imported three and run vite, **it worked**

> I assume **npm packages** work better on online server like **webpack** or **vite**

Error 3 : [vite] Internal server error: Unable to parse HTML; parse5 error code missing-whitespace-between-attributes
 at C:/Users/coolb/OneDrive/Desktop/Threejs/Exercise/index.html:12:55
 * <script src="/Exercise/scripts/script4Controls.js"" type="module"></script> //.js""
 * error : to load resource: the server responded with a status of 404 (Not Found)// .js file not found
 * solution : solution : <script src="./scripts/script4Controls.js" type="module"></script>

Error 4 : crbug/1173575, non-JS module files deprecated.
> resolved : I am running vite in parent folder, or can say calling vite outside node_modules parent folder / main folder

> resolve 2 : index.html should be in same folder in which node_modules located

Error 5 : caught TypeError: Cannot read properties of null (reading 'width')
> resolved : didn't made canvas element in index.html
> resolved2 : index.html -> wrote canvas class as **class=".webgl"** but i should be writing **class="webgl"** without dot
 
Error 6 : I don't want to push node_modules file?
> solution : create a file name .gitignore and mention the file or folder name in it, which you don't want to push on git. 

> Issue 1 : going back to grand parent folder
> solution : "../../"

Error 7 : const patternTexture = textureLoader.load('../../Exercise3/src/pattern1.png') not working maybe because it is not in parent folder
> resolved : import pattern from '../../Exercise3/src/pattern1.png'; 
> const patternTexture = textureLoader.load(pattern);

Error 8 : [plugin:vite:import-analysis] Failed to parse source for import analysis because the content contains invalid JS syntax. If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
textureLoader.load('file allocation not working')-check exercise4 - script2material
> other solution : use import 
> resolved : it wasn't working previously but now its working, i checked the exact location by using the **import * as image from 'location finder'**
```javascript
const doorColorTexture = textrueLoader.load('../static/textures/door/color.jpg');
console.log(doorColorTexture);
//if no error is shown on the console that means you are good to go
```