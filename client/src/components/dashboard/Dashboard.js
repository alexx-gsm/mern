import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteProfile } from '../../actions/profileActions';
import Spinner from '../common/spinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteProfile();
  };

  checkProfile = profile => {
    const { user } = this.props.auth;
    if (Object.keys(profile).length > 0) {
      return (
        <div>
          <p className="lead text-mute">
            Welcome <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
          </p>
          <ProfileActions />
          {/* TODO: exp and edu */}

          <div style={{ marginBottom: '60px' }}>
            <button className="btn btn-danger" onClick={this.handleDelete}>
              Delete My Account
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p className="lead text-mute">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create profile
          </Link>
        </div>
      );
    }
  };

  render() {
    const { profile, loading } = this.props.profile;

    const dashboardContent =
      profile === null || loading ? <Spinner /> : this.checkProfile(profile);

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

export default connect(
  ({ profile, auth }) => ({
    profile,
    auth
  }),
  { getCurrentProfile, deleteProfile }
)(Dashboard);
