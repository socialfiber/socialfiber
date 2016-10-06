const webpack_config = {

  entry: './client/index.js',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/client'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react', 'stage-1'] }
      }
    ]
  }

}

module.exports = webpack_config
