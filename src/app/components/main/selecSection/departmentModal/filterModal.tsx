"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

type FilterItem = {
  id: number;
  name: string;
};

type FilterTypes = {
  departments: FilterItem[];
  priorities: FilterItem[];
  employees: FilterItem[];
};

interface FilterModalProps {
  onClose: () => void;
  selectedFilter: FilterTypes;
  setSelectedFilter: (item: FilterItem, filterType: keyof FilterTypes) => void;
  filterType: keyof FilterTypes;
}

export default function FilterModal({
  onClose,
  selectedFilter,
  setSelectedFilter,
  filterType,
}: FilterModalProps) {
  const [data, setData] = useState<FilterItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDepartment = async (filterType: keyof FilterTypes) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://momentum.redberryinternship.ge/api/${filterType}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDepartment(filterType);
  }, [filterType]);

  const handleDepartmentSelect = (item: FilterItem) => {
    setSelectedFilter(item, filterType);
  };

  const handleCloseModal = () => {
    if (selectedFilter[filterType].length === 0) {
      alert("გთხოვთ, აირჩიოთ მინიმუმ ერთი ელემენტი!");
      return;
    }
    onClose();
  };

  if (isLoading) {
    return (
      <div className="w-[688px] h-[274px] border-[1px] border-[#8338EC] rounded-[10px] absolute bg-white mt-[11px] px-[30px] z-30 flex justify-center items-center">
        <DotLoader color="#8338EC" />
      </div>
    );
  }

  return (
    <div className="w-[688px] h-[274px] border-[1px] border-[#8338EC] rounded-[10px] absolute bg-white mt-[11px] px-[30px] pt-[40px] z-30">
      <div
        className={`max-h-[220px] overflow-y-auto ${
          data && data.length > 5 ? "scrollable" : ""
        }`}
      >
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-[15px] mb-[22px]"
          >
            <label
              className={`${
                filterType === "priorities"
                  ? "border-[#8338EC]"
                  : "border-[#212529]"
              } relative flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer`}
            >
              <input
                type="checkbox"
                className="peer hidden"
                checked={selectedFilter[filterType].some((selected) => selected.id === item.id)}
                onChange={() => handleDepartmentSelect(item)}
              />
              <svg
                className={`${
                  filterType === "priorities"
                    ? "text-[#8338EC]"
                    : "text-[#212529]"
                } opacity-0 peer-checked:opacity-100 transition-opacity duration-200`}
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3334 1.33325L5.00008 8.66659L1.66675 5.33325"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>

            <p className="text-[16px] font-firago font-normal text-[#212529]">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <button
        className="absolute right-[30px] bottom-[20px] w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] text-white font-firago text-[16px] z-40"
        onClick={handleCloseModal}
      >
        არჩევა
      </button>
    </div>
  );
}