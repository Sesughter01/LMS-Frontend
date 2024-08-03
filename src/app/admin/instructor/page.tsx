"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayouts";
import InstructorNav from "@/components/AdminSections/InstructorNav/InstructorNav";
import InstructorTable from "@/components/AdminSections/InstructorTable/InstructorTable";
import InstructorEmpty from "@/components/AdminSections/InstructorSection/InstructorEmpty";
import Spinner from "../../../../utilComponents/Spinner/index";
import { fetchAllInstructors } from "@/store/slices/instructorFormData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const InstructorPage = () => {
  const dispatch = useDispatch();
  const { allInstructors } = useSelector((state: RootState) => state.instructor);
  const [loadingInstructors, setLoadingInstructors] = useState(true);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const onUpdateInstructor = async () => {
    await dispatch(fetchAllInstructors());
  };

  const instructors = allInstructors;

  useEffect(() => {
    dispatch(fetchAllInstructors()).then(() => {
      // Set loading to false when the data is loaded
      setLoadingInstructors(false);
    });
  }, [dispatch]);

  return (
    <>
      <AdminLayout>
        <SEO pageName="Instructor Dashboard" />
        <PageTitle text="Instructor" />

        <div className="mt-[30px]">
          <InstructorNav count={instructors?.length} setSearchQuery={setSearchQuery} setSortOption={setSortOption} secondaryColor={secondaryColor} />
        </div>

        <div className="mt-20">
          {loadingInstructors ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : instructors && instructors.length > 0 ? (
            <InstructorTable
              secondaryColor={secondaryColor}
              instructors={instructors}
              awaitUpdate={onUpdateInstructor}
              searchQuery={searchQuery}
              sortOption={sortOption}
            />
          ) : (
            <InstructorEmpty />
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default InstructorPage;
