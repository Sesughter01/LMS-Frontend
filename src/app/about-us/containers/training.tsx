
const Training = () => {
    return (
        <section className="flex flex-col items-center py-24 px-24">
            <h1 className="text-4xl font-semibold mb-3">Trainings offered</h1>
            <p className=" text-gray-700 text-xl">We offer training to intermediate and advanced level techies</p>
            <ul className="flex gap-24 justify-evenly flex-wrap py-24 text-xl font-semibold ">
                <li>
                    Frontend Development
                </li>
                <li>
                    Backend Development
                </li>
                <li>
                    Cybersecurity
                </li>
                <li>
                    IT Solutions Sales
                </li>
                <li>
                    Data science
                </li>
                <li>
                    Product Management
                </li>
                <li>
                    Dev Ops Engineering
                </li>
            </ul>
        </section>
    )
}

export default Training