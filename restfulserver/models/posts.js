var mongoose = require('mongoose');
var PostsSchema = new mongoose.Schema({
  authorId:String,
  placeComment:String,
  placeName: String,
  placeLocation: {
    lat: Number,
    log: Number
  },
  arriveTime: Date,
  leaveTime: Date,
  trafficType: String, /*font-awesome-class*/
  friends: [String], /* users id */
  photos: [String], // photo urls
  experienced: Boolean, /* false in wishlist, true in routes */
  coverIndex:{type:Number,default:0},
  updated: {type:Date,default:Date.now},
});

module.exports = mongoose.model('Posts',PostsSchema);
