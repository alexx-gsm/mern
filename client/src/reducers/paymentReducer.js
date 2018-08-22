import {
  PAYMENT_GET_ALL,
  PAYMENT_GET_BY_ID,
  PAYMENT_ADD,
  PAYMENT_SAVE,
  PAYMENT_COUNT,
  PAYMENT_REQUIRE_REFRESH,
  PAYMENT_DELETE,
  PAYMENT_SET_SELECTED_DAYS,
  PAYMENT_SET_NUMBER_OF_SELECTED_WEEK,
  PAYMENT_SET_SELECTED_DAY_OF_WEEK,
  PAYMENT_CLEAR
} from '../actions/types';
import moment from 'moment';

const initialState = {
  payments: [],
  payment: {},
  week: +moment().format('W'),
  selectedDays: [1, 2, 3, 4, 5, 6, 7].map(i =>
    moment()
      .day(i)
      .toDate()
  ),
  selectedDay: 0,
  countedPayments: [0, 0, 0, 0, 0, 0, 0],
  isRequireRefresh: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_GET_ALL:
      return {
        ...state,
        payments: payload,
        payment: null,
        isRequireRefresh: false
      };

    case PAYMENT_GET_BY_ID:
      return {
        ...state,
        payment: payload
      };

    case PAYMENT_REQUIRE_REFRESH:
      return {
        ...state,
        isRequireRefresh: true
      };

    case PAYMENT_COUNT:
      console.log('---count:', payload);
      return {
        ...state,
        countedPayments: [
          ...state.countedPayments.map(
            (item, index) => (index === payload.index ? payload.count : item)
          )
        ]
      };

    // case PAYMENT_ADD:
    //   return {
    //     ...state,
    //     payments: [payload, ...state.payments]
    //   };

    // case PAYMENT_SAVE:
    //   return {
    //     ...state,
    //     payments: [
    //       ...state.payments.map(
    //         item => (item._id === payload._id ? payload : item)
    //       )
    //     ]
    //   };

    case PAYMENT_DELETE:
      return {
        ...state,
        payments: [...state.payments.filter(item => item._id !== payload._id)]
      };

    case PAYMENT_CLEAR:
      return {
        ...state,
        payment: null
      };

    case PAYMENT_SET_SELECTED_DAYS:
      return {
        ...state,
        selectedDays: payload
      };

    case PAYMENT_SET_NUMBER_OF_SELECTED_WEEK:
      return {
        ...state,
        week: payload
      };

    case PAYMENT_SET_SELECTED_DAY_OF_WEEK:
      return {
        ...state,
        selectedDay: payload
      };

    default:
      return state;
  }
};
