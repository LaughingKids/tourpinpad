import { createStore, compose, applyMiddleware} from 'redux';
import { syncHistoryWithStore,routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import axios from 'axios';
import rootReducer from './reducers/index';
import userMiddleware from './middlewares/user';

const middleWare = applyMiddleware(promise(),thunk,routerMiddleware(browserHistory),logger); //logger,userMiddleware,routerMiddleware
//const store = createStore(rootReducer,defaultStates,middleWare);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = sessionStorage.getItem('reduxState') ? JSON.parse(sessionStorage.getItem('reduxState')) : {};

const store = createStore(rootReducer, defaultState, composeEnhancers(middleWare));

/* fatching deault data */

export const history = syncHistoryWithStore(browserHistory,store);

export default store;
