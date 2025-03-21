"use client";
import React, { useState, useEffect,  } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterModal from "./departmentModal/filterModal";
import { IoClose } from "react-icons/io5";


type FilterItem = {
  id: number;
  name: string;
  surname?: string;
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

  
  
  useEffect(() => {
    const savedFilters = localStorage.getItem("selectedFilters");
    if (savedFilters) {
      setSelectedFilter(JSON.parse(savedFilters));
    }
  }, []);
  
  const handleRemoveFilter = (
    item: FilterItem,
    filterType: keyof FilterTypes
  ) => {
    const updatedFilter = {
      ...selectedFilter,
      [filterType]: selectedFilter[filterType].filter(
        (selected) => selected.id !== item.id
      ),
    };
    setSelectedFilter(updatedFilter);
    localStorage.setItem("selectedFilters", JSON.stringify(updatedFilter));
  };

  const handleClearlocalStorage = () => {
    localStorage.clear(); 
    setSelectedFilter({
      departments: [],
      priorities: [],
      employees: [],
    });
  };

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
          className="flex items-center gap-[8px] w-[200px] cursor-pointer"
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
      {(selectedFilter.departments.length > 0 ||
        selectedFilter.employees.length > 0 ||
        selectedFilter.priorities.length > 0) && (
        <div className="flex flex-wrap gap-[8px] mt-[31px] items-center">
          {selectedFilter.departments.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[8px] border-[1px] border-[#CED4DA] rounded-[43px] px-[10px] py-[6px]"
            >
              <p className="text-[#343A40] text-[14px] font-firago font-normal">
                {item.name}
              </p>
              <IoClose
                onClick={() => handleRemoveFilter(item, "departments")}
                className="text-[#343A40] cursor-pointer"
              />
            </div>
          ))}
          {selectedFilter.priorities.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[8px] border-[1px] border-[#CED4DA] rounded-[43px] px-[10px] py-[6px]"
            >
              <p className="text-[#343A40] text-[14px] font-firago font-normal">
                {item.name}
              </p>
              <IoClose
                onClick={() => handleRemoveFilter(item, "priorities")}
                className="text-[#343A40] cursor-pointer"
              />
            </div>
          ))}
          {selectedFilter.employees.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[8px] border-[1px] border-[#CED4DA] rounded-[43px] px-[10px] py-[6px]"
            >
              <p className="text-[#343A40] text-[14px] font-firago font-normal">
                {item.name} {item.surname}
              </p>
              <IoClose
                onClick={() => handleRemoveFilter(item, "employees")}
                className="text-[#343A40] cursor-pointer"
              />
            </div>
          ))}
          <div className="flex items-center gap-[8px] border-[1px] border-[#CED4DA] rounded-[43px] px-[10px] py-[6px]">
            <p className="text-[#343A40] text-[14px] font-firago font-normal">
              გასუფთავება
            </p>
            <IoClose
              onClick={handleClearlocalStorage}
              className="text-[#343A40] cursor-pointer"
            />
          </div>
        </div>
      )}
      {isShown === 1 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) =>
            setSelectedFilter((prev) => ({
              ...prev,
              departments: prev.departments.some(
                (selected) => selected.id === item.id
              )
                ? prev.departments.filter((selected) => selected.id !== item.id)
                : [...prev.departments, item],
            }))
          }
          onClose={() => {
            localStorage.setItem(
              "selectedFilters",
              JSON.stringify(selectedFilter)
            );
            setIsShown(0);
          }}
          filterType="departments"
          width="688px"
          height="274px"
          itemsheight="220px"
        />
      )}
      {isShown === 2 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) =>
            setSelectedFilter((prev) => ({
              ...prev,
              priorities: prev.priorities.some(
                (selected) => selected.id === item.id
              )
                ? prev.priorities.filter((selected) => selected.id !== item.id)
                : [...prev.priorities, item],
            }))
          }
          onClose={() => {
            localStorage.setItem(
              "selectedFilters",
              JSON.stringify(selectedFilter)
            );
            setIsShown(0);
          }}
          filterType="priorities"
          width="688px"
          height="274px"
          itemsheight="220px"
        />
      )}
      {isShown === 3 && (
        <FilterModal
          selectedFilter={selectedFilter}
          setSelectedFilter={(item: FilterItem) =>
            setSelectedFilter((prev) => ({
              ...prev,
              employees: prev.employees.some(
                (selected) => selected.id === item.id
              )
                ? []
                : [item],
            }))
          }
          onClose={() => {
            localStorage.setItem(
              "selectedFilters",
              JSON.stringify(selectedFilter)
            );
            setIsShown(0);
          }}
          filterType="employees"
          width="688px"
          height="274px"
          itemsheight="220px"
        />
      )}
    </div>
  );
}
