import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined;
  touched: boolean | undefined;
  setFieldValue: (field: string, value: string) => void;
}

export default function Title({
  value,
  onChange,
  onBlur,
  error,
  touched,
  setFieldValue, 
}: TitleInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const savedTitle = localStorage.getItem("title");
    if (savedTitle) {
      setLocalValue(savedTitle); 
      setFieldValue("name", savedTitle); 
    }
  }, [setFieldValue]);

  useEffect(() => {
    localStorage.setItem("title", localValue);
  }, [localValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue); 
    onChange(e); 
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor=""
        className="tetx-[#343A40] text-[16px] font-firago font-normal pb-[6px]"
      >
        სათაური*
      </label>
      <input
        onChange={handleChange}
        onBlur={onBlur}
        value={localValue}
        name="name"
        type="text"
        className={`${
          error && touched ? "border-red-500" : "border-[#CED4DA]"
        } w-full h-[45px] border-[1px]  rounded-[5px] px-[14px]`}
      />
      <div className="flex items-center mt-[10px] gap-[5px]">
        <FaCheck
          className={`text-[12px] ${
            error === "name must be at least 3 characters"
              ? "text-red-500"
              : "text-[#6C757D]"
          } `}
        />
        <p
          className={`${
            error === "name must be at least 3 characters"
              ? "text-red-500"
              : "text-[#6C757D]"
          }  text-[10px] font-firago font-light`}
        >
          მინიმუმ 3 სიმბოლო
        </p>
      </div>
      <div className="flex items-center mt-[5px] gap-[5px]">
        <FaCheck
          className={`text-[12px] ${
            error === " name must be at most 255 characters"
              ? "text-red-500"
              : "text-[#6C757D]"
          } `}
        />
        <p
          className={`${
            error === " name must be at most 255 characters"
              ? "text-red-500"
              : "text-[#6C757D]"
          }  text-[10px] font-firago font-light`}
        >
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </div>
  );
}