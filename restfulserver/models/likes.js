var mongoose = require('mongoose');
var LikesSchema = new mongoose.Schema({
  postId: String,
  likes: [
    {
      userId: String,
      postId: String,
      likedDate:{type:Date,default:Date.now}
    }
  ]
});

module.exports = mongoose.model('Likes',LikesSchema);
