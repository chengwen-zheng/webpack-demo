'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasureWebpackPlugin();
// const {
//     BundleAnalyzerPlugin
// } = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');
const threadLoader = require('thread-loader');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
// const ImageWabpackLoader = require('image-webpack-loader')

const PATHS = {
    src: path.join(__dirname, 'src')
};
  

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];

            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const {
    entry,
    htmlWebpackPlugins
} = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'none',
    module: {
        rules: [{
                test: /.js$/,
                use: [
                    // 'babel-loader',                    
                    // 'eslint-loader'
                    // 'happypack/loader'
                    {
                        loader: "thread-loader",
                        options: {
                            // the number of spawned workers, defaults to (number of cpus - 1) or
                            // fallback to 1 when require('os').cpus() is undefined
                            workers: 5
                          }
                    },
                    {
                        loader:'babel-loader?cacheDirectory=true'
                    }
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }, 
                // {
                //     loader: 'image-webpack-loader',
                //     options: {
                //       mozjpeg: {
                //         progressive: true,
                //         quality: 65
                //       },
                //       // optipng.enabled: false will disable optipng
                //       optipng: {
                //         enabled: false,
                //       },
                //       pngquant: {
                //         quality: [0.65, 0.90],
                //         speed: 4
                //       },
                //       gifsicle: {
                //         interlaced: false,
                //       },
                //       // the webp option will enable WEBP
                //       webp: {
                //         quality: 75
                //       }
                //     }
                //   }
            ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8][ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [{
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDOM',
        //         },
        //     ]
        // }),
        new FriendlyErrorsWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        // new HappyPack({
        //     // 3) re-add the loaders you replaced above in #1:
        //     loaders: [ 'babel-loader' ]
        // }),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error');
                    process.exit(1);
                }
            })
        },
        // new webpack.DllReferencePlugin({
        //     manifest: require('./build/library/library.json')
        // }),
        new HardSourceWebpackPlugin(),
        // new PurgecssPlugin({
        //     paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        // })
    ].concat(htmlWebpackPlugins),
    // optimization: {
    //     splitChunks: {
    //         minSize: 0,
    //         cacheGroups: {
    //             commons: {
    //                 name: 'commons',
    //                 chunks: 'all',
    //                 minChunks: 2
    //             }
    //         }
    //     }
    // }
    // stats: 'errors-only',
    optimization:{
        minimizer: [
            new TerserWebpackPlugin({
                parallel: 4,
                cache: true
            })
        ]
    },
    resolve:{
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
        },
        extensions: ['.js'],
        mainFields: ['main']
    }
};