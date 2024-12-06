import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { configurePassport } from "./config/passportConfig";
import http from "http";
import { Server } from "socket.io";
import { configureMessageSocket } from "./messages";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const urls = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: urls,
    credentials: true,
  })
);

app.use(express.json());

connectDB();

configurePassport();

const port = process.env.PORT || 3333;

app.use(
  session({
    secret: process.env.SECRET_KEY || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: urls,
    credentials: true,
  },
});

export { io };

configureMessageSocket(io);

server.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
