import React from "react"
import axios from "axios"
import Input from "@/components/input"
import { signIn } from "next-auth/react"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

const Auth = () => {
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [variant, setVariant] = React.useState("login")

    const toggleVariant = React.useCallback(() => {
        setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"))
    }, [])

    const login = React.useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/profiles",
            })
        } catch (error) {
            console.log(error)
        }
    }, [email, password])

    const register = React.useCallback(async () => {
        try {
            await axios.post("/api/register", {
                email,
                name,
                password,
            })
            login()
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:h-2/5 lg:max-w-md w-full rounded-sm">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{variant === "login" ? "Sign in" : "Sign up"}</h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                                <Input id="name" type="text" label="Name" onChange={(e: any) => setName(e.target.value)} value={name} />
                            )}
                            <Input id="email" type="email" label="Email" onChange={(e: any) => setEmail(e.target.value)} value={email} />
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <button
                            onClick={variant === "login" ? login : register}
                            className="bg-red-600 text-white py-3 mt-10 rounded-md w-full hover:bg-red-700 transition">
                            {variant === "login" ? "Sign in" : "Sign up"}
                        </button>
                        <div className="flex flex-grow items-center gap-8 mt-8 justify-center">
                            <div
                                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 font-semibold text-center mt-12">
                            {variant === "login" ? "New to Netflix?" : "Already have an account?"}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === "login" ? "Sign up now." : "Sign in now."}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
