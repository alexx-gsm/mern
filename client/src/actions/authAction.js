import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utiles/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decode = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Logout
export const logoutUser = () => dispatch => {
  // Remove token from localStore
  localStorage.removeItem('jwtToken');
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// ACTION: Get errors
export const getErrors = errors => ({
  type: GET_ERRORS,
  payload: errors
});

// ACTION: Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
