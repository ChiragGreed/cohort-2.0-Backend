import app from './src/app.js'
import { Server } from 'socket.io'
import { createServer } from 'http'


const httpServer = createServer(app);

const io = new Server(httpServer);


io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('message', (msg) => {
        console.log("New message",msg)
    })

})

httpServer.listen(6000, () => {
    console.log("Server started at Port 6000")
})