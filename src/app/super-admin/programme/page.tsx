"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import Spinner from "../../../../utilComponents/Spinner/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OrganizationTable from "@/components/AdminSections/OrganisationTable/OrganizationTable";
import OrganizationEmpty from "@/components/AdminSections/OrganizationSection/OrganizationEmpty";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import ProgrammeNav from "@/components/AdminSections/ProgrammeNav/ProgrammeNav";
import { getAllProgrammesAsync } from "@/store/slices/programmeMain";
import ProgrammeTable from "@/components/AdminSections/ProgrammeTable/ProgrammeTable";
import ProgrammeEmpty from "@/components/AdminSections/ProgrammeSection/ProgrammeEmpty";

const ProgrammePage = () => {
  const dispatch = useDispatch();
  const { allProgrammes } = useSelector((state: RootState) => state.programmeMain);
  const [loadingProgrammes, setLoadingProgrammes] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const programmes = allProgrammes;

  useEffect(() => {
    dispatch(getAllProgrammesAsync() as any).then(() => {
      // Set loading to false when the data is loaded
      setLoadingProgrammes(false);
    });
  }, [dispatch]);

  return (
    <>
      <SuperAdminLayout>
        <SEO pageName="Super Admin Dashboard" />
        <PageTitle text="Programme" />
        <div className="mt-[30px]">
          <ProgrammeNav count={programmes?.length} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
        </div>
        <div className="mt-20">
          {loadingProgrammes ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : programmes && programmes.length > 0 ? (
            <ProgrammeTable programmes={programmes} searchQuery={searchQuery} sortOption={sortOption} />
          ) : (
            <ProgrammeEmpty />
          )}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default ProgrammePage;
