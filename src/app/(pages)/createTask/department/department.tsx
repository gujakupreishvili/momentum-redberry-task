"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type DepartmentItem = {
  id: number;
  name: string;
};

interface DepartmentProps {
  setFieldValue: (field: string, value: number) => void;
  error: string | undefined;
  touched: boolean | undefined;
  onBlur: () => void;
}

export default function Department({ setFieldValue, error, touched, onBlur }: DepartmentProps) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<DepartmentItem[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentItem | null>(null);

  useEffect(() => {
    const savedDepartment = localStorage.getItem("selectedDepartment");
    if (savedDepartment) {
      const parsedDepartment = JSON.parse(savedDepartment);
      setSelectedDepartment(parsedDepartment);
    }
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      localStorage.setItem("selectedDepartment", JSON.stringify(selectedDepartment));
      setFieldValue("department_id", selectedDepartment.id);
    } else {
      localStorage.removeItem("selectedDepartment");
    }
  }, [selectedDepartment, setFieldValue]);

  const getDepartment = async () => {
    try {
      const res = await axios.get<DepartmentItem[]>(
        "https://momentum.redberryinternship.ge/api/departments"
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const handlePriorityClick = (item: DepartmentItem) => {
    setSelectedDepartment(item);
    setShow(false); 
    onBlur(); 
  };

  return (
    <div className={`flex flex-col w-full ${show ? "mb-[19px]" : "mb-[99px]"}`}>
      <label
        htmlFor=""
        className="text-[#343A40] text-[16px] font-firago font-normal pb-[6px]"
      >
        დეპარტამენტი*
      </label>
      <div
        onClick={() => {
          setShow(!show);
          onBlur();
        }}
        className={`w-full border-[1px] rounded-[5px] px-[14px] flex flex-col items-center justify-start pt-[11px] cursor-pointer ${
          error && touched ? "border-red-500" : "border-[#DEE2E6]"
        }`}
        style={{ height: show ? "auto" : "46px" }}
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-[14px] text-[#0D0F10] font-firago font-light">
            {selectedDepartment?.name}
          </p>
          <IoIosArrowDown
            className={`${
              show && "rotate-180"
            } transition duration-300 ease-in-out mt-[3px]`}
          />
        </div>
        {show && (
          <div
            className={`overflow-y-auto w-full my-[10px] flex flex-col gap-[14px] max-h-[70px] ${
              data && data.length > 5 ? "scrollable" : ""
            }`}
          >
            {data?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => handlePriorityClick(item)}
              >
                <h1 className="text-[14px] text-[#000000] font-firago font-normal">
                  {item.name}
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}