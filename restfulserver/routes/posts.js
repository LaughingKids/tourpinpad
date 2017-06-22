const express = require('express');
var postsAPIRouter = express.Router();
const Users = require('../models/users');
function getUserByToken(token){
   var promise = Users.findOne({loginToken:token}).exec();
   return promise;
}
/*
 * Get post by id and return user object
 */
/* ORM */
const mongoose = require('mongoose');
const Posts = require('../models/posts');

function filterConditionBuilder(query) {
  var condition = {};
  // console.log(query);
  Object.keys(query).forEach(function(key,index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      switch (key) {
        case 'been':
          if(query[key] != 0) {
            condition['experienced'] = query[key] > 0 ? true : false;
          }
          break;
        case 'page':
          break;
        default:
          condition[key] = query[key];
          break;
      }
  });
  return condition;
}

postsAPIRouter.get('/',function(req,res,next){
  const perPage = 9;
  const page = Math.max(0, req.param('page'));
  /* filter condition */
  var condition = filterConditionBuilder(req.query);
  console.log(condition);
  if(page == 1) {
    /* first request take all count at first */
    Posts.count(condition,function(err, count) {
      if(err) return next(err);
      var post = {
        total: count,
        perPage: perPage
      }
      Posts.find(condition)
        .limit(perPage)
        .sort([['arriveTime', 'descending']])
        .exec(function(err,posts){
          if(err) return next(err);
          posts.unshift(post);
          res.json(posts);
      });
    });
  } else {
    var skipPage = page - 1;
    Posts.find(condition)
      .limit(perPage)
      .skip(perPage * skipPage)
      .sort([['arriveTime', 'descending']])
      .exec(function(err,posts){
      if(err) return next(err);
      res.json(posts);
    });
  }
});

postsAPIRouter.get('/:id',function(req,res,next){
  Posts.findById(req.params.id, function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});

postsAPIRouter.post('/:id',function(req,res,next){
  var thePost = req.body;
  thePost.placeLocation = {
    lat: req.body.placeLat,
    log: req.body.placeLog
  };
  var author = getUserByToken(req.body.token);
  author.then(function(user){
    // console.log(user);
    Posts.findByIdAndUpdate(req.params.id,thePost,function(err,post){
      if(err) return next(err);
      res.json(post);
    });
  }).catch(function(error){
    // next();
    res.status(401);
    res.json({error:'token expired'});
  });
});

// postsAPIRouter.post('/like/:id',function(req,res,next){
//   var thePost = req.body;
//   var author = getUserByToken(req.body.token);
//   author.then(function(user){
//     // console.log(user);
//     Posts.findByIdAndUpdate(req.params.id,thePost,function(err,post){
//       if(err) return next(err);
//       // res.json(post);
//     });
//   }).catch(function(error){
//     next();
//     res.status(401);
//     res.json({error:'token expired'});
//   });
// });

postsAPIRouter.post('/delete/:id',function(req,res,next){
  var author = getUserByToken(req.body.token);
  author.then(function(user){
    console.log(user);
    Posts.findByIdAndRemove(req.params.id,function(err,post){
      if(err) return next(err);
      res.json(post);
    });
  }).catch(function(error){
    next();
    res.status(401);
    res.json({error:'token expired'});
  });
});

postsAPIRouter.post('/',function(req,res,next){
  var thePost = req.body;
  thePost.placeLocation = {
    lat: req.body.placeLat,
    log: req.body.placeLog
  };
  // console.log(req.body.experienced)
  var author = getUserByToken(req.body.token);
  author.then(function(user){
    // console.log(user);
    thePost.authorId = user._id;
    // console.log(thePost);
    Posts.create(thePost,function(err,post){
      if(err) return next(err);
      res.json({url:"/post/"+post._id});
    })
  }).catch(function(error){
    next();
    res.status(401);
    res.json({error:'token expired'});
  });
});

module.exports = postsAPIRouter;
