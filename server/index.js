const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketMap = new Map();
const socketToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket Connected ", socket.id);
  socket.on("room:join", (data) => {
    const { email, roomId } = data;
    emailToSocketMap.set(email, socket.id);
    socketToEmailMap.set(socket.id, email);
    io.to(socket.id).emit("room:join", data);
  });
});
