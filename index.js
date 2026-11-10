import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
app.use(express.static(path.resolve("public")));

app.get('/', (req, res) => {
    res.sendFile(path.resolve("/public/index.js"));
})


const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    // Store custom state attributes directly inside the socket instance frame
    socket.username = 'Anonymous';

    // Listen for user join payloads
    socket.on('join', (username) => {
        socket.username = username || 'Anonymous';

        // Broadcast event alerts to all participants
        io.emit('system', `${socket.username} joined the chat.`);
    });

    // Listen for active text chat streams
    socket.on('chat', (message) => {
        io.emit('message', {
            username: socket.username,
            message: message
        });
    });

    // Handle sudden drop disconnects cleanly
    socket.on('disconnect', () => {
        io.emit('system', `${socket.username} left the chat.`);
    });
});

server.listen(8080, () => {
    console.log(`🚀 Socket.IO Server running at http://localhost:8080`);
});