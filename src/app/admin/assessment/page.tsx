"use client";
import React, { useEffect, useState } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayouts";
import AssessmentNav from "@/components/AdminSections/AssessmentNav/AssessmentNav";
import AssessmentEmpty from "@/components/AdminSections/AssessmentSection/AssessmentEmpty";
import AssessmentTable from "@/components/AdminSections/AssessmentTable/AssessmentTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments, selectAssessmentLoading, selectAssessments } from "@/store/slices/assessmentSlice";
import { RootState } from "@/store/store";
import Spinner from "../../../../utilComponents/Spinner";
import { _getOrgId } from "@/services/AuthService";

const AssessmentPage = () => {
  const dispatch = useDispatch();
  const [loadingAssessments, setLoadingAssessments] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const assessments = useSelector((state: RootState) => selectAssessments(state));

  const loadingAssessment = useSelector((state: RootState) => selectAssessmentLoading(state));

  useEffect(() => {
    setLoadingAssessments(loadingAssessment === "pending");
  }, [loadingAssessment]);

  useEffect(() => {
    setLoadingAssessments(false);
    // Dispatch the action to get all assessments when the component mounts
    dispatch(getAllAssessments(`${_getOrgId()}`) as any);
  }, [dispatch]);

  console.log("**********", _getOrgId())
  return (
    <>
      <AdminLayout>
        <SEO pageName="Admin Dashboard" />
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
            <AssessmentTable assessments={assessments} searchQuery={searchQuery} sortOption={sortOption} />
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AssessmentPage;
