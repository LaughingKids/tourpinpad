function user(state=[],action) {
  switch(action.type) {
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: false
      }
      break;
    case 'ADD_NEW_MSG':
      return {
        ...state,
        user: {
          ...state.user,
          unreadedMsg:{
            comments:[],
            likes:[{test:true},{test:true}]
          }
        }
      }
      break;
    case 'NOTIFY_FINISHED' :
      return {
        ...state,
        user: {
          ...state.user,
          loginNofified:true
        }
      }
      break;
    case 'USER_LOGOUT_SUCCESS':
      sessionStorage.clear();
      socket.disconnect();
      return {
        ...state,
        user: null
      }
      break;
    case 'USER_LOGIN_FAILED':
      return {
        ...state,
        error: action.payload
      }
      break;
    default:
      return state;
  }
}
exports = module.exports = user;
