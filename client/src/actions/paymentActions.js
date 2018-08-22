import axios from 'axios';
import {
  PAYMENT_GET_BY_ID,
  PAYMENT_GET_ALL,
  PAYMENT_COUNT,
  PAYMENT_REQUIRE_REFRESH,
  PAYMENT_CLEAR,
  PAYMENT_DELETE,
  PAYMENT_SET_SELECTED_DAYS,
  PAYMENT_SET_NUMBER_OF_SELECTED_WEEK,
  PAYMENT_SET_SELECTED_DAY_OF_WEEK,
  GET_ERRORS
} from './types';

// Get all payments
export const getAllPayments = weekNumber => dispatch => {
  console.log('---AC: get All Payments');
  axios
    .post(`/api/payments/week/${weekNumber}`)
    .then(res => {
      dispatch({
        type: PAYMENT_GET_ALL,
        payload: res.data
      });
    })
    .catch(err => console.log('---ERROR: get all payments', err));
};

// Get all payments on ONE day
export const getPaymentsByDay = day => dispatch => {
  console.log('---AC: get Payments By Day');
  axios
    .post(`/api/payments/day`, { day })
    .then(res => {
      dispatch({
        type: PAYMENT_GET_ALL,
        payload: res.data
      });
    })
    .catch(err => console.log('---ERROR: get all payments', err));
};

// Payment get one by ID
export const getPaymentById = id => dispatch => {
  console.log('---AC: get Payment By ID');
  axios
    .post(`/api/payments/${id}`)
    .then(res => {
      dispatch({
        type: PAYMENT_GET_BY_ID,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Payment save
export const savePayment = (payment, history) => dispatch => {
  console.log('save:', payment);
  if (payment._id) {
    axios
      .put('/api/payments', payment)
      .then(res => {
        console.log('---AC: PUT Payment');
        dispatch({
          type: PAYMENT_REQUIRE_REFRESH
        });
        history.push('/payments');
      })
      .catch(err => {
        console.log(err);
        dispatch(getErrors(err.response.data));
      });
  } else {
    axios
      .post('/api/payments', payment)
      .then(res => {
        console.log('---AC: NEW Payment');
        dispatch({
          type: PAYMENT_REQUIRE_REFRESH
        });
        history.push('/payments');
      })
      .catch(err => {
        console.log(err);
        dispatch(getErrors(err.response.data));
      });
  }
};

// Payment clear
export const clearPaymentStore = () => dispatch => {
  dispatch({
    type: PAYMENT_CLEAR
  });
};

// Payment delete
export const deletePayment = id => dispatch => {
  axios
    .delete(`/api/payments/${id}`)
    .then(res =>
      dispatch({
        type: PAYMENT_DELETE,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch(getErrors(err.response.data));
    });
};

// Payment: set selected days
export const setSelectedDaysOfPayments = days => dispatch => {
  dispatch({
    type: PAYMENT_SET_SELECTED_DAYS,
    payload: days
  });
};

// Payment set selected week
export const setSelectedWeekOfPayments = week => dispatch => {
  dispatch({
    type: PAYMENT_SET_NUMBER_OF_SELECTED_WEEK,
    payload: week
  });
};

// Payment: set selected day of week
export const setSelectedDayOfWeekOfPayments = index => dispatch => {
  dispatch({
    type: PAYMENT_SET_SELECTED_DAY_OF_WEEK,
    payload: index
  });
};

// Payment: count payments in day
export const countPaymentsByDay = (day, index) => dispatch => {
  axios
    .post(`/api/payments/count`, { day })
    .then(res => {
      dispatch({
        type: PAYMENT_COUNT,
        payload: { index, count: res.data }
      });
    })
    .catch(err => console.log('---ERROR: get all payments', err));
};

// action:  Error
export const getErrors = payload => ({
  type: GET_ERRORS,
  payload
});
