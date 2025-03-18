import React, { useEffect, useState } from "react";

interface CalendarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  setFieldValue: (field: string, value: string) => void; 
}

export default function Calendar({
  value,
  onChange,
  error,
  touched,
  setFieldValue, 
}: CalendarProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split("T")[0];

  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const savedDate = localStorage.getItem("due_date");
    if (savedDate) {
      setLocalValue(savedDate); 
      setFieldValue("due_date", savedDate);
    }
  }, [setFieldValue]);

  useEffect(() => {
    if (localValue) {
      localStorage.setItem("due_date", localValue);
    } else {
      localStorage.removeItem("due_date");
    }
  }, [localValue]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(e); 
  };

  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor="due_date"
        className="text-[#343A40] text-[16px] font-firago font-normal pb-[6px]"
      >
        დედლაინი
      </label>
      <input
        type="date"
        id="due_date"
        value={localValue}
        onChange={handleDateChange}
        min={formattedDate}
        className={`h-[45px] w-[318px] border-[1px] rounded-[5px] ${
          error && touched ? "border-red-500" : "border-[#DEE2E6]"
        }`}
      />
      {error && touched && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}