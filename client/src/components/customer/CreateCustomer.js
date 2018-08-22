import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createCustomer } from '../../actions/customerActions';

class CreateCustomer extends Component {
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

    const customerData = {
      name: this.state.name,
      person: this.state.person,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address
    };

    this.props.createCustomer(customerData, this.props.history);
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="page page--create-dish">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/customers" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Create Customer</h1>
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
              <input
                type="submit"
                value="Сохранить"
                className="btn btn-info btn-block mt-4 align-center"
              />
            </form>
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
    createCustomer
  }
)(CreateCustomer);
