import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { rouble, creditCard } from 'react-icons-kit/fa';

import Close from '@material-ui/icons/Close';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import isEmpty from '../../validation/is-empty';

import 'moment/locale/ru';
import './style.css';

const PaymentEdit = ({ payment, onChange, onDateChange, onSave }) => {
  const { date, title, comment, type, cash, card, id } = payment;

  return (
    <div className="page page--dishes">
      <div className="row">
        <div className="col-md-10 m-auto">
          <div
            className={`card card--form ${
              payment.type !== 'income' ? 'card--red' : ''
            }`}
          >
            <div className="card__header position-relative">
              <h2 className="card__header-title text-center">
                {id ? 'Изменить' : 'Новый'}{' '}
                {type === 'income' ? 'Приход' : 'Расход'}:
              </h2>
              <div className="card__btn-close">
                <Link to={'/payments'} className="btn-close">
                  <Close color="disabled" style={{ fontSize: 36 }} />
                </Link>
              </div>
            </div>
            <div className="card__body">
              <div className="form">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="form-check form-check-inline form-check--type">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="income"
                      value="income"
                      checked={type === 'income'}
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="income">
                      Приход
                    </label>
                    <input
                      className="form-check-input ml-3"
                      type="radio"
                      name="type"
                      id="outcome"
                      value="outcome"
                      checked={type !== 'income'}
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="outcome">
                      Расход
                    </label>
                  </div>

                  <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    onDayChange={onDateChange}
                    format="LL"
                    placeholder={formatDate(date, 'LL', 'ru')}
                    name="date"
                    dayPickerProps={{
                      showWeekNumbers: true,
                      todayButton: 'Сегодня',
                      locale: 'ru',
                      localeUtils: MomentLocaleUtils
                    }}
                  />
                </div>
                <TextFieldGroup
                  name="title"
                  label="Название"
                  value={title}
                  handleInput={onChange}
                  // error={}
                />
                <div className="jumbotron p-3 mb-2">
                  <div className="row">
                    <div className="col">
                      <label className="col-form-label">Наличные</label>
                      <div className="input-group">
                        <input
                          name="cash"
                          type="number"
                          min={0}
                          step={1}
                          className="form-control"
                          value={cash}
                          onChange={onChange}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <Icon icon={rouble} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <label className="col-form-label">Карта</label>
                      <div className="input-group">
                        <input
                          name="card"
                          type="number"
                          min={0}
                          step={1}
                          className="form-control"
                          value={card}
                          onChange={onChange}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <Icon icon={creditCard} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <TextAreaFieldGroup
                  name="comment"
                  value={!isEmpty(comment) ? comment : ''}
                  label="Комментарии"
                  handleInput={onChange}
                />
              </div>
            </div>
            <div className="card__footer">
              <button
                type="button"
                className="btn btn-info btn-sm"
                onClick={onSave}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentEdit;
