'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

type PriorityItem = {
  id: number;
  name: string;
  icon: string;
};

interface PriorityProps {
  setFieldValue: (field: string, value: number) => void;
  error: string | undefined;
}

export default function Priority({ setFieldValue, error }: PriorityProps) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<PriorityItem[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(null);

  useEffect(() => {
    const savedPriority = localStorage.getItem("priority");
    if (savedPriority) {
      const parsedPriority = JSON.parse(savedPriority);
      setSelectedPriority(parsedPriority);
      setFieldValue('priority_id', parsedPriority.id);
    } else {
      const mediumPriority = data.find((item) => item.name === 'საშუალო');
      if (mediumPriority) {
        setSelectedPriority(mediumPriority);
        setFieldValue('priority_id', mediumPriority.id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedPriority) {
      localStorage.setItem("priority", JSON.stringify(selectedPriority));
    }
  }, [selectedPriority]);

  const getPriority = async () => {
    try {
      const res = await axios.get<PriorityItem[]>("https://momentum.redberryinternship.ge/api/priorities");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching priorities:", error);
    }
  };

  useEffect(() => {
    getPriority();
  }, []);

  const handlePriorityClick = (item: PriorityItem) => {
    setSelectedPriority(item);
    setFieldValue('priority_id', item.id);
  };

  return (
    <div className='flex flex-col w-[47%]'>
      <label htmlFor="" className="text-[#343A40] text-[16px] font-firago font-normal pb-[6px]">
        პრიორიტეტი*
      </label>
      <div
        onClick={() => setShow(!show)}
        className={`w-full border-[1px] ${error ? "border-red-500" :"border-[#DEE2E6] "} rounded-[5px] px-[14px] flex flex-col items-center justify-start pt-[11px] cursor-pointer ${
          show ? "overflow-auto" : "overflow-hidden"
        }`}
        style={{ height: show ? "auto" : "46px" }}
      >
        <div className='flex w-full items-center justify-between'>
          <div className="flex items-center gap-2">
            {selectedPriority && (
              <>
                <Image width={20} height={20} src={selectedPriority.icon} alt='icon' />
                <p className='text-[14px] text-[#0D0F10] font-firago font-light' >{selectedPriority.name}</p>
              </>
            )}
          </div>
          <IoIosArrowDown className={`${show && "rotate-180"} transition duration-300 ease-in-out`} />
        </div>
        {show && (
          <div className="w-full my-[10px] flex flex-col gap-[14px]">
            {data.map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-[6px] cursor-pointer'
                onClick={() => handlePriorityClick(item)}
              >
                <Image width={20} height={20} src={item.icon} alt='icon' />
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