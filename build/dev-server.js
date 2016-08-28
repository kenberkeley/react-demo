var express = require('express'),
  webpack = require('webpack'),
  // favicon = require('express-favicon'),
  config = require('./webpack.dev.conf'),
  app = express();

var compiler = webpack(config);

// for highly stable resources
app.use('/static', express.static(config.commonPath.staticDir));

// app.use(favicon(path.join(__dirname, '../favicon.ico')));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(8000, '127.0.0.1', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://127.0.0.1:8000');
});
