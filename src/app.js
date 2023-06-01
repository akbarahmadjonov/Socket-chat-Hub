const { ENV } = require("../config/index");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());
app.set("view engine", "ejs");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Socket ID:", socket.id);
});

const chatRoute = require("../routes/chat");
app.use("/", chatRoute);

//* .env file
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
