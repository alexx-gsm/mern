import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SelectDishes from '../dish/SelectDishes';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {
  createOrder,
  editOrder,
  saveOrder,
  getOrderErrors,
  addCustomerToOrder,
  addCommentToOrder
} from '../../actions/orderActions';
import { getCustomers } from '../../actions/customerActions';
import Spinner from '../common/spinner';
import isEmpty from '../../validation/is-empty';

class CreateOrder extends Component {
  state = {
    id: null,
    isLoaded: false,
    errors: {}
  };

  getCustomerByID = id =>
    this.props.customers.customers.find(customer => customer._id === id);

  handleSubmit = e => {
    e.preventDefault();

    const { dishes, customer, comment } = this.props.orders.order;

    if (isEmpty(customer)) {
      this.props.getOrderErrors({
        customer: 'Выберете Заказчика'
      });
      return;
    }

    if (isEmpty(dishes)) {
      this.props.getOrderErrors({
        dishes: 'Выберете блюда'
      });
      return;
    }

    if (!dishes.every(dish => dish.amount > 0)) {
      this.props.getOrderErrors({
        dishes: 'Где то вкралась строка с количеством блюда = 0!'
      });
      return;
    }

    const orderData = {
      customer,
      dishes,
      comment,
      total: this.props.orders.orderTotal
    };

    !this.state.id
      ? this.props.createOrder(orderData, this.props.history)
      : this.props.saveOrder(this.state.id, orderData, this.props.history);
  };

  handleInput = e => this.props.addCommentToOrder(e.target.value);

  handleSelect = e => this.props.addCustomerToOrder(e.target.value);

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.customers.customers) {
      this.setState({
        isLoaded: true
      });
    }
    if (nextProps.orders.errors) {
      this.setState({
        errors: nextProps.orders.errors
      });
    }
  };

  componentDidMount = () => {
    if (isEmpty(this.props.customers.customers)) this.props.getCustomers();

    if (this.props.match.params.id) {
      this.setState({ id: this.props.match.params.id });
      this.props.editOrder(this.props.match.params.id);
    }

    this.setState({
      isLoaded: !isEmpty(this.props.customers.customers)
    });
  };

  getBody = () => {
    const { errors } = this.state;
    const { customer, comment } = this.props.orders.order;
    const { customers } = this.props.customers;

    const customerOptions = [
      {
        label: '...',
        value: '0'
      },
      ...customers.map(customer => ({
        label: customer.name,
        value: customer._id
      }))
    ];

    return (
      <div className="form">
        <SelectListGroup
          name="customer"
          value={!isEmpty(customer) ? customer : '0'}
          handleInput={this.handleSelect}
          options={customerOptions}
          error={errors.customer}
          label="Клиент"
        />
        <SelectDishes />
        <TextAreaFieldGroup
          name="comment"
          value={!isEmpty(comment) ? comment : ''}
          label="Комментарии"
          handleInput={this.handleInput}
        />
        <div className="text-center">
          <input
            type="submit"
            value="Сохранить"
            className="btn btn-info align-center"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="page page--dishes">
        <div className="row">
          <div className="col-md-10 m-auto">
            <Link to={'/orders'} className="btn btn-light">
              Back
            </Link>
            <h1 className="display-4 text-center">
              {!this.state.id ? 'Новый' : 'Изменить'} заказ:
            </h1>
            <small className="d-block pb-3">* = required fields</small>
            {!this.state.isLoaded ? <Spinner /> : this.getBody()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ orders, order, customers, dishes, errors }) => ({
    orders,
    order,
    customers,
    dishes,
    errors
  }),
  {
    createOrder,
    editOrder,
    saveOrder,
    getOrderErrors,
    addCustomerToOrder,
    addCommentToOrder,
    getCustomers
  }
)(CreateOrder);
