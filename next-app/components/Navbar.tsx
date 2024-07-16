"use client"

import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"


const links= [
    {
        label: "Home",
        href: "/",
        pathname: ""
    },
    {
        label: "Waiting Room",
        href: "/wait",
        pathname: "wait"
    },
    {
        label: "Game",
        href: "/game",
        pathname: "game"
    }
]


export const Navbar= () => {
    const pathname= usePathname()
    const parentDir= pathname.split('/')[1]
    // console.log(parentDir)

    return (
        <div className="flex justify-between items-center py-3 px-5">
            <div>
                <Link href={'/'}>
                    <h1 className="text-2xl font-semibold">Guess<span className="text-3xl font-extrabold">&</span>Draw </h1>
                </Link>
            </div>

            <div className="flex gap-7 justify-center items-center">
                {
                    links.map( (link, i) => (
                        <Button key={i} asChild variant={"secondary"} className={cn("border-b-4 text-sm font-medium", parentDir === link.pathname ? " border-slate-300" : "border-slate-600")}>
                            <Link href={'/'}>
                                {link.label}
                            </Link>
                        </Button>
                    ) )
                }
            </div>

            <div>
                <Button variant={"ghost"} className="text-lg font-medium">
                    About
                </Button>
            </div>
        </div>
    )
}