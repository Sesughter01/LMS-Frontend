"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import courseService from "@/services/api/courses";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";
import { CourseDetail, courseOverview } from "@/shared/types/course";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "./container/loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, ChevronDown } from "lucide-react";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [details, setDetails] = useState<CourseDetail | null>();
  const [overview, setOverview] = useState<courseOverview | null>();
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const fetchThisCourse = async (courseId: any) => {
    try {
      const response = await courseService.GetIndividualCourseDetails(courseId);
      setDetails(response);
    } catch (err) {
      console.log("ERROR", err);
      router.push("/not-found");
    }
  };

  const fetchThisCourseOverview = async (courseId: any) => {
    try {
      const response = await courseService.GetCourseOverview(courseId);
      setOverview(response);
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchThisCourse(params.id);
    fetchThisCourseOverview(params.id);
  }, []);

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 w-full lg:max-w-[77%] flex flex-col gap-6">
        <div className="px-8">
          <h1 className="flex gap-2 pt-6 text-xl lg:text-2xl font-semibold items-center text-[#2a0839] capitalize">
            <span
              className="cursor-pointer"
              onClick={() => router.push("/dashboard/courses")}
            >
              Course
            </span>
            <ChevronRight />
            <span
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/courses/${params.id}`)}
            >
              {details ? details.courseTitle : "..."}
            </span>
          </h1>
        </div>
        {!details ? (
          <section className="px-8 flex flex-col gap-8">
            <Loader />
          </section>
        ) : (
          <section className="px-8 flex flex-col gap-8">
            <div className="flex flex-col-reverse lg:flex-row gap-4 p-4 border border-gray-200 rounded-md relative">
              <div className="grow flex flex-col gap-1 lg:py-16 px-2 lg:px-8">
                <h1 className="text-2xl font-semibold">
                  {details?.courseTitle}
                </h1>
                <small>{details?.courseDescription}</small>
              </div>
            </div>

            <section className="py-8 px-2 lg:px-8 flex flex-col gap-8">
              <Accordion type="single" collapsible className="w-full">
                {details?.courseModules?.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg">
                    <ChevronDown
                       
                      />
                      {module.moduleTitle}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white">
                      <ul className="list-disc list-inside">
                        {module?.contents?.map((contentItem, i) => (
                          <li key={i} className="py-1">
                            {contentItem.contentUrl && (
                              <a
                                href={contentItem?.
                                    contentUrl
                                    }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                {contentItem.contentDescription
                                }
                              </a>
                            )}
                            {contentItem.type === "file" && (
                              <a
                                href={contentItem.url}
                                download
                                className="text-blue-500 underline"
                              >
                                {contentItem.title}
                              </a>
                            )}
                            {contentItem.type === "text" && (
                              <p>{contentItem.text}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </section>
        )}
      </main>
    </section>
  );
};

export default Page;