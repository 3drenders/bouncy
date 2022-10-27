Bouncy
======
_a bouncy ball loading animation_

![Bouncy demo gif](demo/demo.gif)

### Live demo
[Try it out @ codesandbox.io](https://codesandbox.io/p/github/3drenders/bouncy/bouncy?file=%2FREADME.md)

### How to use
The project is currently _only build for Vue3 applications_. In order to use it, create a new file called bouncy-loader.vue in the components folder. Fill it with the following files contents: 
```
https://github.com/3drenders/bouncy/blob/main/src/components/bouncy-loader.vue
```

Up next, include it in the file you wish to use it using the follow import:
```javascript
import bouncyLoader from "./components/bouncy-loader.vue";
```

Lastly, you need to use the component in the template somewhere. It looks like this:
```html
<bouncy-loader
    :loading="true"
    :colors="colors"
    :config="config"
/>
```

### Customization

The first two props are required props. 

**:loading**
This prop is a boolean, that defaults to _true_. When set to true, the animation is visible and active. When set to false, the component is removed and hidden.

**:colors**
Colors is a Array of strings, formatted as HEX color codes. These are the colors the loader will use for the ball.
Example:
```javascript
const colors = [ "#ff0000 ", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee",];
```
Note: _if you want to use a single color, the colors object still needs to be an array, just with one item_

**:config**
The config prop is optional, but allows you to customize what the bouncy ball looks like. The following options are supported
```javascript
const config = {
  size: 10, // default size: when set to 10, the ball will be 100px by 100px
  bounciness: 10, // default bounciness
  speed: 10, // default speed: 500ms or 0.5 seconds
  rainbow: false, // rainbow mode: when true the ball switches color on each bounce
};
```

# Local development
```
1. Clone the project at Github: https://github.com/3drenders/bouncy
2. Run npm install
3. npm run serve to start development server @ localhost:3000
4. Repo includes demo page with mock data in App.vue
```
