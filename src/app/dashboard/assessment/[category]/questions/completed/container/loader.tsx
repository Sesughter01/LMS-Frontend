import React from 'react'

const loader = () => {
    return (
        <section className='flex flex-col gap-6'>
            <section className='flex items-center gap-6 w-full lg:w-3/4'>
                <div className='h-10 aspect-square rounded-full bg-gray-200 animate-pulse'></div>
                <div className='h-7 grow bg-gray-200 rounded-full animate-pulse'></div>
            </section>
            <section className='px-16'>
                <ul className='flex flex-col gap-8 w-full lg:w-3/4'>
                    <li className='flex justify-between'>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                    </li>
                    <li className='flex justify-between'>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                    </li>
                    <li className='flex justify-between'>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                    </li>
                    <li className='flex justify-between'>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                    </li>
                    <li className='flex justify-between'>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                        <p className='h-4 w-1/3 bg-gray-200 rounded-full animate-pulse'></p>
                    </li>
                </ul>
            </section>
            <section className='px-16'>
                <div className='h-40 w-full lg:w-3/4 bg-gray-200 rounded-xl animate-pulse'>

                </div>
            </section>
            <section>
                <ul className='flex justify-between gap-10'>
                    <li className='h-8 w-1/3 bg-gray-200 rounded-xl animate-pulse'></li>
                    <li className='h-8 w-1/3 bg-gray-200 rounded-xl animate-pulse'></li>
                    <li className='h-8 w-1/3 bg-gray-200 rounded-xl animate-pulse'></li>
                </ul>
            </section>
            <section>
                <div className='h-40 w-full rounded-xl animate-pulse bg-gray-200'></div>
            </section>
        </section>
    )
}

export default loader