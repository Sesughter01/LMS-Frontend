"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";

import javaIcon from "@/assets/material-symbols_model-training.svg";
import appIcon from "@/assets/material-symbols_app-registration.svg";
import sampImg1 from "@/assets/sample_img1.jpg";
import sampImg2 from "@/assets/Rectangle 151.png";

import { Check, ChevronsUpDown,ChevronDown } from "lucide-react";

import {
  cn,
  formatWrittenDate,
  generateUserApplicationNumber,
} from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Terminal, Waves } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import {
  setDefaultProgramme,
  setUserProgrammes,
} from "@/store/slices/programmeSlice";
import {
  GetMyApplications,
  updateMyAppliedCourse,
} from "@/services/api/applications";
import { useRouter } from "next/navigation";
import { Application, ApplicationStatuses } from "@/shared/types/application";
import { toast } from "react-toastify";
import {
  GetPreAssessmentForACohort,
  GetPreAssessmentForACourse,
} from "@/services/api/assessments";
import { Assessment } from "@/shared/types/assessment";
import { Course } from "@/shared/types/course";
import courseService from "@/services/api/courses";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { motion, AnimatePresence } from "framer-motion";
// import CourseCard from "@/components/CourseCard";
import UserCourseCard from "@/components/UserCourseCard";
import LeaderBoardCard from "@/components/LeaderBoardCard";
import { Announcement } from "@/shared/types/announcement";
import { FetchStudentAssessmentProgress } from '@/store/slices/studentSlice';
import DashboardService from "@/services/api/dashboard";


