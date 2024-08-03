import { DownloadIcon } from 'lucide-react'


const SyllabusTab = ({ details }: any) => {
    // TODO: Replace the hard coding with details
    console.log(details)
    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">
            <article className="flex flex-col gap-16">
                <h1 className="text-2xl font-bold">
                    Course Syllabus
                </h1>
                <div className='flex justify-center items-center text-blue-500 font-semibold text-lg gap-3'>
                    <DownloadIcon />
                    <p>Download the course syllabus</p>
                </div>
            </article>

        </section>
    )
}

export default SyllabusTab