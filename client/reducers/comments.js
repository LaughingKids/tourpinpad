function comments(state=[],action) {
  var comments = [];
  if(typeof(state.comments) !== 'undefined') {
    comments = state.comments;
  }
  switch(action.type) {
    case 'NEW_COMMENTS_ADDED':
      var comment = action.payload;
      comments.push(comment);
      return {
        ...state,
        comments: comments
      }
    default:
      return state;
  }
}

exports = module.exports = comments;
