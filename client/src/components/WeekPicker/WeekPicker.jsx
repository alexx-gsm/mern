import React from 'react';

// DatePicker
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment';
import 'moment/locale/ru';
// icons

// styles
import './style.css';

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('week')
      .toDate(),
    to: moment(date)
      .endOf('week')
      .toDate()
  };
}

class WeekPicker extends React.Component {
  state = {
    isVisible: false,
    hoverRange: undefined
  };

  handleWeekChange = weekNumber => {
    this.props.onChangeWeek(weekNumber);
  };

  handleDayChange = date => {
    const weekNumber = +moment(date).format('W');
    this.setState({
      // selectedDays: getWeekDays(getWeekRange(date).from),
      isVisible: false
    });

    this.props.onChangeDays(getWeekDays(getWeekRange(date).from));
    this.handleWeekChange(weekNumber);
  };

  handleDayEnter = date => {
    this.setState({
      hoverRange: getWeekRange(date)
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined
    });
  };

  handleWeekClick = (weekNumber, days, e) => {
    this.setState({
      isVisible: false
    });
    this.props.onChangeDays(days);
    this.handleWeekChange(weekNumber);
  };

  handleSelectedDay = index => () => {
    this.props.onChangeDay(index);
  };

  render() {
    const { hoverRange } = this.state;
    const {
      selectedDays,
      weekNumber,
      selectedDay,
      countedPayments
    } = this.props;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6]
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6]
    };

    return (
      <div className="SelectedWeekExample">
        <div className="picker-info d-flex align-items-baseline">
          <h2 onClick={() => this.setState({ isVisible: true })}>
            {weekNumber} неделя
          </h2>
          {selectedDays.length === 7 && (
            <div className="picker-period">
              <span className="picker-separator">/</span>
              <ul className="day-selector">
                {selectedDays.map((day, i) => (
                  <li key={i}>
                    <button
                      onClick={this.handleSelectedDay(i)}
                      className={`btn btn-sm position-relative ${
                        selectedDay === i ? 'is-active' : ''
                      }`}
                    >
                      <span className="text-uppercase">
                        {moment(day).format('dd')}
                      </span>
                      <span className="day-selector__data">
                        {moment(day).format('D MMMM')}
                      </span>
                      {countedPayments[i] > 0 && (
                        <span className="badge badge-pill badge-warning">
                          {countedPayments[i]}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {this.state.isVisible && (
            <div className="picker-wrap">
              <DayPicker
                selectedDays={selectedDays}
                showWeekNumbers
                showOutsideDays
                modifiers={modifiers}
                onDayClick={this.handleDayChange}
                onDayMouseEnter={this.handleDayEnter}
                onDayMouseLeave={this.handleDayLeave}
                onWeekClick={this.handleWeekClick}
                firstDayOfWeek={1}
                locale={'ru'}
                localeUtils={MomentLocaleUtils}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WeekPicker;
