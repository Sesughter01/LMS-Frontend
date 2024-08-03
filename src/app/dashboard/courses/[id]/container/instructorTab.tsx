import Image from 'next/image'
import instructorImage from '@/assets/Ellipse 63.png'


const InstructorTab = ({ details }: any) => {
    // TODO: Replace the hard coding with details
    // console.log("details888888888888888888888888888888", details)

    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">
            <article className="flex flex-col gap-16">
                <h1 className="text-2xl font-bold">
                    Instructors
                </h1>
                
                {details && details?.length > 0 && (
                    <div style={{flexWrap: "wrap"}} className='flex flex-row items-center gap-44 justify-center'>
                        {details?.map((instructor: any, index: any) => (
                            <div className='flex flex-col items-center' key={index}>
                                <Image width={50} height={50} src={instructor?.profile?.avatar || "/images/default-avatar.png"} alt='instructor image' className='w-1/2' />
                                <div key={index} className='flex flex-col gap-2 items-center text-lg'>
                                    <h1 className='font-bold text-xl'>
                                        {instructor?.profile?.firstName} 
                                        {instructor?.profile?.lastName}
                                    </h1>
                                    <p className="text-md">{instructor?.email}</p>
                                    <p>Member of Staff</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </article>
        </section>
    )
}

export default InstructorTab