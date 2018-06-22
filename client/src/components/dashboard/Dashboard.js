import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner';

class Dashboard extends Component {
  componentDidMount = () => {};

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Dashboard</h1>
              <div>
                <p className="lead text-mute">Welcome {user.name}</p>
                <Link to="/orders" className="btn btn-lg btn-info">
                  Заказы
                </Link>
                <Link to="/dishes" className="btn btn-lg btn-info">
                  Блюда
                </Link>
                <Link to="/customers" className="btn btn-lg btn-info">
                  Клиенты
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  ({ profile, auth }) => ({
    profile,
    auth
  }),
  {}
)(Dashboard);
