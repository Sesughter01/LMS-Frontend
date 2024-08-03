import { Button } from "@/components/ui/button"


const NewsLetter = () => {
    return (
        <section className="flex flex-col gap-12 bg-secondary px-36 py-24 justify-center items-center">
            <div className="text-center text-white flex flex-col gap-4">
                <h1 className="text-4xl text-semibold">Ingryd Community</h1>
                <p>Subscribe to our news letter to get updates on  what we are up to</p>
            </div>
            <div className="flex bg-white rounded-lg w-2/3 overflow-hidden">
                <input type="text" placeholder="Enter you email" className="grow text-sm px-6" />
                <Button className="bg-primary text-white rounded-none">Subcscribe Here</Button>
            </div>
        </section>
    )
}

export default NewsLetter