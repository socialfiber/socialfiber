module.exports = {
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
        query: { presets: ['es2015', 'react'] }
      }
    ]
  }
}
