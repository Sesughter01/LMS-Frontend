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
            <div className="flex flex-col-reverse lg:flex-col gap-4 p-4 border border-gray-200 rounded-md relative">
              <div className="flex flex-col	 grow gap-1 lg:py-16 px-2 lg:px-8 border-b bg-gray-100 ">
                <h1 className="text-2xl font-semibold mb-2">
                  {details?.courseTitle}
                </h1>
                <div className="flex space-x-4 text-gray-600 text-sm">
                  <div>
                    <span>📺 35h 20m of videos left</span>
                  </div>
                  <div>
                    <span>📚 4h 40m of readings left</span>
                  </div>
                  <div>
                    <span>📝 12 graded assessment left</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <small>{details?.courseDescription}</small>
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
            </div>

            <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
              <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
                {/* Course Header */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-bold mb-2">Java and Spring Boot</h2>
                  <div className="flex space-x-4 text-gray-600 text-sm">
                    <div>
                      <span>📺 35h 20m of videos left</span>
                    </div>
                    <div>
                      <span>📚 4h 40m of readings left</span>
                    </div>
                    <div>
                      <span>📝 12 graded assessment left</span>
                    </div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="mt-4 text-gray-700">
                  <p>Welcome to the Java and Spring Boot Course!</p>
                  <p className="mt-2">
                    This course involves learning how to design and develop server-side applications. The main learning objectives include understanding how to create and manage RESTful web services, designing and working with databases using SQL and NoSQL technologies, implementing security measures to protect the application, and using DevOps tools for continuous integration and deployment.
                  </p>
                  <p className="mt-2">
                    Additionally, students will learn how to handle errors, optimize performance, and scale applications as per the requirements. Overall, the course aims to provide a solid foundation in building robust, secure, and scalable backend systems using Java and Spring Boot.
                  </p>
                </div>

                {/* Modules */}
                <div className="mt-6">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-lg">Course Overview</h3>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Module 1 - Introduction to Java and Development Environment Setup</h3>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-white w-full max-w-xs mt-6 p-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-bold mb-4">Progress</h4>
                <div className="text-gray-600 text-sm">
                  <p>🟢 0/2 Modules</p>
                  <p>🟢 0/25 Assessments</p>
                </div>

                <h4 className="text-lg font-bold mt-6 mb-4">Schedule</h4>
                <div className="text-gray-600 text-sm">
                  <p>Start Date: Oct 16, 2023</p>
                  <p>Estimated end Date: Jan 4, 2024</p>
                </div>

                <h4 className="text-lg font-bold mt-6 mb-4">Upcoming</h4>
                <div className="text-gray-600 text-sm">
                  <p>Introduction to Java Practice Quiz</p>
                  <p className="text-purple-600">Due Oct 17, 11:59 PM</p>
                  <p className="mt-2">Introduction to Java Graded Test</p>
                  <p className="text-purple-600">Due Oct 19, 11:59 PM</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </section>
  );
};

export default Page;