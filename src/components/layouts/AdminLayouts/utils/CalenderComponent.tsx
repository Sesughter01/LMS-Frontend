// CalendarComponent.tsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponent: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value !== null) {
        onChange(value);
    }
  };

  return (
    <> 
        <Calendar className="bg-white w-[320px] h-[327px] drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg" onChange={handleDateChange} value={value as ValuePiece} />
    </>
  );
};

export default CalendarComponent;



// const CalendarComponent: React.FC<CalendarProps> = () => {
//   const [value, onChange] = useState<Value>(new Date());

//   const handleDateChange = (newDate: Value) => {
//     onChange(newDate);
//     // Add your logic for handling date changes here
//   };