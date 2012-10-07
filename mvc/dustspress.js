/**
 * @description:  dustspress framework
 * @author:       Eric Newport (kethinov)
 * @license:	    Creative Commons Attribution 3.0 Unported License http://creativecommons.org/licenses/by/3.0/deed.en_US
 */

/*jslint node: true, devel: true, evil: true, plusplus: true, sloppy: true, forin: true, white: true, indent: 2 */

exports.startServer = function(customConfigs) {

  // modules
  var http = require('http'),               // node's http server
      express = require('express'),         // express http server
      kleiDust = require('klei-dust'),      // dust support for express
      fs = require('fs'),                   // utility library for filesystem access
  
  // app vars
      viewsPath = __dirname + '/views/',                  // where the views are located
      controllersPath = __dirname + '/controllers/',      // where the controllers are located
      controllerFiles = fs.readdirSync(controllersPath),  // list controllers files
      app = express(),                                    // initialize express

  // for later use
      i,                // temp var for looping
      controllerName,   // temp var for controller iterating
      controllerMethod, // temp var for controller iterating
      controllers = []; // controller methods to be stored here
   
  // configure express
  app.configure(function() {
  
    // set port
    app.set('port', process.env.NODE_PORT || 80);
  
    // set views dir (dust templates)
    kleiDust.setOptions({root: viewsPath});
    app.set('views', viewsPath);
  
    // set template engine to dustjs-linkedin (the default fork of dust.js included in consolidate.js)
    app.engine('dust', kleiDust.dust);
    app.set('view engine', 'dust');

    // dumps http requests to the console
    app.use(express.logger());

    // defines req.body by parsing http requests
    app.use(express.bodyParser());
  
    // map statics
    app.use(express.static(__dirname + '/../statics'));

    // load any custom configs
    if (customConfigs) {
      customConfigs();
    }
  });
  
  // load all controllers
  for (i in controllerFiles) {
    controllerName = controllerFiles[i];
    
    // strip .js
    controllerName = controllerName.substring(0, controllerName.length - 3);
    
    // map routes
    controllers[controllerName] = require(controllersPath + controllerName)[controllerName];
    controllerMethod = controllers[controllerName];
    app.get('/' + controllerName, controllerMethod);
    app.get('/' + controllerName + '/*', controllerMethod);
  }
  
  // map index and 404 routes
  app.get('/', controllers.index);
  app.get('*', controllers._404);
  
  // start server
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port') + ' (' + app.get('env') + ' mode)');
  });
  
  // return an express app
  return app;
};