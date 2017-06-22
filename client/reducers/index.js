import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import user from './user';
import socket from './socket';
import locations from './locations';
import comments from './comments';

const rootReducer = combineReducers({
  user,
  socket,
  posts,
  locations,
  comments,
  routing:routerReducer
});

exports = module.exports = rootReducer;
