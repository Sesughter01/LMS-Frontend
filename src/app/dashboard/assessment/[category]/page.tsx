"use client";

import {
  usePathname,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Assessment } from "@/shared/types/assessment";
import {
  GetPreAssessmentForACohort,
  GetPreAssessmentForACourse,
  GetTraineePreAssessmentById,
} from "@/services/api/assessments";
import { convertDurationInMinutesToTimeString } from "@/lib/utils";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";

enum AssessmentCategories {
  COHORT = "cohort",
  COURSE = "course",
}

const Page = () => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const [assessment, setAssessment] = useState<Assessment>();
  const [loading, setLoading] = useState(true);

  const [categoryAndId, setCategoryAndId] = useState({ category: "", id: 0 });

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";
  const logoUrl = sessionStorage.getItem("logoUrl") || "";

  const determineAssessmentBeingTaken = async () => {
    if (params.category && params.category === AssessmentCategories.COHORT) {
      await fetchPreAssessmentForCohort(Number(searchParams.get("cohortId")));
      setCategoryAndId({
        category: params.category,
        id: Number(searchParams.get("cohortId")),
      });
      return;
    }

    if (params.category && params.category === AssessmentCategories.COURSE) {
      await fetchPreAssessmentForCourse(Number(searchParams.get("courseId")));
      setCategoryAndId({
        category: params.category,
        id: Number(searchParams.get("courseId")),
      });
      return;
    }

    if (searchParams.get("assessmentId")) {
      await fetchAssessmentById(Number(searchParams.get("assessmentId")));
      return;
    }

    setLoading(false);
  };

  const fetchPreAssessmentForCohort = async (cohortId: number) => {
    try {
      let assessment = await GetPreAssessmentForACohort(
        cohortId,
        organizationId
      );
      setAssessment(assessment);
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPreAssessmentForCourse = async (courseId: number) => {
    try {
      let assessment = await GetPreAssessmentForACourse(
        courseId,
        organizationId
      );
      setAssessment(assessment);
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessmentById = async (assessmentId: number) => {
    try {
      let assessment = await GetTraineePreAssessmentById(
        assessmentId,
        organizationId
      );
      setAssessment(assessment);
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    determineAssessmentBeingTaken();
  }, []);

  const determineWhatToRender = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    // if(!assessment){
    //     return <div className="h-full items-center flex justify-center">Could not find Assessment You Intend Taking</div>
    // }

    return (
      <>
        <div className="px-8">
          <h1 className="flex gap-2 font-base items-center text-gray-500 capitalize">
            Pre-Assessment <ChevronRight className="" />{" "}
            {assessment?.assessmentTitle}
          </h1>
        </div>
        <section className="px-8 flex flex-col gap-6">
          <div className="flex gap-6">
            <Link href={""} onClick={router.back}>
              <ArrowLeft />
            </Link>
            <h1 className="text-lg font-semibold capitalize">
              INGRYD Pre-assessment - {assessment?.assessmentTitle}
            </h1>
          </div>
          <div className="lg:px-16 flex flex-col items-end py-16 gap-4 mx-auto">
            <ul className="rounded-2xl text-xs lg:text-base bg-gray-100 p-4 lg:p-16 flex flex-col gap-3 w-fit">
              <p className="text-xl font-semibold">Instructions</p>
              <li>Number of questions: {assessment?.numberOfQuestions}</li>
              <li>
                Has a time limit of:{" "}
                {assessment &&
                  convertDurationInMinutesToTimeString(
                    assessment?.durationInMinutes
                  )}
              </li>
              <li>
                Must be finished in one sitting. You cannot save and finish
                later.
              </li>
              <li>Questions displayed per page: 1</li>
              <li>
                You must answer a question to proceed to the next question
              </li>
              <li>Will allow you to go back and change your answers</li>
              <li>Will not let you finish with any questions unattempted</li>
              <li>Good Luck!</li>
            </ul>
            <div className="">
              <Button asChild className="bg-secondary justify-self-end">
                <Link
                  href={
                    pathname +
                    `/questions?id=${assessment?.id}&category=${categoryAndId.category}&categoryId=${categoryAndId.id}`
                  }
                >
                  Continue
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <section className="flex w-full min-h-screen h-auto">
        <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
        <main className="grow shrink-0 w-full max-w-full lg:max-w-[77%] flex flex-col gap-6">
          <DashNav currentPage={"Assessment"} secondaryColor={secondaryColor} />
          {determineWhatToRender()}
        </main>
      </section>
    </>
  );
};

export default Page;
