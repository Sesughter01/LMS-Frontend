"use client";

import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { RootState } from "@/store/store";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Divide, SearchIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import courseImage from "@/assets/java_coder.png";

import AboutTab from "./container/aboutTab";
import WhatLearnTab from "./container/whatLearnTab";
import SyllabusTab from "./container/syllabusTab";
import FaqTab from "./container/faqTab";
import InstructorTab from "./container/instructorTab";
import { useEffect, useState } from "react";
import courseService from "@/services/api/courses";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/shared/utils/helper";
import { Course, CourseDetail, courseOverview } from "@/shared/types/course";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import javaCourseImage from "@/assets/courses/cybersecurity.png";
import linuxCourseImage from "@/assets/courses/linux.png";
import pythonCourseImage from "@/assets/courses/python.png";
import cyberSecurityImage from "@/assets/courses/cybersecurity.png";
import Loader from "./container/loader";

const coursesImagesDict = {
  java: javaCourseImage,
  linux: linuxCourseImage,
  python: pythonCourseImage,
  cyberSecurityImage: cyberSecurityImage,
};

const faqContents = [
  {
    question: "Do i need to pay for the courses at INGRYD Academy?",
    answer: `Yes, our courses do have associated fees. However, we understand that education should be accessible to everyone. Which is why we are offering specific trainings for free under our Scholarship Programme. If you applied for our scholarship but did not meet the cut-off mark for the assessment, don't worry. We offer flexible payment options, including installment plans, to help make our courses more affordable and accessible. Please feel free to reach out to ur support team at <a href="mailto:support@ingrydacademy.com" class="text-blue-500">support@ingrydacademy.com</a> for further assistance.`,
  },
  {
    question:
      "I applied for the scholarship, but i am being directed to pay for the course. What should i do?",
    answer: `If you applied for our scholarship but are being directed to pay, it may be because you did not
                meet the cut-off mark for the assessment. We offer scholarships to eligible candidates who
                demonstrate exceptional skills and potential in their assessments. However, if you still wish to
                enroll and cannot afford the full amount upfront, we encourage you to explore our installment
                payment options. These plans can help you manage cost, while pursuing your goals.`,
  },
  {
    question: "When does the class start for the upcoming courses?",
    answer: `Classes for this course are scheduled to start on October 16th. Kindly watch your dashboard and email for updates.`,
  },
  {
    question: "What is the duration of the courses at INGRYD Academy?",
    answer:
      "Our courses run for 12 weeks, providing you with an intensive and comprehensive learning experience.",
  },
  {
    question: "What is the class structure of this course?",
    answer: {
      react: `React classes are Hybrid (2 days in class, 2 days virtual every week) for the duration of the training.`,
      node: `NodeJS classes are Hybrid (2 days in class, 2 days virtual every week) for the duration of the training.`,
      java: `Java classes are Hybrid (2 days in class, 2 days virtual every week) for the duration of the training.`,
      linux: `Linux classes are fully virtual for the duration of the training.`,
      python: `Python classes are Hybrid (2 days in class, 2 days virtual every week) for the duration of the training.`,
      cyber: `This Cyber Security class is fully virtual for the duration of the training.`,
      default: `This Class is fully virtual for the duration of the training.`,
    },
  },
];

