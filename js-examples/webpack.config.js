module.exports = {
  entry: {
    'main.js',
  },
  resolveLoader: {
  },
  resolve: {
    modules: [ process.env.NODE_PATH ]
  },
  externals: {
    document: "document",
    $: "jQuery",
    _: "_",
    React: "React",
    _t: "document.gettext",
    URLS: "URLS"
  },
  output: {
      path: __dirname + "/media/js/commonjs/",
      filename: '[name].js',
      library: ["[name]"]
  },
  module: {
    rules: [{
      test: /.js$/,
      use: [
        {  loader: 'babel-loader',
           query: {
             presets: [["es2015", {modules: "commonjs", loose: true}], "stage-1", "react"]
           }
        }
      ]
    }]
  }
}
