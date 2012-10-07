var controller = '_404';
exports[controller] = function(req, res) {

  // load model from models dir
  var model = require('../models/' + controller + '.js')[controller](),
      content = model.content;

  // add to the model
  model.content.details = content.details1 + req.url + content.details2;

  // send 404 header
  res.status(404);

  // render page
  res.render(controller, model);
};