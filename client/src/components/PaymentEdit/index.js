import PaymentEdit from './PaymentEdit';
import {
  compose,
  withState,
  withHandlers,
  mapProps,
  lifecycle
} from 'recompose';
// redux
import { connect } from 'react-redux';
// moment
import moment from 'moment';
// AC
import {
  getPaymentById,
  savePayment,
  clearPaymentStore
} from '../../actions/paymentActions';
import isEmpty from '../../validation/is-empty';

const newPayment = {
  date: new Date(),
  week: moment().format('W'),
  title: '',
  type: 'income',
  cash: 0,
  card: 0,
  comment: '',
  id: null
};

export default compose(
  connect(
    ({ payments }) => ({ payments }),
    { getPaymentById, savePayment, clearPaymentStore }
  ),
  withState('payment', 'setPayment', newPayment),
  withHandlers({
    onChange: props => event => {
      props.setPayment({
        ...props.payment,
        [event.target.name]: event.target.value
      });
    },
    onDateChange: props => date =>
      props.setPayment({
        ...props.payment,
        date,
        week: moment(date).format('W')
      }),
    onSave: props => () => {
      props.savePayment(props.payment, props.history);
    }
  }),
  lifecycle({
    componentDidMount() {
      const { id } = this.props.match.params;
      if (id) {
        this.props.getPaymentById(id);
      } else {
        this.props.clearPaymentStore();
      }
    },
    componentDidUpdate(prevProps) {
      const { payment, setPayment } = prevProps;
      if (
        isEmpty(payment._id) &&
        this.props.payments.payment &&
        payment !== this.props.payments.payment
      ) {
        setPayment(this.props.payments.payment);
      }
    }
  }),
  mapProps(({ setPayment, history, location, match, ...props }) => props)
)(PaymentEdit);
