var controller = 'index';
exports[controller] = function(req, res) {

  // load model from models dir
  var model = require('../models/' + controller + '.js')[controller]();

  // render page
  res.render(controller, model);
};