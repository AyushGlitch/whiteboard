import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"



const app= express()
const httpServer = createServer(app)
const io= new Server(httpServer, {
    cors: {
        origin: "*"
    }
})


io.on("connection", (socket) => {
    console.log("user connected")


    socket.conn.on("close", () => {
        console.log("user disconnected")
    })
})


httpServer.listen(8080, () => {
    console.log("server is running on port 8080")
})