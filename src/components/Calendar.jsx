import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar(props) {
  const { date, handleDateChange } = props;
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="calendar-container">
      <button onClick={() => setShowCalendar(!showCalendar)} className="calendar-button">
        <i className="fa-solid fa-calendar-days"></i>
      </button>
      {showCalendar && (
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          inline
          maxDate={new Date()}
        />
      )}
    </div>
  );
}