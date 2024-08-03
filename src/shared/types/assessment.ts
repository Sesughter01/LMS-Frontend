import { Question } from "./question";

export interface Assessment {
  id: number;
  assessmentTitle: string;
  assessmentDescription: string;
  assessmentFor: string;
  durationInMinutes: number;
  assessmentImageUrl: string;
  numberOfQuestions: number;
  isPreAssesment: boolean;
  cohortId: number;
  cohortName: string;
  courseId: number;
  courseName: string;
  assessmentId: number;
  status: string;
  createdAt: any;
  deadline: any;
  passingScore: number;

  total_count?: number;
  total_pages?: number;

  // assessments: any;

  hasBeenAttempted?: boolean;
  isSubmitted?: boolean;
  isOngoing?: boolean;
  timeLeft: any;
  lastAttemptGrade: number;
  lastAttemptDurationInMinutes: number;

  questions: Question[];
}
