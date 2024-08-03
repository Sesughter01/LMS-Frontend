"use client";

import React, { useEffect, useState } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayouts";
import CohortNav from "@/components/AdminSections/CohortNav/CohortNav";
import CohortEmpty from "@/components/AdminSections/CohortSection/CohortEmpty";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCohorts } from "@/store/slices/cohortFormData";
import { RootState } from "@/store/store";

const CohortPage = () => {
  const dispatch = useDispatch();
  const [loadingCohorts, setLoadingCohorts] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const { allCohorts } = useSelector((state: RootState) => state.form);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const onUpdateCohort = async () => {
    await dispatch(fetchAllCohorts());
  };

  useEffect(() => {
    dispatch(fetchAllCohorts()).then(() => {
      // Set loading to false when the data is loaded
      setLoadingCohorts(false);
    });
  }, [dispatch]);

  return (
    <>
      <AdminLayout>
        <SEO pageName="Admin Dashboard" />
        <PageTitle text="Cohort" />

        <div className="mt-[30px]">
          <CohortNav secondaryColor={secondaryColor} count={allCohorts?.length} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
        </div>

        <div>
          <CohortEmpty
            secondaryColor={secondaryColor}
            cohorts={allCohorts}
            loading={loadingCohorts}
            awaitUpdate={onUpdateCohort}
            searchQuery={searchQuery}
            sortOption={sortOption}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default CohortPage;
