import { DISHES_GET_ALL, DISHES_SET_LOADING } from '../actions/types';

const initialState = {
  dish: null,
  dishes: null,
  loading: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DISHES_SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case DISHES_GET_ALL:
      return {
        ...state,
        loading: false,
        dishes: payload
      };
    default:
      return state;
  }
};
