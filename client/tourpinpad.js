import React from 'react';
import {render} from 'react-dom';

// import Components
// import Main from './components/Main';
import App from './components/App';
import PostList from './components/PostList';
import Single from './components/Single';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import UserHome from './components/UserHome';
import UserProfilePage from './components/UserProfilePage';
import UserPostPage from './components/UserPostPage';
import UserPostUpdatePage from './components/UserPostUpdatePage';
// import react router deps
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';
import axios from 'axios';
import { getCookie,setCookie } from './utils/cookie';

store.subscribe(()=>{
  let token = getCookie('token');
  if(token.length != 0) {
    sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
  }
});

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component = {SignupPage}></IndexRoute>
        <Route path="/post/:postId" component={Single}></Route>
        <Route path="/post/edit/:postId" component={UserPostUpdatePage}></Route>
        <Route path="/user/post" component={UserPostPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/user" component={UserProfilePage}></Route>
      </Route>
    </Router>
  </Provider>
)

const domMountDom = document.getElementById('root');
render(router,domMountDom);
