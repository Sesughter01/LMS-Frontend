import React from 'react'

const Aim = () => {
    return (
        <section>
            <article className='bg-secondary text-white px-36 py-24'>
                <div className='flex gap-24'>
                    <h1 className='text-4xl font-semibold'>Our Mission</h1>
                    <p>To produce highly trained tech talent with the right expertise,<br />
                        culture and work readiness to support the increasing demand from business globally</p>
                </div>
            </article>
            <article className='px-36 py-24'>
                <div className='flex gap-24'>
                    <h1 className='text-4xl font-semibold'>Our Vision</h1>
                    <p>To become the go to partner globally for <br /> business seeking top tech talent to drive innovative solutions.</p>
                </div>
            </article>
            <article className='bg-[#FEECFF] py-24 px-36'>
                <div className='flex gap-12 flex-col items-center'>
                    <h1 className='text-4xl font-semibold'>Core Values</h1>
                    <ul className='grid grid-cols-3 gap-16'>
                        <li><b className='text-lg'>Passion</b> fuels excellence and drive impact. It’s a core value that inspires us to achieve greatness and make a meaningful difference</li>
                        <li><b className='text-lg'>Vision</b> enables us to see beyond the present and create a better future. It empowers us to set ambitious goals and make lasting change</li>
                        <li><b className='text-lg'>Integrity</b> is a core value that guides us to do what’s right, even when it’s hard. It builds trust, respect, and credibility, and also help us to make positive impact</li>
                    </ul>
                </div>
            </article>
        </section>
    )
}

export default Aim