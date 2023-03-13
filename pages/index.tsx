import { NextPageContext } from "next"
import useCurrentUser from "@/hooks/useCurrentUser"
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default function Home() {
    const { data: user } = useCurrentUser()
    return (
        <>
            <h1 className="text-2xl text-red-600">Netflix Clone</h1>
            <p className="text-white font-medium">Logged in as: {user?.email}</p>
            <button className="w-full h-10 bg-white" onClick={() => signOut()}>
                Sign Out
            </button>
        </>
    )
}
