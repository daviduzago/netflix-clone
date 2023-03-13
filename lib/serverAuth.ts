import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"

import prismaDb from "@/lib/prismadb"

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req })

    if (!session?.user?.email) throw new Error("Not authenticated")

    const user = await prismaDb.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user) throw new Error("User not found")

    return { user }
}

export default serverAuth
