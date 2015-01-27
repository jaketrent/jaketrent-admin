var config = require('config')
var DefinePlugin = require('webpack').DefinePlugin
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    path: './dist',
    filename: 'main.[hash].js',
    chunkFilename: 'chunk.[hash].[id].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader?harmony'},
      {test: /\.scss/, loader:'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      API_HOST_BASE_URL: config.api.hostBaseUrl
    }),
    new HtmlWebpackPlugin({
      title: 'jaketrent-admin',
      template: 'node_modules/html-webpack-template/index.html',
      mobile: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  }
}
