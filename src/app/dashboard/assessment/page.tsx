"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Scaling } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect, use } from "react";
import {
  GetAllAccessmentList,
  GetTraineeAssessments,
} from "@/services/api/assessments";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { Assessment } from "@/shared/types/assessment";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { InputLoading } from "@/app/signup/containers/Step2";
import { useRouter } from "next/navigation";
import { GetMyApplications } from "@/services/api/applications";
import { Application } from "@/shared/types/application";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mostRecentApplication, setMostRecentApplication] =
    useState<Application>();
  const [assessments, setAssessments] = useState<Assessment[]>();
  const [displayAssessments, setDisplayAssessments] = useState<Assessment[]>();
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>();

  const [tabSelection, setTabSelection] = useState("uncompleted");
  const [loading, setLoading] = useState(false);

  const authUser = useSelector((state: RootState) => state.auth.user);

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";
  const logoUrl = sessionStorage.getItem("logoUrl") || "";

  const fetchAndSetMostRecentApplication = async () => {
    if (!authUser) {
      router.push("/login");
      return;
    }

    let applications = await GetMyApplications(authUser.id);

    let sortedApplications = applications.sort((a, b) => {
      return b.id - a.id;
    });

    if (sortedApplications.length === 0) {
      toast.error(`you have no applications at the moment`);
      return;
    }

    setMostRecentApplication(sortedApplications[0]);
  };

  const getAssessments = async () => {
    if (authUser) {
      setLoading(true);

      try {
        const response = await GetTraineeAssessments(authUser?.id);
        setAssessments(response);
      } catch (err) {
        const errorMsg = extractErrorMessage(err);
        toast.error(errorMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAndSetMostRecentApplication();
    getAssessments();
  }, []);

  useEffect(() => {
    if (assessments) {
      if (tabSelection === "uncompleted") {
        let unattemptedAssessments = assessments.filter(
          (assess) => !assess.hasBeenAttempted
        );

        setDisplayAssessments((prev) => unattemptedAssessments);
      }

      if (tabSelection === "completed") {
        let attemptedAssessments = assessments.filter(
          (assess) => assess.hasBeenAttempted
        );
        setDisplayAssessments((prev) => attemptedAssessments);
      }
    }
  }, [tabSelection, assessments]);

   useEffect(() => {
     
      if (assessments?.length) {
        // console.log("assssessme&&&&&&&&&", assessments)
       let attemptedAssessments = assessments.filter(
          (assess) => assess.hasBeenAttempted
        );
        // console.log("%%%%%%%%%%%%%", attemptedAssessments)
        setCompletedAssessments(attemptedAssessments)
      }
    }, [assessments]);

   // console.log("%%%%%%%%%%%%%", completedAssessments)


  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 w-full max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav currentPage={"Assessment"} secondaryColor={secondaryColor} />
        {/* <div className="px-8">
                    <h1 className="font-semibold">Assessment</h1>
                </div> */}

        <section className="grow px-4 lg:px-8 flex gap-8">
          <Tabs
            defaultValue={tabSelection}
            className="w-full"
            onValueChange={(value) => setTabSelection(value)}
          >
            <TabsList className="gap-20">
              <TabsTrigger
                value="uncompleted"
                className="text-left inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
              >
                Assessments
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="text-left inline-block px-4 py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value={"uncompleted"}>
              {loading ? (
                <div className="relative overflow-x-auto py-8">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-[#D8E4FF]">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S/N
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Program
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Duration
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Questions
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                  </table>

                  <div className="mt-2 relative overflow-x-auto">
                    <div className="mb-3">
                      <InputLoading />
                    </div>
                    <div className="mb-3">
                      <InputLoading />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {displayAssessments?.length ? (
                    <>
                      {tabSelection && tabSelection === "uncompleted" && (
                        <div className="relative overflow-x-auto py-8">
                          <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-[#D8E4FF]">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  S/N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Program
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Duration
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Total Questions
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {displayAssessments?.map((assessment, index) => {
                                return (
                                  <tr className="bg-white " key={assessment.id}>
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                      {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                      <div className="flex flex-col gap-0">
                                        <small>Pre-Assessment</small>
                                        <p>{assessment.assessmentTitle}</p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      {assessment.durationInMinutes} minutes
                                    </td>
                                    <td className="px-6 py-4">
                                      {assessment.numberOfQuestions}
                                    </td>
                                    <td className="px-6 py-4">
                                      {assessment.cohortId ? (
                                        // If a Cohort assessment
                                        <Button
                                          asChild
                                          className="bg-secondary flex gap-2"
                                        >
                                          <Link
                                            href={
                                              assessment.courseId &&
                                              assessment.courseId > 0
                                                ? `/dashboard/assessment/course?courseId=${assessment.courseId}`
                                                : `/dashboard/assessment/cohort?cohortId=${assessment.cohortId}`
                                            }
                                          >
                                            Start{" "}
                                            <Scaling className="w-4 h-4" />
                                          </Link>
                                        </Button>
                                      ) : // If a Course assessment, button should be disabled until cohort gen assessment is taken
                                      mostRecentApplication?.hasTakenCohortPreAssessment ? (
                                        <Button
                                          asChild
                                          className="bg-secondary flex gap-2"
                                        >
                                          <Link
                                            href={
                                              assessment.courseId &&
                                              assessment.courseId > 0
                                                ? `/dashboard/assessment/course?courseId=${assessment.courseId}`
                                                : `/dashboard/assessment/cohort?cohortId=${assessment.cohortId}`
                                            }
                                          >
                                            Start{" "}
                                            <Scaling className="w-4 h-4" />
                                          </Link>
                                        </Button>
                                      ) : (
                                        <Button
                                          className="bg-secondary opacity-50 cursor-not-allowed flex gap-2"
                                          onClick={() =>
                                            toast.info(
                                              "You have to take the cohort pre-assessment first",
                                              {
                                                position:
                                                  toast.POSITION.TOP_RIGHT,
                                              }
                                            )
                                          }
                                        >
                                          Start <Scaling className="w-4 h-4" />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {tabSelection && tabSelection === "completed" && (
                        <div className="relative overflow-x-auto py-8">
                          <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-[#D8E4FF]">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  S/N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Program
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Time spent
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Grade
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Feedback
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {displayAssessments?.map((assessment, index) => {
                                return (
                                  <tr className="bg-white " key={assessment.id}>
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                      {index + 1}
                                    </th>

                                    <td className="px-6 py-4">
                                      <div className="flex flex-col gap-0">
                                        <small>Pre-Assessment</small>
                                        <p>{assessment.assessmentTitle}</p>
                                      </div>
                                    </td>

                                    <td className="px-6 py-4">
                                      {assessment.lastAttemptDurationInMinutes}{" "}
                                      minutes
                                    </td>

                                    <td
                                      className={`px-6 py-4 ${
                                        assessment.lastAttemptGrade >= 50
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      {assessment.lastAttemptGrade}%
                                    </td>

                                    <td className="px-6 py-4">
                                      <Button
                                        className="bg-secondary flex gap-2"
                                        onClick={() => {
                                          router.push(
                                            `/dashboard/assessment/course/questions/completed?id=${assessment.id}`
                                          );
                                        }}
                                      >
                                        Feedback
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="relative overflow-x-auto py-8">
                      <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#D8E4FF]">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              S/N
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Program
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Duration
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Total Questions
                            </th>
                            <th scope="col" className="px-6 py-3">
                             Deadline
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                          </tr>
                        </thead>
                      </table>
                      <div className="mt-8 flex justify-center items-center rounded-lg  py-4 px-4 flex-col gap-4 ">
                        <h2 className=" text-[#7A7A7A] text-2xl font-semibold">
                          No available assessment
                        </h2>
                        <p className="ext-[#7A7A7A] max-w-[525px] text-center text-lg font-medium">There are no assessments yet. Check back later to see the available assessments</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent value={"completed"}>
              {loading ? (
                <div className="relative overflow-x-auto py-8">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S/N
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Program
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Duration
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Questions
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                  </table>

                  <div className="mt-2 relative overflow-x-auto">
                    <div className="mb-3">
                      <InputLoading />
                    </div>
                    <div className="mb-3">
                      <InputLoading />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {completedAssessments?.length ? (
                    <>
                        <div className="relative overflow-x-auto py-8">
                          <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  S/N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Program
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Duration
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Total Questions
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedAssessments?.map((assessment, index) => {
                                return (
                                  <tr className="bg-white " key={assessment.id}>
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                      {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                      <div className="flex flex-col gap-0">
                                        <small>Pre-Assessment</small>
                                        <p>{assessment.assessmentTitle}</p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      {assessment.durationInMinutes} minutes
                                    </td>
                                    <td className="px-6 py-4">
                                      {assessment.numberOfQuestions}
                                    </td>
                                    <td className="px-6 py-4">
                                       <Button
                                          asChild
                                          className="bg-secondary flex gap-2"
                                        >
                                          <Link
                                            href={
                                              assessment.courseId &&
                                              assessment.courseId > 0
                                                ? `/dashboard/assessment/course?courseId=${assessment.courseId}`
                                                : `/dashboard/assessment/cohort?cohortId=${assessment.cohortId}`
                                            }
                                          >
                                            Retake{" "}
                                            <Scaling className="w-4 h-4" />
                                          </Link>
                                        </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="relative overflow-x-auto py-8">
                          <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  S/N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Program
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Time spent
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Grade
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Feedback
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {completedAssessments?.map((assessment, index) => {
                                return (
                                  <tr className="bg-white " key={assessment.id}>
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                    >
                                      {index + 1}
                                    </th>

                                    <td className="px-6 py-4">
                                      <div className="flex flex-col gap-0">
                                        <small>Pre-Assessment</small>
                                        <p>{assessment.assessmentTitle}</p>
                                      </div>
                                    </td>

                                    <td className="px-6 py-4">
                                      {assessment.lastAttemptDurationInMinutes}{" "}
                                      minutes
                                    </td>

                                    <td
                                      className={`px-6 py-4 ${
                                        assessment.lastAttemptGrade >= 50
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      {assessment.lastAttemptGrade}%
                                    </td>

                                    <td className="px-6 py-4">
                                      <Button
                                        className="bg-secondary flex gap-2"
                                        onClick={() => {
                                          router.push(
                                            `/dashboard/assessment/course/questions/completed?id=${assessment.id}`
                                          );
                                        }}
                                      >
                                        Feedback
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                    </>
                  ) : (
                    <div className="relative overflow-x-auto py-8">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              S/N
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Program
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Duration
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Total Questions
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                          </tr>
                        </thead>
                      </table>
                      <div className="mt-2 flex rounded-lg border border-dashed border-gray-600/25 py-4 px-4 flex-col gap-4 ">
                        <small className="text-slate-500">
                          No available assessment
                        </small>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </section>
  );
};

export default Page;
