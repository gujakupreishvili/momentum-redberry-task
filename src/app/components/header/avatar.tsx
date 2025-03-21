"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

interface AvatarProps {
  onChange: (file: File | null) => void;
  error?: string;
}

export default function Avatar({ onChange, error }: AvatarProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/") || file.size > 600 * 1024) {
      alert("გთხოვთ ატვირთოთ სურათი (მაქსიმუმ 600KB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    onChange(file);
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    onChange(null);
  };

  return (
    <div className="mt-[45px] w-full">
      <h1 className="text-[#343A40] font-firago font-medium pb-[8px]">ავატარი*</h1>
      <div
        className={`border-dashed w-full h-[120px] border-[1px] ${
          error ? "border-red-500" : "border-[#CED4DA]"
        } rounded-[8px] flex justify-center items-center`}
      >
        {imagePreview ? (
          <div className="w-[88px] h-[88px] rounded-[44px] flex justify-center items-center relative">
            <Image
              width={20}
              height={20}
              src={imagePreview}
              alt="avatar"
              className="w-full h-full object-cover rounded-[44px]"
              onError={(e) => {
                e.currentTarget.src = "/assets/Images/fallback-image.png";
              }}
            />
            <div
              onClick={handleDeleteImage}
              className="absolute w-[24px] h-[24px] rounded-[12px] bg-white border-[1px] border-[#6C757D] bottom-0 right-0 flex items-center justify-center cursor-pointer"
            >
              <RiDeleteBin5Line className="text-[12px]" />
            </div>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-2">
            <img src="/assets/Images/upload.svg" alt="upload" width={40} height={40} />
            <span className={`${error ? "text-red-500" : "text-[#343A40]"} text-[14px] font-firago font-normal`}>
              ატვირთეთ სურათი
            </span>
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