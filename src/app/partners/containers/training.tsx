import { Button } from "@/components/ui/button"

const Training = () => {
    return (
        <section className="flex flex-col items-center py-24 px-24">
            <div className="flex gap-8 justify-between items-center w-full">
                <h1 className="text-4xl font-semibold mb-3">Trainings offered</h1>
                <p className="text-right">We support intermediate to advanced software <br />engineers to achieve their career advancement goals.</p>
            </div>
            <ul className="flex gap-8 flex-nowrap py-16 text-xl max-w-full font-semibold overflow-x-scroll">
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        Frontend Development
                    </p>
                    <small className="text-gray-300 font-light text-sm">
                        HTML,CSS, Bootstrap, Javascript, ReactJS
                    </small>
                </li>
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        Product Management
                    </p>
                    <small className="text-gray-300 font-light text-sm">
                        Agile methodology, Product management
                    </small>
                </li>
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        Backend Development
                    </p>
                    <small className="text-gray-300 font-light text-sm">
                        Node JS, Next JS, C#, Net, Java
                    </small>
                </li>
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        Dev Ops Engineering
                    </p>
                    <small className="text-gray-300 font-light text-sm">
                        DevOps, QA testing
                    </small>
                </li>
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        Data science
                    </p>
                    <small className="text-gray-300 font-light text-sm">
                        R, SQL, Python
                    </small>
                </li>
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        IT Solutions Sales
                    </p>
                </li>
                <li className="flex flex-col gap-8 bg-secondary rounded-lg min-w-[200px] text-white  p-8">
                    <p className="text-base">
                        Cybersecurity
                    </p>
                </li>
            </ul>
            <div className="mt-16">
                <Button className="bg-primary">See program structure</Button>
            </div>
        </section>
    )
}

export default Training