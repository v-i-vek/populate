const path = require('path');
const webpack = require("webpack")

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-[^/]+/theme')]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};
