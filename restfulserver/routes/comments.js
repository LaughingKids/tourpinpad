const express = require('express');
var commentsAPIRouter = express.Router();
const mongoose = require('mongoose');
const Comments = require('../models/comments');
const Users = require('../models/users');
const Posts = require('../models/posts');

function getUserByToken(token){
   var promise = Users.findOne({loginToken:token}).exec();
   return promise;
}
function getPostById(postId){
   var promise = Posts.findById(postId).exec();
   return promise;
}

/* sample GET request http://reduxgram.com.au/api/comments */
commentsAPIRouter.get('/:postId',function(req,res,next){
    var user = getUserByToken(req.body.userId);
    Comments.find({postId:req.params.postId},function(err,comments){
      if(err) return next(err);
      res.json(comments);
    })
});

/* sample POST request http://reduxgram.com.au/api/comments */
commentsAPIRouter.post('/',function(req,res,next){
    var theComment = req.body;
    var user = getUserByToken(req.body.userId);
    var post = getPostById(req.body.postId);
    var response = {
      userName:'',
      postId:'',
      postName:'',
      commentDate:'',
      commentBody:''
    }
    user.then(
      (user)=>{
        theComment.userId = user._id;
        theComment.userName = user.nikename;
        response.userName = user.nikename;
        post.then(
          (post)=>{
            response.postId = post._id;
            response.postName = post.placeName;
            Comments.create(theComment,function(err,comment){
              if(err) return next(err);
              response.commentBody = comment.commentBody;
              response.commentTime = comment.commentDate;
              res.json(response);
            })
          }
        ).catch(function(error){
          res.status(404);
          res.json({error:'post not found'});
        })
      }
    ).catch(function(error){
      res.status(401);
      res.json({error:'token expired'});
    });
});

/* sample GET request http://reduxgram.com.au/api/comments/:id */
commentsAPIRouter.get('/:id',function(req,res,next){
    Comments.findById(req.params.id, function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

/* sample PUT request http://reduxgram.com.au/api/comments/:id */
commentsAPIRouter.put('/:id',function(req,res,next){
    Comments.findByIdAndUpdate(req.params.id, req.body , function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

/* sample DELETE request http://reduxgram.com.au/api/comments/:id */
commentsAPIRouter.delete('/:id',function(req,res,next){
    Comments.findByIdAndRemove(req.params.id, req.body , function(err,post){
      if(err) return next(err);
      res.json(post);
    })
});

module.exports = commentsAPIRouter;
