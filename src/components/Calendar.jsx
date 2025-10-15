import { useState, useRef } from 'react'; // Import useRef
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useOnClickOutside from '../hooks/useOnClickOutside'; // Import our new hook

export default function Calendar(props) {
  const { date, handleDateChange } = props;
  const [showCalendar, setShowCalendar] = useState(false);

  // Create a ref that we will assign to the calendar's container
  const calendarRef = useRef();

  // Use the hook to close the calendar when clicking outside
  useOnClickOutside(calendarRef, () => setShowCalendar(false));

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  }

  const handleDateSelect = (newDate) => {
    handleDateChange(newDate);
    setShowCalendar(false); // Also hide calendar after selecting a date
  }

  return (
    // Attach the ref to the main container of the component
    <div className="calendar-container" ref={calendarRef}>
      <button onClick={toggleCalendar} className="calendar-button" aria-label="Open date picker">
        <i className="fa-solid fa-calendar-days"></i>
      </button>
      {showCalendar && (
        <div className="date-picker-wrapper">
            <DatePicker
              selected={date}
              onChange={handleDateSelect}
              inline
              maxDate={new Date('2024-10-15')}
            />
        </div>
      )}
    </div>
  );
}