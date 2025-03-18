import React, { useEffect, useState } from "react";

interface DescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string | undefined;
}

export default function Description({
  value,
  onChange,
  onBlur,
  error,
}: DescriptionInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const savedDescription = localStorage.getItem("description");
    if (savedDescription) {
      setLocalValue(savedDescription); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("description", localValue);
  }, [localValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue); 
    onChange(e);
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor=""
        className='className="tetx-[#343A40] text-[16px] font-firago font-normal pb-[6px]'
      >
        აღწერა
      </label>
      <textarea
        onChange={handleChange}
        onBlur={onBlur}
        value={localValue}
        name="description"
        className={` ${
          error ? "border-red-500" : "border-[#DEE2E6]"
        } h-[133px] border-[1px] rounded-[5px]  resize-none p-[14px]`}
      />
      <p className="pt-[5px] text-red-500 font-firago font-medium text-[12px]">
        {error && error}
      </p>
    </div>
  );
}