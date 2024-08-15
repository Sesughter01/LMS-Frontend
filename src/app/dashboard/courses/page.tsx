"use client";

import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon,SlidersHorizontal,ArrowUpDown } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import { useEffect, useState } from "react";
import { Course } from "@/shared/types/course";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import courseService from "@/services/api/courses";
import { Application } from "@/shared/types/application";
import { GetMyApplications } from "@/services/api/applications";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: { y: 100, opacity: 0 },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeInOut", delay: index * 0.05 },
  }),
  exit: (index: number) => ({
    y: 100,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut", delay: index * 0.05 },
  }),
};

const Page = () => {
  const pathname = usePathname();
  const params = useParams();

  const searchParams = useSearchParams();

  const [courses, setCourses] = useState<Course[]>();
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>();
  const [userCourses, setUserCourses] = useState<Course[]>();
  const [segment, setSegment] = useState("all");

  const defaultProgramme = useSelector((state: RootState) => state.programme.defaultProgramme);

  const [mostRecentApplication, setMostRecentApplication] = useState<Application>();

  const authUser = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  // Access values directly from sessionStorage
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";

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

  const fetchAllCourses = async () => {
    if (defaultProgramme) {
      try{
          const userCohortId = sessionStorage.getItem("userCohortId")
          if(!userCohortId){
            toast.info("User has no current cohort")
            setDisplayedCourses([]);
          }else{
            // let courses = await courseService.GetAllAvailableCoursesInProgramme(defaultProgramme?.id, mostRecentApplication?.cohortId);
          // console.log("couresewwwwwwwwwwwwwwwwwww", courses.results)
            let courses = await courseService.GetAllAvailableCoursesInCohort(Number(userCohortId));
            // setCourses(courses);
            console.log("COURSES FETCHED", courses.results );
            setCourses(courses.results);

            const providedSegmentQs = searchParams.get("segment");
            if (providedSegmentQs) {
              setSegment(providedSegmentQs);
            }

            // setDisplayedCourses(courses);
            setDisplayedCourses(courses.results);
          }
          
      }catch(err){
        toast.error(err.message)
          // console.log('errorr', err)
      }
    }
  };

  const fetchUserCourses = async () => {
    try{
        const userCourseId = sessionStorage.getItem("userCourseId")
        if(!userCourseId){
          toast.info("User has no current course")
          setUserCourses([]);
        }else{
          // let courses = await courseService.GetAllAvailableCoursesInProgramme(defaultProgramme?.id, mostRecentApplication?.cohortId);
        // console.log("couresewwwwwwwwwwwwwwwwwww", courses.results)
          // let courses = await courseService.GetIndividualCourseDetails(Number(userCourseId));
          let courses = await courseService.GetUserCourseDetails(Number(authUser?.id));

          console.log("mineeeeeeeeeeeeee", courses)

          // setCourses([courses]);
          setUserCourses([courses]);
          // setUserCourses([courses]);
        }
        
    }catch(err){
      toast.error(err.message)
        // console.log('errorr', err)
    }
  };

  useEffect(() => {
    fetchAndSetMostRecentApplication();
  }, []);

  useEffect(() => {
    fetchAllCourses();
    fetchUserCourses()
  }, [mostRecentApplication]);

  useEffect(() => {
    renderBasedOnSegment();
  }, [segment]);

  const renderBasedOnSegment = () => {
    if (segment === "all") {
      setDisplayedCourses(courses);
    }

    if (segment === "mine") {
      let myCourses = courses?.filter((course) => course.isEnrolled);
      setDisplayedCourses(myCourses);
    }
  };
  const searchForACourse = (query: string) => {
    if (query.length > 0) {
      let searchedCourses = displayedCourses?.filter((course) => {
        if (
          course.courseTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          course.courseDescription.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return true;
        }

        return false;
      });

      setDisplayedCourses(searchedCourses);
    } else {
      renderBasedOnSegment();
    }
  };

  return (
    <section className="flex w-full min-h-screen h-auto ">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6 ">
        <DashNav secondaryColor={secondaryColor} currentPage={"Courses"} />

        <section className="grow px-8 flex gap-8 ">
          <Tabs defaultValue="all" className="w-full ">
            <TabsList className="w-full h-fit flex flex-col justify-between lg:flex-row gap-4 ">
              <div className="flex gap-2">  
                <div className="border border-gray-200 flex gap-2 items-center px-3 rounded-lg focus-within:outline outline-1">
                  <SearchIcon className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    className="outline-0 grow border-0 py-2"
                    placeholder="Search"
                    onChange={(event) => searchForACourse(event.target.value)}
                  />
                </div>
                <div className="border border-gray-200 flex gap-2 items-center w-fit px-3 rounded-lg focus-within:outline outline-1 ml-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500"/>
                  <p className='text-gray-500'>filter</p>
                </div>
                <div className="border border-gray-200 flex gap-2 items-center w-fit px-3 rounded-lg focus-within:outline outline-1">
                  <ArrowUpDown className="w-4 h-4 text-gray-500"/>
                  <p className='text-gray-500'>sort</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-1 flex w-full lg:w-fit">
                <TabsTrigger value="all" className={`lg:px-20 py-2 grow rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white`}>
                  All Courses
                </TabsTrigger>
                <TabsTrigger value="mine" className="lg:px-20 py-2 grow rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white">
                  My Courses
                </TabsTrigger>
              </div>
            </TabsList>
            {!courses ? (
              <div className="py-8 ">
                <CourseLoading />
              </div>
            ) : (
            <>
              <TabsContent value={"all"} className="py-8 ">
                <ul className="grid lg:grid-cols-2 w-full gap-4">
                  <AnimatePresence>
                    {/* {displayedCourses &&
                      displayedCourses.map((singleCourse, index) => {
                        return (
                          <motion.li
                            key={index}
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            whileInView="animate"
                            exit="exit"
                            viewport={{
                              once: true,
                            }}
                            custom={index}
                            className="flex w-full h-full"
                          >
                            <CourseCard key={singleCourse.id} {...singleCourse} />
                          </motion.li>
                        );
                      })} */}
{/*                     && displayedCourses.filter(item => item.IsUserEnrolled).length */}

                      
                  {displayedCourses ? (
                    displayedCourses
                      .filter(item => item.IsUserEnrolled)
                      .map((singleCourse, index) => (
                        <motion.li
                          key={index}
                          variants={fadeInAnimationVariants}
                          initial="initial"
                          whileInView="animate"
                          exit="exit"
                          viewport={{
                            once: true,
                          }}
                          custom={index}
                          className="flex w-full h-full"
                        >
                          <CourseCard key={singleCourse.id} {...singleCourse} />
                        </motion.li>
                      ))
                  ) : (
                    <p>No courses yet.</p>
                  )}
                  </AnimatePresence>
                  
                </ul>
              </TabsContent>
               {/*{userCourses &&
                      userCourses.map((singleCourse, index) => {*/}
               <TabsContent value={"mine"} className="py-8 ">
                <ul className="grid lg:grid-cols-2 w-full gap-4">
               <AnimatePresence>
                  {/* {displayedCourses && displayedCourses.filter(item => item.IsUserEnrolled).length ? (
                    displayedCourses
                      .filter(item => item.IsUserEnrolled)
                      .map((singleCourse, index) => (
                        <motion.li
                          key={index}
                          variants={fadeInAnimationVariants}
                          initial="initial"
                          whileInView="animate"
                          exit="exit"
                          viewport={{
                            once: true,
                          }}
                          custom={index}
                          className="flex w-full h-full"
                        >
                          <CourseCard key={singleCourse.id} {...singleCourse} />
                        </motion.li>
                      )) */}
                      {userCourses  ? (
                        userCourses
                      // .filter(item => item.IsUserEnrolled)
                      // .filter(item => item.isEnrolled)
                      .map((singleCourse, index) => (
                        <motion.li
                          key={index}
                          variants={fadeInAnimationVariants}
                          initial="initial"
                          whileInView="animate"
                          exit="exit"
                          viewport={{
                            once: true,
                          }}
                          custom={index}
                          className="flex w-full h-full"
                        >
                          <CourseCard key={singleCourse.id} {...singleCourse} />
                        </motion.li>
                      ))
                  ) : (
                    <p>You are not enrolled for any course yet.</p>
                  )}
                </AnimatePresence>
                </ul>
              </TabsContent>
            </>
            )}
          </Tabs>
        </section>
      </main>
    </section>
  );
};

export const CourseLoading = () => {
  return (
    <section className="flex flex-wrap w-full gap-4 items-center">
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 w-full lg:max-w-[45%]"></div>
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 w-full lg:max-w-[45%]"></div>
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 w-full lg:max-w-[45%]"></div>
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 w-full lg:max-w-[45%]"></div>
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 w-full lg:max-w-[45%]"></div>
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 w-full lg:max-w-[45%]"></div>
    </section>
  );
};

export default Page;
