// modules
var express = require('express'), // express http server
    morgan = require('morgan'), // express logger
    bodyParser = require('body-parser'), // express body parser
    methodOverride = require('method-override'), // express body parser
    
    // templating
    adaro = require('adaro'), // dust support for express
    ejs = require('ejs'), // ejs
    teddy = require('teddy'), // teddy
    
    // app
    app = express(), // initialize express
    globalModel = {
      content: {
        title: 'Hello World!',
        helloworld: 'Hello World!'
      }
    };

// set port
app.set('port', process.env.NODE_PORT || 8000);

// set views dir for templates
app.set('views', 'templates');

// teddy template support (default)
app.set('view engine', 'html');
app.engine('html', teddy.__express);

// ejs template support
app.set('ejs', 'ejs');
app.engine('ejs', ejs.__express);

// dust template support
app.set('dust', 'dust');
app.engine('dust', adaro.dust());

// dumps http requests to the console
app.use(morgan('combined'));

// defines req.body by parsing http requests (does NOT deal with multipart forms... see modules like node-formidable for that)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// enables PUT and DELETE requests via <input type='hidden' name='_method' value='put'> and suchlike
app.use(methodOverride());

// map statics
app.use(express.static(__dirname + '/statics/'));

/*
 * routing
 */

// homepage (uses default templating system)
app.route('/').all(function(req, res) {
  res.render('index', globalModel);
});

// page using teddy
app.route('/teddy').all(function(req, res) {
  res.render('index.html', globalModel);
});

// page using ejs
app.route('/ejs').all(function(req, res) {
  res.render('index.ejs', globalModel);
});

// page using dust
app.route('/dust').all(function(req, res) {
  res.render('index.dust', globalModel);
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

// start app
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port') + ' (' + app.get('env') + ' mode)');
});