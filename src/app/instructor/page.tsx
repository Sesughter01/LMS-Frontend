import { SEO } from "@/components/Seo";
import InstructorLayout from "@/components/layouts/InstructorLayouts";
import React from "react";

const MainInstructor = () => {
  return (
    <>
      <InstructorLayout>
        <SEO pageName="Instructor Dashboard" />
      </InstructorLayout>
    </>
  );
};

export default MainInstructor;
