import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import authReducer from './authReducer';
import thunk from 'redux-thunk';

export const store = createStore(
  combineReducers({
    userDetails: authReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
  ),
);

export default store;
