
const Training = () => {
    return (
        <section className="flex flex-col items-center py-24 px-0 lg:px-24">
            <h1 className="text-4xl font-semibold mb-3">Trainings offered</h1>
            <ul className="flex flex-col lg:flex-row gap-24 justify-evenly flex-wrap text-left lg:text-center py-24 text-xl font-semibold ">
                <li>
                    <h1>
                        Frontend Development
                    </h1>
                    <small className="text-gray-700 text-sm">
                        HTML,CSS, Bootstrap, Javascript, ReactJS
                    </small>
                </li>
                <li>
                    <h1>
                        Product Management
                    </h1>
                    <small className="text-gray-700 text-sm">
                        Agile methodology, Product management
                    </small>
                </li>
                <li>
                    <h1>
                        Backend Development
                    </h1>
                    <small className="text-gray-700 text-sm">
                        Node JS, Next JS, C#, Net, Java
                    </small>
                </li>
                <li>
                    <h1>
                        Dev Ops Engineering
                    </h1>
                    <small className="text-gray-700 text-sm">
                        DevOps, QA testing
                    </small>
                </li>
                <li>
                    <h1>
                        Data science
                    </h1>
                    <small className="text-gray-700 text-sm">
                        R, SQL, Python
                    </small>
                </li>
                <li>
                    IT Solutions Sales
                </li>
                <li>
                    Cybersecurity
                </li>
            </ul>
            <div className="lg:mt-16">
                We also offer training on request
            </div>
        </section>
    )
}

export default Training