  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const {ModuleFederationPlugin} = require("webpack").container;
  // const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
  const path = require("path");

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
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app1",
        remotes: {
          app2: "app2@http://localhost:3002/remoteEntry.js",
          // app3: "app3@http://localhost:3003/remoteEntry.js",
        },
        shared: {'react': {singleton: true}, "react-dom": {singleton: true}, "react-router-dom": {singleton: true}},
      }),
      // new ExternalTemplateRemotesPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  };

