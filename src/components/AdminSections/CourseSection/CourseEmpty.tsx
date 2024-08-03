import React from "react";
import { RxFilePlus } from "react-icons/rx";
import CourseFull from "./CourseFull";
import Spinner from "../../../../utilComponents/Spinner/index";

type CourseFullProps = {
  courses: Array<any>;
  loading: boolean;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
};

const CourseEmpty: React.FC<CourseFullProps> = ({ courses, loading, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center my-[30px]">
        <Spinner />
      </div>
    );
  }

  if (courses?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-8 text-center text-[#7A7A7A]">
        <p className="text-2xl font-semibold">NO COURSES FOUND</p>
        <div>
          <p className="font-medium text-lg">
            You haven't created any courses yet. Let's get started by <br /> creating your first course.
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
    );
  }

  return (
    <CourseFull secondaryColor={secondaryColor} courseData={courses} awaitUpdate={awaitUpdate} searchQuery={searchQuery} sortOption={sortOption} />
  );
};

export default CourseEmpty;
