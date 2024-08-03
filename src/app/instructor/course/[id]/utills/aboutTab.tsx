const AboutTab = ({ details }: any) => {

    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">
            <article className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">
                    About this course
                </h1>
                <p className="text-gray-600 whitespace-pre-line">
                    <div dangerouslySetInnerHTML={{ __html:  details }} />
                </p>
            </article>
        </section>
    )
}

export default AboutTab