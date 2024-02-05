import React, { useRef } from 'react';
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
}
const InputCalendar: React.FC<InputCalendarProps> = ({ icon, name, value, onChange }) => {
  const datePickerRef = useRef<DatePicker>(null);

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
      />
      <button className={icon ? 'calendar__button activ' : 'calendar__button'} onClick={handleButtonClick}>
        <CalendarIcon />
      </button>

    </div>

  );
};

export default InputCalendar;