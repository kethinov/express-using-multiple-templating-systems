var controller = '_404';
exports[controller] = function(req, res) {
  var model = {
    req: req
  };
  res.status(404);
  res.render(controller, model);
};