"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ChevronRight, Scaling } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Application } from "@/shared/types/application";
import { GetMyApplications } from "@/services/api/applications";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { generateUserApplicationNumber } from "@/lib/utils";

const Page = () => {
  const pathname = usePathname();

  const [myApplications, setMyApplications] = useState<Application[]>();

  const authUser = useSelector((state: RootState) => state.auth.user);

  // Access values directly from sessionStorage
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const fetchMyApplications = async () => {
    if (authUser) {
      let applications = await GetMyApplications(authUser?.id);

      let sortedApplications = applications.sort((a, b) => b.id - a.id);
      setMyApplications(sortedApplications);
    }
  };

  const inferApplicationAssessmentProgress = (singleApplication: Application) => {
    if (!singleApplication.hasTakenCohortPreAssessment) {
      return <>No Assessment Taken Yet</>;
    }
    if (!singleApplication.hasTakenCoursePreAssessment) {
      return <>Course Assessment Not Taken Yet</>;
    }

    return <>{singleApplication.overallApplicationScoreAverage}%</>;
  };

  const decideTakeAssessmentRendering = (singleApplication: Application) => {
    if (!singleApplication.hasTakenCohortPreAssessment) {
      return (
        <Button style={{ backgroundColor: secondaryColor }} asChild className="flex gap-2">
          <Link href={`/dashboard/assessment/cohort?cohortId=${singleApplication.cohortId}`} className="w-fit">
            Take Assessment
            <ChevronRight />
          </Link>
        </Button>
      );
    }
    if (!singleApplication.hasTakenCoursePreAssessment) {
      return (
        <Button style={{ backgroundColor: secondaryColor }} asChild className="flex gap-2">
          <Link href={`/dashboard/assessment/course?courseId=${singleApplication.courseId}`} className="w-fit">
            Take Assessment
            <ChevronRight />
          </Link>
        </Button>
      );
    }

    return (
      <div>
        {/* Precious please style here */}
        <Button style={{ backgroundColor: secondaryColor }} asChild className="flex gap-2">
          <Link href={`/dashboard/courses/${singleApplication.courseId}`} className="w-fit">
            Proceed To Course
            <ChevronRight />
          </Link>
        </Button>
      </div>
    );
  };
  useEffect(() => {
    fetchMyApplications();
  }, []);

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav secondaryColor={secondaryColor} currentPage={"Application"} />

        <section className="grow px-8 flex flex-col gap-8">
          <div className="relative overflow-x-auto py-8 w-full">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Application
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Next Steps
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remarks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Test Score(AVG)
                  </th>
                </tr>
              </thead>
              <tbody>
                {myApplications &&
                  myApplications.map((singleApplication) => {
                    return (
                      <tr className="bg-white " key={singleApplication.id}>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0">
                            <small>
                              {authUser?.profile.firstName} {authUser?.profile.lastName}
                            </small>
                            <p className="font-semibold">{authUser && generateUserApplicationNumber(authUser?.id)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{decideTakeAssessmentRendering(singleApplication)}</td>
                        <td className="px-6 py-4">
                          {singleApplication.hasTakenCohortPreAssessment && singleApplication.hasTakenCoursePreAssessment ? (
                            <>Reviewed</>
                          ) : (
                            "Not Reviewed"
                          )}
                        </td>
                        <td className="px-6 py-4">{inferApplicationAssessmentProgress(singleApplication)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className=" flex flex-col py-16 gap-4">
            <ul className="rounded-2xl text-gray-600 px-4 lg:px-16 flex flex-col gap-3 w-fit">
              <p className="text-xl font-semibold mb-4">Important things to note:</p>
              <li> - Click on Continue application to proceed with registration</li>
              <li> - For proper review of application after submission, it may take up to a week to get feedback on your dashboard</li>
              <li> - Your application status may read not verified while it is being reviewed</li>
              <li> - Status will be updated to verified as each section is reviewed</li>
            </ul>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Page;
