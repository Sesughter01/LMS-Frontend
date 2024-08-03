import React from "react";
import { RxFilePlus } from "react-icons/rx";

const InstructorCourseEmpty = (data: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 text-center text-[#7A7A7A]">
      <p className="text-2xl font-semibold">NO COURSES FOUND</p>
      <div>
        <p className="font-medium text-lg">
          You haven&apos;t assigned any courses to {data.data.profile.firstName}{" "}
          {data.data.profile.lastName}. <br /> creating your first course.
        </p>
      </div>
      <div>
        <RxFilePlus className="w-[199px] h-[199px]" />
      </div>
      <div>
        <p className="font-medium text-lg">
          Select the “assign course” button at the top right hand <br /> hand
          corner to create your first course.
        </p>
      </div>
    </div>
  );
};

export default InstructorCourseEmpty;
