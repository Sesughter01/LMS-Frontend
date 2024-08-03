import Dashboard from "./icons/dashboard.png";
import Cohort from "./icons/cohort.png";
import Course from "./icons/course.png";
import Assessment from "./icons/assessment.png";
import Student from "./icons/student.png";
import Instructor from "./icons/instructor.png";
import Subadmin from "./icons/sub-admin.png";
import Payment from "./icons/payment.png";
import Logout from "./icons/logout.png";
import { MenuItem } from "@/components/SideMenu";
import { useRouter } from "next/navigation";

console.log("Rendering menu component");

export const menu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    exact: true,
    icon: Dashboard,
    iconStyle: "fill",
  },
  {
    label: "Cohort",
    href: "/admin/cohort",
    icon: Cohort,
    iconStyle: "fill",
  },
  {
    label: "Course",
    href: "/admin/course",
    icon: Course,
    iconStyle: "fill",
  },
  {
    label: "Assessment",
    href: "/admin/assessment",
    icon: Assessment,
    iconStyle: "fill",
  },
  {
    label: "Student",
    href: "/admin/student",
    icon: Student,
    iconStyle: "fill",
  },
  {
    label: "Instructor",
    href: "/admin/instructor",
    icon: Instructor,
    iconStyle: "fill",
  },
  {
    label: "Admin",
    href: "/admin/sub-admin",
    icon: Subadmin,
    iconStyle: "fill",
  },
  {
    label: "Payment",
    href: "/admin/payment",
    icon: Payment,
    iconStyle: "fill",
  },
  {
    label: "Logout",
    icon: Logout,
    iconStyle: "fill",
    // onClick: handleLogout,
  },
];

console.log("Menu component rendered");
