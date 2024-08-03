"use client"


import SideBar from "@/components/SideBar"
import DashNav from "@/components/DashNav"

import { usePathname } from "next/navigation"


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



const Page = () => {
    const pathname = usePathname();

    const logoUrl = sessionStorage.getItem("logoUrl") || "";
    const secondaryColor = sessionStorage.getItem("secondaryColor") || "";


    return (
        <section className='flex w-full min-h-screen h-auto'>
            <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor}/>
            <main className='grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6'>
                <DashNav secondaryColor={secondaryColor} currentPage={"FAQ"} />
                <section className="grow px-4 lg:px-8 flex flex-col gap-8 py-4">
                    
                    <div className="w-full lg:w-3/4 mx-auto">
                        <h1 className="text-[32px] font-semibold bg-[rgba(26, 24, 62, 1)] text-center">Frequently Asked Questions</h1>
                        <Accordion type="single" collapsible className="w-full text-left flex flex-col gap-4">
                            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg py-2 px-4">
                                <AccordionTrigger className="hover:no-underline text-left font-semibold text-base">What kind of courses are offered at INGRYD Training Academy?</AccordionTrigger>
                                <AccordionContent>
                                The academy offers a wide range of courses in various areas of technology, including programming, data science, cybersecurity, web development, and more. Our courses are designed to provide hands-on experience and practical skills that are in high demand in the industry.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg py-2 px-4">
                                <AccordionTrigger className="hover:no-underline text-left font-semibold text-base">How are the courses structured?</AccordionTrigger>
                                <AccordionContent>
                                    Answer Here
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg py-2 px-4">
                                <AccordionTrigger className="hover:no-underline text-left font-semibold text-base">How long are the courses?</AccordionTrigger>
                                <AccordionContent>
                                    Answer Here.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg py-2 px-4">
                                <AccordionTrigger className="hover:no-underline text-left font-semibold text-base">Is prior experience required for the courses?</AccordionTrigger>
                                <AccordionContent>
                                    Answer Here.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg py-2 px-4">
                                <AccordionTrigger className="hover:no-underline text-left font-semibold text-base">Are there any course materials provided?</AccordionTrigger>
                                <AccordionContent>
                                    Answer Here.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6" className="border border-gray-200 rounded-lg py-2 px-4">
                                <AccordionTrigger className="hover:no-underline text-left font-semibold text-base">Are there any certification opportunities after completing a course?</AccordionTrigger>
                                <AccordionContent>
                                    Answer Here.
                                </AccordionContent>
                            </AccordionItem>
                            
                        </Accordion>
                    </div>
                </section>
            </main>
        </section>
    )
}

export default Page