## webpack 基本配置使用

### 初始化：

- 源配置
  - nrm ls : 管理源，查看当前源列表
  - nrm use ： 使用某个源
- 初始化npm环境
   -  npm init -y
- 安装webpack工具
  - npm i webpack --save-dev : 安装webpack环境到本地
  - npm i webpack-cli -D : 安装webpack指令包到本地 

### 执行打包
- npx命令执行器去执行webpack打包指令
  - npx webpack
- 在package.json中的脚本里配置build指令
  - npm run build : 实际执行还是webpack,只是会在本地查找命令来打包
- 不同环境下, 执行打包
  - npx webpack --mode development : 开发环境打包
  - npx webpack --mode production : 生产环境打包
  - 配置了脚本命令 npm run [dev:build | pro:build]

### webpack配置文件 webpack.config.js
```
const path = require('path');
/** es6 之后的commonjs规范写法module.exports */
module.exports = {
  mode: 'production', //生效模式
  entry: './src/index.js', //入口文件
  output: { //输出文件
    path: path.resolve('dist'),
    filename: 'index.js'
  }
}
```

### 版本问题记录
"css-loader": "^5.1.2" // 最新版本是6.*.*以上 建议安装6.以下 否则无法处理background-image url