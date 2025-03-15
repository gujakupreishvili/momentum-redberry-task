import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import Avatar from './avatar';
import { IoIosArrowDown } from 'react-icons/io';
import FilterModal from '../main/selecSection/departmentModal/filterModal';

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

export default function EmployeeForm({ setShowAddEmployee }: AddemployeeProps) {
  const [isShown, setIsShown] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>({
    departments: [],
    priorities: [],
    employees: [],
  });
  const handleIsShow = () => {
    setIsShown((prev) => (prev === 1 ? 0 : 1)); 
  }
  
  return (
    <form action="" className="w-full">
    <div className="flex w-full justify-between ">
      <div className="flex flex-col">
        <label
          htmlFor=""
          className="text-[14px] text-[#343A40] font-medium font-firago pb-[3px]"
        >
          {" "}
          სახელი*
        </label>
        <input
          type="text"
          className="w-[384px] h-[42px] border-[1px] border-[#CED4DA] rounded-[6px] px-[10px]"
        />
        <div className="flex items-center mt-[10px] gap-[5px]">
          <FaCheck className="text-[12px] text-[#6C757D]" />
          <p className="text-[#6C757D] text-[10px] font-firago font-light">
            მინიმუმ 2 სიმბოლო
          </p>
        </div>
        <div className="flex items-center mt-[5px] gap-[5px]">
          <FaCheck className="text-[12px] text-[#6C757D]" />
          <p className="text-[#6C757D] text-[10px] font-firago font-light">
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor=""
          className="text-[14px] text-[#343A40] font-medium font-firago pb-[3px]"
        >
          {" "}
          გვარი*
        </label>
        <input
          type="text"
          className="w-[384px] h-[42px] border-[1px] border-[#CED4DA] rounded-[6px] px-[10px]"
        />
        <div className="flex items-center mt-[10px] gap-[5px]">
          <FaCheck className="text-[12px] text-[#6C757D]" />
          <p className="text-[#6C757D] text-[10px] font-firago font-light">
            მინიმუმ 2 სიმბოლო
          </p>
        </div>
        <div className="flex items-center mt-[5px] gap-[5px]">
          <FaCheck className="text-[12px] text-[#6C757D]" />
          <p className="text-[#6C757D] text-[10px] font-firago font-light">
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>
      </div>
    </div>
    <Avatar />
    <div className="mt-[45px] w-full relative">
      <p className="text-[#343A40] text-[14px] font-firago font-medium pb-[8px]">
        დეპარტამენტი*
      </p>
      <div
        className="w-[384px] h-[42px] border-[1px] border-[#CED4DA] rounded-[6px] flex items-center justify-between px-[14px] cursor-pointer"
        onClick={handleIsShow}
      >
        <p>
          {selectedFilter.departments[0]?.name}
        </p>
        <IoIosArrowDown className={`${isShown === 1 && "rotate-180"}`} />
      </div>
      {isShown === 1 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) => {
            setSelectedFilter((prev) => ({
              ...prev,
              departments: prev.departments.some(
                (selected) => selected.id === item.id
              )
                ? [] 
                : [item],
            }));
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
      <button className="w-[263px] h-[42px] bg-[#8338EC] rounded-[5px] text-[18px] text-white font-firago font-normal">
        დაამატე თანამშრომელი
      </button>
    </div>
  </form>
  )
}
