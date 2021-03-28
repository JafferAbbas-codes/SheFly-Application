import {SIGNIN_USER, SIGNUP_USER, CLEAR_USER, SET_LOADING} from './ActionTypes';

const initialState = {
  user: null,
  isloggedIn: false,
  token: null,
  isAdmin: false,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        user: action.payload.userCreated,
        token: action.payload.token,
        isloggedIn: true,
        isAdmin: action.payload.userCreated.isAdmin,
      };
    case SIGNIN_USER:
      console.log('action.payload', action.payload);
      return {
        ...state,
        user: action.payload.userExist,
        isAdmin: action.payload.isAdmin,
        token: action.payload.token,
        isloggedIn: true,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        isloggedIn: false,
        token: null,
        isAdmin: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
