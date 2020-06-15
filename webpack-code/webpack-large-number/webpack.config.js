var TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'none', // 这里设置为none，根据加载的js的种类来判断是否压缩。
    entry: {
        'large-number': './src/index.js',
        'large-nunber.min': './src/index.js'
    },
    output:{
        filename: '[name].js',
        library: 'largeNumber', // library导出的入口对象，比如jquery的$,loadsh的_。
        // UMD (Universal Module Definition), 希望提供一个前后端跨平台的解决方案(支持AMD与CommonJS模块方式)。
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            })
        ]
    }
}