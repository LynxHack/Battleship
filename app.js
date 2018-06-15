//This program enables express based GET and POST handling
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");

//Cookie session is now used instead for security
const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

//Bcrypt for password hashing
const bcrypt = require('bcrypt');

//Method Override for put and delete
var methodOverride = require('method-override');

//Express middleware initialization
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['qyjlsfjlon', 'tqbqaqbiop', 'bcjnhmspaz'],
  
  
  // Cookie Options - set expirty
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use( express.static( "public" ) );


// Storage System




app.get("/home", (req, res) => {
    console.log("back to home");
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);

});