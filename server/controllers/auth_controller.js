var users = require('../models/users');
var id = 1;

module.exports = {
  login: (req, res) => {
    // console.log(users)
    const { username, password } = req.body;
    console.log(username, password)
    if (username && password) {
     const index = users.findIndex(user => user.username == username && user.password == password)
     if (index !== -1) {
       req.session.user.username = users[index].username;
       res.send(req.session.user)
     } else {
       res.status(500).send('Unauthorized.');
     }
   } else {
     res.status(500).send('Unauthorized.');
   }

  },
  register: (req, res) => {
    users.push({username:req.body.username, password:req.body.password, id:id });
    id++;
    // console.log(users);
    req.session.user.username = req.body.username;
    // console.log(users)
    res.status(200).json(req.session.user);
  },
  signOut: (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  },
  getUser: (req, res) => {
    res.status(200).json(req.session.user);
  }

}
