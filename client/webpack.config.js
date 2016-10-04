module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test:/\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test:/\.png$/, loader: 'url', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.png']
  },
  devtool: "#eval-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
