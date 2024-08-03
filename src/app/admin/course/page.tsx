"use client";
import React, { useEffect, useState } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayouts";
import CourseNav from "@/components/AdminSections/CourseNav/CourseNav";
import CourseEmpty from "@/components/AdminSections/CourseSection/CourseEmpty";
import { fetchAllCourses } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CohortPage = () => {
  const dispatch = useDispatch();
  const { allCourses, coursesTotal } = useSelector((state: RootState) => state.courses);

  const [loadingCourses, setLoadingCourses] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const onUpdateCourse = async () => {
    await dispatch(fetchAllCourses());
  };

  useEffect(() => {
    dispatch(fetchAllCourses()).then(() => {
      // Set loading to false when the data is loaded
      setLoadingCourses(false);
    });
  }, [dispatch]);

  return (
    <>
      <AdminLayout>
        <SEO pageName="Admin Dashboard" />
        <PageTitle text="Course" />

        <div className="mt-[30px]">
          <CourseNav coursesTotal={coursesTotal} secondaryColor={secondaryColor} count={allCourses?.length || 0} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
        </div>

        <div className="mt-20">
          <CourseEmpty
            secondaryColor={secondaryColor}
            courses={allCourses}
            loading={loadingCourses}
            awaitUpdate={onUpdateCourse}
            searchQuery={searchQuery}
            sortOption={sortOption}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default CohortPage;
