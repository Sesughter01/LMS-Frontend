import { QuestionOption } from "./questionoption";

export enum QuestionTypes {
  SINGLE_ANSWER_SELECT = "SINGLE_ANSWER_SELECT",
  MULTI_ANSWER_SELECT = "MULTI_ANSWER_SELECT",
  FREE_TEXT = "FREE_TEXT",
  FILE_ANSWER = "FILE_ANSWER",
  LINK_ANSWER = "LINK_ANSWER",
}

export interface Question {
  id: number;
  questionContent: string;
  questionType: QuestionTypes;
  questionSequenceIndex: number;
  isCorrectOne: Boolean;

  options: QuestionOption[];
}
