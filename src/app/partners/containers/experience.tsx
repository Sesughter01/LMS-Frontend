import Image from "next/image"
import imgConfetti from '@/assets/confetti-1.png'
import logo from '@/assets/logo.png'

6
const Experience = () => {
    return (
        <section className="relative flex flex-col py-24 px-6 lg:px-24">
            <Image src={imgConfetti} alt="confetti image" className="object-contain absolute bg-[#FEECFF] inset-0 -z-10 " fill />
            <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-semibold">The INGRYD Experience</h1>
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start lg:items-center">
                    <Image src={logo} alt="image" className="aspect-square shrink-0 grow w-1/3 bg-[#15031D] p-32 lg:hover:p-16 transition-all duration-150 object-contain" />
                    <ul className="flex flex-col gap-4 font-semibold list-disc text-sm">
                        <li className="leading-8">Precision Skills: Our programs are designed to cultivate the exact skills that industries demand, giving talents a head start in their professional journey.
                        </li>
                        <li className="leading-8">
                            Continuous Growth: Learning doesn&apos;t end at graduation. With INGRYD, young talents can stay at the forefront of the tech revolution through lifelong learning opportunities.
                        </li>
                        <li className="leading-8">
                            Local Empowerment: By nurturing local talent, we drive economic growth, transforming communities into tech hubs of excellence
                        </li>
                    </ul>

                </div>
            </div>

        </section>
    )
}

export default Experience