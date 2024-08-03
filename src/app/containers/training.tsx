import { Button } from "@/components/ui/button"
import Link from "next/link"


const Training = () => {
    return (
        <section className="flex flex-col items-start lg:items-center py-24 px-6 lg:px-24">
            <h1 className="text-4xl font-semibold mb-3">Trainings offered</h1>
            <p className=" text-gray-700 text-xl">We offer training to intermediate and advanced level techies</p>
            <ul className="flex flex-col lg:grid lg:grid-cols-3 gap-24 justify-evenly flex-wrap py-24 text-xl font-semibold ">
                <li className="flex flex-col gap-2">
                    <h1>Frontend Development</h1>
                    <small className="text-gray-600 text-sm font-light">HTML,CSS, Bootstrap, Javascript, ReactJS</small>
                </li>
                <li className="flex flex-col gap-2">
                    <h1>
                        Product Management
                    </h1>
                    <small className="text-gray-600 text-sm font-light">Agile methodology, Product management</small>
                </li>
                <li className="flex flex-col gap-2">
                    <h1>
                        Backend Development
                    </h1>
                    <small className="text-gray-600 text-sm font-light" >Node JS, Next JS, C#, Net, Java</small>
                </li>
                <li className="flex flex-col gap-2">
                    <h1>
                        Dev Ops Engineering
                    </h1>
                    <small className="text-gray-600 text-sm font-light">DevOps, QA testing</small>
                </li>
                <li className="flex flex-col gap-2">
                    <h1>
                        Data science
                    </h1>
                    <small className="text-gray-600 text-sm font-light">
                        R, SQL, Python
                    </small>
                </li>
                <li className="flex flex-col gap-2">
                    IT Solutions Sales
                </li>
                <li className="flex flex-col gap-2">
                    Cybersecurity
                </li>
            </ul>
            <Button className="bg-primary" asChild>
                <Link href={'/program-structure'} className="px-8 py-6">
                    See program structue
                </Link>
            </Button>
        </section>
    )
}

export default Training