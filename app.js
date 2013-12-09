// modules
var express = require('express'), // express http server
    adaro = require('adaro'),     // dust support for express
    app = express();              // initialize express

// configure express
app.configure(function() {

  // set port
  app.set('port', process.env.NODE_PORT || 80);

  // set views dir (dust templates)
  app.set('views', 'templates');
  app.engine('dust', adaro.dust());
  app.set('view engine', 'dust');

  // dumps http requests to the console
  app.use(express.logger());

  // defines req.body by parsing http requests (does NOT deal with multipart forms... see modules like node-formidable for that)
  app.use(express.json());
  app.use(express.urlencoded());

  // map statics
  app.use(express.static(__dirname + '/statics/'));
  app.use(app.router);

  // homepage
  app.all('/', function(req, res) {
    res.render('index', {
      content: {
        title: 'Hello World!',
        helloworld: 'Hello World!'
      }
    });
  });

  // 404 page
  app.all('*', function(req, res) {
    res.render('404', {
      content: {
        title: '404 Not Found',
        heading: 'Not Found',
        details1: 'The requested URL ',
        details2: ' was not found on this server.'
      }
    });
  });

});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port') + ' (' + app.get('env') + ' mode)');
});