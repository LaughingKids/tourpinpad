import axios from 'axios';
import { browserHistory } from 'react-router';
import { createSocketConnection } from './socket';
import store from '../store';
import { clearCookie, setCookie } from '../utils/cookie';

export function userLoginSuccess(payload) {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload
  }
}

export function userLoginFailed(payload) {
  return {
    type: "USER_LOGIN_FAILED",
    payload
  }
}

export function userLoginNotified(payload) {
  return {
    type:'NOTIFY_FINISHED',
    payload
  }
}

export function userSignupRequest(userData) {
  const url = '/api/users';
  axios.post(url,userData).then(
    (userPayload) => {
      /* create a socket connection for user and save the socket object into user state */
      var userDetails = userPayload.data;
      // put token in cookie not session storage
      setCookie('token',userDetails.token);
      delete userDetails.token;
      /* change user state */
      store.dispatch(userLoginSuccess(userDetails));
      /* redirect user to user Homepage */
      browserHistory.push('/');
    }
  ).catch(function(err){
    store.dispatch(userLoginFailed(err.response.data));
    // console.log(err.response.data);
  });
}

export function userLoginRequest(userData) {
  const url = '/api/users/login';
  axios.post(url,userData).then(
    (userPayload) => {
      var userDetails = userPayload.data;
      // put token in cookie not session storage
      setCookie('token',userDetails.token);
      delete userDetails.token;
      /* change user state */
      store.dispatch(userLoginSuccess(userDetails));
      /* redirect user to user Homepage */
      browserHistory.push('/');
    }
  ).catch(function(err){
      store.dispatch(userLoginFailed(err.response.data));
      console.log(err);
  });
}

export function userLogout(payload) {
  /* distory user socket connect with user id */
  // socket.disconnect();
  clearCookie('token');
  return {
    type: "USER_LOGOUT_SUCCESS",
    payload
  }
}

export function addNewMsg(payload) {
  return {
    type: 'ADD_NEW_MSG',
    payload
  }
}
