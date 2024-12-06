import Message from "../models/messageModel";
import User from "../models/userModel";

export const addUser = async (userData: {
  name: string;
  email: string;
  password: string;
  photo: string;
}) => {
  try {
    const newUser = new User({
      ...userData,
      status: "offline",
    });

    await newUser.save();

    return { message: "Usuário criado com sucesso!", email: newUser.email };
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("Email ja cadastrado");
    }
    throw new Error("Erro ao adicionar usuário");
  }
};

export const getUsers = async (email: string) => {
  try {
    const users = await User.find().select("_id name photo status email");

    const formatUser = await Promise.all(
      users.map(async (u) => {
        const lastMessage = await Message.findOne({ receiver: u._id })
          .sort({ timestamp: -1 })
          .select("content");

        return {
          id: u._id,
          title: lastMessage ? lastMessage.content : "Nenhuma mensagem",
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

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email }).select(
      "_id name photo status email"
    );

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const lastMessage = await Message.findOne({ receiver: user._id })
      .sort({ timestamp: -1 })
      .select("content");

    const formattedUser = {
      id: user._id,
      title: lastMessage ? lastMessage.content : "Nenhuma mensagem",
      email: user.email,
      name: user.name,
      photo: user.photo,
      status: user.status,
    };

    return formattedUser;
  } catch (error: any) {
    throw new Error("Erro ao obter o usuário: " + error.message);
  }
};

export const updateUserStatus = async (
  email: string,
  status: "online" | "offline"
) => {
  try {
    if (!["online", "offline"].includes(status)) {
      throw new Error("Status inválido. Deve ser 'online' ou 'offline'.");
    }

    const user = await User.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return { message: `Status do usuário atualizado para ${status}.` };
  } catch (error: any) {
    throw new Error(`Erro ao atualizar status: ${error.message}`);
  }
};
