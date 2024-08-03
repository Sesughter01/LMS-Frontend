import React from "react";
import ProgressCard, { ProgressCardProps } from "../utills/progressCard";
import CourseTable from "../utills/courseTable";
import StudentNav from "@/components/AdminSections/StudentNav/StudentNav";

// Icons
const completeIcon = <img src="/icons/progress1.svg" alt="check-icon" />;
const highScore = <img src="/icons/progress2.svg" alt="trophy-icon" />;
const lowScore = <img src="/icons/progress3.svg" alt="thumbs-down icon" />;

interface StudentAssessmentTableProps {
  assessment: any;
  assessmentTotal: any;
}

const Courses: React.FC<StudentAssessmentTableProps> = ({assessment, assessmentTotal}) => {

  const calculateHighAndLowScores = (data: any) => {
    if (data.length === 0) {
      return { highestScore: "0%", lowestScore: "0%" };
    }

    if (data.length === 1 && data[0].status === "passed") {
      return { highestScore: data[0].score, lowestScore: "0%" };
    }

    if (data.length === 1 && data[0].status === "failed") {
      return { highestScore: "0%", lowestScore: data[0].score };
    }

    let highest = data[0].score;
    let lowest = data[0].score;

    for (let i = 1; i < data.length; i++) {
      const score = data[i].score;
      if (score > highest) {
        highest = score;
      }
      if (score < lowest) {
        lowest = score;
      }
    }

    return { highestScore: highest, lowestScore: lowest };
  };

  const { highestScore, lowestScore } = calculateHighAndLowScores(assessment);

  const progressCardProps: ProgressCardProps[] = [
    { icon: completeIcon, text: "Assessments Completed", score: `${assessment.length} / ${assessmentTotal}` },
    { icon: highScore, text: "Highest Score", score: highestScore },
    { icon: lowScore, text: "Lowest Score", score: lowestScore },
  ];

  return (
    <section className="space-y-12">
      <div className="flex justify-center  items-center gap-4">
        {progressCardProps.map((props, index) => (
          <ProgressCard key={index} {...props} />
        ))}
      </div>
      <div className="space-y-6">
        <StudentNav />
        <CourseTable data={assessment} />
      </div>
    </section>
  );
};

export default Courses;
