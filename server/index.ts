import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let users: any[] = [];
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.data.isTyping = false;

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("typing", (data) => {
    socket.data.isTyping = true;

    socket.broadcast.emit("typingResponse", data);
  });
  socket.on("no-typing", (data) => {
    socket.data.isTyping = false;

    socket.broadcast.emit("noTypingResponse", data);
  });

  socket.on("newUser", (data) => {
    users.push(data);

    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    // console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

httpServer.listen(4001, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
