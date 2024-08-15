

import React, { useEffect, useState } from "react";
import { menu } from "./menu";
import SideMenu from "@/components/SideMenu";
import withAdmin from "../../../components/hocs/withAdmin";
import { usePathname } from "next/navigation";
import AdminCard, { AdminCardProps } from "./utils/AdminCards";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CalendarComponent from "./utils/CalenderComponent";
import AnnouncementModal from "./Modal/AnnouncementModal";
import { getAdminDashboard } from "@/store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AdminDashboard } from "@/shared/types/admin";
import axiosInstance from "@/shared/utils/axios.instance";
import { useTheme } from "@/context/ThemeContext";
import Spinner from "../../../../utilComponents/Spinner";
import Image from "next/image";
import DashboardService from "@/services/api/dashboard";
import { Announcement } from "@/shared/types/announcement";
import { selectUser } from "@/store/slices/authSlice";
import { IoIosNotifications } from "react-icons/io";



ChartJS.register(ArcElement, Tooltip, Legend);

// Icons
const completeIcon = <img src="/icons/adminCard1.svg" alt="check-icon" />;
const highScore = <img src="/icons/adminCard2.svg" alt="trophy-icon" />;
const lowScore = <img src="/icons/adminCard3.svg" alt="thumbs-down icon" />;

