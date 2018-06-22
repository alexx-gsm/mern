import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDishes } from '../../actions/dishActions';
import { getCustomers } from '../../actions/customerActions';
import {
  getOrders,
  deleteOrder,
  setOrderListStatus
} from '../../actions/orderActions';
import Spinner from '../common/spinner';
import isEmpty from '../../validation/is-empty';

class OrderList extends Component {
  state = {
    dishes: [],
    customers: [],
    isLoaded: false
  };

  handleStatus = (order, role) => () => {
    let newStatus;

    if (role === 'operator' && order.status === 'Draft') {
      newStatus = 'New';
    } else if (role === 'operator' && order.status === 'New') {
      newStatus = 'inProcess';
    } else if (role === 'cook' && order.status === 'inProcess') {
      newStatus = 'ReadyToDelivery';
    } else if (role === 'cook' && order.status === 'ReadyToDelivery') {
      newStatus = 'onDelivery';
    } else if (role === 'courier' && order.status === 'ReadyToDelivery') {
      newStatus = 'onDelivery';
    } else if (role === 'courier' && order.status === 'onDelivery') {
      newStatus = 'Done';
    } else {
      newStatus = 'Draft';
    }
    return this.props.setOrderListStatus(order._id, newStatus);
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.dishes.dishes &&
      nextProps.customers.customers &&
      nextProps.orders.orders
    ) {
      this.setState({
        dishes: nextProps.dishes.dishes,
        customers: nextProps.customers.customers,
        isLoaded: true
      });
    }
  };

  getFilteredOrders = orders => {
    const { role } = this.props.auth.user;

    if (role === 'admin') {
      return orders;
    }

    return orders.filter(order => {
      const status = order.status;
      switch (role) {
        case 'operator':
          return status === 'Draft' || status === 'New';
        case 'cook':
          return status === 'inProcess' || status === 'ReadyToDelivery';
        case 'courier':
          return status === 'ReadyToDelivery' || status === 'onDelivery';
      }
    });
  };

  checkIfOrderIsReadyToDelivery = order => {
    const { role } = this.props.auth.user;
    const totalIsReady = order.dishes.filter(dish => dish.is_ready).length;
    const totalDishes = order.dishes.length;

    return (
      (role === 'admin' || role === 'cook') && totalIsReady === totalDishes
    );
  };

  getToolButtons = order => {
    const { role } = this.props.auth.user;

    const deleteButton = (
      <button
        onClick={this.handleDelete(order._id)}
        className="btn btn-sm btn-danger ml-2"
      >
        X
      </button>
    );

    const changeStatusButton = (
      <button
        onClick={this.handleStatus(order, role)}
        className="btn btn-sm btn-danger ml-2"
        disabled={!this.checkIfOrderIsReadyToDelivery(order)}
      >
        >
      </button>
    );
    return role === 'admin' ? (
      <div>
        {changeStatusButton}
        {deleteButton}
      </div>
    ) : (
      <div>{changeStatusButton}</div>
    );
  };

  componentDidMount = () => {
    if (isEmpty(this.props.dishes.dishes)) this.props.getDishes();
    if (isEmpty(this.props.customers.customers)) this.props.getCustomers();
    this.props.getOrders();
  };

  handleDelete = id => () => this.props.deleteOrder(id);

  handleStageOfReadyOrder = order => {
    const { role } = this.props.auth.user;

    if (role !== 'admin' && role !== 'cook') return null;

    const totalIsReady = order.dishes.filter(dish => dish.is_ready).length;
    const totalDishes = order.dishes.length;

    return `${totalIsReady} / ${totalDishes}`;
  };

  getCustomer = id =>
    this.state.customers.find(customer => customer._id === id);

  getStatusIcon = status => {
    switch (status) {
      case 'Draft':
        return <i className="material-icons">fullscreen</i>;
      case 'New':
        return <i className="material-icons">check_box_outline_blank</i>;
      case 'inProcess':
        return <i className="material-icons">restaurant</i>;
      case 'ReadyToDelivery':
        return <i className="material-icons">shopping_basket</i>;
      case 'onDelivery':
        return <i className="material-icons">local_shipping</i>;
      case 'Done':
        return <i className="material-icons">check</i>;
      default:
        return <i className="material-icons">info</i>;
    }
    return;
  };

  getOrderList = orders =>
    this.getFilteredOrders(orders).map(order => {
      const customer = this.getCustomer(order.customer);

      return (
        <tr key={order._id}>
          <td>{this.getStatusIcon(order.status)}</td>
          <td>
            {new Date(order.date).toLocaleDateString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}
          </td>
          <td>
            <NavLink to={`/edit-order/${order._id}`}>{customer.name}</NavLink>
          </td>
          <td>{order.total}</td>
          <td>{order.payment}</td>
          <td>{this.handleStageOfReadyOrder(order)}</td>
          <td className="text-right">{this.getToolButtons(order)}</td>
        </tr>
      );
    });

  render() {
    const { orders, loading } = this.props.orders;

    const orderContent = !this.state.isLoaded ? (
      <Spinner />
    ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Status</th>
            <th>Data</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>s</th>
            <th />
          </tr>
        </thead>
        <tbody>{this.getOrderList(orders)}</tbody>
      </table>
    );

    return (
      <div className="page page--dishes">
        <div className="row">
          <div className="w-100">
            <Link to={'/create-order'} className="btn btn-light">
              Add New Order
            </Link>
            <h1 className="display-4 text-center">Заказы:</h1>
            {orderContent}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ orders, customers, dishes, loading, auth }) => ({
    orders,
    customers,
    dishes,
    loading,
    auth
  }),
  {
    getDishes,
    getCustomers,
    getOrders,
    setOrderListStatus,
    deleteOrder
  }
)(OrderList);
