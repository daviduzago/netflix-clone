import useSwr from "swr"
import fetcher from "@/lib/fetcher"

const useMovie = (movieId?: string) => {
    const { data, error, isLoading } = useSwr(movieId ? `/api/movies/${movieId}` : "", fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading,
    }
}

export default useMovie
