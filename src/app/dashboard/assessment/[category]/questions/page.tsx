"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Assessment } from "@/shared/types/assessment";
import {
  CompleteAssessment,
  StartAssessment,
} from "@/services/api/assessments";
import { Question } from "@/shared/types/question";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";
import { QuestionAnswer } from "@/shared/types/questionanswer";
import { formatTime } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleAssesssmentAttempt,
  updateAnswerToAssessmentAttemptQuestion,
} from "@/store/slices/assessmentAttemptSlice";
import { RootState } from "@/store/store";

const Page = () => {
  const params = useParams();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [assessment, setAssessment] = useState<Assessment>();
  const [timeCounter, setTimeCounter] = useState(0);

  const [currentlyViewedQuestionIndex, setCurrentlyViewedQuestionIndex] =
    useState<number>(0);

  const [loading, setLoading] = useState(true);

  const [questionIdsAgainstAnswers, setQuestionIdsAgainstAnswers] =
    useState<QuestionAnswer>();

  const providedQuestionAnswersDictForThisAssessment = useSelector(
    (state: RootState) => selectSingleAssesssmentAttempt(state, assessment?.id)
  );

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";
  const logoUrl = sessionStorage.getItem("logoUrl") || "";

  const dispatch = useDispatch();

  const router = useRouter();

  const [assessmentCategory, setAssessmentCategory] = useState({
    category: "",
    categoryId: 0,
  });

  const authUser = useSelector((state: RootState) => state.auth.user);

  const fetchAssessmentQuestions = async () => {
    try {
      const assessmentId = Number(searchParams.get("id"));

      let startedAssessment = await StartAssessment(
        assessmentId,
        assessmentCategory.category,
        assessmentCategory.categoryId,
        authUser?.id || 0,
        organizationId
      );

      //startedAssessment = {...startedAssessment, questions: startedAssessment.assessmentQuestions}

      if (startedAssessment.questions.length === 0) {
        toast.error(
          `No Questions in this Assessment, Please contact Administrator`
        );
      }

      setAssessment(startedAssessment);
      setTimeCounter(startedAssessment.durationInMinutes * 60);

      setCurrentlyViewedQuestionIndex(0);
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const recordAnswer = async (questionId: number, selectedOptionId: number) => {
    if (assessment) {
      dispatch(
        updateAnswerToAssessmentAttemptQuestion({
          assessmentId: assessment?.id,
          questionId: questionId,
          providedAnswer: {
            questionId: questionId,
            userSelectedOptionId: selectedOptionId,
            assessmentId: assessment?.id,
          },
        })
      );
    }
  };

  const submitAnswersToAssessment = async () => {
    try {
      setLoading(true);
      let questionAnswersDict = providedQuestionAnswersDictForThisAssessment;
      if (assessment && questionAnswersDict) {
        let submission = await CompleteAssessment(
          assessment?.id,
          Object.values(questionAnswersDict),
          assessmentCategory.category,
          assessmentCategory.categoryId,
          authUser?.id,
          organizationId
        );
        router.push(
          `/dashboard/assessment/${params.category}/questions/completed?id=${assessment.id}`
        );
      }
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err) ?? err.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getAnswerToASpecificQuestionIfProvided = (questionId: number) => {
    let allProvided = providedQuestionAnswersDictForThisAssessment;

    if (!allProvided) {
      return 0;
    }

    let specificQuestion = allProvided[questionId];
    if (specificQuestion) {
      return specificQuestion.userSelectedOptionId;
    }

    return 0;
  };

  const moveToNextQuestion = async () => {
    if (assessment) {
      setLoading(true);
      if (currentlyViewedQuestionIndex >= assessment?.questions?.length - 1) {
        //means you're at the last already.
        toast.info(
          `This is the last question. You can submit instead if you're done`
        );
        return;
      }

      setCurrentlyViewedQuestionIndex(currentlyViewedQuestionIndex + 1);

      setLoading(false);
    }
  };

  const moveToPreviousQuestion = async () => {
    if (assessment) {
      setLoading(true);

      if (currentlyViewedQuestionIndex === 0) {
        toast.info(`You're on the first question`);
        return;
      }

      setCurrentlyViewedQuestionIndex(currentlyViewedQuestionIndex - 1);

      setLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const categoryId = searchParams.get("categoryId");

    if (category && categoryId) {
      setAssessmentCategory({
        category: category,
        categoryId: Number(categoryId),
      });
    }
  }, []);

  useEffect(() => {
    fetchAssessmentQuestions();
  }, []);

  useEffect(() => {
    if (assessment) {
      let intervalId = setInterval(() => {
        let durationInSeconds = timeCounter - 1;

        if (
          durationInSeconds === 0 &&
          assessment &&
          assessment.durationInMinutes > 0
        ) {
          //time is up.
          submitAnswersToAssessment();
        }

        setTimeCounter((prevCount) => prevCount - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [assessment]);

  const decideSectionToRender = () => {
    if (loading) {
      return (
        <div className="h-full items-center flex justify-center">
          Loading...
        </div>
      );
    }

    if (
      !assessment ||
      !assessment.questions ||
      assessment.questions.length === 0
    ) {
      return (
        <div className="h-full items-center flex justify-center">
          No questions in this assessment
        </div>
      );
    }

    let currentQuestion = assessment?.questions[currentlyViewedQuestionIndex];

    let hasAPreviousButtonActive = true;

    if (currentlyViewedQuestionIndex === 0) {
      hasAPreviousButtonActive = false;
    }

    let hasANextButtonActive = true;
    if (currentlyViewedQuestionIndex >= assessment?.questions.length - 1) {
      hasANextButtonActive = false;
    }

    let nextButtonMeansFinalPrompt = false;
    if (currentlyViewedQuestionIndex == assessment?.questions.length - 1) {
      nextButtonMeansFinalPrompt = true;
    }

    let previouslySelectedAnswerOptionId =
      providedQuestionAnswersDictForThisAssessment &&
      currentQuestion &&
      providedQuestionAnswersDictForThisAssessment[currentQuestion?.id]
        ? providedQuestionAnswersDictForThisAssessment[currentQuestion.id]
            .userSelectedOptionId
        : null;

    let defaultValueProps = {};
    if (previouslySelectedAnswerOptionId) {
      defaultValueProps = {
        defaultValue: previouslySelectedAnswerOptionId.toString(),
      };
    }

    return (
      <aside className="px-8 flex flex-col">
        <section className="border border-gray-100">
          <div className="flex flex-col gap-4 p-8 border-b border-gray-100">
            <h1 className="text-xl lg:text-2xl font-semibold capitalize">
              Program: {assessment?.assessmentTitle}
            </h1>
            <div className="flex gap-1">
              <b>Description: </b>
              <p className="font-light">{assessment?.assessmentDescription}</p>
            </div>
            <p>
              <b>Time Remaining:</b> {formatTime(timeCounter, true)}
            </p>
          </div>
          <div className="border-b border-gray-100 p-8 flex flex-col gap-0">
            <h1 className="font-semibold text-lg">
              Question {currentlyViewedQuestionIndex + 1} of{" "}
              {assessment?.questions.length}
            </h1>
            <small>Points: 1</small>
          </div>
          <section className="p-4 lg:p-8">
            <div className="lg:px-8 flex flex-col gap-4">
              <div className="text-lg font-semibold flex gap-1">
                <span>{currentlyViewedQuestionIndex + 1}.</span>
                <p>{currentQuestion?.questionContent}</p>
              </div>
              <div className="">
                <RadioGroup
                  className="flex flex-col gap-4"
                  value={(
                    currentQuestion &&
                    getAnswerToASpecificQuestionIfProvided(currentQuestion?.id)
                  )?.toString()}
                  {...defaultValueProps}
                >
                  {currentQuestion?.options.map((singleOption) => {
                    return (
                      <div
                        className="flex items-center space-x-3"
                        key={singleOption.id}
                        onClick={(e) =>
                          currentQuestion &&
                          recordAnswer(
                            currentQuestion?.id,
                            Number(singleOption.id)
                          )
                        }
                      >
                        <RadioGroupItem
                          value={singleOption.id.toString()}
                          id={`r${singleOption.id}`}
                          className="text-gray-800 border-gray-800"
                        />
                        <label
                          htmlFor={`r${singleOption.id}`}
                          className="cursor-pointer select-none"
                        >
                          {singleOption.optionContent}
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
            <div className="flex justify-end gap-8 mt-12">
              {hasAPreviousButtonActive && (
                <Button
                  className="bg-blue-500"
                  onClick={moveToPreviousQuestion}
                >
                  <ArrowLeft /> Previous Question
                </Button>
              )}

              {hasANextButtonActive && (
                <Button className="bg-blue-500" onClick={moveToNextQuestion}>
                  {" "}
                  Next Question <ArrowRight />
                </Button>
              )}
              {nextButtonMeansFinalPrompt && (
                <Dialog>
                  <DialogTrigger className="w-fit">
                    <Button className="bg-green-500 text-white">
                      {" "}
                      Finish Now <ArrowRight />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white ">
                    <DialogHeader className="mb-4">
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will submit your
                        work.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogTrigger className="w-fit">
                        <Button className="bg-blue-500 mr-4">
                          Back to Question
                        </Button>
                        <Button
                          className="bg-green-700"
                          onClick={submitAnswersToAssessment}
                        >
                          Confirm Finish now
                        </Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </section>
        </section>
      </aside>
    );
  };

  return (
    <>
      <section className="flex w-full min-h-screen h-auto">
        <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
        <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
          <DashNav currentPage={"Assessment"} secondaryColor={secondaryColor} />
          <div className="px-8">
            <h1 className="flex gap-2 font-base items-center text-gray-500 capitalize">
              Pre-Assessment <ChevronRight className="" /> {params.course}
            </h1>
          </div>
          {decideSectionToRender()}
        </main>
      </section>
    </>
  );
};

export default Page;
