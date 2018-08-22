import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SelectDishes from '../dish/SelectDishes';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import {
  editOrder,
  saveOrder,
  setOrderStatus,
  getOrderErrors,
  addCustomerToOrder,
  addCommentToOrder
} from '../../actions/orderActions';
import { getCustomers } from '../../actions/customerActions';
import Spinner from '../common/spinner';
import isEmpty from '../../validation/is-empty';

class EditOrder extends Component {
  state = {
    id: null,
    isLoaded: false,
    errors: {}
  };

  getCustomerByID = id =>
    this.props.customers.customers.find(customer => customer._id === id);

  handleSubmit = e => {
    e.preventDefault();

    const { dishes, customer, status, comment } = this.props.orders.order;

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
      status,
      comment,
      total: this.props.orders.orderTotal
    };

    this.props.saveOrder(this.state.id, orderData, this.props.history);
  };

  handleInput = e => this.props.addCommentToOrder(e.target.value);

  handleSelect = e => this.props.addCustomerToOrder(e.target.value);

  handleStatus = e => this.props.setOrderStatus(e.target.value);

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

  getStatusLabel = status =>
    this.props.orders.status.find(item => item.value === status).label;

  getBody = () => {
    const { errors } = this.state;
    const { customer, comment } = this.props.orders.order;
    const { customers } = this.props.customers;
    const { status } = this.props.orders.order;

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

    const statusOptions = this.props.orders.status;

    const statusSelect =
      this.props.auth.user.role === 'admin' ? (
        <SelectListGroup
          name="status"
          value={!isEmpty(status) ? status : '-'}
          handleInput={this.handleStatus}
          options={statusOptions}
          error={errors.status}
          label="Статус"
        />
      ) : (
        <div>{!isEmpty(status) ? this.getStatusLabel(status) : '-'}</div>
      );

    return (
      <div className="form">
        <div className="row">
          <div className="col">
            <SelectListGroup
              name="customer"
              value={!isEmpty(customer) ? customer : '0'}
              handleInput={this.handleSelect}
              options={customerOptions}
              error={errors.customer}
              label="Клиент"
            />
          </div>
          <div className="col">{statusSelect}</div>
        </div>

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
          <div className="col-12">
            <Link to={'/orders'} className="btn btn-light">
              Back
            </Link>
            <h1 className="display-4 text-center">
              {!this.state.id ? 'Новый' : 'Изменить'} заказ:
            </h1>
            {!this.state.isLoaded ? <Spinner /> : this.getBody()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ orders, order, customers, dishes, errors, auth }) => ({
    orders,
    order,
    customers,
    dishes,
    errors,
    auth
  }),
  {
    editOrder,
    saveOrder,
    setOrderStatus,
    getOrderErrors,
    addCustomerToOrder,
    addCommentToOrder,
    getCustomers
  }
)(EditOrder);
