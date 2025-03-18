"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type StatusItem = {
  id: number;
  name: string;
};

interface StatusProps {
  setFieldValue: (field: string, value: number) => void;
  error: string | undefined;
}

export default function Status({ setFieldValue, error }: StatusProps) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<StatusItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(null);

  useEffect(() => {
    const savedStatus = localStorage.getItem("status");
    if (savedStatus) {
      const parsedStatus = JSON.parse(savedStatus);
      setSelectedStatus(parsedStatus);
      setFieldValue("status_id", parsedStatus.id);
    } else {

      const defaultStatus = data.find((item) => item.name === "დასაწყები");
      if (defaultStatus) {
        setSelectedStatus(defaultStatus);
        setFieldValue("status_id", defaultStatus.id);
      }
    }
  }, [data]); 

  useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem("status", JSON.stringify(selectedStatus));
    }
  }, [selectedStatus]);

  const getStatus = async () => {
    try {
      const res = await axios.get<StatusItem[]>(
        "https://momentum.redberryinternship.ge/api/statuses"
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handleStatusClick = (item: StatusItem) => {
    setSelectedStatus(item);
    setShow(false);
  };

  return (
    <div className="flex flex-col w-[47%]">
      <label
        htmlFor=""
        className="text-[#343A40] text-[16px] font-firago font-normal pb-[6px]"
      >
        სტატუსი*
      </label>
      <div
        onClick={() => setShow(!show)}
        className={`w-full border-[1px] ${
          error ? "border-red-500" : "border-[#DEE2E6]"
        } rounded-[5px] px-[14px] flex flex-col items-center justify-start pt-[11px] cursor-pointer ${
          show ? "overflow-auto" : "overflow-hidden"
        }`}
        style={{ height: show ? "auto" : "46px" }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedStatus && (
              <>
                <p className='text-[14px] text-[#0D0F10] font-firago font-light'>
                  {show
                    ? selectedStatus.name
                    : selectedStatus.name.length > 12
                    ? `${selectedStatus.name.slice(0, 12)}...`
                    : selectedStatus.name}
                </p>
              </>
            )}
          </div>
          <IoIosArrowDown
            className={`${
              show && "rotate-180"
            } transition duration-300 ease-in-out`}
          />
        </div>
        {show && (
          <div className="w-full my-[10px] flex flex-col gap-[14px]">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-[6px] cursor-pointer"
                onClick={() => handleStatusClick(item)}
              >
                <h1 className='text-[14px] text-[#0D0F10] font-firago font-light'>{item.name}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}