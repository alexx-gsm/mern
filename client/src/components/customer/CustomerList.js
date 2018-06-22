import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomers, deleteCustomer } from '../../actions/customerActions';
import Spinner from '../common/spinner';

class CustomerList extends Component {
  componentDidMount = () => this.props.getCustomers();

  handleClick = (id, history) => () => this.props.deleteCustomer(id, history);

  getCustomerList = customers =>
    customers.map(customer => (
      <li key={customer._id}>
        <NavLink to={`/edit-customer/${customer._id}`}>{customer.name}</NavLink>
        <button
          onClick={this.handleClick(customer._id, this.props.history)}
          className="btn btn-sm btn-danger ml-2"
        >
          X
        </button>
      </li>
    ));

  render() {
    const { customers, loading } = this.props.customers;

    const customerContent =
      customers === null || loading ? (
        <Spinner />
      ) : (
        <ul className="customer__list">{this.getCustomerList(customers)}</ul>
      );

    return (
      <div className="page page--dishes">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={'/create-customer'} className="btn btn-light">
              Add New Customer
            </Link>
            <h1 className="display-4 text-center">Клиенты:</h1>
            {customerContent}
          </div>
        </div>
      </div>
    );
  }
}

CustomerList.propTypes = {
  customers: PropTypes.object.isRequired
};

export default connect(
  ({ customers, auth }) => ({
    customers,
    auth
  }),
  { getCustomers, deleteCustomer }
)(CustomerList);
