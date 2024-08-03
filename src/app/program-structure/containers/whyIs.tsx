import Image from "next/image"

import imgConfetti from '@/assets/confetti-1.png'

import img1 from '@/assets/undraw_content_re_33px 1.svg'
import img2 from '@/assets/undraw_followers_re_6k3g 1.svg'
import img3 from '@/assets/undraw_developer_activity_re_39tg 1.svg'
import img4 from '@/assets/undraw_agreement_re_d4dv 1.svg'

const WhyIs = () => {
    return (
        <section className=" py-36 px-24 flex gap-10 items-center relative bg-[#FEECFF]">

            <div className=" flex flex-col gap-4 w-1/3">
                <h1 className="text-4xl font-semibold">
                    Why Choose us
                </h1>
                <p className="text-lg">
                    By offering quality tech talent innovation and competitive pricing, we stand out as a reliable and trustworthy partner for our clients
                </p>
            </div>
            <div className="w-2/3">
                <ul className="grid grid-cols-2 grid-rows-2 gap-8 p-8">
                    <li className="gap-6 text-xl text-white px-8 py-12 rounded-lg flex flex-col overflow-hidden relative">
                        <Image src={imgConfetti} alt="confetti image" className="object-cover absolute inset-0 z-0 bg-secondary" fill />
                        <div className="z-10 flex flex-col gap-4">
                            <h1 className="text-lg">Quality Talents</h1>
                            <small className="text-gray-300">We employ a rigorous screening process to ensure that our talent pool includes only the best and meet qualified candidates</small>

                        </div>
                    </li>
                    <li className="gap-6 text-xl text-white px-8 py-12 rounded-lg flex flex-col overflow-hidden relative">
                        <Image src={imgConfetti} alt="confetti image" className="object-cover absolute inset-0 z-0 bg-secondary" fill />
                        <div className="z-10 flex flex-col gap-4">
                            <h1 className="text-lg">Exceptional Support</h1>
                            <small className="text-gray-300">Our team is always available to provide guidance, support and expertise whenever you need it. </small>

                        </div>
                    </li>
                    <li className="gap-6 text-xl text-white px-8 py-12 rounded-lg flex flex-col overflow-hidden relative">
                        <Image src={imgConfetti} alt="confetti image" className="object-cover absolute inset-0 z-0 bg-secondary" fill />
                        <div className="z-10 flex flex-col gap-4">
                            <h1 className="text-lg">Innovation</h1>
                            <small className="text-gray-300">We invest in continuous learning and development opportunities for our talent to ensure that they have the skills to tackle complex technical challenges</small>

                        </div>
                    </li>
                    <li className="gap-6 text-xl text-white px-8 py-12 rounded-lg flex flex-col overflow-hidden relative">
                        <Image src={imgConfetti} alt="confetti image" className="object-cover absolute inset-0 z-0 bg-secondary" fill />
                        <div className="z-10 flex flex-col gap-4">
                            <h1 className="text-lg">Competitive pricing</h1>
                            <small className="text-gray-300">We offer our clients competitive pricing without compromising on quality. We believe that our pricing model is straight forward, fair and transparent  </small>

                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default WhyIs