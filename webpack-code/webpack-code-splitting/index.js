import './bar';
// import {foo} from './foo';
// import {others} from './others';
import('./foo.js').then(({foo})=>{
    console.log(foo);
})

import('./bar.js').then((bar,{bar1})=>{
    console.log(bar(),bar1())
})

if(false){
    console.log('这段代码永远不会执行');
}


console.log(foo);
console.log(others);