const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // bundling mode
  mode: 'development',

  // entry files
  entry: './src/index.js',

  // output bundles (location)
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'index.js',
  },

  // file resolutions
  resolve: {
    extensions: [ '.ts', '.js' ],
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{ from: "./public", to: "." }]),
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true
  }
};
