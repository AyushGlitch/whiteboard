import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { SocketManager, User } from "./socketManager"



const app= express()
const httpServer = createServer(app)
const io= new Server(httpServer, {
    cors: {
        origin: "*"
    }
})


io.on("connection", (socket) => {
    const { username, userId }= socket.handshake.query
    console.log(`${username} with ${userId} connected`)
    SocketManager.getInstance().addUser(new User(username as string, userId as string, socket))


    socket.conn.on("close", () => {
        SocketManager.getInstance().removeUser(userId as string)
        console.log(`${username} with ${userId} disconnected`)
    })
})


httpServer.listen(8080, () => {
    console.log("server is running on port 8080")
})