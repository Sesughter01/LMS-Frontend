import { Course,CourseDetail } from '@/shared/types/course'
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




const CourseDetailsCard: React.FC<CourseDetail> = (coursedetail) => {

    const router = useRouter()
    const pathname = usePathname()

    console.log("Mycourse Details", coursedetail)
    // console.log("Mycourse Details Image", coursedetail.courseImage)

    let courseImageSelection: any = java;

    const arrayCourseDetails = Object.values(coursedetail)

    // if(course.courseTitle){
    //     if(course.courseTitle.toLocaleLowerCase().includes('java')){
    //         courseImageSelection = coursesImagesDict.java;
    //     }

    //     if(course.courseTitle.toLocaleLowerCase().includes('linux')){
    //         courseImageSelection = coursesImagesDict.linux;
    //     }

    //     if(course.courseTitle.toLocaleLowerCase().includes('python') || 
    //         course.courseTitle.toLocaleLowerCase().includes('data')){
    //         courseImageSelection = coursesImagesDict.python
    //     }

    //     if(course.courseTitle.toLocaleLowerCase().includes('cyber')){
    //         courseImageSelection = coursesImagesDict.cyberSecurityImage;
    //     }
    // }

    return (
        <div className="flex w-full h-full gap-4 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg p-2" onClick={() => router.push(pathname + "/" + arrayCourseDetails[0].id + "/" + "learn")}>
           
            <div className='w-[30%] shrink-0 bg-gray-100 h-full rounded-lg overflow-hidden relative'>
                {/* <Image src={} alt="course image" className='object-cover' fill /> */}
                <Image src={arrayCourseDetails[0].courseImage || courseImageSelection} alt="course image" className='object-cover rounded-lg' fill />
            </div>
            <div className='flex flex-col gap-2 grow'>
                <div className='flex gap-2 justify-between py-2 border-b border-gray-100'>
                    <p className='text-2xl font-bold text-gray-800 mb-2'>{arrayCourseDetails[0].courseTitle}</p>
                    {/* <BookmarkIcon /> */}
                </div>
                <ul className="mb-2">
                    <li className='flex items-center text-gray-700 mb-1'>
                    <span className="inline-block w-2 h-2 bg-pink-500 mr-2"></span>
                        {arrayCourseDetails[0].courseDescription}
                    </li>
                    
                    
               
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

            </div>
        </div>
    )
}

export default CourseDetailsCard