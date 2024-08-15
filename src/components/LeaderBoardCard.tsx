
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




const LeaderBoardCard = () => {

    const router = useRouter()
    const pathname = usePathname()

    // console.log("coursessssssssssssssssssss", course)


   

    return (
        <div className="flex w-full h-full">
           
           <div className=" max-w-lg w-full flex items-center justify-center ">
                <ul className="w-full flex gap-2.5 flex-col">
                    <li className="flex items-center w-full shadow-md py-4 px-6 min-w-[240px]" style={{background:"#DDDDDD",width: "100%",height: "54px",borderRadius: "4px",opacity: "0px"}}>
                        <img className="w-9 h-9 rounded-full object-cover mr-4" src="https://randomuser.me/api/portraits/women/72.jpg"
                            alt="User avatar"/>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-[#1A183E]">Emily Jones</h3>
                            <p className="text-gray-600 text-[10px]">Average grade: 84%</p>
                        </div>
                    </li>
                    <li className="flex items-center w-full shadow-md py-4 px-6 min-w-[240px]" style={{background:"#DDDDDD",width: "100%",height: "54px",borderRadius: "4px",opacity: "0px"}}>
                        <img className="w-9 h-9 rounded-full object-cover mr-4" src="https://randomuser.me/api/portraits/men/40.jpg"
                            alt="User avatar"/>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-[#1A183E]">David Lee</h3>
                            <p className="text-gray-600 text-[10px]">Average grade: 84%</p>
                        </div>
                    </li>
                    <li className="flex items-center w-full shadow-md py-4 px-6 min-w-[240px]" style={{background:"#DDDDDD",width: "100%",height: "54px",borderRadius: "4px",opacity: "0px"}}>
                        <img className="w-9 h-9 rounded-full object-cover mr-4" src="https://randomuser.me/api/portraits/women/54.jpg"
                            alt="User avatar"/>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-[#1A183E]">Sophia Williams</h3>
                            <p className="text-gray-600 text-[10px]">Average grade: 84%</p>
                        </div>
                    </li>
                    <li className="flex items-center w-full shadow-md py-4 px-6 min-w-[240px]" style={{background:"#DDDDDD",width: "100%",height: "54px",borderRadius: "4px",opacity: "0px"}}>
                        <img className="w-9 h-9 rounded-full object-cover mr-4" src="https://randomuser.me/api/portraits/men/83.jpg"
                            alt="User avatar"/>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-[#1A183E]">Michael Chen</h3>
                            <p className="text-gray-600 text-[10px]">Average grade: 84%</p>
                        </div>
                    </li>
                    <li className="flex items-center w-full shadow-md py-4 px-6 min-w-[240px]" style={{background:"#DDDDDD",width: "100%",height: "54px",borderRadius: "4px",opacity: "0px"}}>
                        <img className="w-9 h-9 rounded-full object-cover mr-4" src="https://randomuser.me/api/portraits/women/17.jpg"
                            alt="User avatar"/>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-[#1A183E]">Mia Davis</h3>
                            <p className="text-gray-600 text-[10px]">Average grade: 84%</p>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default LeaderBoardCard
