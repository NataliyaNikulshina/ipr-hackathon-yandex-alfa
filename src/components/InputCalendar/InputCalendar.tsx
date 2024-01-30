import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './InputCalendar.scss';
import CalendarIcon from '../../ui/icons/calendar';
import russianLocale from './calendar-config';

const InputCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log(date?.toLocaleDateString())
  };

  const handleButtonClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true)
    }
  };
  return (
    <div className="calendar">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        locale={russianLocale}
        className="calendar__input"
        ref={datePickerRef}
      />
      <button className="calendar__button" onClick={handleButtonClick}>
        <CalendarIcon />
      </button>

    </div>

  );
};

export default InputCalendar;