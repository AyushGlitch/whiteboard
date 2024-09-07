"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"



export default function Page() {
    const [username, setUsername] = useState("")
    const [roomId, setRoomId] = useState("")
    const router= useRouter()

    // console.log(username," ", roomId)
    // console.log(process.env.NEXT_PUBLIC_WS_URL!)

    function handleStartGame() {
        if (username.trim() === "" || roomId.trim() === "") {
            toast.error("Username and RoomId is required")
        }
        else {
            router.push(`/wait?username=${username}&roomId=${roomId}&isHost=false`)
        }
    }


    function handleCreateRoom() {
        if (username.trim() === "") {
            toast.error("Username is required")
        }
        else {
            const roomId= uuidv4()
            router.push(`/wait?username=${username}&roomId=${roomId}&isHost=true`)
        }
    }


    return (
        <div className="flex gap-12 justify-center items-center mt-16">
            <div className="p-10 border-2 rounded-3xl w-1/3 flex flex-col gap-8 bg-slate-900">
                <h1 className="text-2xl font-semibold text-center">Create Room</h1>
                <div className="flex flex-col gap-3">
                    <Label className="text-base font-semibold">Enter Username: </Label>
                    <Input type="text" className="" onChange={(e) => setUsername(e.target.value)} placeholder="Enter the display name...(Required)" />
                </div>

                <Button variant={"outline"} className="bg-emerald-600 text-lg" onClick={handleCreateRoom}>
                    Create Room
                </Button>
            </div>

            <div className="p-10 border-2 rounded-3xl w-1/3 flex flex-col gap-8 bg-slate-900">
                <h1 className="text-2xl font-semibold text-center">Join Room</h1>
                <div className="flex flex-col gap-3">
                    <Label className="text-base font-semibold">Enter Username: </Label>
                    <Input type="text" className="" onChange={(e) => setUsername(e.target.value)} placeholder="Enter the display name...(Required)" />
                </div>
            
                <div className="flex flex-col gap-3">
                    <Label className="text-base font-semibold">Enter RoomID: </Label>
                    <Input type="text" className="" onChange={(e) => setRoomId(e.target.value)} placeholder="Enter the RoomID of room, you want to join... (Required)" />
                </div>

                <Button variant={"outline"} className="bg-emerald-600 text-lg" onClick={handleStartGame}>
                    Start Game
                </Button>
            </div>
        </div>
    )
}