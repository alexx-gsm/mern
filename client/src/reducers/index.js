import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import dishReducer from './dishReducer';
import customerReducer from './customerReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  dishes: dishReducer,
  customers: customerReducer,
  orders: orderReducer
});
