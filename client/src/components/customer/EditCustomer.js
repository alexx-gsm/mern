import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import isEmpty from '../../validation/is-empty';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getCustomerByID, createCustomer } from '../../actions/customerActions';
import Spinner from '../common/spinner';

class EditCustomer extends Component {
  state = {
    name: '',
    person: '',
    phone: '',
    email: '',
    address: '',
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { customer } = this.props.customers;

    customer.name = this.state.name;
    customer.person = this.state.person;
    customer.phone = this.state.phone;
    customer.email = this.state.email;
    customer.address = this.state.address;

    this.props.createCustomer(customer, this.props.history);
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.customers.customer) {
      const {
        name = '',
        person = '',
        phone = '',
        email = '',
        address = ''
      } = nextProps.customers.customer;

      this.setState({ name, person, phone, email, address });
    }
  };

  componentDidMount = () =>
    this.props.getCustomerByID(this.props.match.params.id);

  render() {
    const { errors } = this.state;

    const { customer, loading } = this.props.customers;

    const customerContent =
      customer === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="display-4 text-center">Edit Customer</h1>
          <small className="d-block pb-3">* = required fields</small>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="name"
              label="Название компании *"
              value={this.state.name}
              handleInput={this.handleInput}
              error={errors.name}
            />
            <TextFieldGroup
              name="person"
              label="ФИО *"
              value={this.state.person}
              handleInput={this.handleInput}
              error={errors.person}
            />
            <TextFieldGroup
              name="phone"
              label="Телефон *"
              value={this.state.phone}
              handleInput={this.handleInput}
              error={errors.phone}
            />
            <TextFieldGroup
              name="email"
              type="email"
              label="Почта"
              value={this.state.email}
              handleInput={this.handleInput}
              error={errors.email}
            />
            <TextAreaFieldGroup
              name="address"
              label="Адрес доставки *"
              value={this.state.address}
              handleInput={this.handleInput}
              error={errors.address}
            />
            <div className="form-group row">
              <div className="col-sm-3">
                <Link
                  to="/customers"
                  className="btn btn-secondary btn-block mt-4 align-center"
                >
                  Cancel
                </Link>
              </div>
              <div className="col-sm-9">
                <input
                  type="submit"
                  value="Сохранить"
                  className="btn btn-info btn-block mt-4 align-center"
                />
              </div>
            </div>
          </form>
        </div>
      );

    return (
      <div className="page page--create-dish">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/customers" className="btn btn-light">
              Go Back
            </Link>
            {customerContent}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ customers, errors }) => ({
    customers,
    errors
  }),
  {
    getCustomerByID,
    createCustomer
  }
)(EditCustomer);
