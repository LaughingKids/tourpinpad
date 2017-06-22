//import necessary dep
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('logger');

// import routes
// client app routes
const clientAppRouter = require('./routes/index');
// rest-api routes
const apiRootRouter = require('./routes/api');
const usersAPIRouter = require('./routes/users');
const postsAPIRouter = require('./routes/posts');
const commentsAPIRouter = require('./routes/comments');
const likesAPIRouter = require('./routes/likes');
// import Mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// connect to Mongodb
mongoose.connect('mongodb://localhost/tourpinpad')
    .then(() => console.log('tourpinpad connection successful'))
    .catch((err) => console.error(err));

// create server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../public_html')));

// loading routes
app.use('/api/users',usersAPIRouter);
app.use('/api/posts',postsAPIRouter);
app.use('/api/comments',commentsAPIRouter);
app.use('/api/likes',likesAPIRouter);
app.use('/api/*',apiRootRouter);
// app.use('*',clientAppRouter);
//
// // catch 404 error
// app.use(function(req,res,next){
//   var err = new Error('Not found');
//   err.status = 404;
//   next(err);
// });
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;
