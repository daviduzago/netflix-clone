import React from "react"

import { BsFillPlayFill } from "react-icons/bs"
import { useRouter } from "next/router"

interface PlayButtonProps {
    movieId: String
}

const PlayButton: React.FC<PlayButtonProps> = (props) => {
    const { movieId } = props
    const router = useRouter()
    return (
        <button
            onClick={() => router.push(`/watch/${movieId}`)}
            className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto cursor-pointer text-xs lg:text-lg font-semibold flex justify-center items-center flex-row hover:bg-neutral-300 transition">
            <BsFillPlayFill size={25} className="mr-1" />
            Play
        </button>
    )
}

export default PlayButton
