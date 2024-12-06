import { Server } from "socket.io";
import Message from "./models/messageModel";

const userSockets = new Map<string, string>();

export const configureMessageSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId: string) => {
      userSockets.set(userId, socket.id);
    });

    socket.on("sendMessage", async (data, callback) => {
      const { sender, receiver, content } = data;

      try {
        const message = await Message.create({
          sender,
          receiver,
          content,
        });

        const receiverSocketId = userSockets.get(receiver);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", message);
        } else {
          console.error(
            `Não foi possível encontrar o socket para o usuário ${receiver}`
          );
        }

        socket.emit("messageSent", message);
        callback(message);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        callback(null, "Erro ao enviar mensagem.");
      }
    });

    socket.on("getMessages", async (data) => {
      const { sender, receiver } = data;

      try {
        const messages = await Message.find({
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        }).sort({ timestamp: 1 });

        const formatData = messages.map((message) => ({
          sender: message.sender,
          receiver: message.receiver,
          content: message.content,
          timestamp: message.timestamp,
          id: message._id,
        }));

        socket.emit("receivedMessages", formatData);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        socket.emit("errorFetchingMessages", "Erro ao buscar mensagens.");
      }
    });

    socket.on("disconnect", () => {
      userSockets.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          userSockets.delete(userId);
        }
      });
    });
  });
};
