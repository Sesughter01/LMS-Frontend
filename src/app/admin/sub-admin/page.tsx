"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/components/Seo";
import PageTitle from "../../../../utilComponents/PageTitle/PageTitle";
import AdminLayout from "@/components/layouts/AdminLayouts";
import { Admin } from "@/shared/types/admin";
import AdminNav from "@/components/AdminSections/AdminNav/AdminNav";
import AdminTable from "@/components/AdminSections/AdminTable/AdminTable";
import AdminEmpty from "@/components/AdminSections/AdminSection/AdminEmpty";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";
import adminService from "@/services/api/admins";
import Spinner from "../../../../utilComponents/Spinner/index";
import { fetchAllAdmins } from "@/store/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTheme } from "@/context/ThemeContext";

const InstructorPage = () => {
  const dispatch = useDispatch();
  const { allAdmins } = useSelector((state: RootState) => state.admin);

  const [loadingAdmins, setLoadingAdmins] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";

  const onUpdateAdmin = async () => {
    await dispatch(fetchAllAdmins());
  };

  // const organizationId = id;

  console.log("ORGID:", organizationId);

  const admins = allAdmins;

  useEffect(() => {
    dispatch(fetchAllAdmins()).then(() => {
      // Set loading to false when the data is loaded
      setLoadingAdmins(false);
    });
  }, [dispatch]);

  return (
    <>
      <AdminLayout>
        <SEO pageName="Admin Dashboard" />
        <PageTitle text="Admin" />

        <div className="mt-[30px]">
          <AdminNav count={admins?.length} setSearchQuery={setSearchQuery} setSortOption={setSortOption} secondaryColor={secondaryColor} />
        </div>

        <div className="mt-20">
          {loadingAdmins ? (
            <div className="flex justify-center items-center my-[30px]">
              <Spinner />
            </div>
          ) : admins && admins.length > 0 ? (
            <AdminTable
              admins={admins}
              secondaryColor={secondaryColor}
              awaitUpdate={onUpdateAdmin}
              searchQuery={searchQuery}
              sortOption={sortOption}
            />
          ) : (
            <AdminEmpty />
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default InstructorPage;
