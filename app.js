"use strict";

//This program enables express based GET and POST handling
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const http = require('http');

//Cookie session is now used instead for security
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

//Socket connection set-up (socket.io)
var socketIO = require('socket.io');
app.set('port', PORT);


var server = http.Server(app);
var io = socketIO(server);

/*
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});*/


//To be used
//var mysql = require('mysql');

//Bcrypt for password hashing
//const bcrypt = require('bcrypt');
//Method Override for put and delete
var methodOverride = require('method-override');
//Express middleware initialization
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['qyjlsfjlon', 'tqbqaqbiop', 'bcjnhmspaz'],
  // Cookie Options - set expirty
  maxAge: 1 * 60 * 60 * 1000 // 1 hour
}));

app.use(express.static( "public" ) );
app.use(express.static(__dirname + '/node_modules'));  
//app.use(express.static(path.join(__dirname, "js")));

//Post Request+

//Main
app.get('/', function (req, res) {
    res.render('index');
});

//User submits login button
//Function: check with current password database to confirm correct password
app.post("/login", (req, res) => {

    res.render("index");
});


//User presses play (for vs human). Puts player in queue.
app.post("/play", (req, res) => {

    res.render("index");
});


//Get Request
app.get("/home", (req, res) => {
    console.log("back to home");
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    res.render("index");
});


///////////////////////////
//////Client socket////////
///////////////////////////


server.listen(PORT, function(){
    console.log(`Starting server on port ${PORT}`);
});

var numusers = 0;
var clients = [];
io.on('connection', function(socket) {
  numusers++;
  clients.push(socket.id);
  console.log('A client connected. Socket id: ' + socket.id);
  console.log('Currently there are ' + numusers +  ' online');
  socket.on('new player', function(data) {
    console.log("received new player");
  });

  socket.on('playerclicked', function(data){
    console.log(data);
    console.log(clients);

    ///Broadcast back out to a list of clients connected to same gameroom
    for(let i = 0; i < clients.length; i++){
        io.sockets.connected[clients[i]].emit('playerclicked', data);
    }
  });

  socket.on('disconnect', function(){
    numusers--;
    console.log("clienet disconnected");
    console.log('Currently there are ' + numusers + ' online');
    //clients.indexOf(socket.id)

  });
});
