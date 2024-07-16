"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"



export default function Page() {
    const [username, setUsername] = useState("")
    const [roomId, setRoomId] = useState("")
    const router= useRouter()

    // console.log(username," ", roomId)
    console.log(process.env.NEXT_PUBLIC_WS_URL!)

    function handleStartGame() {
        if (username.trim() === "") {
            toast.error("Username is required")
        }
        else {
            router.push(`/wait?username=${username}&roomId=${roomId}`)
        }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-16">
            <div className="p-10 border-2 rounded-3xl w-1/3 flex flex-col gap-8 bg-slate-900">
                    <div className="flex flex-col gap-3">
                        <Label className="text-base font-semibold">Enter Username: </Label>
                        <Input type="text" className="" onChange={(e) => setUsername(e.target.value)} placeholder="Enter the display name...(Required)" />
                    </div>
                
                    <div className="flex flex-col gap-3">
                        <Label className="text-base font-semibold">Enter RoomID: </Label>
                        <Input type="text" className="" onChange={(e) => setRoomId(e.target.value)} placeholder="Enter the RoomID of room, you want to join... (Optional)" />
                    </div>

                    <Button variant={"outline"} className="bg-emerald-600 text-lg" onClick={handleStartGame}>
                        Start Game
                    </Button>
            </div>
        </div>
    )
}