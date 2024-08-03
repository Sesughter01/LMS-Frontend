import React from 'react'

const loader = () => {
    return (
        <section className='flex flex-col gap-12'>
            <section className='flex flex-col gap-4 w-full'>
                <ul className="bg-gray-100 border border-gray-200 rounded-lg flex flex-col-reverse lg:flex-row h-auto lg:h-60 p-3">
                    <li className='w-full lg:w-4/6 flex flex-col gap-4 px-2 lg:px-8 justify-center bg-gray-100 py-4 h-auto lg:h-full animate-pulse'>
                        <p className='w-2/3 h-5 rounded-full bg-gray-200 animate-pulse'></p>
                        <small className='w-1/3 h-4 rounded-full bg-gray-200 animate-pulse'></small>
                    </li>
                    <li className='w-full lg:w-2/6 bg-gray-200 aspect-video lg:h-full animate-pulse'>

                    </li>
                </ul>

                {/* <div className='w-full flex items-center gap-4 justify-end'>
                    <div className='h-12 rounded-lg bg-gray-200 w-1/3 lg:w-1/6 animate-pulse'>
                    </div>
                    <p className='w-1/3 lg:w-1/6 h-8 bg-gray-200 rounded-full animate-pulse'></p>
                </div> */}

            </section>

            <section className='flex flex-col gap-4'>
                <ul className='flex gap-4'>
                    <li className='h-8 w-1/4 lg:w-1/6 bg-gray-200 rounded-xl animate-pulse'></li>
                    <li className='h-8 w-1/4 lg:w-1/6 bg-gray-200 rounded-xl animate-pulse'></li>
                    <div className='w-full flex items-center gap-4 justify-end'>
                    <div className='h-12 rounded-lg bg-gray-200 w-1/3 lg:w-1/6 animate-pulse'>
                    </div>
                    <p className='w-1/3 lg:w-1/6 h-8 bg-gray-200 rounded-full animate-pulse'></p>
                </div>
                </ul>
                <div>
                    <div className='h-80 w-full rounded-xl animate-pulse bg-gray-200'></div>
                </div>
            </section>
        </section>
    )
}

export default loader