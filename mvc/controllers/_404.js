var controller = '_404';
exports[controller] = function(req, res) {

  // load model from models dir
  var model = require('../models/' + controller + '.js')[controller]();

  // add req to the model
  model.req = req;

  // send 404 header
  res.status(404);

  // render page
  res.render(controller, model);
};