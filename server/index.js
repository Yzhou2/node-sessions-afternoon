var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var checkForSession = require('./middleware/checkForSession');
var swagCtrl = require('./controllers/swag_controller');
var authCtrl = require('./controllers/auth_controller');
var cartCtrl = require('./controllers/cart_controller');
var searchCtrl = require('./controllers/search_controller');

var app = express();
app.use(bodyParser.json());
app.use(session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));
app.use( checkForSession.checkForSession );
// console.log(swagCtrl);


app.get('/api/swag', swagCtrl.read);

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signOut', authCtrl.signOut);
app.get('/api/user', authCtrl.getUser);

app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.remove);

app.get('/api/search', searchCtrl.search);



app.listen(3000, ()=>{
  console.log('listenin at port 3000');
})
