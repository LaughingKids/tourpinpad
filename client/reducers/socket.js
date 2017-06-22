function socket(state=[],action) {
  switch(action.type) {
    case 'CREATE_SOCKET_CONNECTION':
      const socketConnection = io.connect('http://192.168.0.251:2106');
      // console.log(socketConnection);
      return{
        ...state,
        socket:socketConnection
      }
    default:
      return state;
  }
}

exports = module.exports = socket;