type size = number;
// 
export const CircularProgress = ({size ,progress,strokeWidth } : {
    size: number;
    progress: number;
    strokeWidth: number;
  }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="mx-auto"
      width={size}
      height={size}
    >
      <circle
        className="text-gray-300"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="text-blue-500"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="#1A183E"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="40%"
        dy=".3em"
        textAnchor="middle"
        className="text-lg font-semibold"
      >
        {`${progress}%`}
        
      </text>
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        className="text-[10px] font-normal"
      >
        Total Progress
      </text>
    </svg>
  );
};

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
  const [progress, setProgress] = useState(0); // Example progress value
  const authUser = useSelector((state: RootState) => state.auth.user); const dispatch = useDispatch();
  const { studentAssessmentProgress, status, error } = useSelector((state: RootState) => state.student);
  

  // console.log("Authsuser********", authUser)
  console.log("STUDENT: ",  studentAssessmentProgress)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Access values directly from sessionStorage
  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const organizationId = sessionStorage.getItem("orgId") || "";

  console.log("Logo URL:", logoUrl);
  console.log("Secondary Color:", secondaryColor);

  const defaultProgramme = useSelector(
    (state: RootState) => state.programme.defaultProgramme
  );

  const [mostRecentApplication, setMostRecentApplication] =
    useState<Application>();
  const [cohortPreAssessment, setCohortPreAssessment] = useState<Assessment>();
  const [coursePreAssessment, setCoursePreAssessment] = useState<Assessment>();

  const [courseIdSelection, setCourseIdSelection] = useState<number>();
  const [availableCourses, setAvailableCourses] = useState<Course[]>();
  const [fullCourseSelection, setFullCourseSelection] = useState<any>();

  const [changeCourseState, setChangeCourseState] = useState(false);
    const [cohortStartDate, setCohortStartDate] = useState<null | string>(null);
    const [modalOpen, setModalOpen] = useState(false)
  const [userCourses, setUserCourses] = useState<Course[]>();
  const [totalCourseModules, setTotalCourseModules] = useState<number>(0);
  const [totalCourseAssessments, setTotalCourseAssessments] = useState<number>(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(
    null
  );

  console.log("recentApplication:", mostRecentApplication);
  console.log("id:", cohortPreAssessment);
  const [announcementsData, setAnnouncementsData] = useState<Announcement[]>([]);

  const enrolledCourseIds = userCourses?.map(course => course.id);

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const router = useRouter();

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
    // console.log("applications&&&&&&&&&&&", applications)
    // sessionStorage.setItem("userCohortId", sortedApplications[0].cohortId)
    // sessionStorage.setItem("userCourseId", sortedApplications[0].courseId)
    sessionStorage.setItem("userCohortId", sortedApplications[0].cohortId.toString());
    sessionStorage.setItem("userCourseId", sortedApplications[0].courseId.toString());

  }

  const fetchPreAssessmentForUserCohortAndCourse = async () => {
    if (
      mostRecentApplication &&
      !mostRecentApplication.hasTakenCohortPreAssessment
    ) {
      let cohortPreAssessmentResponse = await GetPreAssessmentForACohort(
        mostRecentApplication?.cohortId,
        organizationId
      );
      setCohortPreAssessment(cohortPreAssessmentResponse);
    }

    if (
      mostRecentApplication &&
      !mostRecentApplication.hasTakenCoursePreAssessment
    ) {
      let coursePreAssessmentResponse = await GetPreAssessmentForACourse(
        mostRecentApplication.courseId,
        organizationId
      );
      setCoursePreAssessment(coursePreAssessmentResponse);
    }

    if (mostRecentApplication) {
      setCourseIdSelection(mostRecentApplication.courseId);
    }
  };

  const fetchAllAvailableCourses = async () => {
    if (defaultProgramme) {
      let courses = await courseService.GetAllAvailableCoursesInProgramme(
        defaultProgramme?.id,
        mostRecentApplication?.cohortId
      );

      console.log("coursesssssssssssssssss", courses);
      setAvailableCourses(courses.results );
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
          let courses2 = await courseService.GetIndividualCourseDetails(Number(userCourseId));
          let courses = await courseService.GetIndividualUserCourseDetails();

          console.log("mineeeeeeeeeeeeee2", courses)
          console.log("mineeeeeeeeeeeeee3", courses2)

          // setCourses([courses]);
          // setUserCourses([courses]);
          // setTotalCourseModules(courses.modules)
          // setTotalCourseAssessments(courses.assessments)
         setUserCourses(courses);
           if (courses.length > 0) {
            handleCourseSelection(courses[0]);
          }
          setTotalCourseModules(courses2.modules)
          setTotalCourseAssessments(courses2.assessments)
          // setUserCourses([courses]);
        }
        
    }catch(err: any){
      toast.error(err.message)
        console.log('errorr', err)
    }
  };

  const updateAppliedCourseOnApplication = async () => {
    if (authUser && mostRecentApplication && courseIdSelection) {
      let outcome = await updateMyAppliedCourse(
        authUser?.id,
        mostRecentApplication?.id,
        courseIdSelection
      );
      await fetchAndSetMostRecentApplication();

      setChangeCourseState(false);
    }
  };

  const previewBannerMessage = () => {
    //if user is enrolled
    if (mostRecentApplication?.userEnrollmentAssessmentStatus == "passed") {
      //Taken both compulsory course
      if (
        mostRecentApplication?.hasTakenCoursePreAssessment &&
        mostRecentApplication?.hasTakenCohortPreAssessment
      ) {
        //and failed both
        if (mostRecentApplication?.overallApplicationScoreAverage < 65) {
          return (
            <p className="">
              Sadly, you didn&apos;t qualify for the ISP, don&apos;t worry, you
              can still join the course. Explore the course payment options to
              get started{" "}
            </p>
          );
        }
        //and passed
        if (mostRecentApplication?.overallApplicationScoreAverage >= 65) {
          return (
            <p className="">
              Congratulations on passing both asssessments! check your email for
              updates.
            </p>
          );
        }
      }

      //Taken one of the compulsory course
      if (
        mostRecentApplication?.hasTakenCoursePreAssessment ||
        mostRecentApplication?.hasTakenCohortPreAssessment
      ) {
        return (
          <p className="">
            Great Job on completing one of the assessments! Keep up the good
            work{" "}
          </p>
        );
      }

      

      //Taken none but enrolled
      return (
        <p>
          Congratulations on enrolling! Your {fullCourseSelection?.courseTitle}{" "}
          class begins on{" "}
          {fullCourseSelection?.courseStartDate &&
            `${formatWrittenDate(fullCourseSelection?.courseStartDate)}`
            }
          . Stay updated on the portal and your email for important updates
        </p>
      );
    } else {
      //haven't enrolled and passed both asaessment
      if (
        mostRecentApplication &&
        mostRecentApplication?.overallApplicationScoreAverage >= 65
      ) {
        return (
          <p className="">
            Congratulations on passing both asssessments! check your email for a
            coupon code to enroll{" "}
          </p>
        );
      } else {
        return (
          <p className="">
            Sadly, you didn&apos;t qualify for the ISP, don&apos;t worry, you
            can still join the course. Explore the course payment options to get
            started{" "}
          </p>
        );
      }
    }
  };

  {
    /* Applicants that has enrolled message */
  }
  // <p>
  //     Congratulations on enrolling! Your {fullCourseSelection?.courseTitle} class begins on {fullCourseSelection?.courseStartDate && `${formatWrittenDate(fullCourseSelection?.courseStartDate)}`}. Stay updated oon the portal and your email for important updates
  // </p>

  {
    /* <p className="">Congratulations! You’ve been enrolled into the {fullCourseSelection?.courseTitle} program. {fullCourseSelection?.courseStartDate && `Your class starts on ${formatWrittenDate(fullCourseSelection?.courseStartDate)}`}.</p> */
  }

  // <p className="">You are required to complete both assessments below to get the average
  //     score to be eligible for free course enrollment.</p>
  const handleCourseSelection = (course: CourseDetail) => {
    setSelectedCourse(course);
    setProgress(course.progress || 0);
    setTotalCourseModules(course.modules || 0);
    setTotalCourseAssessments(course.assessments || 0);
  };
  useEffect(() => {
    fetchAndSetMostRecentApplication();
    fetchUserCourses();
  }, [authUser]);

  useEffect(() => {
    fetchPreAssessmentForUserCohortAndCourse();
    fetchAllAvailableCourses();
  }, [mostRecentApplication]);

  useEffect(() => {
    if (courseIdSelection && availableCourses) {
      let courseSelected = availableCourses.find(
        (course) => course.id === courseIdSelection
      );
      setFullCourseSelection(courseSelected);
    }
  }, [courseIdSelection, availableCourses]);

  useEffect(() => {
    if (changeCourseState) {
      ///course is being changed
      updateAppliedCourseOnApplication();
    }
  }, [changeCourseState]);

    useEffect(() => {
    if (authUser?.id) {
      dispatch(FetchStudentAssessmentProgress(authUser.id));
    }
  }, [dispatch, authUser?.id]);

  useEffect(() => {
    if (studentAssessmentProgress) {
      setProgress(studentAssessmentProgress?.progress || 0);
    }
  }, [studentAssessmentProgress]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsData = await DashboardService.getAnnouncements();
        setAnnouncementsData(announcementsData as any);
        console.log("STUDENTannouncementsData",announcementsData );
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const [isBannerVisible, setIsBannerVisible] = useState(true);

  console.log(mostRecentApplication);

  const fadeInAnimation = {
    inital: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  
  // function getModulesAndAssessmentsSum(courses: Array<{ modules: number; assessments: number }>) {
  //   let totalModules = 0;
  //   let totalAssessments = 0;
  
  //   for (const course of courses) {
  //     totalModules += course.modules || 0;  // Handle cases where module might be undefined
  //     totalAssessments += course.assessments || 0;  // Handle cases where assessment might be undefined
  //   }
  
  //   return {
  //     totalModules,
  //     totalAssessments,
  //   };
  // }
  
  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] w-full flex flex-col gap-4">
      <DashNav
          secondaryColor={secondaryColor}
          currentPage={`Welcome, ${authUser?.profile.firstName}`}
        />

        {mostRecentApplication?.hasTakenCohortPreAssessment && (
          <div className="px-8">
            <AnimatePresence>
              {isBannerVisible && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    duration: 0.15,
                  }}
                >
                  <Alert className="border-gray-300 bg-primary/50">
                    <Terminal className="h-5 w-5 text-gray-300" />
                    <AlertTitle className="flex justify-between font-semibold items-center">
                      Heads up!
                      <XMarkIcon
                        className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() => setIsBannerVisible(false)}
                      />
                    </AlertTitle>
                    <AlertDescription>
                      {previewBannerMessage()}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
          
          <div className="grid gap-6 px-10  mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Announcements */}
            {/*<div className="col-span-2 bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold">Announcements</h2>
              <div className="flex flex-col justify-center items-center p-2">
                <p className="text-gray-500 text-center">No announcement yet</p>
                <p className="text-gray-500 text-center">Check back later to see the latest announcement from Ingryd</p>
              </div> */}
            <div className="col-span-2 bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold">Announcements</h2>
              {announcementsData ? (announcementsData
                .filter((announcement: Announcement) =>
                      enrolledCourseIds?.includes(announcement.courseId || 0)
                    )
                 .map((announcement: any) => (
                      <div
                        key={announcement.id}
                        className="bg-[#F6F6F6] rounded-lg w-full"
                      >
                        <div className="flex py-2 items-start justify-between px-4 pb-8">
                          <div className="flex items-center justify-start gap-2">
                            {/* <Image
                              src={logoUrl}
                              width={30}
                              height={30}
                              alt="Logo"
                            /> */}
                            <div className="flex flex-col">
                              <span
                                style={{ color: secondaryColor }}
                                className="font-semibold text-[15px]"
                              >
                                {announcement.title}
                              </span>
                              <span className="text-[#808080] text-[12px] font-medium">
                                {announcement.announcement}
                              </span>
                            </div>
                          </div>
                          <span className="text-[#808080] text-[12px] font-medium">
                            {formatTime(announcement.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))):(
                      <div className="flex flex-col justify-center items-center p-2">
                        <p className="text-gray-500 text-center">No announcement yet</p>
                        <p className="text-gray-500 text-center">Check back later to see the latest announcement from Ingryd</p>
                      </div>
                    )}
            </div>

            {/* Leaderboards */}
            <div className=" flex flex-col w-full row-span-3 col-span-1 bg-white p-4 rounded shadow ">
              <h2 className="text-lg font-semibold">Leaderboards</h2>
              <div className="max-h-[310px] h-full overflow-y-auto scrollbar scrollbar-thumb-customDarkBlue scrollbar-w-[4px] scrollbar-track-rounded-full scrollbar-thumb-rounded-full mt-2">
                <LeaderBoardCard/>
                {/* <div className="flex flex-col justify-center items-center p-2">
                  <p className="text-gray-600 text-center">No leaderboards yet</p>
                  <p className="text-gray-400 text-sm text-center">Complete your first assessment and check back later for the rankings</p>
                </div> */}
              </div>
            </div>

            {/* Progress Summary */}

            <div className="flex flex-col  row-span-3 bg-white p-4 rounded w-full shadow-md gap-4">
              <div className="flex gap-4">
                <h2 className="text-lg font-semibold">Progress Summary</h2>
                <div className="relative mt-4">
                <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded="false"
                    aria-label="Select a course"
                    className="w-full flex justify-between items-center"
                  >
                    {selectedCourse?.courseTitle || "Select a course"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <ul className="max-h-56 overflow-y-auto">
                    {userCourses?.map((course) => (
                      <li
                        key={course.id}
                        onClick={() => handleCourseSelection(course)}
                        className="p-2 hover:bg-gray-100 bg-white cursor-pointer"
                      >
                        {course.courseTitle}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
                </div>

              </div>
              <div className="flex items-center mt-4 gap-4">
                <CircularProgress size={100} progress={progress} strokeWidth={10} />
                {/* <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xl font-semibold">0%</span>
                  </div>
                  <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">Total Progress</p>
                </div> */}
                <div className="flex flex-col flex-1 ml-4 gap-2">
                  
                  <div className="w-full bg-gray-200 h-3 rounded mt-1">
                    <div className=" h-3 rounded" style={{ width: '5%',background:"#1A183E" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    {/*<span>0/0 Modules</span>
                    <span>0%</span> */}
                     {studentAssessmentProgress?.completedModules || 0}/
                     {totalCourseModules || 0} Modules
                  </div>
                  
                  <div className="w-full bg-gray-200 h-3 rounded mt-1">
                    <div className="h-3 rounded" style={{ width: '5%',background:"#1A183E" }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{studentAssessmentProgress?.completedModules || 0}/
                    { totalCourseAssessments || 0}  Assessments</span>
                    <span>0%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold">Badges Earned</h3>
                <div className="flex space-x-2 mt-2">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src="/icons/Badges.jpg" alt="Hello!" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Hello!</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src="/icons/Badges.jpg" alt="Launch" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Launch</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src="/icons/Badges.jpg" alt="Fly" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Fly</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src="/icons/Badges.jpg" alt="Rocket" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Rocket</span>
                  </div>
                </div>
              </div>
              <div className="flex mt-4">
                <button className="px-4 py-2 text-white rounded" style={{ background:"#1A183E" }}>View Progress</button>
              </div>
            </div>

            {/* Courses */}
            <div className="row-span-3 p-4  w-full  bg-white rounded-xl shadow-md space-y-4 overflow-hidden ">
              <h2 className="text-xl font-semibold text-gray-900">Courses</h2>
              {/* scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-2   scrollbar-thumb-customDarkBlue scrollbar-track-transparent */}

             
              <div className="max-h-[310px] h-full overflow-y-auto scrollbar scrollbar-thumb-customDarkBlue scrollbar-w-[4px] scrollbar-track-rounded-full scrollbar-thumb-rounded-full " >
                <ul className="w-full  ">
                  <AnimatePresence>
                      {userCourses && userCourses.filter(item => item.IsUserEnrolled).length ? (
                        userCourses
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
                              className="flex w-full h-full flex flex-col gap-3"
                            >
                              <UserCourseCard key={singleCourse.id} {...singleCourse} />
                            </motion.li>
                          ))
                      ) : (
                        <div className="w-full">
                          <div className="flex flex-col justify-center items-center p-2">
                            <p className="text-gray-600 text-center">You are yet to enroll in a course</p>
                            <p className="text-gray-400 text-center">Discover endless learning possibilities. Enroll now, explore courses!</p>
                          </div>
                          <div className="flex justify-center">
                            <button className="mt-4 px-4 py-2 text-white rounded" style={{ background:"#1A183E" }}>See Courses</button>
                          </div>
                        </div>

                        
                      )}
                    </AnimatePresence>
                </ul>
              </div> 
            </div>

            {/* Upcoming Assessment */}
            <div className="col-span-1 bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Upcoming Assessment</h2>
              <p className="text-gray-600 text-center">You have no assessments yet.</p>
              <p className="text-gray-400 text-sm text-center">Enroll in a course and your assessments will appear here</p>
            </div>

            {/* Recommended Courses */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Recommended Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="text-md font-semibold">Linux</h3>
                  <p className="text-sm text-gray-600">Martin Mato</p>
                  <p className="text-sm text-gray-400">12 Modules · 200 hrs</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="text-md font-semibold">Cybersecurity</h3>
                  <p className="text-sm text-gray-600">John Doe</p>
                  <p className="text-sm text-gray-400">12 Modules · 200 hrs</p>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="text-md font-semibold">Java and Spring Boot</h3>
                  <p className="text-sm text-gray-600">Davidson Adepoju</p>
                  <p className="text-sm text-gray-400">12 Modules · 264 hrs</p>
                </div>
              </div>
            </div>
          </div>
      </main>
    </section>
  );
};

export const AssessmentLoader = () => {
  return (
    <div className="gap-4">
      <div className="rounded-sm h-40 animate-pulse bg-gray-200 "></div>
    </div>
  );
};



export default Page;
