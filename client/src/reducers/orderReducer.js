import {
  ORDERS_GET_ALL,
  ORDERS_SET_LOADING,
  ORDER_EDIT,
  ORDER_SET_TOTAL,
  ORDER_SET_STATUS,
  ORDER_SET_STATUS_IN_LIST,
  ORDER_ADD_DISH,
  ORDER_ADD_COMMENT,
  ORDER_EDIT_DISH,
  ORDER_ADD_CUSTOMER,
  ORDER_CLEAR_STORE,
  ORDER_SET_READY_DISH,
  ORDER_NEW_ERRORS
} from '../actions/types';

const initialState = {
  order: {},
  orders: null,
  orderTotal: 0,
  orderedDishes: [],
  loading: false,
  status: [
    {
      label: 'Черновик',
      value: 'Draft'
    },
    {
      label: 'Новый',
      value: 'New'
    },
    {
      label: 'Сборка',
      value: 'inProcess'
    },
    {
      label: 'Готов, ожидает курьера',
      value: 'ReadyToDelivery'
    },
    {
      label: 'В пути',
      value: 'onDelivery'
    },
    {
      label: 'Выполнен',
      value: 'Done'
    }
  ]
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  const { dishes = [], status, comment, ...etc } = state.order;

  switch (type) {
    case ORDERS_SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ORDERS_GET_ALL:
      return {
        ...state,
        order: {},
        loading: false,
        orders: payload
      };
    case ORDER_EDIT:
      return {
        ...state,
        order: payload
      };
    case ORDER_CLEAR_STORE:
      return {
        ...state,
        order: {}
      };
    case ORDER_ADD_CUSTOMER:
      const { customer = {}, ...rest } = state.order;

      return {
        ...state,
        errors: [],
        order: {
          customer: payload,
          ...rest
        }
      };
    case ORDER_ADD_DISH:
      return {
        ...state,
        errors: [],
        order: {
          dishes: [...dishes, payload],
          status,
          comment,
          ...etc
        }
      };
    case ORDER_ADD_COMMENT:
      return {
        ...state,
        order: {
          dishes,
          comment: payload,
          status,
          ...etc
        }
      };
    case ORDER_EDIT_DISH:
      return {
        ...state,
        order: {
          dishes: payload,
          status,
          comment,
          ...etc
        }
      };
    case ORDER_NEW_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case ORDER_SET_TOTAL:
      return {
        ...state,
        orderTotal: payload
      };
    case ORDER_SET_STATUS:
      return {
        ...state,
        order: {
          dishes,
          status: payload,
          comment,
          ...etc
        }
      };
    case ORDER_SET_STATUS_IN_LIST:
      return {
        ...state,
        orders: [
          ...state.orders.map(
            order =>
              order._id === payload.orderID
                ? { ...order, status: payload.status }
                : order
          )
        ]
      };
    case ORDER_SET_READY_DISH:
      return {
        ...state,
        order: {
          ...state.order,
          dishes: [
            ...state.order.dishes.map(
              dish =>
                dish.dish_id === payload.dishID
                  ? { ...dish, is_ready: payload.is_ready }
                  : dish
            )
          ]
        }
      };

    default:
      return state;
  }
};
