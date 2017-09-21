var path = require("path");
var webpack = require("webpack");
var ip = require("ip");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      public: path.resolve(__dirname, "./public")
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            //sass
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax",
            //js
            js: "babel-loader"
          },
          include: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./node_modules/vuetify")]
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./node_modules/vuetify")]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          objectAssign: "Object.assign"
        }
      },
      {
        test: /\.styl$/,
        loader: ["style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    //noInfo: true,
    host: ip.address()
  },
  performance: {
    hints: false
  },

  devtool: "#cheap-source-map",
  plugins: [
    new webpack.ProvidePlugin({
      mapState: ["vuex", "mapState"],
      mapActions: ["vuex", "mapActions"],
      mapGetters: ["vuex", "mapGetters"],
      mapMutations: ["vuex", "mapMutations"]
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = false;
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
