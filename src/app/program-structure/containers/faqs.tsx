import Image from "next/image"
import imgGrp from '@/assets/Group 803.png'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Faqs = () => {
    return (
        <section>
            <article className="flex flex-col py-16 px-6 lg:px-16">
                <ul className="flex flex-col lg:flex-row gap-6 items-center">
                    <li className="relative hidden lg:flex lg:w-1/2 p-8 shrink-0">
                        <div className="relative w-full aspect-square">
                            <Image src={imgGrp} alt="immage" fill className="object-contain p-24" />

                        </div>
                    </li>
                    <li className="flex flex-col gap-6 lg:w-1/2 shrink-0">
                        <h1 className="text-3xl font-semibold">FAQs</h1>
                        <div className="w-full">
                            <Accordion type="single" collapsible className="w-full text-left">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="hover:no-underline text-left">Who is INGRYD Academy?</AccordionTrigger>
                                    <AccordionContent>
                                        Answer Here.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="hover:no-underline text-left">How do I apply to INGRYD Academy&apos;s programs? </AccordionTrigger>
                                    <AccordionContent>
                                        Applying to our programs is easy. Start by “Signing up”, once completed.
                                        Enroll in any of our courses you&apos;re interested in. Follow the prompts to
                                        complete your application
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="hover:no-underline text-left">What are the payment options available for the programs?</AccordionTrigger>
                                    <AccordionContent>
                                        Answer Here.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="hover:no-underline text-left">How does the assessment process work?</AccordionTrigger>
                                    <AccordionContent>
                                        Answer Here.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="hover:no-underline text-left">What is the duration of a program?</AccordionTrigger>
                                    <AccordionContent>
                                        Answer Here.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default Faqs