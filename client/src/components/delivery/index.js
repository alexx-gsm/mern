import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderList from '../order/OrderList';

class Delivery extends Component {
  render() {
    return (
      <div className="page page--delivery">
        <OrderList />
      </div>
    );
  }
}

Delivery.propTypes = {};

export default Delivery;
