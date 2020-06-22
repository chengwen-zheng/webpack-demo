import { helloworld } from './helloworld';
import { common } from '../../common';
document.write(helloworld());
common()
if (module.hot) {
    module.hot.accept('./helloworld.js', function() { // 告诉 webpack 接受热替换的模块
        console.log('Accepting the updated printMe module!');
        document.write(helloworld());
    })
}