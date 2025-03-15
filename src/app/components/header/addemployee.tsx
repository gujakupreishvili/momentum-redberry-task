import React from "react";
import { TiDelete } from "react-icons/ti";
import EmployeeForm from "./employeeForm";

interface AddemployeeProps {
  setShowAddEmployee: (value: boolean) => void;
}

export default function Addemployee({ setShowAddEmployee }: AddemployeeProps) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowAddEmployee(false);
    }
  };
  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 backdrop-blur-xs z-50"
      onClick={handleOutsideClick}
    >
      <div className="w-[913px] bg-white h-[766px] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center px-[50px] rounded-[10px]">
        <div className="w-full flex justify-end mb-[32px]">
          <TiDelete
            onClick={() => setShowAddEmployee(false)}
            className="text-[#DEE2E6] w-[40px] h-[40px] text-[12px] cursor-pointer"
          />
        </div>
        <h1 className="text-[32px] font-firago font-medium text-[#212529] mb-[45px]">
          თანამშრომლის დამატება
        </h1>
        <EmployeeForm setShowAddEmployee={setShowAddEmployee} />
      </div> 
    </div>
  );
}
