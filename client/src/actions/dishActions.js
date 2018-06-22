import axios from 'axios';
import {
  DISHES_GET_ALL,
  DISH_SET_LOADING,
  DISHES_SET_LOADING,
  DISHES_GET_ALL_ERROR,
  GET_ERRORS
} from './types';

// Get all dishes
export const getDishes = () => dispatch => {
  dispatch(setDishLoading());
  axios
    .get('/api/dishes')
    .then(res =>
      dispatch({
        type: DISHES_GET_ALL,
        payload: res.data
      })
    )
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Create dish
export const createDish = (dishData, history) => dispatch => {
  axios
    .post('/api/dishes', dishData)
    .then(res => history.push('/dishes'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

// Get dish by id
// export const getDishByID = (id, history) => dispatch => {
//   dispatch(setDishesLoading());
//   axios
//   .get(`/api/dishes/${id}`)
// };

// --------------------------------------- ACTIONS

// action: Dish loading
export const setDishLoading = () => ({
  type: DISH_SET_LOADING
});

// action: Dishes loading
export const setDishesLoading = () => ({
  type: DISHES_SET_LOADING
});

// action:  Error
export const getErrors = payload => ({
  type: GET_ERRORS,
  payload
});
