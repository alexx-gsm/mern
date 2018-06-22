import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utiles/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile';

import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import './App.css';

import Type from './components/type';
import Delivery from './components/delivery';
import DishList from './components/dish';
import CreateDish from './components/dish/create-dish';
import CustomerList from './components/customer/CustomerList';
import CreateCustomer from './components/customer/CreateCustomer';
import EditCustomer from './components/customer/EditCustomer';

import OrderList from './components/order/OrderList';
import CreateOrder from './components/order/CreateOrder';
import EditOrder from './components/order/EditOrder';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container mb-5">
              <Route exact path="/login" component={Login} />
              <Switch>
                <AdminRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/type" component={Type} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/customers"
                  component={CustomerList}
                />
                <PrivateRoute
                  exact
                  path="/create-customer"
                  component={CreateCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-customer/:id"
                  component={EditCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/orders" component={OrderList} />
                <PrivateRoute
                  exact
                  path="/create-order"
                  component={CreateOrder}
                />
                <PrivateRoute
                  exact
                  path="/edit-order/:id"
                  component={EditOrder}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/dishes" component={DishList} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-dish"
                  component={CreateDish}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/delivery" component={Delivery} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
