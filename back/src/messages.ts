import { Server } from "socket.io";
import Message from "./models/messageModel";
import User from "./models/userModel";

const userSockets = new Map<string, string>();

const getUsersWithMessages = async () => {
  try {
    const users = await User.find().select("_id name photo status email");

    const formatUser = await Promise.all(
      users.map(async (u) => {
        const message = await Message.findOne({
          $or: [{ sender: u._id }, { receiver: u._id }],
        })
          .sort({ timestamp: -1 })
          .select("content");

        return {
          id: u._id,
          title: message ? message.content : null,
          email: u.email,
          name: u.name,
          photo: u.photo,
          status: u.status,
        };
      })
    );

    return formatUser;
  } catch (error: any) {
    throw new Error("Erro ao obter usuários: " + error.message);
  }
};

export const configureMessageSocket = (io: Server) => {
  io.on("connection", (socket) => {
    // Quando o cliente emitir "getUsers", o servidor busca os usuários e envia para o cliente
    socket.on("getUsers", async () => {
      try {
        const users = await getUsersWithMessages();
        socket.emit("usersList", users); // Emite de volta para o cliente
      } catch (error) {
        console.error("Erro ao obter usuários:", error);
        socket.emit("usersList", []); // Envia uma lista vazia em caso de erro
      }
    });

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

        // Emitir atualização para todos os usuários
        io.emit("usersUpdated", await getUsersWithMessages());

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
