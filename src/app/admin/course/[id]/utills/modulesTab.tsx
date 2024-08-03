import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const ModulesTab = ({ details }: any) => {

    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">
            <article className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">
                    Modules
                </h1>
                
                <Accordion type="single" collapsible className="w-full gap-4 space-y-4">
                    {
                        details?.map((QnA: any, index: number) => (
                            <AccordionItem key={index} value={QnA.moduleTitle} className='border-0'>
                                <AccordionTrigger className='hover:no-underline bg-white px-6'>{QnA.moduleTitle}</AccordionTrigger>
                                <AccordionContent className='px-8 bg-white'>

                                    { QnA?.contents && (
                                        <div>

                                            { QnA?.contents?.map((content: any, contentIndex: number) => (
                                                <div key={contentIndex} className="flex">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            <svg className="" style={{marginRight: "-16px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4ZM12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18Z" fill="#7A7A7A" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>  
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4ZM12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18Z" fill="#7A7A7A" stroke="#7A7A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div className="cursor-pointer border rounded-full border-black border-2 items-center mr-2">
                                                                {(content.contentTypes == 'VIDEO' || content.contentTypes == 'LINK') && (
                                                                    <svg style={{padding: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none">
                                                                        <path d="M10.9917 5.20635L4.23797 1.07525C4.09633 0.988908 3.93433 0.941689 3.76848 0.938415C3.60263 0.935141 3.43889 0.97593 3.29395 1.05662C3.14902 1.1373 3.02809 1.255 2.94351 1.3977C2.85893 1.54039 2.81372 1.70297 2.8125 1.86885V10.131C2.81372 10.2969 2.85893 10.4595 2.94351 10.6022C3.02809 10.7449 3.14902 10.8626 3.29395 10.9433C3.43889 11.024 3.60263 11.0647 3.76848 11.0615C3.93433 11.0582 4.09633 11.011 4.23797 10.9246L10.9917 6.79353C11.1279 6.71064 11.2405 6.59409 11.3186 6.4551C11.3967 6.31612 11.4377 6.15937 11.4377 5.99994C11.4377 5.84051 11.3967 5.68376 11.3186 5.54478C11.2405 5.40579 11.1279 5.28924 10.9917 5.20635ZM3.9375 9.78978V2.2101L10.1325 5.99994L3.9375 9.78978Z" fill="black"/>
                                                                    </svg>
                                                                )}
                                                                
                                                                {content.contentTypes == 'DOCUMENT' && (
                                                                    <svg style={{padding: "2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none">
                                                                        <path d="M6 3.75C6.375 2.26969 7.79133 1.51383 10.875 1.5C10.9243 1.49982 10.9731 1.50939 11.0187 1.52817C11.0643 1.54695 11.1057 1.57456 11.1406 1.60942C11.1754 1.64428 11.2031 1.6857 11.2218 1.73128C11.2406 1.77686 11.2502 1.8257 11.25 1.875V8.625C11.25 8.72446 11.2105 8.81984 11.1402 8.89017C11.0698 8.96049 10.9745 9 10.875 9C7.875 9 6.71602 9.60492 6 10.5M6 3.75C5.625 2.26969 4.20867 1.51383 1.125 1.5C1.0757 1.49982 1.02686 1.50939 0.981277 1.52817C0.935696 1.54695 0.894282 1.57456 0.859423 1.60942C0.824564 1.64428 0.796949 1.6857 0.778169 1.73128C0.759389 1.77686 0.749817 1.8257 0.750003 1.875V8.57977C0.750003 8.81133 0.89344 9 1.125 9C4.125 9 5.28821 9.60938 6 10.5M6 3.75V10.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-col">
                                                                
                                                                <div className="">
                                                                    <p className="text-black font-Montserrat text-base font-medium">{content?.contentTitle}</p>
                                                                </div>
                                                                
                                                                <div className="">
                                                                    <span className="text-gray-500 font-Montserrat text-xs font-medium">{(content.contentTypes == 'VIDEO' || content.contentTypes == 'LINK') ? 'Video' : 'Reading'} .  {`${content.contentDuration} min`}</span>
                                                                </div>
                                                                <div className="">
                                                                    <a href={content.contentUrl}  
                                                                        target="_blank"  
                                                                        rel="noopener noreferrer" className="text-gray-500 font-Montserrat text-xs font-medium">{content.contentUrl}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                        </div>
                                    )}
                                    
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }

                </Accordion>

            </article>
        </section>
    )
}

export default ModulesTab