"use client";

import React from "react";
import { RxFilePlus } from "react-icons/rx";

const InstructorEmpty: React.FC = () => {

  return (
    <>
      {/* {error && <div>error found!</div>} */}
      <div className="flex flex-col justify-center items-center gap-8 text-center text-[#7A7A7A] mt-20">
        <p className="text-2xl font-semibold">NO ADMIN FOUND</p>
        <div>
          <p className="font-medium text-lg">
            You haven't invite any admin yet. Let's get started by <br />{" "}
            sending invite to your first admin.
          </p>
        </div>
        <div>
          <RxFilePlus className="w-[199px] h-[199px]" />
        </div>
        <div>
          <p className="font-medium text-lg">
            Select the “add new admin” button at the top right <br /> hand
            corner to add your first admin.
          </p>
        </div>
      </div>
    </>
  );
};

export default InstructorEmpty;
