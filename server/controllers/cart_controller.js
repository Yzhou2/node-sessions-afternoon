var swag = require('../models/swag');

module.exports = {
  add: (req, res, next) => {
    // console.log('im hit')
    let index = req.session.user.cart.findIndex(item => item.id == req.query.id);

    if (index == -1) {
      const selectedItemIndex = swag.findIndex(swag => swag.id == req.query.id);
      const selectedItem = swag[selectedItemIndex];
      req.session.user.cart.push( selectedItem );
      console.log(req.session.user)
      req.session.user.total += selectedItem.price;
      res.status(200).json(req.session.user);
    }  else {
      res.status(200).json(req.session.user);
    }
  },


  remove: (req, res, next) => {
    const { id } = req.query;
    const { cart } = req.session.user;

    let index = req.session.user.cart.findIndex(item => item.id == req.query.id);
    // console.log(index);

    if(index !== -1) {
      // console.log('before', req.session.user.cart)
      req.session.user.total -= req.session.user.cart[index].price;
      req.session.user.cart.splice(index, 1);

      // console.log('after', req.session.user.cart)
      res.status(200).json(req.session.user);
    } else {
      res.status(200).json("not a valid id")
    }
  },
  checkout: (req, res, next) => {
      req.session.user.cart = [];
      req.session.user.total = 0;
      res.status(200).json(req.session.user);
  },

}
