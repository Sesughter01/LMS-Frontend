import Image from 'next/image'
import { Button } from '@/components/ui/button'

import img1 from '@/assets/Rectangle 5.png'

const HowTo = () => {
    return (
        <section>
            <article className='bg-secondary text-white flex flex-col'>
                <h1 className='text-4xl font-semibold text-center py-16 lg:py-24'>How to get started</h1>
                <section className="text-gray-200">
                    <div className="container px-0 py-0 flex items-center flex-wrap">
                        <div className="flex justify-between items-center flex-wrap w-full">
                            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6 px-8 py-8 lg:pl-24">
                                <div className="flex relative pb-12">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        1
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-xs text-gray-400 mb-1 tracking-wider">STEP 1</h2>
                                        <p className="leading-relaxed">Sign up</p>
                                    </div>
                                </div>
                                <div className="flex relative pb-12">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        2
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-xs text-gray-400 mb-1 tracking-wider">STEP 2</h2>
                                        <p className="leading-relaxed">Take assessment</p>
                                    </div>
                                </div>
                                <div className="flex relative">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        3
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-xs text-gray-400 mb-1 tracking-wider">STEP 3</h2>
                                        <p className="leading-relaxed">Enroll into program</p>
                                    </div>
                                </div>
                                <div className='mt-8'>
                                    <Button className="bg-primary">Sign up</Button>
                                </div>

                            </div>
                            <Image alt="image" className="hidden lg:flex w-1/2 object-cover object-center md:mt-0 mt-12" src={img1} />
                        </div>
                    </div>
                </section>
            </article>
        </section>
    )
}

export default HowTo