import { axiosInstance } from "@/app/lib/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";


type TasksProps = {
  status: {
    id: number;
    name: string;
  };
};

type StatusProps = {
  id: number;
  name: string;
};

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function ChangeStatus() {
  const params = useParams();
  const taskId = Number(params.taskId); 
  const [data, setData] = useState<StatusProps[] | null>(null);
  const [taskData, setTaskData] = useState<TasksProps | null>(null);
  const [show, setShow] = useState(false);

  const getTask = async (id: number) => {
    try {
      const res = await axiosInstance.get(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTaskData(res.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const getStatus = async () => {
    try {
      const res = await axiosInstance.get<StatusProps[]>("statuses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const statusUpdate = async (taskId: number, newStatusId: number) => {
    try {
      await axiosInstance.put(
        `/tasks/${taskId}`,
        { status_id: newStatusId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (taskData) {
        setTaskData({
          ...taskData,
          status: {
            id: newStatusId,
            name: data?.find((status) => status.id === newStatusId)?.name || taskData.status.name,
          },
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTask(taskId);
    }
    getStatus();
  }, [taskId]);

  const handleStatusClick = (newStatus: StatusProps) => {
    if (taskId) {
      statusUpdate(taskId, newStatus.id);
      setShow(false);
    }
  };

  return (
    <div
      onClick={() => setShow(!show)}
      className={`w-[259px] border-[1px] border-[#CED4DA] bg-white px-[14px] rounded-[5px] pt-[9px] ${
        !show ? "h-[45px]" : "h-[65px]"
      } ${show ? "overflow-auto" : "overflow-hidden"}
     flex flex-col items-center justify-start right-0`}
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-[#0D0F10] text-[14px] font-firago font-light">{taskData?.status.name}</p>
        <IoIosArrowDown className={`${show && "rotate-180"} transition duration-300 ease-in-out`} />
      </div>
      {show && data && (
        <div className="w-full my-[10px] flex flex-col gap-[14px]">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-[6px] cursor-pointer"
              onClick={() => handleStatusClick(item)}
            >
              <h1 className="text-[14px] text-[#0D0F10] font-firago font-light">{item.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
