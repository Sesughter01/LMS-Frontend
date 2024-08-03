import React from "react";
import { formatDate, getCourseImage } from '@/shared/utils/dateUtils'
import Image from 'next/image'
import javaCourseImage from '@/assets/courses/cybersecurity.png';
import linuxCourseImage from '@/assets/courses/linux.png';
import pythonCourseImage from '@/assets/courses/python.png';
import cyberSecurityImage from '@/assets/courses/cybersecurity.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AboutTab from '../utills/aboutTab'
import WhatLearnTab from "../utills/whatLearnTab"
import InstructorTab from "../utills/instructorTab"
import SyllabusTab from "../utills/syllabusTab"
import FaqTab from "../utills/faqTab"
import ModulesTab from '../utills/modulesTab'

interface InstructorCoursesProps {
  data: any;
  awaitSubmit: (courseId: number, action?: string) => void;
  instructor?: any;
}

const coursesImagesDict = {
  java: javaCourseImage,
  linux: linuxCourseImage,
  python: pythonCourseImage,
  cyberSecurityImage: cyberSecurityImage
}

const courseContentDetails: React.FC<InstructorCoursesProps> = ({data, awaitSubmit, instructor}) => {
  // console.log(data)
  const getCourseImage = (course: any) => {

      let courseImageSelection: any = coursesImagesDict.java;

      if (course.courseTitle) {
          if (course.courseTitle.toLocaleLowerCase().includes('java')) {
              courseImageSelection = coursesImagesDict.java;
          }

          if (course.courseTitle.toLocaleLowerCase().includes('linux')) {
              courseImageSelection = coursesImagesDict.linux;
          }

          if (course.courseTitle.toLocaleLowerCase().includes('python') ||
              course.courseTitle.toLocaleLowerCase().includes('data')) {
              courseImageSelection = coursesImagesDict.python
          }

          if (course.courseTitle.toLocaleLowerCase().includes('cyber')) {
              courseImageSelection = coursesImagesDict.cyberSecurityImage;
          }
      }

      return courseImageSelection;
  }

  return (
    <div>
      {data && (
        <>
        <section key={data.id} className="px-8 flex flex-col gap-8">
          <div className="flex flex-col-reverse lg:flex-row gap-4 p-4 border border-gray-200 rounded-md">
              <div className="grow flex flex-col gap-1 lg:py-16 px-2 lg:px-8">
                  <h1 className="text-2xl font-semibold">
                      {data?.courseTitle}
                  </h1>
                  <small>
                      {data?.courseDescription}
                  </small>

              </div>
              <div className='w-full lg:w-[35%] shrink-0 bg-gray-100 aspect-video lg:h-full relative'>
                  <Image src={getCourseImage(data)} alt="course image" className='object-cover rounded-md' fill />
              </div>
          </div>

          <div className="flex justify-end items-center gap-6 px-6">
            <p className="text-xl font-bold">N{data?.coursePrice}</p>
          </div>
        </section>

        <section className="grow px-4 lg:px-8 flex gap-8">
          <Tabs defaultValue="about" className="w-full">
              <TabsList className="flex justify-start w-full h-auto overflow-x-scroll lg:overflow-x-clip">
                  <TabsTrigger value="about" className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE] text-[18px]">
                      About
                  </TabsTrigger>
                  <TabsTrigger value="learn" className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE] text-[18px]">
                      What you&#39;ll Learn
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE] text-[18px]">
                      Instructor
                  </TabsTrigger>
                  <TabsTrigger value="syllabus" className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE] text-[18px]">
                      Syllabus
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE] text-[18px]">
                      FAQ
                  </TabsTrigger>
                  <TabsTrigger value="modules" className="text-gray-500 px-8 inline-block py-2 border-b-2 border-transparent rounded-none hover:text-gray-600 hover:border-gray-300 data-[state=active]:border-[#1D63FE] text-[18px]">
                      Modules
                  </TabsTrigger>
                  <div className="flex flex-column items-center">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M1.0625 5.69228H2.83584V0.746094H4.60917L7.64158 5.69228H11.7025V0.746094H13.4759V5.69228H15.2492V7.34101H13.4759V8.98974H15.2492V10.6385H13.4759V15.5847H11.7025L8.66124 10.6385H4.60917V15.5847H2.83584V10.6385H1.0625V8.98974H2.83584V7.34101H1.0625V5.69228ZM4.60917 5.69228H5.61111L4.60917 4.06828V5.69228ZM4.60917 7.34101V8.98974H7.64158L6.63077 7.34101H4.60917ZM11.7025 12.2872V10.6385H10.6828L11.7025 12.2872ZM8.65238 7.34101L9.67205 8.98974H11.7025V7.34101H8.65238Z" fill="#1A183E"/>
                      <path d="M2.83594 15.3628H4.60927V16.0367C4.60927 16.5264 4.2123 16.9233 3.72261 16.9233C3.23291 16.9233 2.83594 16.5264 2.83594 16.0367V15.3628Z" fill="#1A183E"/>
                      <path d="M11.7031 14.9375H13.4765V15.6114C13.4765 16.1011 13.0795 16.498 12.5898 16.498C12.1001 16.498 11.7031 16.1011 11.7031 15.6114V14.9375Z" fill="#1A183E"/>
                      <path d="M13.4766 1.56055L11.7033 1.56878L11.7002 0.894898C11.6979 0.405222 12.093 0.00641878 12.5827 0.00414494C13.0724 0.00187111 13.4712 0.396988 13.4734 0.886663L13.4766 1.56055Z" fill="#1A183E"/>
                      <path d="M14.3008 7.3457L14.3029 5.69225L15.173 5.69334C15.6296 5.69392 15.9993 6.06452 15.9987 6.52111C15.9981 6.9777 15.6275 7.34737 15.1709 7.3468L14.3008 7.3457Z" fill="#1A183E"/>
                      <path d="M1.69531 5.69238L1.69531 7.34584H0.82516C0.368571 7.34584 -0.00156643 6.9757 -0.00156643 6.51911C-0.00156643 6.06252 0.368572 5.69238 0.825161 5.69238H1.69531Z" fill="#1A183E"/>
                      <path d="M14.3008 10.6328L14.3029 8.98688L15.1768 8.98798C15.6313 8.98855 15.9993 9.35747 15.9987 9.81198C15.9981 10.2665 15.6292 10.6345 15.1747 10.6339L14.3008 10.6328Z" fill="#1A183E"/>
                      <path d="M1.69531 8.98828L1.69531 10.6342H0.821401C0.366888 10.6342 -0.00156643 10.2658 -0.00156643 9.81125C-0.00156643 9.35674 0.366889 8.98828 0.821402 8.98828H1.69531Z" fill="#1A183E"/>
                      <path d="M4.61719 1.56055L2.84392 1.56878L2.84079 0.894898C2.83851 0.405222 3.23363 0.00641878 3.72331 0.00414494C4.21298 0.00187111 4.61178 0.396988 4.61406 0.886663L4.61719 1.56055Z" fill="#1A183E"/>
                    </svg>
                    <p className="text-xl font-bold">{data?.coursePrice}</p>
                  </div>
                  
              </TabsList>

              <TabsContent value="about">
                  <AboutTab details={data?.courseOverview?.about} />
              </TabsContent>

              <TabsContent value="learn">
                  <WhatLearnTab details={data?.courseOverview?.learn} />
              </TabsContent>

              <TabsContent value="instructor" >
                  <InstructorTab details={data?.courseInstructors} />
              </TabsContent>

              <TabsContent value="syllabus">
                  <SyllabusTab details={data?.courseOverview?.syllabus} />
              </TabsContent>

              <TabsContent value="faq">
                  <FaqTab details={data?.courseOverview?.FAQ} />
              </TabsContent>

              <TabsContent value="modules">
                  <ModulesTab details={data?.courseModules} />
              </TabsContent>

          </Tabs>
        </section>
        </>
      )}
    </div>
  );
}

export default courseContentDetails;
