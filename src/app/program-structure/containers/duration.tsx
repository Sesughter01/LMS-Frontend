import Image from 'next/image'
import imgHands from '@/assets/hands.png'

const Duration = () => {
    return (
        <section>
            <article className='py-16 flex flex-col gap-16 items-center'>
                <h1 className='text-5xl font-semibold'>Program Duration</h1>

                <ul className='flex flex-col lg:flex-row w-full px-6 lg:px-24'>
                    <li className='flex flex-col gap-8 w-full lg:w-1/2 grow shrink-0 px-16'>
                        <div className='flex flex-col gap-6'>
                            <h1 className='font-semibold text-2xl'>Our program runs for 6 months</h1>
                            <small className='text-lg'>Training Phase: 3 months</small>
                            <small className='text-lg'>Hands-on Experience Phase: 3 months</small>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <h1 className='font-semibold text-2xl'>Selection Process</h1>
                            <small className='text-lg'>
                                Sign up and enrollment in a course
                            </small>
                            <small className='text-lg'>
                                All applicants are required to take a pre-enrollment assessment on selected course
                            </small>
                            <small className='text-lg'>
                                Final selection of candidates based on assessment outcomes/scores.
                            </small>
                        </div>
                    </li>
                    <li className='flex relative w-fyll lg:w-1/2 px-6'>
                        <Image src={imgHands} alt='image' className='object-cover w-full' fill />
                    </li>

                </ul>

            </article>
        </section>
    )
}

export default Duration