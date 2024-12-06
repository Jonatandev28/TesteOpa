import { Request, Response, NextFunction } from "express";
import passport from "passport";
import {
  addUser,
  getUserByEmail,
  updateUserStatus,
} from "../services/userService";
import { io } from "..";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data = req.body;

  try {
    const result = await addUser(data);
    const user = await getUserByEmail(result.email);

    io.emit("userStatusChange", user);

    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === "Email já cadastrado") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro ao criar usuário" });
    }

    next(error);
  }
};

export const login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate(
    "local",
    { session: true },
    async (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res
          .status(400)
          .json({ message: info?.message || "Erro de autenticação" });
      }

      try {
        // const existingUser = await getUserByEmail(user.email);

        // if (existingUser.status === "online") {
        //   return res.status(400).json({ message: "Usuário já está online" });
        // }

        req.logIn(user, async (err) => {
          if (err) return next(err);

          await updateUserStatus(user.email, "online");
          const newUser = await getUserByEmail(user.email);

          io.emit("userStatusChange", newUser);

          const formatedUser = {
            id: user._id,
            name: user.name,
            status: "online",
            email: user.email,
            photo: user.photo,
          };

          return res
            .status(200)
            .json({ message: "Login bem-sucedido", user: formatedUser });
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email;

    // @ts-ignore
    await updateUserStatus(email, "offline");
    // @ts-ignore
    const newUser = await getUserByEmail(email);

    io.emit("userStatusChange", newUser);

    req.logout((err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ message: "Logout realizado com sucesso" });
    });
  } catch (err) {
    console.log("🚀  err", err);
    next(err);
  }
};
