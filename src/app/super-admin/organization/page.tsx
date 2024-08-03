"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import Spinner from "../../../../utilComponents/Spinner/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OrganizationNav from "@/components/AdminSections/OrganizationNav/OrganizationNav";
import { fetchAllOrganizations } from "@/store/slices/organizationSlice";
import OrganizationTable from "@/components/AdminSections/OrganisationTable/OrganizationTable";
import OrganizationEmpty from "@/components/AdminSections/OrganizationSection/OrganizationEmpty";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";

const OrganizationPage = () => {
  const dispatch = useDispatch();
  const { allOrganizations } = useSelector((state: RootState) => state.organizations);
  const [loadingOrganizations, setLoadingOrganizations] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const onUpdateOrganizations = async () => {
    await dispatch(fetchAllOrganizations());
  };

  const organizations = allOrganizations;

  useEffect(() => {
    dispatch(fetchAllOrganizations()).then(() => {
      // Set loading to false when the data is loaded
      setLoadingOrganizations(false);
    });
  }, [dispatch]);

  return (
    <>
      <SuperAdminLayout>
        <SEO pageName="Super Admin Dashboard" />
        <PageTitle text="Organization" />
        <div className="mt-[30px]">
          <OrganizationNav count={organizations?.length} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
        </div>
        <div className="mt-20">
          {loadingOrganizations ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : organizations && organizations.length > 0 ? (
            <OrganizationTable organizations={organizations} searchQuery={searchQuery} sortOption={sortOption} />
          ) : (
            <OrganizationEmpty />
          )}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default OrganizationPage;
