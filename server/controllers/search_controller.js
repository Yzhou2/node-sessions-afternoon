var swag = require('../models/swag');

module.exports = {
  search: (req, res, next) => {
    if (req.query.category) {
      var filteredswag = swag.filter(item => item.category == req.query.category);
      res.status(200).json( filteredswag );
    } else {
      res.status(200).json(swag);
    }
  },

}
