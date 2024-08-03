import javaCourseImage from "@/assets/courses/cybersecurity.png";
import linuxCourseImage from "@/assets/courses/linux.png";
import pythonCourseImage from "@/assets/courses/python.png";
import cyberSecurityImage from "@/assets/courses/cybersecurity.png";

const coursesImagesDict = {
  java: javaCourseImage,
  linux: linuxCourseImage,
  python: pythonCourseImage,
  cyberSecurity: cyberSecurityImage,
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString("en-US", options);
};

export const dateOfBirthformat = (dateString: string): string => {
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export const extractMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export const extractMonthYearDay = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatDateForInput = (apiDate: string): string => {
  // Check if the input date is in the correct format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(apiDate)) {
    // throw new Error(
    //   "Invalid date format. Please provide a date in the format 'YYYY-MM-DD'."
    // );
    return ""
  }

  // Convert the API date to the "YYYY-MM-DD" format
  const formattedDate = new Date(apiDate).toISOString().split("T")[0];

  return formattedDate;
};

export const getCourseImage = (course: any) => {
  // Set a default image
  let courseImageSelection: any = coursesImagesDict.java;

  if (course) {
    const courseLower = course.toLowerCase();

    if (courseLower.includes("java")) {
      courseImageSelection = javaCourseImage;
    } else if (courseLower.includes("linux")) {
      courseImageSelection = coursesImagesDict.linux;
    } else if (courseLower.includes("python") || courseLower.includes("data")) {
      courseImageSelection = coursesImagesDict.python;
    } else if (courseLower.includes("cyber")) {
      courseImageSelection = coursesImagesDict.cyberSecurity;
    }
  }

  // console.log("courseImageSelection", courseImageSelection.src)

  return courseImageSelection;
};
