"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Avatar() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(imagePreview)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 

    if (!file) {
      setError("ფაილი არ არის არჩეული.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("გთხოვთ, ატვირთოთ მხოლოდ სურათის ფაილი.");
      return;
    }
    if (file.size > 600 * 1024) {
      setError("ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს.");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="mt-[45px] w-full">
      <h1 className="text-[#343A40] font-firago font-medium pb-[8px]">ავატარი*</h1>
      <div className="border-dashed w-full h-[120px] border-[1px] border-[#CED4DA] rounded-[8px] flex justify-center items-center ">
        {imagePreview ? (
          <div className="w-[88px] h-[88px] rounded-[44px] flex justify-center items-center relative">
            <Image
              src={imagePreview}
              alt="avatar"
              className="w-full h-full object-cover rounded-[44px]"
            />
              <div onClick={handleDeleteImage} className="absolute w-[24px] h-[24px] rounded-[12px] bg-white border-[1px] border-[#6C757D] bottom-0 right-0 flex items-center justify-center cursor-pointer">
              <RiDeleteBin5Line className="text-[12px]" />
              </div>  
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-2">
            <LuImagePlus className="text-[#633CFF] text-[27px]" />
            <span className="text-[#633CFF] text-[14px]">ატვირთეთ სურათი</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-[12px] mt-2">{error}</p>}
    </div>
  );
}