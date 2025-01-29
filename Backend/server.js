import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow all origins (Frontend se connection allow karega)
    methods: ["GET", "POST"]
  }
});

// Middleware for authentication
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new Error("Unauthorized"));
    }

    socket.user = decoded; // ✅ Correct way to attach user data

    next(); // Allow the connection
  } catch (error) {
    next(new Error("Unauthorized"));
  }
});

// Socket event handling
io.on('connection', (socket) => {
  console.log("A user connected:", socket.user); // User info from token

  socket.on('event', (data) => {
    console.log("Received event:", data);
  });

  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
