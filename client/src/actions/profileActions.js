import axios from 'axios';

import {
  GET_PROFILE,
  SET_CURRENT_USER,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Delete Profile
export const deleteProfile = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err => dispatch(getErrors(err.response.data)));
  }
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Get Errors
export const getErrors = payload => ({
  type: GET_ERRORS,
  payload
});

// Get Profile
export const getProfile = payload => ({
  type: GET_PROFILE,
  payload
});

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Clear Profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
