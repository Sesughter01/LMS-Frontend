"use client";
import React, { useEffect, useState } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import InstructorLayout from "@/components/layouts/InstructorLayouts";
import InstructorCourseNav from "@/components/AdminSections/CourseNav/InstructorCourseNav";
import CourseEmpty from "@/components/AdminSections/InstructorSection/CourseEmpty";
import { fetchAllCoursesByAInstructor } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CoursePage = () => {
  const dispatch = useDispatch();
  const [instructorDataID, setInstructorDataID] = useState(0);
  const { instructorCourses, status } = useSelector((state: RootState) => state.courses);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const instructorId = () => {
    const user_object: any = localStorage.getItem("persist:root");
    const user = JSON.parse(user_object);
    const user_auth = JSON.parse(user.auth);
    // return user_auth.user.id
    const id = user_auth.user.id;
    console.log("ID:", id);
    setInstructorDataID(id);
    return id;
  };

  console.log("idp:", instructorDataID);
  const onUpdateCourse = async () => {
    // const userId = Number(instructorId())
    await dispatch(fetchAllCoursesByAInstructor(instructorDataID));
  };

  useEffect(() => {
    // instructorId()
    const userId = instructorId();
    dispatch(fetchAllCoursesByAInstructor(userId));
    setLoadingCourses(false);
  }, [dispatch]);

  return (
    <>
      <InstructorLayout>
        <SEO pageName="Instructor Dashboard" />
        <PageTitle text="Course" />

        <div className="mt-[30px]">
          <InstructorCourseNav
            secondaryColor={secondaryColor}
            count={instructorCourses.length}
            setSearchQuery={setSearchQuery}
            setSortOption={setSortOption}
          />
        </div>

        <div className="mt-20">
          <CourseEmpty
            courses={instructorCourses}
            loading={loadingCourses}
            status={status}
            awaitUpdate={onUpdateCourse}
            searchQuery={searchQuery}
            sortOption={sortOption}
            secondaryColor={secondaryColor}
          />
        </div>
      </InstructorLayout>
    </>
  );
};

export default CoursePage;
