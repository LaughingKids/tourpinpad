const express = require('express');
var clientAppRouter = express.Router();
const path = require('path');

clientAppRouter.get('/',function(req,res,next){
  res.sendFile(path.join(__dirname,'../../public_html/index.html'));
});

module.exports = clientAppRouter;
