wepbck的使用

## webpack资源的内联

1. 资源内联的好处
代码层面：
+ ⻚⾯框架的初始化脚本
+ 上报相关打点
+ css内联避免⻚⾯闪动

请求层面：减少HTTP网络请求数
+ ⼩图⽚或者字体内联 (url-loader)


## source map
1. 线上排查问题的时候可以将 sourcemap 上传到错误监控系统.

2. [source map科普文](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

3. source map关键字：
    + eval: 使⽤eval包裹模块代码
    + source map: 产⽣.map⽂件
    + cheap: 不包含列信息
    + inline: 将.map作为DataURI嵌⼊，不单独⽣成.map⽂件
    + module:包含loader的sourcemap

## 提取页面公共资源
1. 基础库分离：利用CDN，不打入bundle。(使⽤ `html-webpack-externals-plugin`);
![CDN打包](./images/html-webpack-externals-plugin.png)

2. [SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/#root)分离js基础包。
`test`: 匹配出需要分离的包
![test-api](./images/test-api.png)

3. 公共脚本分离：[SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/#root)。
基本配置：
* `chunks` 参数说明
    + `async` 异步引⼊的库进⾏分离(默认)
    + `initial` 同步引⼊的库进⾏分离
    + `all` 所有引⼊的库进⾏分离(推荐)


3. 页面公共文件分离：[SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/#root)。
![test-api](./images/common-file.png)