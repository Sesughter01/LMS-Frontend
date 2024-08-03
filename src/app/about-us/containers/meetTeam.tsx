
import Image from "next/image"

import img1 from "@/assets/team1.png"
import img2 from "@/assets/team2.png"
import img3 from "@/assets/team3.png"
import img4 from "@/assets/team4.png"

const MeetTeam = () => {
    return (
        <section>
            <article className="flex flex-col gap-16 items-center py-24">
                <h1 className="text-4xl font-semibold">Meet Our Team</h1>
                <ul className="w-full px-6 lg:px-36 flex flex-wrap gap-4 justify-between">
                    <li className="flex flex-col items-center gap-2">
                        <Image src={img1} alt="team image" className="h-40 aspect-square bg-gray-200 rounded-lg" />
                        <h1 className="font-semibold text-lg">Khadijar Abdulkadril</h1>
                        <small className="text-gray-700">Chief Executive Officer</small>
                    </li>
                    <li className="flex flex-col items-center gap-2">
                        <Image src={img2} alt="team image" className="h-40 aspect-square bg-gray-200 rounded-lg" />
                        <h1 className="font-semibold text-lg">Osagie Aghado</h1>
                        <small className="text-gray-700">Executive Director</small>
                    </li>
                    <li className="flex flex-col items-center gap-2">
                        <Image src={img3} alt="team image" className="h-40 aspect-square bg-gray-200 rounded-lg" />
                        <h1 className="font-semibold text-lg">Oluwafemi Ojo</h1>
                        <small className="text-gray-700">Executive Director</small>
                    </li>
                    <li className="flex flex-col items-center gap-2">
                        <Image src={img4} alt="team image" className="h-40 aspect-square bg-gray-200 rounded-lg" />
                        <h1 className="font-semibold text-lg">Doris Theophilus</h1>
                        <small className="text-gray-700">Training Manager</small>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default MeetTeam