import React from "react";
import { formatDate, getCourseImage } from "@/shared/utils/dateUtils";
import Image from "next/image";
import InstructorCourseEmpty from "@/components/AdminSections/InstructorSection/InstructorCourseEmpty";
import { useRouter } from "next/navigation";

interface InstructorCoursesProps {
  data: any;
  awaitSubmit: (courseId: number, action?: string) => void;
  instructor: any;
  secondaryColor: any;
}

const Courses: React.FC<InstructorCoursesProps> = ({ data, awaitSubmit, instructor, secondaryColor }) => {
  // console.log(data)
 const router = useRouter();  
  return (
    <div>
      {data?.length > 0 ? (
        <section className="grid grid-cols-2 gap-4">
          {data?.map((course: any) => (
            <div
              key={course.id}
              className="flex w-full font-montserrat h-full shadow-lg gap-4 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="w-[30%] shrink-0 bg-gray-100 h-full rounded-md overflow-hidden relative">
                {/* <img
                  src={course?.image || "/images/course1.png"}
                  alt="course image"
                  className="object-cover"
                /> */}
                <Image src={course.courseImage || getCourseImage(course.courseTitle)} alt="course image" className="object-cover" fill />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-start gap-2">
                  <div className="flex items-center justify-start gap-1">
                    <img src="/icons/globe.svg" alt="globe-icon" />
                    <span className="bg-[#388e3c] rounded bg-opacity-[0.3] text-center text-[8px] text-[#388E3C] font-medium px-1">
                      {course.isOpenForEnrollment ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <img src="/icons/date.svg" alt="date-icon" className="w-[8px]" />
                    <h2 className="text-[#7A7A7A] font-medium text-[8px]">Created: {formatDate(course.createdAt)}</h2>
                  </div>
                </div>

                <h2
                  style={{ color: secondaryColor }}
                  className="inline-block py-2 w-[140%] border-b border-[#D9D9D9] font-semibold text-[13px] tracking-[0.65px]"
                >
                  {course.courseTitle}
                </h2>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/grad-icon.svg" alt="graduation icon" />
                  <span style={{ color: secondaryColor }} className="font-normal text-[10px]">
                    {course.cohortName}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/modules.svg" alt="modules icon" />
                  <span style={{ color: secondaryColor }} className="font-normal text-[10px]">
                    {course.modules} Modules
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/student.svg" alt="student icon" />
                  <span style={{ color: secondaryColor }} className="font-normal text-[10px]">
                    {course.students} Students
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/clock.svg" alt="clock icon" />
                  <span style={{ color: secondaryColor }} className="font-normal text-[10px]">
                    {course.hours} hours
                  </span>
                </div>

                <div className="flex justify-start items-center gap-4">
                  <button 
                  onClick={() => router.push(`/admin/course/${course.id}/?courseName=${course.courseTitle}`)} 
                  style={{ backgroundColor: secondaryColor }} className="rounded-md px-1 py-1 text-white font-medium text-[10px]">
                    View Details
                  </button>
                  <button
                    className="bg-white border-2 border-[#F00] rounded-lg px-1 py-1 text-[#F00] font-medium text-[10px]"
                    onClick={() => awaitSubmit(course.id, "removing")}
                  >
                    Remove course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <InstructorCourseEmpty data={instructor} />
      )}
    </div>
  );
};

export default Courses;
