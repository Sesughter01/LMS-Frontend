import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const FaqTab = ({ details }: any) => {
    return (
        <section className="py-8 px-2 lg:px-8 flex flex-col gap-16">


            <article className="flex flex-col gap-16">

                <div className="flex flex-col gap-8 items-center bg-[#DFE9FF] p-8 rounded-lg">
                    <h1 className="text-2xl font-bold">
                        Frequently Asked Questions
                    </h1>
                    <Accordion type="single" collapsible className="w-full gap-4 space-y-4">
                        {
                            details.map((QnA: any, index: number) =>
                                <AccordionItem key={index} value={QnA.question} className='border-0'>
                                    <AccordionTrigger className='hover:no-underline bg-white px-6'>{QnA.question}</AccordionTrigger>
                                    <AccordionContent className='px-8 bg-white'>
                                        {/* {QnA.answer} */}
                                        <div dangerouslySetInnerHTML={{ __html: QnA.answer }} />
                                    </AccordionContent>
                                </AccordionItem>)
                        }

                    </Accordion>


                </div>

            </article>


        </section>
    )
}

export default FaqTab