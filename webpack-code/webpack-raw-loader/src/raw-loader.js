const loaderUtils = require("loader-utils");
const path = require('path');
const fs = require('fs');

module.exports = function (source) {
    const {
        name
    } = loaderUtils.getOptions(this);
    // 为了安全起见, ES6模板字符串的问题, 2028的字符为行分隔符.会被浏览器理解为换行，而在Javascript的字符串表达式中是不允许换行的。\u2029 段落分隔符
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
    // this.callback(null, `export default ${json}, ${name}`);    
    // return `export default ${json}, ${name}`;

    const url = loaderUtils.interpolateName(this, '[name].[ext]', source);

    console.log(this);
    // emitFile只有在webpack真实的运行环境才存在。run-loader中没有这个api。
    // this.emitFile((path.join(__dirname, url), source));

    // async task
    const callback = this.async();
    fs.readFile(path.join(__dirname, './demo.txt'), 'utf-8', (err, data) => {
        if (err) {
            callback(err, '');
        }
        callback(null, data);
    });
};