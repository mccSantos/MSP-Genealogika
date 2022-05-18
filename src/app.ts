import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected to socket ${socket.id}`);
});

const prisma = new PrismaClient();

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: { email: email, password: password },
  });

  if (user) {
    //generate token and now timestamp
  } else {
    //mandar erro 404 user not found
  }
});

app.get("/searchbyperson", async (req: Request, res: Response) => {
  const { nameToSearch } = req.body;

  const users = await prisma.user.findMany({
    where: { name: nameToSearch },
  });

  res.json(users);
});

export { serverHttp, io };
