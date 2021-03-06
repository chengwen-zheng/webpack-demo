const ZipPlugin = require('./plugins/zip-plugin');
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist')
    },
    mode:'production',
    plugins: [new ZipPlugin({
        filename: 'offline'
    })]
}