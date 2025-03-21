"use client"; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import calendarImg from "../../../../../../public/assets/Images/calendar.png";
import employeeImg from "../../../../../../public/assets/Images/employee.png";
import statusImg from "../../../../../../public/assets/Images/status.png";
import Image from 'next/image';
import { DotLoader } from 'react-spinners';
import { axiosInstance } from '@/app/lib/axiosInstance';
import ChangeStatus from '../changeStatus/changeStatus';

type TasksProps = {
  id: number;
  name: string;
  description: string | null;
  due_date: string;
  priority: {
    id: number;
    name: string;
    icon: string;
  };
  status: {
    id: number;
    name: string;
  };
  total_comments: number;
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: {
      id: number;
      name: string;
    };
  };
};

const token = process.env.NEXT_PUBLIC_API_TOKEN;

const departmentColors: Record<number, string> = {
  1: "bg-[#FD9A6A]",
  2: "bg-[#89B6FF]",
  3: "bg-[#569f9d]",
  4: "bg-[#FFD86D]",
  5: "bg-[#63d286]",
  6: "bg-[#FF66A8]",
  7: "bg-[#de6ad8]",
};

export default function TaskDetails() {
  const [taskData, setTaskData] = useState<TasksProps | null>(null);
  const params = useParams();
  const taskId = params.taskId;

  const getTask = async (id: number) => {
    try {
      const res = await axiosInstance.get(`/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTaskData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTask(Number(taskId));
    }
  }, [taskId]);

  if (!taskData) {
    return <div className='ml-[150px] mt-[100px]'><DotLoader color="#8338EC" /></div> ;

  }

  const formatDateWithDayName = (dateString: string) => {
    const date = new Date(dateString);


    const days = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

    const dayName = days[date.getDay()];

    const formattedDate = date.toLocaleDateString("ka-GE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return `${dayName} - ${formattedDate}`;
  };

  const formattedDate = formatDateWithDayName(taskData.due_date);

  return (
    <div className="flex flex-col p-6">
      <div className="flex items-center gap-[18px]">
        <div
          className={`flex border-[0.5px] rounded-[5px] items-center gap-[8px] px-[4px] py-[4px] ${
            taskData.priority.name === "მაღალი"
              ? "border-[#FA4D4D]"
              : taskData.priority.name === "საშუალო"
              ? "border-[#FFBE0B]"
              : "border-[#08A508]"
          } w-[106px] h-[32px]`}
        >
          {taskData.priority.icon && (
            <Image
              width={12}
              height={12}
              src={taskData.priority.icon}
              alt="icon"
            />
          )}
          <p
            className={`text-[16px] ${
              taskData.priority.name === "მაღალი"
                ? "text-[#FA4D4D]"
                : taskData.priority.name === "საშუალო"
                ? "text-[#FFBE0B]"
                : "text-[#08A508]"
            } font-firago font-medium`}
          >
            {taskData.priority.name}
          </p>
        </div>
        <div
          className={`h-[29px] text-white text-[16px] py-[7px] font-firago font-normal px-[10px] flex items-center rounded-[15px] overflow-hidden whitespace-nowrap text-ellipsis ${
            departmentColors[taskData.employee.department.id]
          }`}
        >
          {taskData.employee.department.name}
        </div>
      </div>
      <h1 className="text-[34px] pt-[32px] font-firago font-semibold">
        {taskData.name}
      </h1>
      <p className="pt-[26px] text-[18px] text-[#000000] font-firago font-normal">
        {taskData?.description}
      </p>
      <div className="flex flex-col">
        <h3 className="text-[#2A2A2A] text-[24px] font-firago font-semibold mt-[73px]">
          დავალების დეტალები
        </h3>
        <div className="flex items-center gap-[70px] mt-[20px] h-[70px] ">
          <div className="flex items-center gap-[6px] w-[164px]">
            <Image src={statusImg} alt="status" className="w-[24px] h-[24px]" />
            <p className="text-[16px] text-[#474747] font-firago font-normal">
              სტატუსი
            </p>
          </div>
          {/* <h1>{taskData.status.name}</h1> */}
          <ChangeStatus />
        </div>
        <div className="flex items-center gap-[70px] h-[70px]">
          <div className="flex items-center gap-[6px] w-[164px]">
            <Image
              width={20}
              height={20}
              src={employeeImg}
              alt="employee"
              className="w-[24px] h-[24px]"
            />
            <p className="text-[16px] text-[#474747] font-firago font-normal">
              თანამშრომელი
            </p>
          </div>
          <div className="flex items-center gap-[12px]">
            {taskData?.employee.avatar && (
              <Image
                width={20}
                height={20}
                src={taskData.employee.avatar}
                alt="avatar"
                className="w-[32px] h-[32px] rounded-[16px]"
              />
            )}
            <div className="flex flex-col">
              <p className="text-[#474747] text-[11px] font-firago font-light">
                {taskData.employee.department.name}
              </p>
              <p className="text-[14px] font-firago font-normal text-[#0D0F10]">
                {taskData.employee.name} {taskData.employee.surname}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[70px]  h-[70px]">
          <div className="flex items-center gap-[6px]">
            <Image
              src={calendarImg}
              alt="calendar"
              width={20}
              height={20}
              className="w-[24px] h-[24px]"
            />
            <p className="text-[16px] text-[#474747] font-firago font-normal">
              დავალების ვადა
            </p>
          </div>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}