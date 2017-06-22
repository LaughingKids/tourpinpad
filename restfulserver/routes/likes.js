const express = require('express');
var likesAPIRouter = express.Router();

const mongoose = require('mongoose');
const Likes = require('../models/likes');

/* sample GET request http://reduxgram.com.au/api/likes */
likesAPIRouter.get('/',function(req,res,next){
    Likes.find(function(err,posts){
      if(err) return next(err);
      res.json(posts);
    })
});

/* sample POST request http://reduxgram.com.au/api/likes */
likesAPIRouter.post('/',function(req,res,next){
    Likes.create(req.body, function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

/* sample GET request http://reduxgram.com.au/api/likes/:id */
likesAPIRouter.get('/:id',function(req,res,next){
    Likes.findById(req.params.id, function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

/* sample PUT request http://reduxgram.com.au/api/likes/:id */
likesAPIRouter.put('/:id',function(req,res,next){
    Likes.findByIdAndUpdate(req.params.id, req.body , function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

/* sample DELETE request http://reduxgram.com.au/api/likes/:id */
likesAPIRouter.delete('/:id',function(req,res,next){
    Likes.findByIdAndRemove(req.params.id, req.body , function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

module.exports = likesAPIRouter;
