"use client";
import React, { useEffect, useState } from "react";
import Statuses from "../statuses/statuses";
import GetAllTask from "../getAllTasks/getAllTask";

import { axiosInstance } from "@/app/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";
import { useLocalStorageFilters } from "@/app/hooks/useSessionStorageFilters";

type StatusesItem = {
  id: number;
  name: string;
};

type TasksProps = {
  id: number;
  name: string;
  description: string | null;
  due_date: string;
  department: {
    id: number;
    name: string;
  };
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

type FilterTypes = {
  departments: { id: number; name: string };
  priorities: { id: number; name: string };
  employees: { id: number; name: string; surname?: string };
};

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function TaskSection() {
  const [data, setData] = useState<StatusesItem[] | null>(null);
  const [taskData, setTaskData] = useState<TasksProps[] | null>(null);
  const router = useRouter();

  const filteredData = useLocalStorageFilters("selectedFilters");
  
  const getStatuses = async () => {
    try {
      const res = await axiosInstance.get("statuses"
       );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    try {
      const res = await axiosInstance.get("tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTaskData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatuses();
    getTask();
  }, []);
  if (!taskData) {
    return <div className=' w-full flex items-center h-screen justify-center'><DotLoader color="#8338EC" /></div> ;
  }

  const handleTaskClick = (taskId: number) => {
     localStorage.removeItem("selectedFilters")
    router.push(`/getTask/${taskId}`); 
  };
  return (
<div className="flex flex-col mt-[79px] h-[calc(100vh-79px)]">
  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[52px]">
    {data?.map((item) => (
      <Statuses key={item.id} title={item.name} />
    ))}
  </div>
  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[52px] flex-grow overflow-y-auto mt-[30px]">
    {data?.map((item) => (
      <div key={item.id} className="flex flex-col gap-[30px]">
        {taskData
          ?.filter((task) => task.status.name === item.name)
          ?.filter((task: TasksProps) =>
            filteredData.departments?.length > 0
              ? filteredData.departments
                  .map((d: FilterTypes["departments"]) => d.id)
                  .includes(task.department.id)
              : true
          )
          ?.filter((task) =>
            filteredData.priorities?.length > 0
              ? filteredData.priorities
                  .map((p: FilterTypes["priorities"]) => p.id)
                  .includes(task.priority.id)
              : true
          )
          ?.filter((task) =>
            filteredData.employees?.length > 0
              ? filteredData.employees
                  .map((p: FilterTypes["employees"]) => p.id)
                  .includes(task.employee.id)
              : true
          )
          .map((res) => (
            <div  key={res.id} onClick={() =>handleTaskClick(res.id)}>
              <GetAllTask key={res.id} task={res} title={item} />
            </div>
          ))}
      </div>
    ))}
  </div>
</div>

  );
}