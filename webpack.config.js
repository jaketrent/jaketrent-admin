var config = require('config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 3000

module.exports = {
  entry: {
    main: [
      'babel/polyfill',
      './client/index.js'
    ]
  },
  output: {
    path: './dist',
    filename: 'main.[hash].js',
    publicPath: '/',
    chunkFilename: 'chunk.[hash].[id].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ },
      {test: /\.css/, loader: 'style!css?modules&localIdentName=[local]---[hash:base64:5]!cssnext'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'puppetmaster',
      template: 'node_modules/html-webpack-template/index.html',
      mobile: true,
      appMountId: 'app',
      window: {
        env: config
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  },
  devServer: {
    port: PORT,
    historyApiFallback: true
  }
}
