
import Image from 'next/image'
import img1 from '@/assets/Rectangle 50.png'



const Benefit = () => {
    return (
        <section className="py-32 px-6 lg:px-24 flex flex-col relative">
            <Image src={img1} alt="image" className="object-cover absolute inset-0 -z-10 " fill />
            <div className="flex flex-col gap-16 items-center">
                <h1 className="text-5xl font-semibold text-white">Program Benefit</h1>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                    <li className="bg-white p-8 text-center flex flex-col gap-6">
                        <h1 className="font-semibold text-2xl">For the participants</h1>
                        <p>
                            Easier and quicker job placements.
                            A chance to learn in-demand technical skills and become more employable.
                            Become a more competitive seasoned software engineer with access to endless opportunities
                        </p>
                    </li>
                    <li className="bg-white p-8 text-center flex flex-col gap-6">
                        <h1 className="font-semibold text-2xl">For the Organization</h1>
                        <p>
                            Help the organization gain and retain talents. Smooth onboarding process.
                            Will help organizations keep pace with the changes in the technology industry.
                            Reduce cost of recruitment. Access top pool of IT talents
                        </p>
                    </li>
                    <li className="bg-white p-8 text-center flex flex-col gap-6">
                        <h1 className="font-semibold text-2xl">For the Ecosystem</h1>
                        <p>
                            Build a large talent pipeline. Accelerated growth and work fitness. Innovation potential.
                            Improve economic and welfare stability. Develop a large network of partnerships. Easier collaboration.
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Benefit