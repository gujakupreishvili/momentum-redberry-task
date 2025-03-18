"use client";
import Header from "@/app/components/header";
import { CreateTaskValidationSchema } from "@/app/utils/validation/createTaskValidationSchema";
import { useFormik } from "formik";
import React, { useState } from "react";
import Title from "./title/title";
import axios from "axios";
import Description from "./description/description";
import Priority from "./priority/priority";
import Status from "./status/status";
import Department from "./department/department";
import Employee from "./employee/employee";
import Addemployee from "@/app/components/header/addemployee";
import Calendar from "./calendar/calendar";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

const initialValues = {
  name: "",
  description: "",
  priority_id: "",
  status_id: "",
  department_id: "",
  employee_id: "",
  due_date: "",
};

export default function Page() {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: CreateTaskValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("priority_id", values.priority_id);
        formData.append("status_id", values.status_id);
        formData.append("employee_id", values.employee_id);
        formData.append("due_date", values.due_date);

        const res = await axios.post(
          "https://momentum.redberryinternship.ge/api/tasks",
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Task created:", res.data);
        resetForm();
        localStorage.removeItem("selectedDepartment");
        localStorage.removeItem("title");
        localStorage.removeItem("description");
        localStorage.removeItem("due_date");
        localStorage.removeItem("status");
        localStorage.removeItem("priority");
        localStorage.removeItem("employee");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = formik;

  console.log(Object.keys(formik.errors).length, "fotmik erros");
  console.log(errors, "errros");
  return (
    <>
      <Header />
      <h1 className="text-[#212529] text-[34px] font-firago font-semibold mt-[40px] px-[6.3%]">
        შექმენი ახალი დავალება
      </h1>
      <form
        onSubmit={handleSubmit}
        className="px-[55px] w-[87%] h-[958px] bg-[#FBF9FFA6] border-[0.3px] border-[#DDD2FF] mx-[6.3%] mt-[30px] rounded-[4px] pt-[65px] pb-[69px] mb-[20px] flex gap-[10%]"
      >
        <div className="w-[81.1%] flex flex-col gap-[55px]">
          <Title
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            setFieldValue={setFieldValue}
          />
          <Description
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.description}
          />
          <div className="flex w-full justify-between">
            <Priority
              setFieldValue={setFieldValue}
              error={errors.priority_id}
            />
            <Status
              setFieldValue={setFieldValue}
              error={errors.status_id}
            />
          </div>
        </div>
        <div className="flex flex-col w-full pr-[313px]">
          <Department
            setFieldValue={setFieldValue}
            error={errors.department_id}
            touched={touched.department_id}
            onBlur={() => setFieldTouched("department_id", true)}
          />
          <Employee
            setFieldValue={setFieldValue}
            error={errors.employee_id}
            departmentId={values.department_id}
            onAddEmployee={() => setShowAddEmployeeModal(true)}
            touched={touched.employee_id}
            onBlur={() => setFieldTouched("employee_id", true)}
            setFieldTouched={setFieldTouched}
          />
          <Calendar
            value={values.due_date}
            onChange={(e) => setFieldValue("due_date", e.target.value)}
            error={errors.due_date}
            touched={touched.due_date}
            setFieldValue={setFieldValue}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={Object.keys(formik.errors).length > 0}
              className={`w-[208px] h-[42px] bg-[#8338EC] rounded-[5px] text-[18px] font-firago font-normal text-white mt-[145px] ${
                Object.keys(formik.errors).length > 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              დავალების შექმნა
            </button>
          </div>
        </div>
      </form>

      {showAddEmployeeModal && (
        <Addemployee setShowAddEmployee={setShowAddEmployeeModal} />
      )}
    </>
  );
}
