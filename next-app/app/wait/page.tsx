"use client"


import { useSearchParams } from "next/navigation"
import { useSocket } from "../hooks/useSocket"


export default function Wait () {
    const searchParams= useSearchParams()
    const username= searchParams.get("username")
    const roomId= searchParams.get("roomId")
    const socket= useSocket()

    console.log(username, " ", roomId)

    return (
        <div>
            <h1>Wait</h1>
        </div>
    )
}