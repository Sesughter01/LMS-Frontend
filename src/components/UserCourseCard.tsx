
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
        <div className="flex w-full h-full gap-4 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg p-2" onClick={() => router.push(pathname + "/" + course.id)}>
           
            <div className='w-[30%] shrink-0 bg-gray-100 h-full rounded-lg overflow-hidden relative'>
                {/* <Image src={} alt="course image" className='object-cover' fill /> */}
                <Image src={course.courseImage || courseImageSelection} alt="course image" className='object-cover rounded-lg' fill />
            </div>
            <div className='flex flex-col gap-2 grow'>
                <div className='flex gap-2 justify-between py-2 border-b border-gray-100'>
                    <p className='text-2xl font-bold text-gray-800 mb-2'>{course.courseTitle}</p>
                    {/* <BookmarkIcon /> */}
                </div>
                <ul className="mb-2">
                    <li className='flex items-center text-gray-700 mb-1'>
                    <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        {course.courseDescription}
                    </li>
                    
                    {/* <li className="flex items-center text-gray-700 mb-1">
                        <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        Robust Backend Development
                    </li>
                    <li className="flex items-center text-gray-700 mb-1">
                        <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        Server-Side Framework Mastery
                    </li>
                    <li className="flex items-center text-gray-700 mb-1">
                        <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        RESTful API Creation
                    </li>
                    <li className="flex items-center text-gray-700 mb-1">
                        <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        Database Integration Proficiency
                    </li>
                    <li className="flex items-center text-gray-700 mb-1">
                        <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        Deployment and Scalability
                    </li> */}
                    {/* <li className="text-black font-bold text-md">
                       N{course.coursePrice}
                    </li> */}
                </ul>
               {/* <ul className='flex flex-col gap-1 text-gray-500 text-xs mb-4'>
                    <li>
                        {course.courseDescription}
                    </li>
                    <li className="text-black font-bold text-md">
                       N{course.coursePrice}
                    </li>
                    
                     <li>
                        Server-Side Framework Mastery
                    </li>
                    <li>
                        RESTful API Creation
                    </li>
                    <li>
                        Database Integration Proficiency
                    </li>
                    <li>
                        Deployment and Scalability
                    </li> 
                </ul>*/}
                <div className='flex gap-8 text-gray-600 items-left'>
                    <p className="flex items-center "><Book className='text-primary h-4' /> 12 Modules</p>
                    <p className="flex items-center gap-1"><Clock10Icon className='text-primary h-4' /> 200 hrs 45 mins</p>
                </div>

                
                {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:h-full md:w-48" src="path/to/your/image.jpg" alt="Course" />
                        </div>
                        <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Courses</div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Java and Spring Boot</h1>
                        <p className="mt-2 text-gray-500">Davidson Adepoju</p>
                        <p className="mt-2 text-gray-500">Tue/Thur 14:00 - 18:00</p>
                        <ul className="mt-4 text-gray-700 list-disc list-inside">
                            <li>Robust Backend Development</li>
                            <li>RESTful API Creation</li>
                            <li>Deployment and Scalability</li>
                            <li>Database Integration Proficiency</li>
                            <li>Server-Side Framework Mastery</li>
                        </ul>
                        <div className="mt-4 flex items-center">
                            <span className="inline-block bg-purple-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">12 Modules</span>
                            <span className="inline-block bg-purple-500 text-white rounded-full px-3 py-1 text-sm font-semibold">264 hours</span>
                        </div>
                        <div className="mt-6">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Continue Lesson
                            </button>
                        </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default UserCourseCard
