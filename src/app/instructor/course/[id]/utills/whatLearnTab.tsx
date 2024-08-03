const learn = {
    java: `
        <li>Know how to program using Java</li>
        <li>Learn the different types of programming languages and where Java fits</li>
        <li>Understand Object-Oriented Programming (OOP)</li>
        <li>Learn how to use OOP in developing software</li>
        <li>Learn how to create Java programs for a variety of tasks</li>
        <li>Be familiar with data processing using Java</li>
        <li>Have hands-on experience working with Java</li>
        <li>Have developed your software engineering and software development skills</li>
        <li>Be positioned to contribute to a “tech culture” within organizations</li>
    `,

    linux: 
    `
    <li>Learn Linux history and significance.</li>
    <li>Navigate the CLI effectively.</li>
    <li>Master key Linux commands.</li>
    <li>Understand file system hierarchy and types.</li>
    <li>Manage files and directories via CLI.</li>
    <li>Edit files with VI and handle environment variables.</li>
    <li>Apply file permissions using symbolic/numeric notation.</li>
    <li>Redirect and filter data streams.</li>
    <li>Administer user accounts, groups, and permissions.</li>
    <li>Monitor system performance and use backup/restore.</li>
    <li>Configure network settings and troubleshoot.</li>
    <li>Automate tasks with shell scripting and cron.</li>
    <li>Grasp Git for version control.</li>
    <li>Use Git for repository management and collaboration.</li>
    `,

    cybersecurity: 
    `
    <li>Define key cybersecurity concepts for digital asset protection.</li>
    <li>Identify security risks and apply effective risk management.</li>
    <li>Secure cloud environments by addressing challenges with best practices.</li>
    <li>Understand governance, risk, and compliance in cybersecurity.</li>
    <li>Ensure data confidentiality and integrity through encryption.</li>
    <li>Configure OS securely with access controls.</li>
    <li>Develop programming skills for automation and data analysis.</li>
    <li>Implement network security, mitigating vulnerabilities.</li>
    <li>Conduct and prioritize vulnerability assessments.</li>
    <li>Create incident response plans for threat mitigation.</li>
    <li>Use ethical hacking to identify system vulnerabilities.</li>
    <li>Establish security policies and defensive strategies.</li>
    <li>Describe cryptographic principles and encryption methods.</li>
    <li>Evaluate network architecture and protocols for security.</li>
    <li>Stay current with emerging cybersecurity trends and tech.</li>
    `,

    python: 
    `
    <li>Know how to program using Python</li>
    <li>Learn the different types of programming languages and where Python fits</li>
    <li>Understand the functional programming paradigm</li>
    <li>Learn how to create Python programs for a variety of tasks</li>
    <li>Be familiar with data processing using Python</li>
    <li>Have hands-on experience working with Python</li>
    <li>Have developed software engineering and software development skills</li>
    <li>Be positioned to contribute to a “tech culture” within organization</li>
    `,

    reactjs: 
    `
    <li>Learn the different types of web technologies and how they work together</li>
    <li>Know how to program using web technologies</li>
    <li>Learn how to create web pages and websites using React</li>
    <li>Be able to debug web code</li>
    <li>Be familiar with data processing using JavaScript</li>
    <li>Have hands-on experience working with React and JavaScript</li>
    <li>Have developed their software development skills</li>
    <li>Be positioned to contribute to a “tech culture” within organizations</li>
    `,

    nodejs: 
    `
    <li>Master Node.js and its event loop architecture.</li>
    <li>Learn Node.js module system for module creation and extension.</li>
    <li>Use NPM for package management and publishing.</li>
    <li>Build RESTful APIs with Express.js, handling requests, validation, and errors.</li>
    <li>Dive into advanced Express.js features: middleware, templating, DB integration, auth.</li>
    <li>Excel in asynchronous JavaScript using Promises, callbacks, and async/await.</li>
    <li>Work with MongoDB and Mongoose for data operations and relationships.</li>
    <li>Handle errors, log, and implement testing in Node.js and Express.js apps.</li>
    `,

}



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