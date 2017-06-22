var mongoose = require('mongoose');
var UsersSchema = new mongoose.Schema({
  nikename:String,
  email:String,
  phone: Number,
  password: String,
  updated: {type:Date,default:Date.now},
  userAvatar: String,
  headerImg: String,
  loginToken: String,
  unreadedMsg:{
    likes:[String], // likeId
    comments: [String] // commentsId
  }
});

module.exports = mongoose.model('Users',UsersSchema);
