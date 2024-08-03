"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";
import Link from "next/link";
import Loader from "./container/loader";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Assessment } from "@/shared/types/assessment";
import {
  GetTraineeLatestAssessmentAttempt,
  GetTraineePreAssessmentById,
} from "@/services/api/assessments";
import { AssessmentAttempt } from "@/shared/types/assessmentattempt";
import { QuestionAnswer } from "@/shared/types/questionanswer";
import { formatTime, formatWrittenDate } from "@/lib/utils";
import { Question } from "@/shared/types/question";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [assessmentAttempt, setAssessmentAttempt] =
    useState<AssessmentAttempt>();
  const [loading, setLoading] = useState(false);
  console.log("Loading", loading);
  console.log("assessmentAttempt", assessmentAttempt);

  const [displayedQuestionsAnswers, setDisplayedQuestionsAnswers] =
    useState<QuestionAnswer[]>();
  const [currentlyViewedIndex, setCurrentlyViewedIndex] = useState(0);

  const [questionsSummary, setQuestionsSummary] = useState<{
    totalNumberOfQuestions: number;
    correctlyAnsweredQuestions: number;
    incorrectlyAnsweredQuestions: number;
  }>();
  const [visibleTab, setVisibleTab] = useState("all");

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";
  const logoUrl = sessionStorage.getItem("logoUrl") || "";

  const fetchAssessmentData = async () => {
    try {
      setLoading(true);
      const assessmentId = Number(searchParams.get("id"));

      const assessmentAttemptRecord = await GetTraineeLatestAssessmentAttempt(
        assessmentId,
        organizationId
      );
      setAssessmentAttempt(assessmentAttemptRecord);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err.message;
      toast.error(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessmentData();
  }, []);

  useEffect(() => {
    if (assessmentAttempt) {
      setDisplayedQuestionsAnswers(assessmentAttempt?.questionAnswers);

      let correctlyAnsweredQuestions =
        assessmentAttempt?.questionAnswers.filter(
          (answer) =>
            answer.rightAnswerOptionId &&
            answer.rightAnswerOptionId === answer.userSelectedOptionId
        );
      let incorrectlyAnsweredQuestions =
        assessmentAttempt?.questionAnswers.filter(
          (answer) =>
            answer.rightAnswerOptionId &&
            answer.rightAnswerOptionId !== answer.userSelectedOptionId
        );

      setQuestionsSummary({
        totalNumberOfQuestions: assessmentAttempt?.questionAnswers.length,
        incorrectlyAnsweredQuestions: incorrectlyAnsweredQuestions?.length,
        correctlyAnsweredQuestions: correctlyAnsweredQuestions?.length,
      });
    }
  }, [assessmentAttempt]);

  const decideFeedbackToRender = () => {
    if (assessmentAttempt) {
      if (
        assessmentAttempt.gradedPercentage > 49 &&
        assessmentAttempt.wasAwardedCoupon
      ) {
        return (
          <small>
            Fantastic job on the assessment! Your score of 80% demonstrates a
            strong understanding of the material and showcases your commitment
            to learning.
          </small>
        );
      } else {
        return (
          <small>
            Congratulations on attempting the assessment! While your score was{" "}
            {assessmentAttempt.gradedPercentage}%, it&#39;s essential to
            recognize the effort you put into the evaluation. Use this as a
            learning experience to identify areas of improvement and focus on
            strengthening your knowledge and skills.
          </small>
        );
      }
    }

    return <>Assessment not loaded</>;
  };

  const moveToNextQuestion = () => {
    if (currentlyViewedIndex !== null && displayedQuestionsAnswers) {
      if (currentlyViewedIndex >= displayedQuestionsAnswers?.length - 1) {
        toast.info(`End of Question List`);
        return;
      }

      setCurrentlyViewedIndex(currentlyViewedIndex + 1);
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentlyViewedIndex && displayedQuestionsAnswers) {
      if (currentlyViewedIndex <= 0) {
        toast.info(`You're at the start of Question List`);
        return;
      }

      setCurrentlyViewedIndex(currentlyViewedIndex - 1);
    }
  };

  const applyTabFilter = (value: string) => {
    switch (value) {
      case "all":
        setDisplayedQuestionsAnswers(
          (prev) => assessmentAttempt?.questionAnswers
        );
        setVisibleTab("all");
        break;
      case "correct":
        let correctlyAnsweredQuestions =
          assessmentAttempt?.questionAnswers.filter(
            (answer) =>
              answer.rightAnswerOptionId &&
              answer.rightAnswerOptionId === answer.userSelectedOptionId
          );
        setDisplayedQuestionsAnswers((prev) => correctlyAnsweredQuestions);
        setVisibleTab("correct");
        // alert(correctlyAnsweredQuestions)
        break;
      case "incorrect":
        let incorrectlyAnsweredQuestions =
          assessmentAttempt?.questionAnswers.filter(
            (answer) =>
              answer.rightAnswerOptionId &&
              answer.rightAnswerOptionId !== answer.userSelectedOptionId
          );
        setDisplayedQuestionsAnswers((prev) => incorrectlyAnsweredQuestions);
        setVisibleTab("incorrect");
        break;
    }

    setCurrentlyViewedIndex(0);
    return;
  };

  const determineWhichQuestionToRender = () => {
    if (assessmentAttempt && displayedQuestionsAnswers) {
      let questionsIntoDict: { [key: number]: Question } = {};

      for (let question of assessmentAttempt?.questions) {
        questionsIntoDict[question.id] = question;
      }

      let questionAnswer = displayedQuestionsAnswers[currentlyViewedIndex];

      let saidQuestion = questionsIntoDict[questionAnswer?.questionId];

      let answerWasCorrect =
        questionAnswer?.rightAnswerOptionId &&
        questionAnswer?.rightAnswerOptionId ===
          questionAnswer?.userSelectedOptionId;

      return (
        <div className=" sm:px-8 flex flex-col gap-4 grow">
          <div className="border-b border-gray-100 p-4 bg-gray-100 flex flex-col gap-0">
            <h1 className="font-semibold text-lg">
              Question {currentlyViewedIndex + 1} of{" "}
              {displayedQuestionsAnswers.length}
            </h1>
          </div>
          <div className="text-lg font-semibold flex gap-1 lg:px-8">
            <span>{currentlyViewedIndex + 1}.</span>
            <p>{saidQuestion.questionContent}</p>
          </div>
          <div className=" px-0 lg:px-8">
            <RadioGroup
              className="flex flex-col gap-4"
              defaultValue={
                questionAnswer.userSelectedOptionId !== null
                  ? questionAnswer.userSelectedOptionId.toString()
                  : ""
              }
            >
              {saidQuestion.options.map((option) => {
                return (
                  <div
                    className="flex items-center space-x-3 bg-gray-100 p-2"
                    key={option.id}
                  >
                    <RadioGroupItem
                      value={option.id.toString()}
                      id="r1"
                      className="text-gray-800 border-gray-800"
                      checked={
                        questionAnswer.userSelectedOptionId === option.id
                      }
                    />
                    <label
                      htmlFor="r1"
                      className="cursor-pointer select-none grow"
                    >
                      {option.optionContent}
                    </label>
                    {questionAnswer.rightAnswerOptionId === option.id && (
                      <CheckCircleIcon className="text-green-700 w-6 h-6 shrink-0 ml-auto" />
                    )}
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          <div
            className={`flex flex-col border-l-4 rounded-lg ${
              answerWasCorrect ? "border-green-500" : "border-red-500"
            } bg-gray-100 p-4 mt-4"`}
          >
            <h1 className="font-semibold mb-3">Feedback</h1>
            <p>That’s {answerWasCorrect ? "Correct" : "In-Correct"}.</p>
            <p></p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <section className="flex w-full min-h-screen h-auto">
        <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
        <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
          <DashNav currentPage={"Assessment"} secondaryColor={secondaryColor} />
          <div className="px-8">
            <h1 className="flex gap-2 font-base items-center text-gray-500 capitalize">
              Pre-Assessment
              <ChevronRight className="" />
              {assessmentAttempt?.assessmentTitle}
              <ChevronRight className="" />
              Completed
            </h1>
          </div>
          {loading ? (
            <aside className="px-4 lg:first-letter:px-8 flex flex-col">
              <Loader />
            </aside>
          ) : assessmentAttempt ? (
            <aside className="px-4 lg:first-letter:px-8 flex flex-col">
              <section className="">
                <div className="flex gap-6 items-center">
                  <Link href={""}>
                    <ArrowLeft
                      className="w-10 h-10"
                      onClick={() => router.back()}
                    />
                  </Link>
                  <h1 className="text-base lg:text-xl font-semibold capitalize">
                    INGRYD Pre-assessment - {assessmentAttempt?.assessmentTitle}
                  </h1>
                </div>
                <div className="px-2 lg:px-16 py-8 flex flex-col gap-6">
                  <ul className="flex flex-col gap-4 w-full text-sm lg:text-base lg:w-3/4">
                    <li className="flex justify-between">
                      <b>Points</b>
                      <p>{assessmentAttempt?.gradedPercentage} / 100</p>
                    </li>
                    <li className="flex justify-between">
                      <b>Percentage</b>
                      <p>{assessmentAttempt?.gradedPercentage}%</p>
                    </li>
                    <li className="flex justify-between">
                      <b>Duration</b>
                      <p>
                        {assessmentAttempt &&
                          formatTime(
                            Math.max(
                              0,
                              Math.ceil(
                                assessmentAttempt?.durationOfAttemptInSeconds -
                                  120
                              )
                            ),
                            true
                          )}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <b>Date Started</b>
                      <p>
                        {assessmentAttempt &&
                          formatWrittenDate(
                            new Date(assessmentAttempt?.attemptStartDate)
                          )}
                      </p>
                    </li>
                    <li className="flex justify-between">
                      <b>Date Ended</b>
                      <p>
                        {assessmentAttempt &&
                          formatWrittenDate(
                            new Date(assessmentAttempt.attemptEndDate)
                          )}
                      </p>
                    </li>
                  </ul>
                  <div
                    className={`flex flex-col border-l-4 rounded-lg ${
                      assessmentAttempt.gradedPercentage > 49
                        ? "border-green-500"
                        : "border-red-500"
                    } bg-gray-100 p-8 w-full lg:w-3/4`}
                  >
                    <h1 className="font-semibold">Feedback</h1>
                    {decideFeedbackToRender()}
                  </div>
                </div>

                {/* <section className="grow px-0 sm:px-8 flex gap-8">
                                    <Tabs defaultValue={visibleTab} className="w-full" onValueChange={(value) => applyTabFilter(value)}>
                                        <TabsList className="w-full flex mt-6 " >
                                            <TabsTrigger value="all" className="grow inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]">
                                                All Questions
                                            </TabsTrigger>
                                            <TabsTrigger value="correct" className="grow inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]">
                                                {questionsSummary?.correctlyAnsweredQuestions} Correct
                                            </TabsTrigger>
                                            <TabsTrigger value="incorrect" className="grow inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]">
                                                {questionsSummary?.incorrectlyAnsweredQuestions} Incorrect
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value={visibleTab} className="">
                                            <p className="py-4 text-lg font-semibold">
                                                {visibleTab === 'correct' && 'List of Correct Questions.'}
                                                {visibleTab === 'incorrect' && 'List of Incorrect Questions.'}
                                            </p>
                                            <section className="sm:p-8 flex flex-col lg:flex-row gap-3">
                                                <ArrowLeftCircleIcon className="hidden lg:flex w-12 aspect-square shrink-0 cursor-pointer text-gray-600" onClick={moveToPreviousQuestion} />
                                                {determineWhichQuestionToRender()}
                                                <ArrowRightCircleIcon className="hidden lg:flex w-12 aspect-square shrink-0 cursor-pointer text-gray-600" onClick={moveToNextQuestion} />
                                            </section>
                                            <div className="flex lg:hidden gap-4 py-6 justify-between">
                                                <ArrowLeftCircleIcon className="w-12 aspect-square shrink-0 cursor-pointer text-gray-600" onClick={moveToPreviousQuestion} />
                                                <ArrowRightCircleIcon className="w-12 aspect-square shrink-0 cursor-pointer text-gray-600" onClick={moveToNextQuestion} />
                                            </div>

                                        </TabsContent>
                                        <TabsContent value="correct"></TabsContent>
                                        {/* <TabsContent value="incorrect">List of InCorrect Questiions.</TabsContent> */}
                {/* </Tabs> */}
                {/* </section>  */}

                <div className="text-center my-4 max-w-full lg:max-w-[77%]">
                  <Button
                    className="bg-secondary mx-auto"
                    onClick={() => router.push(`/dashboard`)}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </section>
            </aside>
          ) : (
            <div className="px-4 flex w-full h-1/3 justify-center items-center">
              <div className="px-4 max-w-sm text-center">
                <p className="mb-4">
                  We ran into some problem fetching your results
                </p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-secondary"
                >
                  Go back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default Page;
