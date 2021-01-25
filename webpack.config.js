const webpack = require('webpack');
const path = require('path');

module.exports = {
      entry: path.resolve(__dirname, './src/index.js'),
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.(png|svg|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
              },
              }
            ]
          },
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
      },
      devServer: {
        contentBase: path.resolve(__dirname, './build'),
        hot: true
      },
      plugins: [new webpack.HotModuleReplacementPlugin()],
    }