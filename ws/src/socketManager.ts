

type Room= {
    roomId: string
    roomMembersCnt: number
    isFull: boolean
    
}


export class User {
    public username: string
    public userId: string
    public socket: any

    constructor( username: string, userId: string, socket: any) {
        this.username= username
        this.userId= userId
        this.socket= socket
    }
}


export class SocketManager {
    private static instance: SocketManager
    private usersMap: Map<string, User>
    private roomsMap: Map<string, User[]>
    private userToRoomMap: Map<string, string>
    // private roomsMap: Map<string, Room[]>

    private constructor () {
        this.usersMap= new Map<string, User>
        this.roomsMap= new Map<string, User[]>
        this.userToRoomMap= new Map<string, string>
    }


    public static getInstance() {
        if (!SocketManager.instance) {
            SocketManager.instance= new SocketManager()
            return SocketManager.instance
        }

        return SocketManager.instance
    }


    public addUser (user: User) {
        this.usersMap.set(user.userId, this.usersMap.get(user.userId) || user)
        console.log(`User ${user.username} with ${user.userId} added by socketManager`)
        console.log("UsersMap: ", this.usersMap)
        console.log("RoomsMap: ", this.roomsMap)
        console.log("UserToRoomMap: ", this.userToRoomMap)

        this.addHandlers(user)

        // this.addUserToRoom(user)
    }


    public addHandlers (user: User) {
        user.socket.on("draw-data", (data: any) => {
            user.socket.to(this.userToRoomMap.get(user.userId)).broadcast.emit("draw-data", data)
        })
    }


    // public addUserToRoom (user: User) {
    //     if (this.userToRoomMap.has(user.userId)) {
    //         return
    //     }

        
    // }


    public addUserToRoom (roomId: string, user: User) {
        if ( this.roomsMap.get(roomId)?.includes(user) && this.userToRoomMap.get(user.userId) === roomId) {
            return
        }
        this.roomsMap.set(roomId, [...(this.roomsMap.get(roomId) || []), user])
        this.userToRoomMap.set(user.userId, roomId)

        user.socket.join(roomId)
    }


    public leaveRoom (roomId: string, user: User) {
        if ( this.usersMap.has(user.userId) && this.roomsMap.has(roomId)) {
            this.roomsMap.set(roomId, this.roomsMap.get(roomId)!.filter( (u) => (u.userId !== user.userId) ))
            if (this.roomsMap.get(roomId)!.length === 0) {
                this.roomsMap.delete(roomId)
            }

            this.userToRoomMap.delete(user.userId)

            user.socket.leave(roomId)
            return
        }
    }


    public sendToRoomMembers (roomId: string, userId: string, data: any ) {
        if (this.roomsMap.has(roomId)) {
            this.usersMap.get(userId)?.socket.to(roomId).emit("draw-data", data)
        }
    }


    public removeUser (userId: string) {
        if (this.usersMap.has(userId)) {
            this.leaveRoom(this.userToRoomMap.get(userId)!, this.usersMap.get(userId)!)
            this.usersMap.delete(userId)
            console.log(`User with ${userId} removed by socketManager`)
            console.log("UsersMap: ", this.usersMap)
            console.log("RoomsMap: ", this.roomsMap)
            console.log("UserToRoomMap: ", this.userToRoomMap)
        }
    }
}