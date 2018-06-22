import axios from 'axios';
import {
  CUSTOMERS_GET_ALL,
  CUSTOMERS_SET_LOADING,
  CUSTOMER_GET_BY_ID,
  GET_ERRORS
} from './types';

// Get all customer
export const getCustomers = () => dispatch => {
  dispatch({
    type: CUSTOMERS_SET_LOADING
  });
  axios
    .post('/api/customer/all')
    .then(res =>
      dispatch({
        type: CUSTOMERS_GET_ALL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get customer by ID
export const getCustomerByID = id => dispatch => {
  dispatch({
    type: CUSTOMERS_SET_LOADING
  });

  axios
    .post(`/api/customer/${id}`)
    .then(res =>
      dispatch({
        type: CUSTOMER_GET_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create/Edit Customer
export const createCustomer = (customerData, history) => dispatch => {
  axios
    .post('/api/customer', customerData)
    .then(res => history.push('/customers'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Customer
export const deleteCustomer = (id, history) => dispatch => {
  axios
    .delete(`/api/customer/${id}`)
    .then(res => {
      dispatch({
        type: CUSTOMERS_SET_LOADING
      });
      axios
        .post('/api/customer/all')
        .then(res =>
          dispatch({
            type: CUSTOMERS_GET_ALL,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
