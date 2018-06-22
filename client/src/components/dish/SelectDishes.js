import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDishes } from '../../actions/dishActions';
import {
  addDishToOrder,
  setOrderTotal,
  setReadyToOrderDish,
  editDishInOrder
} from '../../actions/orderActions';
import SelectListGroup from '../common/SelectListGroup';
import Spinner from '../common/spinner';
import isEmpty from '../../validation/is-empty';

class SelectDishes extends Component {
  state = {
    isLoaded: false,
    total: 0,
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.orders.errors) {
      this.setState({
        errors: nextProps.orders.errors
      });
    }
    if (nextProps.dishes.dishes && nextProps.orders.order) {
      this.setState({
        isLoaded: true
      });
    }
  };

  componentDidMount = () => {
    if (isEmpty(this.props.dishes.dishes)) this.props.getDishes();
  };

  handleAddNewDish = () => {
    const newDish = {
      amount: 0,
      dish_id: {}
    };

    this.props.addDishToOrder(newDish);
  };

  getDishByID = id => this.props.dishes.dishes.find(dish => dish._id === id);

  handleSelect = i => e => {
    const { dishes } = this.props.orders.order;
    const dish_id = e.target.value;

    this.props.editDishInOrder([
      ...dishes.slice(0, i),
      {
        amount: 1,
        dish_id
      },
      ...dishes.slice(i + 1)
    ]);
  };

  handleInc = i => e => {
    if (e.target.value === '0') {
      return;
    }

    const { dishes } = this.props.orders.order;
    const dish = dishes[i];

    this.props.editDishInOrder([
      ...dishes.slice(0, i),
      {
        amount: +dish.amount + 1,
        dish_id: dish.dish_id
      },
      ...dishes.slice(i + 1, dishes.length)
    ]);
  };

  handleDec = i => e => {
    if (e.target.value === '0') {
      return;
    }

    const { dishes } = this.props.orders.order;

    let amount = +dishes[i].amount - 1;
    if (amount === 0) {
      amount = 1;
    }

    this.props.editDishInOrder([
      ...dishes.slice(0, i),
      {
        amount,
        dish_id: dishes[i].dish_id
      },
      ...dishes.slice(i + 1)
    ]);
  };

  handleDelete = i => e => {
    const { dishes } = this.props.orders.order;

    this.props.editDishInOrder([...dishes.filter((dish, row) => i !== row)]);
  };

  getTotalInRow = i => {
    const { dishes } = this.props.orders.order;
    const dish = dishes[i];

    if (isEmpty(dish.dish_id)) {
      return 0;
    }

    const price = this.getDishByID(dish.dish_id).price;

    return dish.amount * price;
  };

  componentDidUpdate = prevProps => {
    const { dishes } = this.props.orders.order;
    const { orderTotal } = this.props.orders;

    if (isEmpty(dishes) || isEmpty(this.props.dishes.dishes)) {
      if (orderTotal > 0) {
        this.props.setOrderTotal(0);
      }
      return;
    }

    const newOrderTotal = dishes.reduce((sum, { amount, dish_id }) => {
      const dish = this.getDishByID(dish_id);
      return isEmpty(dish) ? sum : sum + amount * dish.price;
    }, 0);

    if (newOrderTotal !== orderTotal) {
      this.props.setOrderTotal(newOrderTotal);
    }
  };

  getCheckingDishesTools = i => {};

  handleReadyDish = (dishID, is_ready) => () =>
    this.props.setReadyToOrderDish(
      this.props.orders.order._id,
      dishID,
      is_ready
    );

  getBody = () => {
    const { dishes = [], total } = this.props.orders.order;

    const { role } = this.props.auth.user;

    const options = [
      {
        label: '...',
        value: '0'
      },
      ...this.props.dishes.dishes.map(dish => ({
        label: dish.name,
        value: dish._id
      }))
    ];

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th />
              <th />
              <th>Название блюда</th>
              <th>Цена</th>
              <th className="text-center">Кол-во</th>
              <th>готово?</th>
              <th className="text-right">Всего</th>
            </tr>
          </thead>
          <tbody>
            {this.state.errors.dishes && (
              <tr className="table-danger">
                <td colSpan="6" className="text-danger">
                  {this.state.errors.dishes}
                </td>
              </tr>
            )}
            {dishes.map((item, i) => {
              const dish = this.getDishByID(item.dish_id);
              const totalPerRow = this.getTotalInRow(i);

              const isReadyDish = !item.is_ready ? (
                <button
                  className="btn btn-link"
                  onClick={this.handleReadyDish(item.dish_id, true)}
                >
                  <i className="material-icons">radio_button_unchecked</i>
                </button>
              ) : (
                <button
                  className="btn btn-link"
                  onClick={this.handleReadyDish(item.dish_id, false)}
                >
                  <i className="material-icons">radio_button_checked</i>
                </button>
              );

              return (
                <tr key={i}>
                  <td className="cell--btn-remove">
                    <button
                      onClick={this.handleDelete(i)}
                      className="btn btn-link btn-sm btn--remove"
                    >
                      <i className="material-icons">highlight_off</i>
                    </button>
                  </td>
                  <th scope="row" className="cell--number">
                    <div>{i + 1}.</div>
                  </th>
                  <td>
                    <SelectListGroup
                      name="dish"
                      value={!isEmpty(dish) ? dish._id : '0'}
                      handleInput={this.handleSelect(i)}
                      options={options}
                    />
                  </td>
                  <td>
                    <div className="cell--number">
                      {!isEmpty(dish) ? dish.price : '0'} р.
                    </div>
                  </td>
                  <td className="cell--amount text-center">
                    <button
                      onClick={this.handleDec(i)}
                      value={!isEmpty(dish) ? dish._id : '0'}
                      className="btn btn--icon btn-outline-secondary btn-sm mr-3"
                    >
                      <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                    <span>{item.amount}</span>
                    <button
                      onClick={this.handleInc(i)}
                      value={!isEmpty(dish) ? dish._id : '0'}
                      className="btn btn--icon btn-outline-success btn-sm ml-3"
                    >
                      <i className="material-icons">keyboard_arrow_right</i>
                    </button>
                  </td>
                  <td>{role === 'cook' ? isReadyDish : null}</td>
                  <td align="right">
                    <div className="cell--number">{totalPerRow} р.</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td align="left" className="cell--btn-add">
                <button
                  className="btn btn-sm btn-link btn--add"
                  onClick={this.handleAddNewDish}
                >
                  <i className="material-icons">add_circle</i>
                </button>
              </td>
              <td colSpan="5" align="right">
                ИТОГО:
              </td>
              <td align="right">
                <b>{this.props.orders.orderTotal} р.</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Блюда:</h2>
        <div>{this.state.isLoaded ? this.getBody() : null}</div>
      </div>
    );
  }
}

export default connect(
  ({ orders, order, dishes, auth }) => ({
    orders,
    order,
    dishes,
    auth
  }),
  {
    getDishes,
    setOrderTotal,
    addDishToOrder,
    setReadyToOrderDish,
    editDishInOrder
  }
)(SelectDishes);
