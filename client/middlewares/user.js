import { setCookie, getCookie } from '../utils/cookie';
import store from '../store';

export default function userMiddleware({ getState }) {
  return (next) =>
    (action) => {
      let preState = getState();
      switch(action.type) {
        case 'USER_LOGIN':
          if(preState.user === null) {
            /* validation */
            if(action.userName && action.passWord) {
              // while(true){
              //   if(action.userName && action.passWord) {
              //     break;
              //   }
              // }
              setCookie('username',action.userName,1);
              next(action);
            } else {
              console.error("userMiddleware triggered -> USER_LOGIN <input>");
            }
          } else {
            console.error("userMiddleware triggered -> USER_LOGIN <logined>");
          }
        break;
        case 'USER_LOGOUT':
          if(preState.user !== null) {
            setCookie('username',"",0);
            next(action);
          } else {
            console.error("userMiddleware triggered -> USER_LOGIN <not login>");
          }
        break;
        case '@@router/LOCATION_CHANGE':
          console.error(getState());
          next(action);
        default:
          next(action);
          break;
      }
    };
}
