import axios from 'axios';
import { browserHistory } from 'react-router';
import store from '../store';

export function postPublishmentRequest(postBody){
  const url = '/api/posts';
  axios.post(url,postBody).then(
    (postPayload) => {
      console.log(postPayload.data.url);
      browserHistory.push(postPayload.data.url);
      // console.log(postPayload);
    }
  ).catch(function(err){
    console.log(err);
  });
}

// export function postGetRequest(){
//   const url = '/api/posts';
//   axios.get(url).then(
//     (postPayload) => {
//       console.log(postPayload);
//     }
//   ).catch(function(err){
//     console.log(err);
//   });
// }

export function postUpdateRequest(postBody){
  let id = postBody.post_id;
  const url = '/api/posts/' + id;
  const redirect = '/post/' + id;
  axios.post(url,postBody).then(
    (postPayload) => {
      browserHistory.push(redirect);
    }
  ).catch(function(err){
    console.log(err);
  });
}

export function postDeleteRequest(postId,token){
  const url = '/api/posts/delete/' + postId;
  axios.post(url,{token:token}).then(
    (postPayload) => {
      browserHistory.push('/');
    }
  ).catch(function(err){
    console.log(err);
  });
}

export function changePage(page,perPage,pages,been){
  return {
    type: "CHANGE_PAGE",
    page,
    pages,
    perPage,
    been
  }
}
export function doFilterAction(page,perPage,pages,been) {
  return {
    type: "DO_FILTER_ACTION",
    page,
    pages,
    perPage,
    been
  }
}
