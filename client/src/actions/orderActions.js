import axios from 'axios';
import {
  ORDERS_GET_ALL,
  ORDERS_SET_LOADING,
  ORDER_EDIT,
  ORDER_ADD_DISH,
  ORDER_ADD_COMMENT,
  ORDER_EDIT_DISH,
  ORDER_ADD_CUSTOMER,
  ORDER_NEW_ERRORS,
  ORDER_SET_TOTAL,
  ORDER_SET_STATUS,
  ORDER_SET_STATUS_IN_LIST,
  ORDER_SET_READY_DISH,
  GET_ERRORS
} from './types';

// Get all orders
export const getOrders = () => dispatch => {
  dispatch({
    type: ORDERS_SET_LOADING
  });
  axios
    .post(`/api/orders/all`)
    .then(res => {
      dispatch({
        type: ORDERS_GET_ALL,
        payload: res.data
      });
    })
    .catch(err => console.log('---err: ', err));
};

// Create Order
export const createOrder = (orderData, history) => dispatch => {
  console.log('---orderData', orderData);
  axios
    .post('/api/orders', orderData)
    .then(res => {
      history.push('/orders');
    })
    .catch(err => console.log('---err: ', err));
};

// Edit Order
export const editOrder = id => dispatch => {
  axios
    .post(`/api/orders/${id}`)
    .then(res => {
      dispatch({
        type: ORDER_EDIT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Order Total
export const setOrderTotal = total => dispatch => {
  dispatch({
    type: ORDER_SET_TOTAL,
    payload: total
  });
};

// Set Order Status
export const setOrderStatus = status => dispatch => {
  dispatch({
    type: ORDER_SET_STATUS,
    payload: status
  });
};

// Set Order Status in OrderList
export const setOrderListStatus = (orderID, status) => dispatch => {
  axios
    .put(`/api/orders/status/${orderID}`, { status })
    .then(res =>
      dispatch({
        type: ORDER_SET_STATUS_IN_LIST,
        payload: { orderID, status }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Save Order
export const saveOrder = (id, orderData, history) => dispatch => {
  axios
    .put(`/api/orders/${id}`, orderData)
    .then(res => history.push('/orders'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get order by ID
export const getOrderByID = id => dispatch => {};

// Delete order
export const deleteOrder = id => dispatch => {
  axios
    .delete(`/api/orders/${id}`)
    .then(res => {
      dispatch({
        type: ORDERS_SET_LOADING
      });
      axios
        .post(`/api/orders/all`)
        .then(res =>
          dispatch({
            type: ORDERS_GET_ALL,
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

// Add dish to order
export const addDishToOrder = newDish => dispatch => {
  dispatch({
    type: ORDER_ADD_DISH,
    payload: newDish
  });
};

// Edit dish in order
export const editDishInOrder = items => dispatch => {
  dispatch({
    type: ORDER_EDIT_DISH,
    payload: items
  });
};

// Add customer to order
export const addCustomerToOrder = customer => dispatch => {
  dispatch({
    type: ORDER_ADD_CUSTOMER,
    payload: customer
  });
};

// Add comment to order
export const addCommentToOrder = comment => dispatch => {
  dispatch({
    type: ORDER_ADD_COMMENT,
    payload: comment
  });
};

// Set Ready to order dish
export const setReadyToOrderDish = (orderID, dishID, is_ready) => dispatch => {
  dispatch({
    type: ORDER_SET_READY_DISH,
    payload: { dishID, is_ready }
  });
};

// Сheck order errors
export const getOrderErrors = errors => dispatch => {
  dispatch({
    type: ORDER_NEW_ERRORS,
    payload: errors
  });
};
