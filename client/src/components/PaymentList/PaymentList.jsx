import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// components
import WeekPicker from '../WeekPicker/WeekPicker.jsx';
// icons
import { Icon } from 'react-icons-kit';
import { pencil } from 'react-icons-kit/icomoon/pencil';
import { bin } from 'react-icons-kit/icomoon/bin';
// styles
import './style.css';

const PaymentList = ({
  payments,
  onEdit,
  onDelete,
  onChangeDays,
  onChangeWeek,
  onChangeDay,
  weekTotal
}) => {
  return (
    <div className="page page--payments">
      <div className="row">
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Link to={'/payment-edit'} className="btn btn-outline-info">
              Добавить
            </Link>
            <h1 className="display-6 text-right">Денежка</h1>
          </div>

          <WeekPicker
            weekNumber={payments.week}
            selectedDays={payments.selectedDays}
            selectedDay={payments.selectedDay}
            countedPayments={payments.countedPayments}
            onChangeDays={onChangeDays}
            onChangeWeek={onChangeWeek}
            onChangeDay={onChangeDay}
          />

          <table className="table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Название</th>
                {/* <th>Тип</th> */}
                <th className="text-right">Нал</th>
                <th className="text-right">Карта</th>
                <th className="text-right">
                  <span>Итого:</span>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payments.payments.map(item => (
                <tr
                  key={item._id}
                  className={item.type === 'outcome' ? 'red' : 'green'}
                >
                  <td>{moment(item.date).format('D MMMM')}</td>
                  <td>{item.title}</td>
                  {/* <td>{item.type}</td> */}
                  <td className="text-right">{item.cash}</td>
                  <td className="text-right">{item.card}</td>
                  <td className="cell-total" align="right">
                    {item.type === 'outcome' && '-'}
                    <b>{item.cash + item.card} р.</b>
                  </td>
                  <td className="text-right">
                    <button
                      className="btn btn-sm btn-success btn-icon"
                      onClick={() => onEdit(item._id)}
                    >
                      <Icon size={16} icon={pencil} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger btn-icon ml-1"
                      onClick={() => onDelete(item._id)}
                    >
                      <Icon size={16} icon={bin} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="no-border" />
                <td className="text-right">ИТОГ:</td>
                <td className="text-right">{weekTotal} р.</td>
                <td className="no-border" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
