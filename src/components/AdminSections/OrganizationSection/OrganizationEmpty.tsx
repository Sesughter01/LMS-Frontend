import React from "react";
import { RxFilePlus } from "react-icons/rx";

const OrganizationEmpty = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 text-center text-[#7A7A7A]">
      <p className="text-2xl font-semibold">NO ORGANISATIONS FOUND</p>
      {/* <div>
        <p className="font-medium text-lg">
          You haven't created any assessments yet. Let's get started by <br />{" "}
          creating your first assessment.
        </p>
      </div>
      <div>
        <RxFilePlus className="w-[199px] h-[199px]" />
      </div>
      <div>
        <p className="font-medium text-lg">
          Select the “create new assessment” button at the top right <br /> hand
          corner to create your first assessment.
        </p>
      </div> */}
    </div>
  );
};

export default OrganizationEmpty;
