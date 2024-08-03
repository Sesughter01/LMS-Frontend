import Image from "next/image"

import imgConfetti from '@/assets/confetti-1.png'

import img1 from '@/assets/undraw_content_re_33px 1.svg'
import img2 from '@/assets/undraw_followers_re_6k3g 1.svg'
import img3 from '@/assets/undraw_developer_activity_re_39tg 1.svg'
import img4 from '@/assets/undraw_agreement_re_d4dv 1.svg'

const GetTalent = () => {
    return (
        <section className=" py-36 px-6 lg:px-16 flex flex-col gap-10 items-center relative">
            <Image src={imgConfetti} alt="confetti image" className="object-contain absolute inset-0 -z-10 bg-[#FEECFF]" fill />
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-4xl lg:text-5xl font-semibold">
                    How we get top talent
                </h1>
                <p className="text-lg lg:text-2xl">
                    We undergo a 4 stage process to get the most suitable <br /> talents in different fields
                </p>
            </div>
            <div className="flex flex-col w-full">
                <ul className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                    <li className="bg-secondary justify-center text-xl text-white p-8 rounded-lg flex flex-col gap-4 relative aspect-square lg:aspect-[3/3] group">
                        <Image src={img1} alt="image" className="" />
                        <div className="flex flex-col group transition-all duration-200 z-10 relative lg:absolute inset-0 lg:group-hover:top-0 lg:top-[70%] bg-secondary lg:p-8 w-full">
                            <p>Call for application</p>
                            <small className="flex text-sm text-gray-300 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                We create open opportunity for talents to show their skills.
                            </small>
                        </div>
                    </li>
                    <li className="bg-secondary justify-center text-xl text-white p-8 rounded-lg flex flex-col gap-4 relative aspect-square lg:aspect-[3/3] group">
                        <Image src={img2} alt="image" className="" />
                        <div className="flex flex-col group transition-all duration-200 z-10 relative lg:absolute inset-0 lg:group-hover:top-0 lg:top-[70%] bg-secondary lg:p-8 w-full">
                            <p>Selection Process</p>
                            <small className="flex text-sm text-gray-300 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                We follow a rigorous selection process that includes both IQ testing and
                                specific engineering program task.
                            </small>
                        </div>
                    </li>
                    <li className="bg-secondary justify-center text-xl text-white p-8 rounded-lg flex flex-col gap-4 relative aspect-square lg:aspect-[3/3] group">
                        <Image src={img3} alt="image" className="" />
                        <div className="flex flex-col group transition-all duration-200 z-10 relative lg:absolute inset-0 lg:group-hover:top-0 lg:top-[70%] bg-secondary lg:p-8 w-full">
                            <p>Training</p>
                            <small className="flex text-sm text-gray-300 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                All selected candidates pass through a 3-month training which includes both hard and soft skills.
                            </small>
                        </div>
                    </li>
                    <li className="bg-secondary justify-center text-xl text-white p-8 rounded-lg flex flex-col gap-4 relative aspect-square lg:aspect-[3/3] group">
                        <Image src={img4} alt="image" className="" />
                        <div className="flex flex-col group transition-all duration-200 z-10 relative lg:absolute inset-0 lg:group-hover:top-0 lg:top-[70%] bg-secondary lg:p-8 w-full">
                            <p>Outsourcing</p>
                            <small className="flex text-sm text-gray-300 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                We further select only the top best trainees for placements with out highly competitive client organization.
                            </small>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="mt-8">
                <h1 className="text-lg lg:text-xl font-semibold text-center">Our rigorous training process ensures our customers are not <br />
                    &quot; SWEATING THE TECH STUFF &quot;.</h1>
            </div>
        </section>
    )
}

export default GetTalent