
import Image from 'next/image'
import img1 from '@/assets/Rectangle 50.png'



const Benefit = () => {
    return (
        <section className="py-32 px-24 flex flex-col relative">
            <Image src={img1} alt="image" className="object-cover absolute inset-0 -z-10 " fill />
            <div className="flex flex-col gap-16 items-center">
                <h1 className="text-3xl font-semibold text-white">Program Benefit</h1>
                <ul className="grid grid-cols-3 gap-16">
                    <li className="bg-white p-8 rounded-lg text-center flex flex-col gap-6">
                        <h1 className="font-semibold">For the participants</h1>
                        <small>
                            Easier and quicker job placements.
                            A chance to learn in-demand technical skills and become more employable.
                            Become a more competitive seasoned software engineer with access to endless opportunities
                        </small>
                    </li>
                    <li className="bg-white p-8 rounded-lg text-center flex flex-col gap-6">
                        <h1 className="font-semibold">For the participants</h1>
                        <small>
                            Easier and quicker job placements.
                            A chance to learn in-demand technical skills and become more employable.
                            Become a more competitive seasoned software engineer with access to endless opportunities
                        </small>
                    </li>
                    <li className="bg-white p-8 rounded-lg text-center flex flex-col gap-6">
                        <h1 className="font-semibold">For the participants</h1>
                        <small>
                            Easier and quicker job placements.
                            A chance to learn in-demand technical skills and become more employable.
                            Become a more competitive seasoned software engineer with access to endless opportunities
                        </small>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Benefit