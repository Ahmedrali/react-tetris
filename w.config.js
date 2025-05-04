var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var TerserWebpackPlugin = require('terser-webpack-plugin');
var version = require('./package.json').version;


// 程序入口
var entry =  __dirname + '/src/index.js';

// 输出文件
var output =  {
  filename: 'page/[name]/index.js',
  chunkFilename: 'chunk/[name].[chunkhash:5].chunk.js',
};

// 生成source-map追踪js错误
var devtool = 'source-map';

// eslint
var eslint =  {
  configFile: __dirname + '/.eslintrc.js',
}

// loader
var loaders = [
    {
      test: /\.(json)$/,
      exclude: /node_modules/,
      loader: 'json',
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel!eslint-loader',
    },
    {
      test: /\.(?:png|jpg|gif)$/,
      loader: 'url?limit=8192', //小于8k,内嵌;大于8k生成文件
    },
    {
      test: /\.less/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:4]!postcss!less'),
    },
    {
      test: /\.css$/, // Add this rule for plain CSS files
      loader: ExtractTextPlugin.extract('style', 'css'), // Use css-loader without modules
    }
];

// dev plugin
var devPlugins =  [
  new CopyWebpackPlugin([
    { from: './src/resource/music/music.mp3' },
    { from: './src/resource/css/loader.css' },
  ]),
  // 热更新
  new webpack.HotModuleReplacementPlugin(),
  // 允许错误不打断程序, 仅开发模式需要
  new webpack.NoErrorsPlugin(),
  // 打开浏览器页面
  new OpenBrowserPlugin({
    url: 'http://127.0.0.1:8080/'
  }),
  // css打包
  new ExtractTextPlugin('css.css', {
    allChunks: true
  }),
]

// production plugin
var productionPlugins = [
  // 定义生产环境
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // 复制
  new CopyWebpackPlugin([
    { from: './src/resource/music/music.mp3' },
    { from: './src/resource/css/loader.css' },
  ]),
  // HTML 模板
  new HtmlWebpackPlugin({
    template: __dirname + '/server/index.tmpl.html'
  }),
  // JS压缩
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }}
  // ),
  // Add the TerserWebpackPlugin instance instead                                                                           
  new TerserWebpackPlugin({                                                                                                 
    // Default options are usually sufficient for ES6+ compatibility.                                                       
    // You can customize options here if needed, for example:                                                               
    // terserOptions: {                                                                                                     
    //   format: {                                                                                                          
    //     comments: false, // Remove comments                                                                              
    //   },                                                                                                                 
    //   compress: {                                                                                                        
    //     drop_console: true, // Remove console logs in production                                                         
    //   },                                                                                                                 
    // },                                                                                                                   
    // extractComments: false, // Do not extract comments to a separate file                                                
  }),  
  // css打包
  new ExtractTextPlugin('css-' + version + '.css', {
    allChunks: true
  }),
];

// dev server
var devServer = {
  contentBase: './server',
  colors: true,
  historyApiFallback: false,
  port: 8080, // defaults to "8080"
  hot: true, // Hot Module Replacement
  inline: true, // Livereload
  host: '0.0.0.0',
  disableHostCheck: true
};

module.exports = {
  entry: entry,
  devtool: devtool,
  output: output,
  loaders: loaders,
  devPlugins: devPlugins,
  productionPlugins: productionPlugins,
  devServer: devServer,
  postcss: function () {
    return [precss, autoprefixer];
  },
  version: version
};
