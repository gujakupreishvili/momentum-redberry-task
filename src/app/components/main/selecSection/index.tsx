"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterModal from "./departmentModal/filterModal";

type FilterItem = {
  id: number;
  name: string;
};

type FilterTypes = {
  departments: FilterItem[];
  priorities: FilterItem[];
  employees: FilterItem[];
};

export default function SelecSection() {
  const [isShown, setIsShown] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>({
    departments: [],
    priorities: [],
    employees: [],
  });

  console.log(selectedFilter);

  return (
    <div className="relative">
      <h1 className="mb-[52px] text-[34px] font-firago font-semibold text-[#212529] mt-[40px]">
        დავალებების გვერდი
      </h1>
      <div className="flex items-center border-[1px] border-[#DEE2E6] rounded-[10px] w-[688px] h-[44px] px-[18px] py-[12.5px] gap-[45px]">
        <div
          className="flex items-center gap-[8px] w-[199px] cursor-pointer"
          onClick={() => (isShown !== 1 ? setIsShown(1) : setIsShown(0))}
        >
          <p
            className={`text-[16px] font-firago font-normal ${
              isShown === 1 ? "text-[#8338EC]" : "text-[#0D0F10]"
            }`}
          >
            დეპარტამენტი
          </p>
          <IoIosArrowDown
            className={`text-[20px] transition-transform ${
              isShown === 1 && "rotate-180 text-[#8338EC]"
            }`}
          />
        </div>
        <div
          className="flex items-center gap-[8px] w-[199px] cursor-pointer"
          onClick={() => (isShown !== 2 ? setIsShown(2) : setIsShown(0))}
        >
          <p
            className={`text-[16px] font-firago font-normal ${
              isShown === 2 ? "text-[#8338EC]" : "text-[#0D0F10]"
            }`}
          >
            პრიორიტეტი
          </p>
          <IoIosArrowDown
            className={`text-[20px] transition-transform ${
              isShown === 2 && "rotate-180 text-[#8338EC]"
            }`}
          />
        </div>
        <div
          className="flex items-center gap-[8px] w-[200px]"
          onClick={() => (isShown !== 3 ? setIsShown(3) : setIsShown(0))}
        >
          <p
            className={`text-[16px] font-firago font-normal ${
              isShown === 3 ? "text-[#8338EC]" : "text-[#0D0F10]"
            }`}
          >
            თანამშრომელი
          </p>
          <IoIosArrowDown
            className={`text-[20px] transition-transform ${
              isShown === 3 && "rotate-180 text-[#8338EC]"
            }`}
          />
        </div>
      </div>
      {isShown === 1 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) =>
            setSelectedFilter((prev) => ({
              ...prev,
              departments: prev.departments.some((selected) => selected.id === item.id)
                ? prev.departments.filter((selected) => selected.id !== item.id)
                : [...prev.departments, item],
            }))
          }
          onClose={() => setIsShown(0)}
          filterType="departments"
        />
      )}
      {isShown === 2 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) =>
            setSelectedFilter((prev) => ({
              ...prev,
              priorities: prev.priorities.some((selected) => selected.id === item.id)
                ? prev.priorities.filter((selected) => selected.id !== item.id)
                : [...prev.priorities, item],
            }))
          }
          onClose={() => setIsShown(0)}
          filterType="priorities"
        />
      )}
      {isShown === 3 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) =>
            setSelectedFilter((prev) => ({
              ...prev,
              employees: prev.employees.some((selected) => selected.id === item.id)
                ? prev.employees.filter((selected) => selected.id !== item.id)
                : [...prev.employees, item],
            }))
          }
          onClose={() => setIsShown(0)}
          filterType="employees"
        />
      )}
    </div>
  );
}