const { Server } = require('socket.io')

class WebSocket {
    io
    users
    news
    notifications
    participants
    invoices
    payments

    constructor(server) {
        this.io = new Server(server, {
            cors: { origin: '*' }
        })
        this.users = []
    }

    listen() {
        console.log('Socket io successfully listened')
        this.io.on('connection', (socket) => {

            socket.on('addUser', (userId) => {
                this.addUser(userId, socket.id)
                this.io.emit('getUsers', this.users)
            })

            socket.on('disconnect', () => {
                this.removeUser(socket.id);
                this.io.emit("getUsers", this.users);
            })

            socket.on('sendNews', (from, text, role) => {
            })

            socket.on('sendNofication', (payload, callback) => {
                if (typeof callback !== "function") {
                    return socket.disconnect();
                }

                const { receiverId, text, senderId } = payload
                if (!receiverId || !text || !senderId) {
                    return callback({
                        status: 'KO',
                        error: 'payload not fullfiled'
                    })
                }

                const user = this.getUser(receiverId)

                callback({
                    status: 'OK',
                    to: user
                })
            })

        })
    }

    addUser(userId, socketId) {
        !this.users.some((user) => user.userId === userId) && this.users.push({ userId, socketId })
    }

    removeUser(socketId) {
        this.users = this.users.filter((user) => user.socketId !== socketId)
    }

    getUser(userId) {
        const user = this.users.find(user => user.userId === userId);
        console.log(user)
        return user
    }
}

module.exports = { Socket: WebSocket }