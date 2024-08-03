"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import StudentNav from "@/components/AdminSections/StudentNav/StudentNav";
import Spinner from "../../../../utilComponents/Spinner/index";
import { fetchAllStudents } from "@/store/slices/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InstructorLayout from "@/components/layouts/InstructorLayouts";
import InstructorStudentTable from "@/components/AdminSections/StudentTable/InstructorStudentTable";

const InstructorPage = () => {
  const dispatch = useDispatch();
  const { allStudents } = useSelector((state: RootState) => state.student);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const onUpdateInstructor = async () => {
    await dispatch(fetchAllStudents());
  };

  const students = allStudents;

  useEffect(() => {
    dispatch(fetchAllStudents()).then(() => {
      // Set loading to false when the data is loaded
      setLoadingStudents(false);
    });
  }, [dispatch]);

  return (
    <>
      <InstructorLayout>
        <SEO pageName="Instructor Dashboard" />
        <PageTitle text="Student" />

        <div className="mt-[30px]">
          <StudentNav setSearchQuery={setSearchQuery} setSortOption={setSortOption} secondaryColor={secondaryColor} count={students?.length} />
        </div>

        <div className="mt-20">
          {loadingStudents ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : (
            <InstructorStudentTable
              searchQuery={searchQuery}
              sortOption={sortOption}
              secondaryColor={secondaryColor}
              students={students}
              awaitUpdate={onUpdateInstructor}
            />
          )}
        </div>
      </InstructorLayout>
    </>
  );
};

export default InstructorPage;
