import Link from "next/link";
import React, { ReactNode } from "react";

export interface AdminCardProps {
  icon: ReactNode;
  text: string;
  text2: any;
  url: any;
}

const AdminCard: React.FC<AdminCardProps> = ({ icon, text, text2, url }) => {
  return (
    // h-[96px] w-[227px]
    <div className="bg-white  rounded-lg border-2 drop-shadow-lg border-opacity-25 border-gray-200">
      <Link href={url}>
        <div className="p-4 flex justify-between gap-3">
          <span>{icon}</span>
          <div className="flex flex-col text-center items-center gap-1">
            <span className="text-[#1A183E80]  text-[10px] font-semibold">{text}</span>
            <span className="text-[#1A183E] font-semibold text-sm">{text2}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminCard;
