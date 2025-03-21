"use client";
import React, { useState } from "react";
import Avatar from "./avatar";
import { IoIosArrowDown } from "react-icons/io";
import FilterModal from "../main/selecSection/departmentModal/filterModal";
import { useFormik } from "formik";
import { EmployeeValidationSchema } from "@/app/utils/validation/employeeValidationSchema";
import { axiosInstance } from "@/app/lib/axiosInstance";

interface AddemployeeProps {
  setShowAddEmployee: (value: boolean) => void;
}

type FilterItem = {
  id: number;
  name: string;
};

type FilterTypes = {
  departments: FilterItem[];
  priorities: FilterItem[];
  employees: FilterItem[];
};

const initialValue = {
  name: "",
  surname: "",
  avatar: null,
  department_id: "",
};

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function EmployeeForm({ setShowAddEmployee }: AddemployeeProps) {
  const [isShown, setIsShown] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>({
    departments: [],
    priorities: [],
    employees: [],
  });

  const handleIsShow = () => {
    setIsShown((prev) => (prev === 1 ? 0 : 1));
  };

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("department_id", values.department_id);
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        const res = await axiosInstance.post("employees", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Employee created:", res.data);
        setShowAddEmployee(false); 
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    },
    validationSchema: EmployeeValidationSchema,
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
  } = formik;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <label className="text-[14px] text-[#343A40] font-medium font-firago pb-[3px]">
            სახელი*
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            name="name"
            type="text"
            className={`w-[384px] h-[42px] border-[1px] rounded-[6px] px-[10px] ${
              errors.name ? "border-red-500" : "border-[#CED4DA]"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] mt-[4px] font-firago font-medium">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-[14px] text-[#343A40] font-medium font-firago pb-[3px]">
            გვარი*
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.surname}
            name="surname"
            type="text"
            className={`w-[384px] h-[42px] border-[1px] rounded-[6px] px-[10px] ${
              errors.surname ? "border-red-500" : "border-[#CED4DA]"
            }`}
          />
          {errors.surname && (
            <p className="text-red-500 text-[10px] mt-[4px] font-firago font-medium">
              {errors.surname}
            </p>
          )}
        </div>
      </div>
      <Avatar
        onChange={(file) => setFieldValue("avatar", file)}
        error={errors.avatar}
      />
      <div className="mt-[45px] w-full relative">
        <p className="text-[#343A40] text-[14px] font-firago font-medium pb-[8px]">
          დეპარტამენტი*
        </p>
        <div
          className={`w-[384px] h-[42px] border-[1px] rounded-[6px] flex items-center justify-between px-[14px] cursor-pointer ${
            errors.department_id ? "border-red-500" : "border-[#CED4DA]"
          }`}
          onClick={handleIsShow}
        >
          <p>{selectedFilter.departments[0]?.name }</p>
          <IoIosArrowDown
            className={`${isShown === 1 && "rotate-180"} ${
              errors.department_id ? "text-red-500" : "text-[#343A40]"
            }`}
          />
        </div>
        {isShown === 1 && (
          <FilterModal
            selectedFilter={selectedFilter}
            setSelectedFilter={(item: FilterItem) => {
              const newDepartments = selectedFilter.departments.some(
                (selected) => selected.id === item.id
              )
                ? []
                : [item];

              setSelectedFilter((prev) => ({
                ...prev,
                departments: newDepartments,
              }));

              if (newDepartments.length === 0) {
                setFieldValue("department_id", "");
              } else {
                setFieldValue("department_id", item.id);
              }
            }}
            onClose={() => setIsShown(0)}
            filterType="departments"
            width="384px"
            height="150px"
            showButton={false}
            itemsheight="100px"
          />
        )}
      </div>
      <div className="w-full mt-[65px] flex items-center gap-[22px] justify-end">
        <button
          onClick={() => setShowAddEmployee(false)}
          className="w-[102px] h-[42px] rounded-[5px] border-[1px] border-[#8338EC] text-[#343A40] tex-[16px] font-normal font-firago cursor-pointer"
        >
          გაუქმება
        </button>
        <button
          type="submit"
          className={`w-[263px] h-[42px] bg-[#8338EC]  rounded-[5px] text-[18px] text-white font-firago font-normal  ${
            hasErrors ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B588F4] cursor-pointer"
          }`}
          disabled={hasErrors}
        >
          დაამატე თანამშრომელი
        </button>
      </div>
    </form>
  );
}