"use client";
import Addemployee from "@/app/components/header/addemployee";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

type EmployeeItem = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: {
    id: number;
    name: string;
  };
};

interface EmployeeProps {
  setFieldValue: (field: string, value: number | null) => void;
  error: string | undefined;
  departmentId: string;
  onAddEmployee: () => void;
  touched: boolean | undefined;
  onBlur: () => void;
  setFieldTouched: (field: string, isTouched?: boolean) => void;
}

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Employee({
  setFieldValue,
  error,
  departmentId,
  onAddEmployee,
  touched,
  onBlur,
  setFieldTouched,
}: EmployeeProps) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<EmployeeItem[]>([]);
  const [selectEmployee, setSelectEmployee] = useState<EmployeeItem | null>(null);
  const [addEmployee, setAddEmployee] = useState(false);

  useEffect(() => {
    const savedEmployee = localStorage.getItem("employee");
    if (savedEmployee) {
      try {
        const parsedEmployee = JSON.parse(savedEmployee);
        setSelectEmployee(parsedEmployee);
        setFieldValue("employee_id", parsedEmployee.id);
      } catch (error) {
        console.error("Error parsing employee data:", error);
      }
    }
  }, [setFieldValue]);

  useEffect(() => {
    if (selectEmployee) {
      localStorage.setItem("employee", JSON.stringify(selectEmployee));
      setFieldValue("employee_id", selectEmployee.id);
    } else {
      localStorage.removeItem("employee");
      setFieldValue("employee_id", null);
    }
  }, [selectEmployee, setFieldValue]);

  useEffect(() => {
    if (departmentId && selectEmployee) {
      if (selectEmployee.department.id !== Number(departmentId)) {
        setSelectEmployee(null);
        localStorage.removeItem("employee");
        setFieldValue("employee_id", null);
        setFieldTouched("employee_id", true);
      }
    }
  }, [departmentId, selectEmployee, setFieldValue, setFieldTouched]);

  const getEmployee = async () => {
    try {
      const res = await axios.get(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const handleEmployeeClick = useCallback(
    (item: EmployeeItem) => {
      setSelectEmployee(item);
      setShow(false);
      setFieldValue("employee_id", item.id);
      setFieldTouched("employee_id", true);
      onBlur();
    },
    [setFieldValue, onBlur, setFieldTouched]
  );

  const filteredData = data.filter(
    (item) => item.department.id === Number(departmentId)
  );

  return (
    <div className="w-full flex flex-col">
      <label
        className={`${
          departmentId ? "text-[#343A40]" : "text-[#ADB5BD]"
        } text-[16px] font-firago font-normal pb-[6px]`}
      >
        პასუხისმგებელი თანამშრომელი*
      </label>
      <div
        onClick={() => {
          setShow(!show);
          setFieldTouched("employee_id", true);
          onBlur();
        }}
        className={`w-full border-[1px] rounded-[5px] px-[14px] flex flex-col items-center justify-start pt-[10px] cursor-pointer ${
          departmentId ? "border-[#DEE2E6]" : "border-[#ADB5BD]"
        } ${error && touched && !selectEmployee ? "border-red-500" : ""} ${
          show && departmentId ? "mb-[75px]" : "mb-[147px]"
        }`}
        style={{ height: show && departmentId ? "auto" : "46px" }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {selectEmployee?.avatar && (
              <Image
                width={20}
                height={20}
                src={selectEmployee.avatar}
                alt="avatar"
                className="rounded-[16px] w-[28px] h-[28px] object-cover"
              />
            )}
            <p className="text-[14px] text-[#0D0F10] font-firago font-light pl-[6px]">
              {selectEmployee?.name || ""}
            </p>
            <p className="text-[14px] text-[#0D0F10] font-firago font-light">
              {selectEmployee?.surname || ""}
            </p>
          </div>
          <IoIosArrowDown
            className={`${show && departmentId ? "rotate-180" : ""} transition duration-300`}
          />
        </div>

        {departmentId && (
          <div className="overflow-y-auto w-full my-[10px] flex flex-col gap-[14px] max-h-[70px]">
            <div onClick={onAddEmployee} className="flex items-center gap-[8px]">
              <CiCirclePlus className="mt-[3px] text-[18px] text-[#8338EC]" />
              <p className="text-[#8338EC] text-[16px] font-firago font-normal">
                დაამატე თანამშრომელი
              </p>
            </div>
            {addEmployee && <Addemployee setShowAddEmployee={setAddEmployee} />}
            {filteredData.length === 0 && <p>თანამშრომელი ვერ მოიძებნება</p>}
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => handleEmployeeClick(item)}
              >
                <Image
                  width={20}
                  height={20}
                  src={item.avatar}
                  alt="avatar"
                  className="rounded-[16px] w-[28px] h-[28px] object-cover"
                />
                <p className="text-[14px] text-[#000000] font-firago font-normal">
                  {item.name}
                </p>
                <p className="text-[14px] text-[#000000] font-firago font-normal">
                  {item.surname}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
