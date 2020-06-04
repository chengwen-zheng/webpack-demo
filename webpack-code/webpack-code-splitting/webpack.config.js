var path = require("path");

module.exports = {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        chunkFilename: '[name].bundle.js'
    },
    // 这里如果不设置成none。webpack则默认设成production。则有些功能默认开启。https://webpack.js.org/configuration/mode/
    mode: 'none'
};