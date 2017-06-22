const express = require('express');
var usersAPIRouter = express.Router();
var crypto = require('crypto');
// var base64url = require('base64url');
// var FormValidator = require('../utils/FormValidator.js');
// var validator = new FormValidator();
/* ORM */
const mongoose = require('mongoose');
const Users = require('../models/users');

// usersAPIRouter.get('/',function(req,res,next){
//   Users.find(function(err,users){
//     if(err) return next(err);
//     res.json(users);
//   })
// });

usersAPIRouter.get('/t/:token',function(req,res,next){
  Users.findOne({loginToken:req.params.token})
    .exec(function(err,user){
      if(err) return next(err);
      res.json(user);
    })
});

usersAPIRouter.post('/login',function(req,res,next){
  let identifier = req.body.id;
  let loginType = req.body.type;
  let password = req.body.password;
  var {errors, isValid} = validateInput(req.body,'login');
  if(isValid){
    Users.findOne({[loginType]:identifier},'_id nikename unreadedMsg password',function(err,loginUser){
      if(loginUser !== null) {
        if(loginUser.password != password) {
          res.status(401);
          errors.push('wrong password');
          res.json({errors:errors});
        } else {
          let token = crypto.randomBytes(16).toString('hex');
          loginUser.loginToken = token;
          loginUser.save(function (err, updatedUser) {
            if (err) return handleError(err);
            let userInfo = {
              token:updatedUser.loginToken,
              name:updatedUser.nikename,
              unreadedMsg:updatedUser.unreadedMsg,
              loginNofified: false
            }
            res.json(userInfo);
          });
        }
      } else {
        res.status(401);
        errors.push('user does not exist');
        res.json({errors:errors});
      }
    });
  } else {
    res.status(401);
    res.json({errors:errors});
  }
});

function validateInput(data,type) {
  let errors = [];
  let passValidation = true;
  /* check not null input */
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      if(data[property].length == 0 && property != 'errors') {
        var message = property + ' cannot be empty';
        errors.push(message);
        passValidation = false;
      }
    }
  }
  /* check password same */
  if(type == 'create'){
    if(data.password.length && data.passworConfirmation.length) {
      if(data.password !== data.passworConfirmation) {
        var message = 'Password are not same';
        errors.push(message);
        passValidation = false;
      }
    }
  }
  return {
    errors,
    isValid: passValidation
  }
}

usersAPIRouter.post('/',function(req,res,next){
  /* TODO: validator.isNullInput(); */
  const {errors, isValid} = validateInput(req.body,'create');
  if(!isValid) {
    res.status(401);
    res.json({errors:errors});
  } else {
    delete req.body.passworConfirmation;
    delete req.body.errors;
    req.body.loginToken = crypto.randomBytes(16).toString('hex');
    Users.create(req.body,function(err,user){
      if(err) {
        res.status(500);
        res.json({ errors: err });
      } else {
        let userToken = {
          token:user.loginToken,
          name:user.nikename,
          unreadedMsg:user.unreadedMsg,
          login: true
        }
        res.json(userToken);
      }
    })
  }
});

module.exports = usersAPIRouter;
