const WhatLearnTab = ({ details }: any) => {


    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">

            <article className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">
                    What you&#39;ll Learn
                </h1>

                <div className="grid grid-flow-row lg:grid-cols-2 text-sm p-4 gap-8 rounded-lg border border-gray-300">
                    {details?.map((learn: string, index: number) => (

                        <div key={index} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M12.5 24.5V4.5L22.5 14.5L12.5 24.5Z" fill="#1D63FE"/>
                            </svg>

                            <span className="text-black font-Montserrat text-base font-normal">{learn}</span>
                        </div>

                    ))}
                </div>
            </article>

        </section>
    )
}

export default WhatLearnTab