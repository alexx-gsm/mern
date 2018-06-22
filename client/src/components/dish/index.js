import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDishes } from '../../actions/dishActions';
import Spinner from '../common/spinner';

class DishList extends Component {
  componentDidMount = () => this.props.getDishes();

  getDishList = items => items.map(item => <li key={item._id}>{item.name}</li>);

  render() {
    const { dishes, loading } = this.props.dishes;

    const dishContent =
      dishes === null || loading ? (
        <Spinner />
      ) : (
        <ul>{this.getDishList(dishes)}</ul>
      );

    return (
      <div className="page page--dishes">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={'/create-dish'} className="btn btn-light">
              Add
            </Link>
            <h1 className="display-4 text-center">Список блюд</h1>
            {dishContent}
          </div>
        </div>
      </div>
    );
  }
}

DishList.propTypes = {
  dish: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  ({ dishes, auth }) => ({
    dishes,
    auth
  }),
  { getDishes }
)(DishList);
