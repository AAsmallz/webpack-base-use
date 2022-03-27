const path = require('path');
/** glob 查找文件的插件 */
const glob = require('glob');
/** 抽离css为单独文件的插件 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/** 优化压缩css文件的插件 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
/** tree shaking 去掉没有被其它文件引入的css插件 */
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
/** 自动清除打包前后不需要的文件 */
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/** 打包文件自动创建并引入到index.html中的插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** es6 之后的commonjs规范写法module.exports */
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'scripts/index.js',
    // publicPath: '/'
  },
  module: {
    rules: [
      /** 打包成Url链接的格式 */
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'images',
      //       limit: 50 * 1024 // 文件小于50kb, 则会转换为base64格式进加载
      //     }
      //   }
      // },
      /** 打包成文件的格式 */
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: '../images' // 必须设置相对路径 否则图片路径在dist/css下
              // limit: 50 * 1024 // 文件小于50kb, 则会转换为base64格式进加载
            }
          }
        ]
      },
      /** 加载css到style中 */
      // {
      //   test: /\.css$/i,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //       options: {
      //         /** insert 控制插入元素的位置 */
      //         insert: function(element){
      //           /** 获取title元素 */
      //           let title = document.querySelector('title');
      //           /** 获取缓存z中的style标签 */
      //           let cache = window.insertStyleCache;
      //           /**
      //            * 存在cache，则该次加载的css放在上一个style元素和head之间
      //            * 不存在，则第一次添加style元素，添加在title元素和head之间
      //            */
      //           if( cache ) {
      //             document.head.insertBefore( element, cache.nextElementSibling );
      //           }else {
      //             document.head.insertBefore( element, title.nextElementSibling );
      //           }
      //           /** 将每次style标签存入缓存 */
      //           window.insertStyleCache = element;
      //         }
      //       }

      //   }, 'css-loader']
      // }

      /** 加载css为单独文件 */
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      /** 加载less文件插件 | 如果使用sass也是这样配置loader */
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    /** 抽离css的路径和文件名 */
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    /** 以某个文件为参考，对于没有引用的css，则不会出现在打包的样式文件中 */
    new PurgeCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/index.html')),
    }),
    /** 自动清除打包前后的垃圾文件 */
    // new CleanWebpackPlugin(),
    /** 打包文件自动创建并引入到index.html中的插件 */
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  /** 压缩css优化配置 */
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
}