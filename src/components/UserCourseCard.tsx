
import { Course } from '@/shared/types/course'
import { Book, BookmarkIcon, Clock10Icon } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import javaCourseImage from '@/assets/courses/cybersecurity.png';
import linuxCourseImage from '@/assets/courses/linux.png';
import pythonCourseImage from '@/assets/courses/python.png';
import cyberSecurityImage from '@/assets/courses/cybersecurity.png';

import java from '@/assets/java_coder.png';

const coursesImagesDict = {
    java: javaCourseImage,
    linux: linuxCourseImage,
    python: pythonCourseImage,
    cyberSecurityImage: cyberSecurityImage
}




const UserCourseCard: React.FC<Course> = (course) => {

    const router = useRouter()
    const pathname = usePathname()

    // console.log("coursessssssssssssssssssss", course)

    let courseImageSelection: any = java;

    if(course.courseTitle){
        if(course.courseTitle.toLocaleLowerCase().includes('java')){
            courseImageSelection = coursesImagesDict.java;
        }

        if(course.courseTitle.toLocaleLowerCase().includes('linux')){
            courseImageSelection = coursesImagesDict.linux;
        }

        if(course.courseTitle.toLocaleLowerCase().includes('python') || 
            course.courseTitle.toLocaleLowerCase().includes('data')){
            courseImageSelection = coursesImagesDict.python
        }

        if(course.courseTitle.toLocaleLowerCase().includes('cyber')){
            courseImageSelection = coursesImagesDict.cyberSecurityImage;
        }
    }

    return (
        <div className="flex w-full gap-4 border-b border-gray-200">
           
    
            <div className='flex flex-col gap-2 grow'>
                <div className="overflow-hidden  w-full">
                      <div className="md:flex">
                          <div className="md:flex-shrink-0">
                          {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src={course.courseImage || courseImageSelection} alt="Course" /> */}
                          </div>
                          <div className="w-full">
                            <div className="md:flex-shrink-0 flex gap-2">
                                <div className='w-full max-w-[30%] shrink-0 bg-gray-100 h-full  rounded-lg overflow-hidden relative'>
                                    <img className="h-[85px] w-[85px] w-full  md:h-full md:w-48" src={course.courseImage || courseImageSelection} alt="Course" />
                                    {/* <Image src={course.courseImage || courseImageSelection} alt="course image" className=' h-48 w-full md:h-full md:w-48 object-cover rounded-lg w-full' fill /> */}
                                </div>
                                <div className="md:flex-shrink-0">
                                    <div className='flex gap-2 justify-between border-gray-100'>
                                        <p className='text-base font-bold'>{course.courseTitle}</p>
                                        {/* <h1 className="block mt-1  text-400 leading-tight font-bold text-black">{course.courseTitle}</h1> */}
                                    </div>
                                    <p className="mt-2 text-[12px] ">Davidson Adepoju</p>
                                    <p className="mt-2 text-[12px]  ">Tue/Thur 14:00 - 18:00</p>
                                </div>
                            </div>
                            <ul className="mt-4">
                                <li className='flex items-center  text-[12px]  mb-1'><span className="inline-block w-2 h-2 bg-pink-500 mr-1"></span>{course.courseDescription}</li>
                            </ul>
                            <div className='flex gap-4 items-left flex items-center'>
                                <p className="flex items-center  text-[12px] "><Book className='text-primary h-4' /> 12 Modules</p>
                                <p className="flex items-center gap-1 text-[12px] "><Clock10Icon className='text-primary h-4' /> 200 hrs 45 mins</p>
                            </div>
                            <div className="flex w-full item-end justify-end py-4 pt-7">
                                <button className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer" style={{ background:"#1A183E" }}  onClick={() => router.push(pathname + "/" + course.id)}>
                                  Get Started
                                </button>
                            </div>
                           
                            {/* <ul className="mt-4 text-gray-700 ">
                                <li className='flex items-center  text-sm text-gray-200 mb-1'><span className="inline-block w-1 h-1 bg-pink-500 mr-2"></span>{course.courseDescription}</li>
                                <li className='flex items-center  text-sm text-gray-200 mb-1'><span className="inline-block w-1 h-1 bg-pink-500 mr-2"></span> Robust Backend Development</li>
                                <li className='flex items-center  text-sm text-gray-200 mb-1'><span className="inline-block w-1 h-1 bg-pink-500 mr-2"></span> RESTful API Creation</li>
                                <li className='flex items-center  text-sm text-gray-200 mb-1'><span className="inline-block w-1 h-1 bg-pink-500 mr-2"></span> Deployment and Scalability</li>
                                <li className='flex items-center  text-sm text-gray-200 mb-1'><span className="inline-block w-1 h-1 bg-pink-500 mr-2"></span> Database Integration Proficiency</li>
                                <li className='flex items-center  text-sm text-gray-200 mb-1'><span className="inline-block w-1 h-1 bg-pink-500 mr-2"></span> Server-Side Framework Mastery</li>
                            </ul>
                            <div className="mt-4 flex items-center">
                                <span className="inline-block text-pink-500 rounded-full px-3 py-1 text-sm font-semibold mr-2">12 Modules</span>
                                <span className="inline-block text-pink-500 rounded-full px-3 py-1 text-sm font-semibold">264 hours</span>
                            </div>
                            <div className='flex gap-8 text-gray-600 items-left flex items-center'>
                                <p className="flex items-center "><Book className='text-primary h-4' /> 12 Modules</p>
                                <p className="flex items-center gap-1"><Clock10Icon className='text-primary h-4' /> 200 hrs 45 mins</p>
                            </div> */}
                           
                          </div>
                      </div>
                    </div>
            </div>
        </div>
    )
}

export default UserCourseCard
