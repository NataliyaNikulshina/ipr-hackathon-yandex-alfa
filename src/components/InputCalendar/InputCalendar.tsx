import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './InputCalendar.scss';
import CalendarIcon from '../../ui/icons/calendar';
import russianLocale from './calendar-config';

interface InputCalendarProps {
  icon?: boolean;
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  setValues?: () => void;
}
const InputCalendar: React.FC<InputCalendarProps> = ({ icon, name, value, onChange, setValues }) => {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker>(null);

  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  //   console.log(date?.toLocaleDateString())
  // };

  const handleButtonClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true)
    }
  };
  return (
    <div className="calendar">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        locale={russianLocale}
        className="calendar__input"
        ref={datePickerRef}
        name={name}
        required
        // value={value}
      />
      <button className={icon ? 'calendar__button activ' : 'calendar__button'} onClick={handleButtonClick}>
        <CalendarIcon />
      </button>

    </div>

  );
};

export default InputCalendar;