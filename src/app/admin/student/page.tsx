"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayouts";
import StudentNav from "@/components/AdminSections/StudentNav/StudentNav";
import StudentTable from "@/components/AdminSections/StudentTable/StudentTable";
import Spinner from "../../../../utilComponents/Spinner/index";
import { fetchAllStudents } from "@/store/slices/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const InstructorPage = () => {
  const dispatch = useDispatch();
  const { allStudents } = useSelector((state: RootState) => state.student);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
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
      <AdminLayout>
        <SEO pageName="Admin Dashboard" />
        <PageTitle text="Student" />

        <div className="mt-[30px]">
          <StudentNav secondaryColor={secondaryColor} count={students?.length} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
        </div>

        <div className="mt-20">
          {loadingStudents ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : (
            <StudentTable
              secondaryColor={secondaryColor}
              students={students}
              awaitUpdate={onUpdateInstructor}
              searchQuery={searchQuery}
              sortOption={sortOption}
            />
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default InstructorPage;
