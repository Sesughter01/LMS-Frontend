import React from "react";
import { RxFilePlus } from "react-icons/rx";
import CourseFull from "./CourseFull";
import Spinner from "../../../../utilComponents/Spinner/index";

type CourseFullProps = {
  courses: Array<any>;
  status: string;
  loading: boolean;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
};

const CourseEmpty: React.FC<CourseFullProps> = ({ courses, status, loading, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center my-[30px]">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* {courses === undefined && (
        <div className="flex justify-center items-center my-[30px]">
          <Spinner />
        </div>
      )} */}

      {status === "succeeded" && (!courses || courses?.length === 0) ? (
        <div className="flex flex-col justify-center items-center gap-8 text-center text-[#7A7A7A]">
          <p className="text-2xl font-semibold">NO COURSES FOUND</p>
          <div>
            <p className="font-medium text-lg">
              You haven't been assigned to courses yet. Contact Admin <br /> to assign yo to a course.
            </p>
          </div>
          <div>
            <RxFilePlus className="w-[199px] h-[199px]" />
          </div>
          <div>
            <p className="font-medium text-lg">
              Select the “create new course button at the top right <br /> hand corner to create your first course.
            </p>
          </div>
        </div>
      ) : (
        <CourseFull
          secondaryColor={secondaryColor}
          courseData={courses}
          awaitUpdate={awaitUpdate}
          searchQuery={searchQuery}
          sortOption={sortOption}
        />
      )}
    </>
  );
};

export default CourseEmpty;
