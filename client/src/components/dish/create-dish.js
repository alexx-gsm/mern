import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createDish } from '../../actions/dishActions';

class CreateDish extends Component {
  state = {
    name: '',
    weight: '',
    price: '',
    price2: '',
    category: '',
    desc: '',
    structure: '',
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const dishData = {
      name: this.state.name,
      weight: this.state.weight,
      price: this.state.price,
      price2: this.state.price2,
      category: this.state.category,
      desc: this.state.desc,
      structure: this.state.structure
    };

    this.props.createDish(dishData, this.props.history);
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  // getDishByID = id => this.props.dish.dishes.filter(item => item._id === id);

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: '...', value: '0' },
      { label: 'Салат', value: 'Salad' },
      { label: 'Первое', value: 'First' },
      { label: 'Второе', value: 'Second' },
      { label: 'Гарнир', value: 'Garnish' },
      { label: 'Выпечка', value: 'Baking' },
      { label: 'Соус', value: 'Souce' },
      { label: 'Другое', value: 'etc' }
    ];

    return (
      <div className="page page--create-dish">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dishes" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Create Dish</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="name"
                label="Название *"
                value={this.state.name}
                handleInput={this.handleInput}
                error={errors.name}
              />
              <SelectListGroup
                name="category"
                value={this.state.category}
                handleInput={this.handleInput}
                options={options}
                error={errors.category}
                label="Категория"
              />
              <TextFieldGroup
                name="weight"
                label="Вес *"
                value={this.state.weight}
                handleInput={this.handleInput}
                error={errors.weight}
              />
              <TextFieldGroup
                name="price"
                label="Цена, р. *"
                type="number"
                step="5"
                value={this.state.price}
                handleInput={this.handleInput}
                error={errors.price}
              />
              <TextFieldGroup
                name="price2"
                label="Цена 2, р. *"
                type="number"
                step="5"
                value={this.state.price2}
                handleInput={this.handleInput}
                error={errors.price2}
              />
              <TextAreaFieldGroup
                name="desc"
                label="Описание"
                value={this.state.desc}
                handleInput={this.handleInput}
                error={errors.desc}
              />
              <TextAreaFieldGroup
                name="structure"
                label="Состав"
                value={this.state.structure}
                handleInput={this.handleInput}
                error={errors.structure}
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

CreateDish.propTypes = {
  errors: PropTypes.object.isRequired
};

export default connect(
  ({ dish, errors }) => ({ dish, errors }),
  {
    createDish
  }
)(withRouter(CreateDish));
