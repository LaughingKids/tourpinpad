function posts(state=[],action) {
  switch(action.type) {
    case 'CHANGE_PAGE':
      return {
        ...state,
        postPage:{
          page : action.page,
          pages : action.pages,
          perPage: action.perPage,
          been: action.been
        }
      }
    case 'DO_FILTER_ACTION':
      return {
        ...state,
        postPage:{
          page : action.page,
          pages : action.pages,
          perPage: action.perPage,
          been: action.been
        }
      }
    default:
      return state;
  }
}

exports = module.exports = posts;
