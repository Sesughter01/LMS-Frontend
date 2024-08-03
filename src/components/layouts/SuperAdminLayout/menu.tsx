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

export const menu: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/super-admin",
    exact: true,
    icon: Dashboard,
    iconStyle: "fill",
  },
  {
    label: "Organization",
    href: "/super-admin/organization",
    icon: Payment,
    iconStyle: "fill",
  },
  {
    label: "Programme",
    href: "/super-admin/programme",
    icon: Payment,
    iconStyle: "fill",
  },
  {
    label: "Admin",
    href: "/super-admin/sub-admin",
    icon: Subadmin,
    iconStyle: "fill",
  },
  {
    label: "Logout",
    // href: "/login",
    icon: Logout,
    iconStyle: "fill",
  },
];
