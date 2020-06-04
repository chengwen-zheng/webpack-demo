import('./foo.js').then(({foo})=>{
    console.log(foo);
})

import('./bar.js').then((bar,{bar1})=>{
    console.log(bar(),bar1())
})