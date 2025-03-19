"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Statuses from "../statuses/statuses";
import GetAllTask from "../getAllTasks/getAllTask";

type StatusesItem = {
  id: number;
  name: string;
};

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

// type FilterTypes = {
//   departments: { id: number; name: string }[];
//   priorities: { id: number; name: string }[];
//   employees: { id: number; name: string; surname?: string }[];
// };

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function TaskSection() {
  const [data, setData] = useState<StatusesItem[] | null>(null);
  const [taskData, setTaskData] = useState<TasksProps[] | null>(null);
  // const [filters, setFilters] = useState<FilterTypes>({
  //   departments: [],
  //   priorities: [],
  //   employees: [],
  // });


// const savedFilters = sessionStorage.getItem("selectedFilters");
// console.log(sessionStorage.getItem("selectedFilters"))




  const getStatuses = async () => {
    try {
      const res = await axios.get(
        "https://momentum.redberryinternship.ge/api/statuses"
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    try {
      const res = await axios.get(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
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
    getStatuses();
    getTask();
  }, []);
  // console.log(taskData,"task data")

  return (
    <div className="flex flex-col mt-[79px]">
      <div className="flex items-center w-full gap-[52px]">
        {data?.map((item) => (
          <Statuses key={item.id} title={item.name} />
        ))}
      </div>
      <div className="flex gap-[52px] mt-[30px] max-h-[658px] overflow-y-auto">
  {data?.map((item) => (
    <div key={item.id} className="flex flex-col gap-[30px]">
      {taskData
        ?.filter((task) => task.status.name === item.name)
              // .filter(() => "")
        .map((res) => (
          <GetAllTask key={res.id} task={res} title={item} />
        ))}
    </div>
  ))}
</div>
    </div>
  );
}
