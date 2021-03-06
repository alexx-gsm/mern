import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};
