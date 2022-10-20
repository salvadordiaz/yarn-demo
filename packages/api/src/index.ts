import express from 'express';
import {Server} from "socket.io";
import {createServer} from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
    }
});
io.on('connection', (socket) => {
    console.log('User connected');
    socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(3000, () => console.log('Chat running on port 3000'));
