import React from 'react'

const loader = () => {
    return (
        <section className='flex flex-col lg:px-8 gap-10 py-8 items-center'>
            <section className='flex flex-col gap-4 w-full lg:w-2/3'>
                <ul className="bg-gray-100 border border-gray-200 rounded-lg flex flex-col-reverse lg:flex-row h-auto lg:h-32 p-3">
                    <li className='w-full lg:w-4/6 flex flex-col gap-4 justify-between py-3 bg-gray-100 h-full animate-pulse'>
                        <p className='w-2/3 h-5 rounded-full bg-gray-200 animate-pulse'></p>
                        <div className='w-full flex gap-4'>
                            <small className='w-1/4 h-3 rounded-full bg-gray-200 animate-pulse'></small>
                            <small className='w-1/4 h-3 rounded-full bg-gray-200 animate-pulse'></small>

                        </div>
                    </li>
                    <li className='w-full lg:w-2/6 bg-gray-200 aspect-video lg:h-full animate-pulse'>
                    </li>
                </ul>
            </section>
            <section className='flex flex-col items-center gap-8 w-full lg:w-2/3'>
                <p className='h-4 w-1/6 rounded-full bg-gray-200 animate-pulse'></p>
                <p className='h-10 w-2/6 rounded-full bg-gray-200 animate-pulse'></p>
                <p className='h-6 w-5/6 rounded-full bg-gray-200 animate-pulse'></p>
            </section>

            <section className='flex flex-col lg:flex-row items-center gap-4 lg:gap-12 lg:px-8 w-full lg:w-2/3'>
                <div className='w-1/2 bg-gray-100 rounded-xl h-40 animate-pulse'>
                </div>
                <div className='w-1/2 bg-gray-100 rounded-xl h-40 animate-pulse'>
                </div>
            </section>
            <section className='flex flex-col px-8 items-center gap-8 w-full lg:w-2/3'>
                <div className='w-full bg-gray-400 rounded-lg h-12 animate-pulse'>
                </div>
                <p className='w-1/6 h-3 rounded-full bg-gray-200 animate-pulse'></p>
            </section>


        </section>
    )
}

export default loader