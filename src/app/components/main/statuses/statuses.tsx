import React from 'react';

const statusColors: Record<string, string> = {
  "დასაწყები": "bg-[#F7BC30]",
  "პროგრესში": "bg-[#FB5607]",
  "მზად ტესტირებისთვის": "bg-[#FF006E]",
  "დასრულებული": "bg-[#3A86FF]",
};

const Statuses = ({ title }: { title: string }) => {
  const bgColor = statusColors[title] || "bg-gray-500";

  return (
    <div className={`w-[381px] h-[54px] rounded-[10px] flex items-center   justify-center text-white tetx-[20px] font-firago font-medium ${bgColor}`}>
      <p>{title}</p>
    </div>
  );
};

export default Statuses;

