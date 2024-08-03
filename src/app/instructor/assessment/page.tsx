"use client";
import React, { useEffect, useState } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AssessmentEmpty from "@/components/AdminSections/AssessmentSection/AssessmentEmpty";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments, selectAssessmentLoading, selectAssessments } from "@/store/slices/assessmentSlice";
import { RootState } from "@/store/store";
import Spinner from "../../../../utilComponents/Spinner";
import InstructorLayout from "@/components/layouts/InstructorLayouts";
import AssessmentNav from "@/components/AdminSections/AssessmentNav/AssessmentNav";
import InstructorAssessmentTable from "@/components/AdminSections/AssessmentTable/InstructorAssessmentTable";

// ... (previous imports)

const AssessmentPage = () => {
  const dispatch = useDispatch();
  const [loadingAssessments, setLoadingAssessments] = useState(false);

  const assessments = useSelector((state: RootState) => selectAssessments(state));

  const loadingAssessment = useSelector((state: RootState) => selectAssessmentLoading(state));

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "rgb(51, 102, 153)";
  const logoUrl = sessionStorage.getItem("logoUrl") || "";

  useEffect(() => {
    setLoadingAssessments(loadingAssessment === "pending");
  }, [loadingAssessment]);

  console.log("AssessmentList:", assessments);
  useEffect(() => {
    setLoadingAssessments(false);
    // Dispatch the action to get all assessments when the component mounts
    dispatch(getAllAssessments() as any);
  }, [dispatch]);

  return (
    <>
      <InstructorLayout>
        <SEO pageName="Instructor Dashboard" />
        <PageTitle text="Assessment" />

        <div className="mt-[30px]">
          <AssessmentNav secondaryColor={secondaryColor} assessments={assessments} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
        </div>

        <div className="mt-20">
          {loadingAssessments ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : assessments && assessments.length === 0 ? (
            <AssessmentEmpty />
          ) : (
            <InstructorAssessmentTable assessments={assessments} searchQuery={searchQuery} sortOption={sortOption} />
          )}
        </div>
      </InstructorLayout>
    </>
  );
};

export default AssessmentPage;
