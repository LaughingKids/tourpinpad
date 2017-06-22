const express = require('express');
var apiRootRouter = express.Router();
const path = require('path');

apiRootRouter.get('/',function(req,res,next){
  res.send('sent all endpoints');
});
module.exports = apiRootRouter;
