import React from "react";
import ProgressCard, { ProgressCardProps } from "../utills/progressCard";

// Icons
const studentIcon = <img src="/icons/course-statistics.svg" alt="course-icon" />;
const modulesIcon = <img src="/icons/modules-statistics.svg" alt="trophy-icon" />;
const assessmentIcon = <img src="/icons/assessment-statistics.svg" alt="thumbs-down icon" />;

interface StudentAssessmentTableProps {
  students: any;
  modules: any;
  assessments: any;
}

const CoursesStatistics: React.FC<StudentAssessmentTableProps> = ({students, modules, assessments}) => {

  const progressCardProps: ProgressCardProps[] = [
    { icon: studentIcon, text: "Enrolled Students", score: `${students} Students` },
    { icon: modulesIcon, text: "Course Modules", score: `${modules} Modules` },
    { icon: assessmentIcon, text: "Course Assessment", score: `${assessments} Assessments` },
  ];

  return (
    <section className="space-y-12">
      <div className="flex justify-center  items-center gap-4">
        {progressCardProps.map((props, index) => (
          <ProgressCard key={index} {...props} />
        ))}
      </div>
    </section>
  );
};

export default CoursesStatistics;
