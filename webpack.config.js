const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      shared: {'react': {singleton: true}, "react-dom": {singleton: true}, "react-router-dom": {singleton: true}},
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: ['node_modules', 'dist'],
      emitWarning: true,
    }),
  ],
};