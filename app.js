// modules
var express = require('express'), // express http server
    morgan = require('morgan'), // express logger
    bodyParser = require('body-parser'), // express body parser
    methodOverride = require('method-override'), // express body parser

    // templating
    teddy = require('teddy'), // teddy templating
    ejs = require('ejs'), // ejs templating
    adaro = require('adaro'), // dust templating

    // app
    app = express(), // initialize express
    globalModel = {
      content: {
        title: 'Hello World!',
        helloworld: 'Hello World!'
      },
      largeDataSet: []
    },
    i,
    charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    cl = charList.length;

function randChars(n) {
  var i, s = '';
  for (i = 0; i < n; i++) {
    s += charList.charAt(Math.floor(Math.random() * cl));
  }
  return s;
}

for (i = 0; i < 5000; i++) {
  globalModel.largeDataSet.push({
    one: randChars(64),
    two: randChars(64),
    three: randChars(64)
  });
}

console.log(globalModel);

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
  var start, result, end, time;
  start = new Date().getTime();
  res.render('index.html', globalModel);
  end = new Date().getTime();
  time = end - start;
  console.log('teddy time: ', time);
});

// page using ejs
app.route('/ejs').all(function(req, res) {
  var start, result, end, time;
  start = new Date().getTime();
  res.render('index.ejs', globalModel);
  end = new Date().getTime();
  time = end - start;
  console.log('ejs time: ', time);
});

// page using dust
app.route('/dust').all(function(req, res) {
  var start, result, end, time;
  start = new Date().getTime();
  res.render('index.dust', globalModel);
  end = new Date().getTime();
  time = end - start;
  console.log('dust time: ', time);
});


// start app
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port') + ' (' + app.get('env') + ' mode)');
});
