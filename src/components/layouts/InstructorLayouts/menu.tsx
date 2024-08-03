import Dashboard from "./icons/dashboard.png";
import Course from "./icons/course.png";
import Assessment from "./icons/assessment.png";
import Student from "./icons/student.png";
import Logout from "./icons/logout.png";
import { MenuItem } from "@/components/SideMenu";

export const menu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/instructor",
    exact: true,
    icon: Dashboard,
    iconStyle: "fill",
  },
  {
    label: "Course",
    href: "/instructor/course",
    icon: Course,
    iconStyle: "fill",
  },
  {
    label: "Assessment",
    href: "/instructor/assessment",
    icon: Assessment,
    iconStyle: "fill",
  },
  {
    label: "Student",
    href: "/instructor/student",
    icon: Student,
    iconStyle: "fill",
  },
  {
    label: "Logout",
    icon: Logout,
    iconStyle: "fill",
  },
];
