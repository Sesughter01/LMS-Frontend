import { DownloadIcon } from 'lucide-react'


const SyllabusTab = ({ details }: any) => {
    // TODO: Replace the hard coding with details
    // console.log('detail-------------------s', details)
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = details
        link.download = 'syllabus - ingryd';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      };
    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">
            <article className="flex flex-col gap-16">
                <h1 className="text-2xl font-bold">
                    Course Syllabus
                </h1>
                <div onClick={handleDownload} className='flex justify-center cursor-pointer items-center text-blue-500 font-semibold text-lg gap-3'>
                    <DownloadIcon />
                    <p>Download the course syllabus</p>
                </div>
            </article>

        </section>
    )
}

export default SyllabusTab