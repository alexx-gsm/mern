import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleForm = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  checkError = err =>
    err ? <div className="invalid-feedback">{err}</div> : '';

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.handleForm}>
                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  type="name"
                  value={this.state.name}
                  handleInput={this.handleInput}
                  error={errors.name}
                />
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={this.state.email}
                  handleInput={this.handleInput}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  handleInput={this.handleInput}
                  error={errors.password}
                />
                <TextFieldGroup
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  value={this.state.password2}
                  handleInput={this.handleInput}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  ({ auth, errors }) => ({
    auth,
    errors
  }),
  { registerUser }
)(withRouter(Register));
