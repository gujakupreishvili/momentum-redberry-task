"use client";
import { axiosInstance } from "@/app/lib/axiosInstance";
import { CreatCommentValidationSchema } from "@/app/utils/validation/createCommentValidationSchema";

import { useFormik } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import left from "../../.././../../../public/assets/Images/Left .svg";

const initialValues = {
  text: "",
};

interface Comment {
  author_avatar: string;
  author_nickname: string;
  id: number;
  parent_id: number | null;
  sub_comments: Comment[];
  task_id: number;
  text: string;
}

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Comment() {
  const params = useParams();
  const [data, setData] = useState<Comment[] | null>(null);
  const task = params?.taskId ? String(params.taskId) : null;
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema: CreatCommentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!task) {
        console.error("Error: taskId is missing.");
        return;
      }

      if (!values.text.trim()) {
        console.error("Error: Comment cannot be empty or contain only spaces.");
        return;
      }

      try {
         await axiosInstance.post(`tasks/${task}/comments`,
          { text: values.text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        resetForm();
        getComment();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    },
  });

  const getComment = async () => {
    try {
      const res = await axiosInstance.get(`tasks/${task}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
  }, [task]);

  const handleReplyClick = (commentId: number) => {
    if (replyToCommentId === commentId) {
      setReplyToCommentId(null);
    } else {
      setReplyToCommentId(commentId);
    }
  };

  const handleReplySubmit = async (commentId: number) => {
    if (!replyText.trim()) {
      console.error("Error: Reply cannot be empty or contain only spaces.");
      return;
    }

    try {
       await axiosInstance.post(`tasks/${task}/comments`,
        { text: replyText, parent_id: commentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReplyText("");
      setReplyToCommentId(null);
      getComment();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const { handleBlur, handleChange, handleSubmit, values, } =
    formik;
  const isCommentEmpty = !values.text.trim();
  const isReplyCommentEmpty = !replyText.trim()
  return (
    <div className="w-[791px] h-[975px] border-[#DDD2FF] border-[0.3px] bg-[#F8F3FEA6] rounded-[10px] px-[45px] pt-[40px] pb-[52px] mt-[99px] mb-[30px]">
      <form action="" onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col w-full bg-white rounded-[10px] border-[0.3px] border-[#ADB5BD] max-h-[135px] px-[20px] pt-[20px] pb-[15px]">
          <textarea
            name="text"
            id="text"
            className="h-[90px] resize-none focus:outline-none"
            placeholder="დაწერე კომენტარი"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className={`w-[155px] h-[35px] mt-[5px] rounded-[20px] ${
                isCommentEmpty
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#8338EC] hover:bg-[#B588F4] cursor-pointer"
              } transition-[1.3s] text-white text-[16px] font-firago font-normal`}
              disabled={isCommentEmpty}
            >
              დააკომენტარე
            </button>
          </div>
        </div>
        <div className="flex items-center mt-[66px] gap-[7px] mb-[40px]">
          <p className="text-[20px] text-[#000000] font-firago font-semibold">
            კომენტარები
          </p>
          <div className="w-[30px] h-[22px] rounded-[30px] bg-[#8338EC] flex items-center justify-center">
            <p className="text-[14px] text-white font-firago font-medium">
              {data?.length}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[80px] max-h-[654px] overflow-y-auto">
          {data?.map((item) => (
            <div key={item.id} className="flex  gap-[12px] items-start">
              <Image
                width={20}
                height={20}
                src={item.author_avatar}
                alt="avatar"
              />
              <div className="flex flex-col mb-[10px]">
                <p className="text-[18px] text-[#212529] font-firago font-semibold mt-[-5px]">
                  {item.author_nickname}
                </p>
                <p className="text-[16px] text-[#343A40] font-firago font-light">
                  {item.text}
                </p>
                <div
                  onClick={() => handleReplyClick(item.id)}
                  className="flex items-center gap-[6px] mt-[12px]"
                >
                  <Image src={left} alt="arrow left" />
                  <p className="text-[12px] font-firago font-normal text-[#8338EC]">
                    უპასუხე
                  </p>
                </div>
                {item.sub_comments.length > 0 && (
                  <div className="ml-[2px]">
                    {item.sub_comments.map((res) => (
                      <div key={res.id} className="flex mt-[20px] items-center gap-[13px]">
                        <Image width={20} height={20} src={res.author_avatar} alt="avatar" />
                        <div>
                          <p className="text-[#021526] text-[18px] font-firago font-medium">{res.author_nickname}</p>
                          <p className="text-[16px] text-[#021526] font-firago font-normal">{res.text}</p>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
                {item.sub_comments.length === 0 &&
                  replyToCommentId === item.id && (
                    <div className="flex flex-col w-[500px] bg-white rounded-[10px] border-[0.3px] border-[#ADB5BD] max-h-[125px] px-[20px] pt-[20px] pb-[15px] mt-[7px]">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="დაწერე პასუხი"
                        className="h-[90px] resize-none focus:outline-none"
                      />
                      <div className="w-full flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleReplySubmit(item.id)}
                        className={`w-[155px] h-[35px] mt-2 rounded-[20px] ${
                          isReplyCommentEmpty
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#8338EC] hover:bg-[#B588F4] cursor-pointer"
                        } text-white text-[16px] font-firago font-normal`}
                      >
                        დააკომენტარე
                      </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