const AdminLayout = withAdmin(({ children }: any) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to manage small screen detection

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Function to check screen size and update isSmallScreen state
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1023); // Change the width as needed for small screens
    };

    // Call the function on initial render
    checkScreenSize();

    // Add event listener to update isSmallScreen state when screen size changes
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const adminDashboardData: AdminDashboard | null = useSelector(
    (state: RootState) => state.dashboard.adminDashboard
  );

  console.log(adminDashboardData, "data");

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const [announcementsData, setAnnouncementsData] = useState<Announcement[]>(
    []
  );

  const userDetails = useSelector((state: RootState) => selectUser(state));

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        await dispatch(getAdminDashboard() as any);
        // console log here to check the data by Shakirat
        console.log("Admin Dashboard Data after fetch:", adminDashboardData);
      } catch (error) {
        console.error("Error fetching admin dashboard:", error);
      }
    };

    fetchAdminDashboard();
  }, [dispatch]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsData = await DashboardService.getAnnouncements();
        setAnnouncementsData(announcementsData as any);
        console.log(announcementsData, "announcementsData");
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  // const progressCardProps: AdminCardProps[] = [
  //   { icon: completeIcon, url: "admin/student", text: "Total Enrolments", text2: `${adminDashboardData?.courseEnrollments || 0} Enrolments` },
  //   { icon: highScore, url: "admin/instructor", text: "Total Instructor", text2: `${adminDashboardData?.instructors || 0} Instructors` },
  //   { icon: lowScore, url: "admin/course", text: "Total Course", text2: `${adminDashboardData?.courses || 0} Courses` },
  // ];

  //Shakirat
  const progressCardProps: AdminCardProps[] = [
    {
      icon: completeIcon,
      url: "admin/student",
      text: "Total Enrolments",
      text2: `0 Enrolments`,
    },
    {
      icon: highScore,
      url: "admin/instructor",
      text: "Total Instructor",
      text2: `0 Instructors`,
    },
    {
      icon: lowScore,
      url: "admin/course",
      text: "Total Course",
      text2: `0 Courses`,
    },
  ];

  const generateColors = (numColors: any) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  };

  const chartData = {
    // labels: adminDashboardData?.chart.map((entry) => entry.course_name) || [],
    datasets: [
      {
        data:
          adminDashboardData?.chart.map((entry) => entry.unique_enrollments) ||
          [],
        backgroundColor: generateColors(adminDashboardData?.chart.length || 0),
      },
    ],
  };

  const chartOptions = {
    cutoutPercentage: 0,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.formattedValue || "";
            const courseName =
              adminDashboardData?.chart[context.dataIndex]?.course_name || "";
            return `${courseName}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen ">
      <div className="overflow-hidden flex flex-col lg:flex-row bg-white py-5 px-5 ">
        {/* Hamburger icon for small and medium screens */}
        {(isSmallScreen || window.innerWidth <= 1024) && (
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Side menu */}
        <div
          className={`lg:w-[350px]  flex-shrink-0  ${
            isSmallScreen ? (isMenuOpen ? "block" : "hidden") : "block"
          }`}
        >
          <SideMenu
            logoUrl={logoUrl}
            secondaryColor={secondaryColor}
            menu={menu}
            isOpen={false}
          />
        </div>

        <div className="overflow-hidden w-full ">
          <div className="relative">{children}</div>
          {pathname === "/admin" && (
            <div className="w-full ">
                <div className="">
                <div className="flex justify-between px-4">
                  <p
                    style={{ color: secondaryColor }}
                    className="font-bold text-2xl text-center lg:text-left lg:px-8"
                  >
                    Welcome,{" "}
                    {userDetails?.profile?.firstName
                      ? userDetails.profile.firstName
                      : "Admin"}
                  </p>
                  <p className="text-3xl lg:pr-8">
                    <IoIosNotifications/>
                  </p>
                </div>
                <div className=" py-12 grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white drop-shadow-lg  border-2 border-gray-200 border-opacity-25 rounded-lg">
                    <div className="p-2 flex flex-col gap-3">
                      <div className="flex items-center p-4 justify-between">
                        <p
                          style={{ color: secondaryColor }}
                          className="font-bold text-lg"
                        >
                          Announcements
                        </p>
                        <div className="space-x-4">
                          <button
                            style={{ borderColor: secondaryColor }}
                            onClick={openModal}
                            className="p-1.5 rounded border border-opacity-25"
                          >
                            <span
                              style={{ color: secondaryColor }}
                              className="font-medium text-[12px]"
                            >
                              View Announcements
                            </span>
                          </button>
                          <button
                            style={{
                              borderColor: secondaryColor,
                              backgroundColor: "#1A183E",
                            }}
                            onClick={openModal}
                            className="p-1.5 rounded border border-opacity-25"
                          >
                            <span
                              style={{ color: "#fff" }}
                              className="font-medium text-sm"
                            >
                              Add Announcements
                            </span>
                          </button>
                        </div>
                      </div>
                      {announcementsData ? (announcementsData.map((announcement: any) => (
                        <div
                          key={announcement.id}
                          className="bg-[#F6F6F6] rounded-lg w-full"
                        >
                          <div className="flex py-2 items-start justify-between px-4 pb-8">
                            <div className="flex items-center justify-start gap-2">
                              <Image
                                src={logoUrl}
                                width={30}
                                height={30}
                                alt="Logo"
                              />
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

                        <div className="p-10 flex flex-col items-center justify-center text-center">
                          <h3
                            style={{ color: secondaryColor }}
                            className="font-semibold text-lg"
                          >
                            There is no  <br />announcement yet
                          </h3>
                          <p>
                            Click on the “add announcement” button to  <br />create your
                            first announcement
                          </p>
                        </div>

                      )}
                   
                    </div>
                  </div>

                  <div className="row-span-2 bg-white p-4 custom-scrollbar drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg grid">
                    <div>
                      <h3
                        style={{ color: secondaryColor }}
                        className="font-semibold text-lg text-center lg:text-left"
                      >
                        Recent Learner Activity
                      </h3>
                    </div>
                    <div className="flex flex-col text-center">
                      <h3
                        style={{ color: secondaryColor }}
                        className="font-semibold text-[16px] text-center"
                      >
                        There are no recent activities yet.
                      </h3>
                      <p>
                        Once students start enrolling and completing
                        assessments, the activities will appear here.
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex  col-span-2 gap-4 "> */}
                  <div className="flex flex-col gap-4">
                    {progressCardProps.map((props, index) => (
                      <AdminCard key={index} {...props} />
                    ))}
                  </div>

                  <div className="grid bg-white drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg">
                    <p
                      style={{ color: secondaryColor }}
                      className="px-4 font-semibold text-lg"
                    >
                      Enrollment Distribution
                    </p>
                    {/* <div className="w-[150px] h-[150px] py-4 mx-auto flex items-center justify-center">
                          <Pie data={chartData} options={chartOptions as any} />
                        </div> */}
                    <div className="">
                      <h3
                        style={{ color: secondaryColor }}
                        className="px-4 font-semibold text-lg text-center"
                      >
                        There is no enrollment <br /> data yet.
                      </h3>
                      <p className="text-sm text-center">
                        Once you’re assigned a course it will <br /> appear here.
                      </p>
                    </div>
                    {/* <div className="flex px-4 flex-col gap-3">
                          {adminDashboardData?.chart.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div style={{ width: "10px", height: "10px", backgroundColor: chartData.datasets[0].backgroundColor[index] }}></div>
                              <p style={{ color: secondaryColor }} className="font-semibold text-[12px]">
                                {entry.course_name}: {entry.unique_enrollments} Students
                              </p>
                            </div>
                          ))}
                        </div> */}
                  </div>

                  {/* </div> */}
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              borderColor: secondaryColor,
              backgroundColor: "#1A183E",
              borderRadius: '8px',
              // width: '1350px',
              // marginLeft: '38px',
              // marginTop: '0.5px',
              // height: '180px',
              // padding:'4px'
              
              
            }}
            className="flex justify-between"
          >
            <div className="px-10 py-6">
              <h3 style={{ color: "#fff" }} className=" font-semibold text-lg">
                Empower Your Students With New Skills
              </h3>
              <p className="py-4 text-lg" style={{ color: "#fff" }}>
                Share Your Knowledge and Expertise with Students.
              </p>
              <button
                onClick={openModal}
                className="p-2 rounded border-2 border-white border-opacity-25 "
              >
                <span style={{ color: "#fff" }} className="font-medium text-sm">
                  + Add new Courses
                </span>
              </button>
            </div>
            <div className="pr-32 py-0">
              <img
                src="https://s3-alpha-sig.figma.com/img/edc7/3002/4144f69c7f89706e74931e94cf472c20?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fux-8S6X8LtMgkVTKC5X55X-0RSrU6ZQ8FCnsHfwNSijiU0CJE4FDk39SSmZoGs~YQcAKX1xjJnjwFsRgVLR4sr0zYZMJc-H~ZdbiqZiVxsedu2B-RC2ERC0OJ8EqJoplERURf9nAU7yO1HtLJw12tuXYx-70c5~kJ2UyeXWa6PUhOr4yPuEhGMIreLoYjFFWMLl2jC3Yi7W08kh66fIPSCJBG1tbIADRPRtQrh6HYeK6VKWlzAVJu~Ww7vKfNYiejhMwBJbfGlUMAu3flFXDBb6vRcovOMfIFrsgsJ8cmF-Em1WunIviSKnOtzyzC6g9inO3g0iQzy8cy~UP3jjSw__"
                alt="Description of image"
                className="w-full h-auto"
                style={{
                  width: "200px",
                  height: "200px",
                  // position: "absolute",
                  // top: "-73px",
                  // left: "844.42px",
                  transform: "rotate(360deg) scaleX(-1)",
                }}
              />
            </div>
          </div>
        </div>
        <AnnouncementModal
          isOpen={isModalOpen}
          onClose={closeModal}
          secondaryColor={secondaryColor}
        />
      </div>
    </div>
  );
});

export default AdminLayout;
// import React, { useEffect, useState } from "react";
// import { menu } from "./menu";
// import SideMenu from "@/components/SideMenu";
// import withAdmin from "../../../components/hocs/withAdmin";
// import { usePathname } from "next/navigation";
// import AdminCard, { AdminCardProps } from "./utils/AdminCards";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import CalendarComponent from "./utils/CalenderComponent";
// import AnnouncementModal from "./Modal/AnnouncementModal";
// import { getAdminDashboard } from "@/store/slices/dashboardSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { AdminDashboard } from "@/shared/types/admin";
// import axiosInstance from "@/shared/utils/axios.instance";
// import { useTheme } from "@/context/ThemeContext";
// import Spinner from "../../../../utilComponents/Spinner";
// import Image from "next/image";
// import DashboardService from "@/services/api/dashboard";
// import { Announcement } from "@/shared/types/announcement";
// import { selectUser} from "@/store/slices/authSlice";

// ChartJS.register(ArcElement, Tooltip, Legend);

// // Icons
// const completeIcon = <img src="/icons/adminCard1.svg" alt="check-icon" />;
// const highScore = <img src="/icons/adminCard2.svg" alt="trophy-icon" />;
// const lowScore = <img src="/icons/adminCard3.svg" alt="thumbs-down icon" />;

// const AdminLayout = withAdmin(({ children }: any)=> {


//   const pathname = usePathname();
//   const dispatch = useDispatch();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isMenuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
//   const [isSmallScreen, setIsSmallScreen] = useState(false); // State to manage small screen detection

//  const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   useEffect(() => {
//     // Function to check screen size and update isSmallScreen state
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth <= 1023); // Change the width as needed for small screens
//     };

//     // Call the function on initial render
//     checkScreenSize();

//     // Add event listener to update isSmallScreen state when screen size changes
//     window.addEventListener("resize", checkScreenSize);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   const adminDashboardData: AdminDashboard | null = useSelector((state: RootState) => state.dashboard.adminDashboard);

//   console.log(adminDashboardData, "data");

//   const logoUrl = sessionStorage.getItem("logoUrl") || "";
//   const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

//   const [announcementsData, setAnnouncementsData] = useState<Announcement[]>([]);

//   const userDetails = useSelector((state: RootState) => selectUser(state));

//   useEffect(() => {
//     const fetchAdminDashboard = async () => {
//       try {
//         await dispatch(getAdminDashboard() as any);
//       } catch (error) {
//         console.error("Error fetching admin dashboard:", error);
//       }
//     };

//     fetchAdminDashboard();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const announcementsData = await DashboardService.getAnnouncements();
//         setAnnouncementsData(announcementsData as any);
//         console.log(announcementsData, "announcementsData");
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   const formatTime = (createdAt: string) => {
//     const date = new Date(createdAt);
//     const hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const ampm = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
//     return `${formattedHours}:${minutes} ${ampm}`;
//   };

//   const progressCardProps: AdminCardProps[] = [
//     { icon: completeIcon, url: "admin/student", text: "Total Enrolments", text2: `${adminDashboardData?.courseEnrollments || 0} Enrolments` },
//     { icon: highScore, url: "admin/instructor", text: "Total Instructor", text2: `${adminDashboardData?.instructors || 0} Instructors` },
//     { icon: lowScore, url: "admin/course", text: "Total Course", text2: `${adminDashboardData?.courses || 0} Courses` },
//   ];

//   const generateColors = (numColors: any) => {
//     const colors = [];
//     for (let i = 0; i < numColors; i++) {
//       const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//       colors.push(color);
//     }
//     return colors;
//   };

//   const chartData = {
//     // labels: adminDashboardData?.chart.map((entry) => entry.course_name) || [],
//     datasets: [
//       {
//         data: adminDashboardData?.chart.map((entry) => entry.unique_enrollments) || [],
//         backgroundColor: generateColors(adminDashboardData?.chart.length || 0),
//       },
//     ],
//   };

//   const chartOptions = {
//     cutoutPercentage: 0,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context: any) => {
//             const value = context.formattedValue || "";
//             const courseName = adminDashboardData?.chart[context.dataIndex]?.course_name || "";
//             return `${courseName}: ${value}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="h-screen">
//       <div className="overflow-hidden flex flex-col lg:flex-row bg-white py-5 px-5 gap-10">
//         {/* Hamburger icon for small and medium screens */}
//         {(isSmallScreen || window.innerWidth <= 1024) && (
//           <div className="lg:hidden">
//             <button onClick={toggleMenu}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         )}

//         {/* Side menu */}
//         <div className={`lg:w-[350px] h-screen flex-shrink-0  ${isSmallScreen ? (isMenuOpen ? "block" : "hidden") : "block"}`}>
//           <SideMenu logoUrl={logoUrl} secondaryColor={secondaryColor} menu={menu} isOpen={false} />
//         </div>

//         <div className="overflow-auto w-full ">
//           <div className="relative">{children}</div>
//           {pathname === "/admin" && (
//             <div className="w-full pr-10">
//               <div className="space-y-4 p-8">
//                 <p style={{ color: secondaryColor }} className="font-semibold text-[25px] text-center lg:text-left">
//                   Welcome, {userDetails?.profile?.firstName? userDetails.profile.firstName :"Admin"}
//                 </p>
//                 <div className="grid grid-cols-3 grid-rows-3 gap-4 ">
                    
//                   <div className="col-span-2  bg-white  custom-scrollbar drop-shadow-lg  border-2 border-gray-200 border-opacity-25 rounded-lg">
//                     <div className="p-2 flex flex-col gap-3">
//                       <div className="flex items-center justify-between">
//                         <p style={{ color: secondaryColor }} className="font-semibold text-lg">
//                           Announcements
//                         </p>
//                         <button style={{ borderColor: secondaryColor }} onClick={openModal} className="p-2 rounded border border-opacity-25">
//                           <span style={{ color: secondaryColor }} className="font-medium text-sm">
//                             Add Announcement
//                           </span>
//                         </button>
//                       </div>
//                       {announcementsData.map((announcement: any) => (
//                         <div key={announcement.id} className="bg-[#F6F6F6] rounded-lg w-full">
//                           <div className="flex py-2 items-start justify-between px-4 pb-8">
//                             <div className="flex items-center justify-start gap-2">
//                               <Image src={logoUrl} width={30} height={30} alt="Logo" />
//                               <div className="flex flex-col">
//                                 <span style={{ color: secondaryColor }} className="font-semibold text-[15px]">
//                                   {announcement.title}
//                                 </span>
//                                 <span className="text-[#808080] text-[12px] font-medium">{announcement.announcement}</span>
//                               </div>
//                             </div>
//                             <span className="text-[#808080] text-[12px] font-medium">{formatTime(announcement.createdAt)}</span>
//                           </div>
//                         </div>
//                       ))}
//                       <p>Announcement is not available</p>
//                     </div>
//                   </div>

//                   <div className="row-span-2 bg-white p-2 custom-scrollbar drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg">
//                     <p style={{ color: secondaryColor }} className="font-semibold text-lg text-center lg:text-left">
//                       Recent Activity
//                     </p>
//                   </div>
                  
//                   {/* <div className="flex  col-span-2 gap-4 "> */}
//                     <div className="flex flex-col gap-4">
//                       {progressCardProps.map((props, index) => (
//                         <AdminCard key={index} {...props} />
//                       ))}
//                     </div>

//                     <div className="bg-white drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg">
//                         <p style={{ color: secondaryColor }} className="px-4 font-semibold text-lg">
//                           Enrollment Distribution
//                         </p>
//                         <div className="w-[150px] h-[150px] py-4 mx-auto flex items-center justify-center">
//                           <Pie data={chartData} options={chartOptions as any} />
//                         </div>
//                         <div className="flex px-4 flex-col gap-3">
//                           {adminDashboardData?.chart.map((entry, index) => (
//                             <div key={index} className="flex items-center gap-2">
//                               <div style={{ width: "10px", height: "10px", backgroundColor: chartData.datasets[0].backgroundColor[index] }}></div>
//                               <p style={{ color: secondaryColor }} className="font-semibold text-[12px]">
//                                 {entry.course_name}: {entry.unique_enrollments} Students
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                     </div>
              
              
//                   {/* </div> */}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <AnnouncementModal isOpen={isModalOpen} onClose={closeModal} secondaryColor={secondaryColor} />
//       </div>
//     </div>
//   );
// });

// export default AdminLayout;
