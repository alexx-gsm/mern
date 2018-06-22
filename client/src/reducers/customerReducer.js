import {
  CUSTOMERS_GET_ALL,
  CUSTOMER_GET_BY_ID,
  CUSTOMERS_SET_LOADING
} from '../actions/types';

const initialState = {
  customer: null,
  customers: null,
  loading: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMERS_SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CUSTOMERS_GET_ALL:
      return {
        ...state,
        loading: false,
        customers: payload
      };
    case CUSTOMER_GET_BY_ID:
      return {
        ...state,
        loading: false,
        customer: payload
      };
    default:
      return state;
  }
};