const Page = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const [details, setDetails] = useState<CourseDetail | null>();
  const [overview, setOverview] = useState<courseOverview | null>();

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const userCourseId = sessionStorage.getItem("userCourseId") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const [userCourseEnrolledId, setUserCourseEnrolledId] = useState<any[]>([]);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const enrolledCourseIds = userCourseEnrolledId?.map(course => course.courseId);

  console.log("TEST", enrolledCourseIds?.includes(Number(params.id)) )

  const [isEnrolled, setIsEnrolled] = useState(false);
  console.log("ENROLLED",isEnrolled)
  console.log("ENROLLED IDDS",enrolledCourseIds)
  console.log("iDS",userCourseEnrolledId)


  const fetchThisCourse = async (courseId: any) => {
    try {
      const response = await courseService.GetIndividualCourseDetails(courseId);
      console.log("INDIVIDUAL COURSE",response)
      console.log("AUTH USER",authUser)
     
      setDetails(response);
          // Check if the user is enrolled in this course
          // if (authUser && response.IsUserEnrolled) {
          //   setIsEnrolled(true);
          // }
         
    } catch (err) {
      console.log("ERROR",err)
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

    const fetchUserEnrolledCourses = async () => {
    try{
        const userCourseId = sessionStorage.getItem("userCourseId")
        if(authUser && !userCourseId){
          toast.info("User has no current course")
          // setUserCourseEnrolledId(0);
        }else{
        
          let userEnrolledCourseIdS = await courseService.GetIndividualUserCourseId(authUser.id);
          
          console.log("Users Enrolled Id", userEnrolledCourseIdS )
          // console.log("Users Enrolled Id", userEnrolledCourseId)
          // console.log("Users Enrolled Ids", enrolledCourseIds )
          console.log("paramId", params.id )
          console.log("TEST", enrolledCourseIds?.includes(Number(params.id)) )
          setUserCourseEnrolledId(userEnrolledCourseIdS)
          // if (enrolledCourseIds?.includes(Number(params.id))) {
          //   setIsEnrolled(true);
          // }
         
          console.log("ENROLLED",isEnrolled)
          console.log("ENROLLED idds",enrolledCourseIds)
          if (enrolledCourseIds.includes(params.id)) {
            setIsEnrolled(true);
          }
          // setCourses([courses]);
          // setUserCourses(courses);
          // setUserCourses([courses]);
        }
        
    }catch(err){
      toast.error(err.message)
        // console.log('errorr', err)
    }
  };

  useEffect(() => {
    fetchThisCourse(params.id);
    fetchThisCourseOverview(params.id);
    
    fetchUserEnrolledCourses();
    console.log("Course Details", details);
  }, []);

  // console.log("Course Details", details);

  // useEffect(() => {
  //   fetchThisCourse(params.id);
  //   fetchThisCourseOverview(params.id);
  // }, []);

  const getCourseImage = (course: any) => {
    let courseImageSelection: any = coursesImagesDict.java;

    // if (course.courseTitle) {
    //     if (course.courseTitle.toLocaleLowerCase().includes('java')) {
    //         courseImageSelection = coursesImagesDict.java;
    //     }

    if (course.courseTitle) {
      if (course.courseTitle.toLocaleLowerCase().includes("java")) {
        courseImageSelection = coursesImagesDict.java;
      }

      if (course.courseTitle.toLocaleLowerCase().includes("linux")) {
        courseImageSelection = coursesImagesDict.linux;
      }

      if (
        course.courseTitle.toLocaleLowerCase().includes("python") ||
        course.courseTitle.toLocaleLowerCase().includes("data")
      ) {
        courseImageSelection = coursesImagesDict.python;
      }

      if (course.courseTitle.toLocaleLowerCase().includes("cyber")) {
        courseImageSelection = coursesImagesDict.cyberSecurityImage;
      }
    }

    return courseImageSelection;
  };

  const getDescription = (title: any) => {
    title = title.toLowerCase();
    if (title.includes("java")) {
      return "java";
    }
    if (title.includes("linux")) {
      return "linux";
    }
    if (title.includes("python") || title.includes("data")) {
      return "python";
    }
    if (title.includes("cyber")) {
      return "cyber";
    }
    if (title.includes("react")) {
      return "react";
    }
    if (title.includes("node")) {
      return "node";
    }
    return "default"; // Default value when no match is found
  };

  // Filter FAQs based on the course title and set the answer dynamically
  const filteredFaqContents = faqContents.map((faq: any) => {
    if (details?.courseTitle) {
      const courseTitleLower = getDescription(details.courseTitle);
      const courseAnswer =
        faq.answer[courseTitleLower] !== undefined
          ? faq.answer[courseTitleLower]
          : faq.answer.default || faq.answer;
      return { ...faq, answer: courseAnswer };
    }
    return faq;
  });

  return (
        <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 w-full lg:max-w-[77%] flex flex-col gap-6">
        {/* <DashNav secondaryColor={secondaryColor} currentPage={"Courses"} /> */}
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
          <>
            <section className="px-8 flex flex-col gap-8">
              <div className="flex flex-col-reverse lg:flex-row gap-4 p-4 border border-gray-200 rounded-md relative">
                <div className="grow flex flex-col gap-1 lg:py-16 px-2 lg:px-8">
                  <h1 className="text-2xl font-semibold">
                    {details?.courseTitle}
                  </h1>
                  <small>{details?.courseDescription}</small>
                </div>
                <div className="w-full lg:w-[35%] shrink-0 bg-gray-100 aspect-video lg:h-full relative">
                  <Image
                    src={getCourseImage(details)}
                    alt="course image"
                    className="object-cover rounded-md"
                    fill
                  />
                </div>
              </div>
              {details.isOpenForEnrollment && !enrolledCourseIds?.includes(Number(params.id)) ? (
                <div className="flex justify-end items-center gap-6 px-6">
                  <Button className="bg-blue-500" asChild>
                    <Link href={pathname + "/payment"}>Enroll Now</Link>
                  </Button>
                  <p className="text-xl font-bold">N{details.coursePrice}</p>
                </div>
              ):(
            
                <div className="flex flex-col justify-end items-end gap-2 px-6">
                  <p>Already enrolled</p>
                <Button className="bg-blue-500" asChild>
                  <Link href={pathname + "/learn"}>Go to Course</Link>
                </Button>
                {/* <p className="text-xl font-bold">N{details.coursePrice}</p> */}
              </div> 
              )} 
            </section>

            <section className="grow px-4 lg:px-8 flex gap-8">
              <Tabs defaultValue="about" className="w-full">
                <div className="flex md:flex-row flex-col-reverse w-full justify-between">
                  <TabsList className="flex justify-start h-auto overflow-x-scroll lg:overflow-x-clip">
                    <TabsTrigger
                      value="about"
                      className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="learn"
                      className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                    >
                      What you&#39;ll Learn
                    </TabsTrigger>
                    <TabsTrigger
                      value="instructor"
                      className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                    >
                      Instructor
                    </TabsTrigger>
                    <TabsTrigger
                      value="syllabus"
                      className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                    >
                      Syllabus
                    </TabsTrigger>
                    <TabsTrigger
                      value="faq"
                      className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE]"
                    >
                      FAQ
                    </TabsTrigger>
                    
                  </TabsList>
                    {/* {details.isOpenForEnrollment && !isEnrolled && (
                      <div className="flex justify-right  items-center gap-6 px-6">
                        <Button className="bg-blue-500 w-full" asChild>
                          <Link href={pathname + "/payment"}>Enroll Now</Link>
                        </Button>
                        <p className="text-xl font-bold">
                          <p className="line-through text-center text-sm">N500000</p>
                          N{details.coursePrice}
                        </p>
                      </div>
                    )} */}
                </div>

                <TabsContent value="about">
                  <AboutTab details={details?.courseOverview?.about} />
                </TabsContent>

                <TabsContent value="learn">
                  <WhatLearnTab details={details?.courseOverview?.learn} />
                </TabsContent>

                {/* No instructor's data on overview */}
                <TabsContent value="instructor">
                  <InstructorTab details={details?.courseInstructors} />
                </TabsContent>

                <TabsContent value="syllabus">
                  <SyllabusTab details={details?.courseOverview?.syllabus} />
                </TabsContent>

                <TabsContent value="faq">
                  <FaqTab details={details?.courseOverview?.FAQ} />
                </TabsContent>
                
              </Tabs>
            </section>
          </>
        )}
      </main>
    </section>
  );
};

export default Page;
