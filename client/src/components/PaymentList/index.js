// import React from 'react';
import {
  compose,
  lifecycle,
  withState,
  withHandlers,
  withProps
} from 'recompose';
import { connect } from 'react-redux';
// AC
import {
  getAllPayments,
  getPaymentsByDay,
  countPaymentsByDay,
  deletePayment,
  setSelectedDaysOfPayments,
  setSelectedWeekOfPayments,
  setSelectedDayOfWeekOfPayments
} from '../../actions/paymentActions';
// useful tools
import isEmpty from '../../validation/is-empty';
// components
import PaymentList from './PaymentList';
import withDialog from '../Dialog';

const getTotal = payments => {
  return payments.reduce((sum, payment) => {
    return payment.type === 'income'
      ? sum + payment.cash + payment.card
      : sum - payment.cash - payment.card;
  }, 0);
};

export default compose(
  connect(
    ({ payments }) => ({ payments }),
    {
      getAllPayments,
      getPaymentsByDay,
      countPaymentsByDay,
      onConfirm: deletePayment,
      onChangeDays: setSelectedDaysOfPayments,
      onChangeWeek: setSelectedWeekOfPayments,
      onChangeDay: setSelectedDayOfWeekOfPayments
    }
  ),
  withState('weekTotal', 'setWeekTotal', 0),
  lifecycle({
    componentDidMount() {
      const { payments, selectedDays, selectedDay } = this.props.payments;
      if (isEmpty(payments)) {
        this.props.getPaymentsByDay(selectedDays[selectedDay]);
      } else {
        this.props.setWeekTotal(getTotal(payments));
      }
      selectedDays.map((day, i) => this.props.countPaymentsByDay(day, i));
    },
    componentDidUpdate(prevProps) {
      const {
        selectedDays,
        selectedDay,
        week,
        payments,
        isRequireRefresh
      } = this.props.payments;

      const prevWeek = prevProps.payments.week;
      if (prevWeek !== week) {
        this.props.getPaymentsByDay(selectedDays[selectedDay]);
        selectedDays.map((day, i) => this.props.countPaymentsByDay(day, i));
      }

      const prevDay = prevProps.payments.selectedDay;
      if (prevDay !== selectedDay) {
        this.props.getPaymentsByDay(selectedDays[selectedDay]);
      }

      const prevPayments = prevProps.payments.payments;
      if (prevPayments !== payments) {
        const total = getTotal(payments);
        this.props.setWeekTotal(total);
      }

      if (isRequireRefresh) {
        this.props.getPaymentsByDay(selectedDays[selectedDay]);
      }
    }
  }),
  withState('isVisible', 'setVisible', false),
  withState('clickedItemId', 'setclickedItemId', ''),
  withProps({
    modalTitle: 'Удаление документа',
    modalText: 'Вы уверены, что хотите удалить этот документ?'
  }),
  withHandlers({
    onEdit: props => id => {
      props.history.push(`/payment-edit/${id}`);
    },
    onDelete: props => id => {
      props.setclickedItemId(id);
      props.setVisible(true);
    }
  }),
  withDialog
)(PaymentList);
