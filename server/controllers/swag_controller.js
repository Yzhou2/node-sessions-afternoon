var swag = require('../models/swag');

module.exports = {
  read: (req, res, next) => {
    console.log('hi im here')
    res.status(200).json(swag);
  }
}
