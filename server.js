var app = require('./restfulserver/app');
var debug = require('debug')('todo-api:server');
// var http = require('http');
var path = require('path');
var express = require('express');

var port = 2106;
app.set('port', port);

var webpack = require('webpack');
var config = require('./webpack.config.dev');
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/sockettest', function(req, res) {
  res.sendFile(path.join(__dirname, 'public_html/socket.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public_html/index.html'));
});

app.get('/user/:userId', function(req, res) {
  /* create a socket connection */
  res.send('create a socket connection');
});

app.get('/logout',function(req,res){
  /* close a socket connection */
  res.send('create a socket connection');
})

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection',function(socket) {
  console.log('we have user connected ' + socket.id);
  socket.emit('after user sign in', { action: 'register user' });
  socket.on('register user', function (userInfo) {
    console.log('broadcasting...' + userInfo);
    // var user = userInfo.user;
    socket.broadcast.emit('notity user login',{ title:'New User Login', content: "Hello " + userInfo, icon:' ', redirect_url:'/'});
  });
  socket.on('disconnect',function(){
    setTimeout(() => {
      console.log('we have user disconnected ' + socket.id);
    },1500);
  })
});

server.listen(port);
