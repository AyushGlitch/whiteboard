import { useEffect, useState } from "react"
import { io } from "socket.io-client"



export const useSocket= () => {
    const [socket, setSocket] = useState(null)

    useEffect( () => {
        const newSocket= io(process.env.NEXT_PUBLIC_WS_URL!)
        // @ts-ignore
        setSocket(newSocket)

    }, [] )

    console.log(socket)
    return socket
}