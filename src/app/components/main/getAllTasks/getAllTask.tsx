import Image from "next/image";
import React from "react";
import { GoComment } from "react-icons/go";

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

type GetAllTaskProps = {
  task: TasksProps;
  title: { name: string };
};

export default function GetAllTask({ task, title }: GetAllTaskProps) {
  const statusColors: Record<string, string> = {
    დასაწყები: "#F7BC30",
    პროგრესში: "#FB5607",
    "მზად ტესტირებისთვის": "#FF006E",
    დასრულებული: "#3A86FF",
  };

  const departmentColors: Record<number, string> = {
    1: "bg-[#FD9A6A]", 
    2: "bg-[#89B6FF]", 
    3: "bg-[#569f9d]", 
    4: "bg-[#FFD86D]",
    5: "bg-[#63d286]", 
    6: "bg-[#FF66A8]", 
    7: "bg-[#de6ad8]", 
  };

  const borderColor = statusColors[title.name];

  const monthNames = {
    Jan: "იან",
    Feb: "თებ",
    Mar: "მარ",
    Apr: "აპრ",
    May: "მაი",
    Jun: "ივნ",
    Jul: "ივლ",
    Aug: "აგვ",
    Sep: "სექ",
    Oct: "ოქტ",
    Nov: "ნოე",
    Dec: "დეკ",
  };
  
  const rawDate = new Date(task.due_date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
 
  const formattedDate = rawDate.replace(
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
    (match) => monthNames[match as keyof typeof monthNames] 
  );

  return (
    <div
      className={`w-[381px] border-[1px] rounded-[15px] p-[20px]`}
      style={{ borderColor: borderColor }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
 
          <div
            className={`flex border-[0.5px] rounded-[5px] items-center gap-[8px] px-[4px] py-[4px] ${
              task.priority.name === "მაღალი"
                ? "border-[#FA4D4D]"
                : task.priority.name === "საშუალო"
                ? "border-[#FFBE0B]"
                : "border-[#08A508]"
            } w-[86px] h-[26px]`}
          >
            <Image width={12} height={12} src={task.priority.icon} alt="icon" />
            <p
              className={`text-[12px] ${
                task.priority.name === "მაღალი"
                  ? "text-[#FA4D4D]"
                  : task.priority.name === "საშუალო"
                  ? "text-[#FFBE0B]"
                  : "text-[#08A508]"
              } font-firago font-medium`}
            >
              {task.priority.name}
            </p>
          </div>
          <div
            className={`w-[88px] h-[24px] text-white text-[12px] font-firago font-normal px-[10px] flex items-center rounded-[15px] overflow-hidden whitespace-nowrap text-ellipsis ${
              departmentColors[task.employee.department.id]
            }`}
          >
            {task.employee.department.name.length > 10
              ? `${task.employee.department.name.slice(0, 8)}...`
              : task.employee.department.name}
          </div>
        </div>
        <p className="text-[12px] text-[#0D0F10] font-firago font-normal">
          {formattedDate}
        </p>
      </div>
      <h1 className="text-[#212529] text-[15px] font-firago font-semibold mt-[28px]">{task.name}</h1>
      <p className="text-[14px] text-[#343A40] font-firago font-normal mt-[12px] mb-[28px] h-[40px]">{task.description}</p>
      <div className="flex items-center justify-between">
        <Image src={task.employee.avatar} alt="avatar" width={20} height={20}  className="w-[31px] h-[31px] rounded-[15px]"/>
        <div className="flex items-center gap-[5px]">
        <GoComment />
        <p className="text-[14px] font-firago font-normal text-[#212529]">{task.total_comments}</p>
        </div>
      </div>
    </div>
  );
}