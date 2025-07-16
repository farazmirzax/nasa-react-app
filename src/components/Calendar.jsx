import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar(props) {
  const { date, handleDateChange } = props;
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  }

  const handleDateSelect = (newDate) => {
    handleDateChange(newDate);
    setShowCalendar(false); // Hide calendar after selecting a date
  }

  return (
    <div className="calendar-container">
      <button onClick={toggleCalendar} className="calendar-button" aria-label="Open date picker">
        <i className="fa-solid fa-calendar-days"></i>
      </button>
      {showCalendar && (
        <div className="date-picker-wrapper">
            <DatePicker
              selected={date}
              onChange={handleDateSelect}
              inline
              maxDate={new Date()}
            />
        </div>
      )}
    </div>
  );
}