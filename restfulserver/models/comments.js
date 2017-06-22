var mongoose = require('mongoose');
var CommentsSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    postId: String,
    commentBody: String,
    commentDate:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Comments',CommentsSchema);
