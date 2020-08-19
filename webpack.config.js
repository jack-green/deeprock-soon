const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jp(e*)g|gif|webp)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "img",
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Rock and Stone!',
    template: 'src/index.ejs'
  })]
};