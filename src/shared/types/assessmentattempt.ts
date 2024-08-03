import { Question } from "./question";
import { QuestionAnswer } from "./questionanswer";

export interface AssessmentAttempt {
  id: number;
  assessmentId: number;
  assessmentTitle: string;
  assessmentDescription: string;
  durationOfAttemptInSeconds: number;
  grade: string;
  gradedPercentage: number;
  attemptStartDate: Date;
  attemptEndDate: Date;

  courseId: number;
  wasAwardedCoupon: boolean;
  couponCode: string;

  questions: Question[];

  questionAnswers: QuestionAnswer[];
}
