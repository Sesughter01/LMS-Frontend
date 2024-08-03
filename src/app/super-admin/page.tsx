import { SEO } from "@/components/Seo";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import React from "react";

const SuperAdmin = () => {
  return (
    <>
      <SuperAdminLayout>
        <SEO pageName="Super Admin Dashboard" />
      </SuperAdminLayout>
    </>
  );
};

export default SuperAdmin;
