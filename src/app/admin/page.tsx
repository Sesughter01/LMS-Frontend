"use client";

import { SEO } from "@/components/Seo";
import AdminLayout from "@/components/layouts/AdminLayouts";
import React from "react";

const MainAdmin = () => {
  return (
    <>
      <AdminLayout>
        <SEO pageName="Admin Dashboard" />
      </AdminLayout>
    </>
  );
};

export default MainAdmin;
