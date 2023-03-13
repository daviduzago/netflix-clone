import React from "react"
import axios from "axios"
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"

interface FavoriteButtonProps {
    movieId: String
}

const FavoriteButton: React.FC<FavoriteButtonProps> = (props) => {
    const { movieId } = props
    const { mutate: mutateFavorites } = useFavorites()
    const { data: user, mutate } = useCurrentUser()

    const isFavorite = React.useMemo(() => {
        const list = user?.favoriteIds || []

        return list.includes(movieId)
    }, [user, movieId])


    const toggleFavorite = React.useCallback(async () => {
        let response

        if (isFavorite) {
            response = await axios.delete(`/api/favorite/`, { data: { movieId } })
        } else {
            response = await axios.post(`/api/favorite/`, { movieId })
        }

        const updatedFavoriteIds = response?.data?.favoriteIds

        mutate({
            ...user,
            favoriteIds: updatedFavoriteIds,
        })
        mutateFavorites()
    }, [isFavorite, movieId, user, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

    return (
        <div
            onClick={toggleFavorite}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon size={25} className="text-white hover:text-neutral-300" />
        </div>
    )
}

export default FavoriteButton
