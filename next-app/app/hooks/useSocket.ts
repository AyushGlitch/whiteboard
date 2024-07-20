import { useEffect, useState } from "react"
import { io } from "socket.io-client"



export const useSocket= (username: string, userId: string) => {
    const [socket, setSocket] = useState(null)

    useEffect( () => {
        const newSocket= io(process.env.NEXT_PUBLIC_WS_URL!, {
            query: { 
                username,
                userId
            }
        })

        newSocket.on("connect", () => {
            console.log(`Connected to server with ${username} and ${userId}`)
        })

        newSocket.on("disconnect", () => {
            console.log(`Disconnected from server with ${username} and ${userId}`)
        })
        // @ts-ignore
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }

    }, [] )

    console.log(socket)
    return socket
}