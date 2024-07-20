"use client"


import { useSearchParams } from "next/navigation"
import { useSocket } from "../hooks/useSocket"
import { v4 as uuidv4 } from "uuid"
import { LoaderCircle } from "lucide-react"


export default function Wait () {
    const searchParams= useSearchParams()
    const username= searchParams.get("username")
    const userId= uuidv4()
    const roomId= searchParams.get("roomId")
    const socket= useSocket(username!, userId)

    console.log(username, " ", roomId)



    if (!roomId) {
        return (
            <div className="flex flex-col gap-7 items-center justify-center mt-32">
                <LoaderCircle size={64} className="animate-spin" />
                <h1 className="text-2xl font-semibold text-slate-500">Please Wait...!!! Joining Room...!!!</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Wait</h1>
        </div>
    )
}