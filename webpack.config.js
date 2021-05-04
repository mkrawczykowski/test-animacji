const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const page = generateHtml("");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {},
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: (loader) => [
                  require("autoprefixer")(),
                  require("cssnano")(),
                ],
              },
            },
            {
              loader: "sass-loader",
              options: {},
            },
          ],
          fallback: {
            loader: "style-loader",
            options: {},
          },
          publicPath: "./",
        }),
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/,
        exclude: /fonts?/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /(images?|img)/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {},
        },
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 1234,
    open: true,
  },

  plugins: [
    new ExtractTextPlugin("main.css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new CopyPlugin([
      { from: "./src/img", to: "img" },
      { from: "./src/fonts", to: "fonts" },
    ]),
    new FaviconsWebpackPlugin({
      logo: "./fav.png",
      background: "#fff",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ].concat(page),
};

function generateHtml(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  let html = templateFiles.filter((item) => {
    if (item.split(".")[1] === "html") {
      return item;
    }
  });
  return html.map((item) => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${name}.${extension}`),
    });
  });
}
