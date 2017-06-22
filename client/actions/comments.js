import axios from 'axios';
import { browserHistory } from 'react-router';
import store from '../store';


export function commentPostRequest(commentBody){
  const url = '/api/comments';
  axios.post(url,commentBody).then(
    (commentPayload) => {
      console.log(commentPayload);
      store.dispatch(notifyUserUnread(commentPayload.data));
    }
  ).catch(function(err){
    console.log(err);
  });
}

export function notifyUserUnread(payload){
  return({
    type: 'NEW_COMMENTS_ADDED',
    payload
  })
}
