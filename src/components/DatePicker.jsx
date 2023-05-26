import React, { useRef } from "react";

const DatePicker = ({ date, setDate }) => {
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <label>Start date: </label>
      <input
        type="date"
        onChange={handleChange}
        ref={dateInputRef}
        value={date}
      />
    </div>
  );
};

export default DatePicker;
