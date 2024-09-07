"use client"


import { useSearchParams } from "next/navigation"
import { useSocket } from "../hooks/useSocket"
import { v4 as uuidv4 } from "uuid"
import { LoaderCircle } from "lucide-react"
import { useEffect } from "react"
import { joinedRoomDataType } from "../types/common"
import { Socket } from "socket.io-client"





export default function Wait () {
    const searchParams= useSearchParams()
    const username= searchParams.get("username")
    const userId= uuidv4()
    const roomId= searchParams.get("roomId")
    const isHost= searchParams.get("isHost") === "true" ? true : false
    const socket: Socket | null= useSocket(username!, userId, roomId!, isHost!)

    console.log(username, " ", roomId, " ", isHost)


    useEffect( () => {
        if (socket) {
            // @ts-ignore
            socket.on("joined-room", (data: joinedRoomDataType) => {
                console.log(data)
            })
        }

    }, [socket] )



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