const path = require("path");

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Constants
const _IS_PROD_ = process.env.NODE_ENV === "production";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "body",
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".html"],
  },
  devtool: _IS_PROD_ ? null : "source-map",
  devServer: {
    http2: true
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    runtimeChunk: true,
  },
};
