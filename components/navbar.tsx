/* eslint-disable jsx-a11y/anchor-is-valid */
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs"
import React from "react"
import MobileMenu from "./MobileMenu"
import NavbarItem from "./NavbarItem"
import AccountMenu from "./AccountMenu"

const TOP_OFFSET = 66

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false)
    const [showAccountMenu, setShowAccountMenu] = React.useState(false)
    const [showBackground, setShowBackground] = React.useState(false)

    const toggleAccountMenu = React.useCallback(() => {
        setShowAccountMenu((prev) => !prev)
    }, [setShowAccountMenu])

    const toggleMobileMenu = React.useCallback(() => {
        setShowMobileMenu((prev) => !prev)
    }, [setShowMobileMenu])

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
                    showBackground ? "bg-zinc-900 bg-opacity-90" : ""
                }`}>
                <img src="/images/logo.png" alt="Logo" className="h-4 lg:h-7" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="TV Shows" />
                    <NavbarItem label="Movies" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 transition cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 transition cursor-pointer">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="Avatar" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
