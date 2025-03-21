"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import Image from "next/image";

type FilterItem = {
  id: number;
  name: string;
  avatar?: string;
  surname?: string;
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
  width?: string;
  height?: string;
  itemsheight?: string;
  showButton?: boolean;
}

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function FilterModal({
  onClose,
  selectedFilter,
  setSelectedFilter,
  filterType,
  width = "",
  height = "",
  itemsheight = "",
  showButton = true,
}: FilterModalProps) {
  const [data, setData] = useState<FilterItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDepartment = async (filterType: keyof FilterTypes) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://momentum.redberryinternship.ge/api/${filterType}`,
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
    if (!showButton) {
      onClose();
    }
  };
  
  const handleCloseModal = () => {
    if (selectedFilter[filterType].length === 0) {
      alert("გთხოვთ, აირჩიოთ მინიმუმ ერთი ელემენტი!");
      return;
    }
    localStorage.setItem("selectedFilters", JSON.stringify(selectedFilter));
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
    <div
      style={{ width, height }}
      className="border-[1px] border-[#8338EC] rounded-[10px] absolute bg-white mt-[11px] px-[30px] pt-[40px] z-30"
    >
      <div
        style={{ maxHeight: itemsheight }}
        className={`overflow-y-auto ${
          data && data.length > 5 ? "scrollable" : ""
        }`}
      >
        {data?.map((item) => (
          <div key={item.id} className="flex items-center gap-[15px] mb-[22px]">
            <label
              className={`${
                filterType === "priorities" || filterType === "employees"
                  ? "border-[#8338EC]"
                  : "border-[#212529]"
              } relative flex items-center justify-center w-5 h-5 border-2 rounded-md cursor-pointer`}
            >
              <input
                type="checkbox"
                className="peer hidden"
                checked={selectedFilter[filterType].some(
                  (selected) => selected.id === item.id
                )}
                onChange={() => handleDepartmentSelect(item)}
              />
              <svg
                className={`${
                  filterType === "priorities" || filterType === "employees"
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

            {filterType === "employees" && (
              <div className="flex items-center ">
                {item.avatar && (
                  <Image
                    width={28}
                    height={28}
                    src={item.avatar}
                    alt="avatar"
                    className="rounded-[16px] w-[28px] h-[28px] object-cover"
                  />
                )}
                <p className="text-[16px] text-[#212529] font-firago font-normal ml-[10px] mr-[3px]">
                  {item.name}
                </p>
                <p className="text-[16px] text-[#212529] font-firago font-normal">
                  {item.surname}
                </p>
              </div>
            )}

            {filterType !== "employees" && (
              <p className="text-[16px] font-firago font-normal text-[#212529]">
                {item.name}
              </p>
            )}
          </div>
        ))}
      </div>
      {showButton && (
        <button
          className="absolute right-[30px] bottom-[20px] w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] cursor-pointer hover:bg-[#B588F4] text-white font-firago text-[16px] z-40"
          onClick={handleCloseModal}
        >
          არჩევა
        </button>
      )}
    </div>
  );
}