// modules
var express = require('express'), // express http server
    morgan = require('morgan'), // express logger
    bodyParser = require('body-parser'), // express body parser
    methodOverride = require('method-override'), // express body parser
    adaro = require('adaro'), // dust support for express
    app = express(); // initialize express

// set port
app.set('port', process.env.NODE_PORT || 8000);

// set views dir (dust templates)
app.set('views', 'templates');
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');

// dumps http requests to the console
app.use(morgan());

// defines req.body by parsing http requests (does NOT deal with multipart forms... see modules like node-formidable for that)
app.use(bodyParser());

// enables PUT and DELETE requests via <input type='hidden' name='_method' value='put'> and suchlike
app.use(methodOverride());

// map statics
app.use(express.static(__dirname + '/statics/'));

// homepage
app.route('/').all(function(req, res) {
  res.render('index', {
    content: {
      title: 'Hello World!',
      helloworld: 'Hello World!'
    }
  });
});

// 404 page
app.route('*').all(function(req, res) {
  res.render('404', {
    content: {
      title: '404 Not Found',
      heading: 'Not Found',
      details1: 'The requested URL ',
      details2: ' was not found on this server.'
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port') + ' (' + app.get('env') + ' mode)');
});