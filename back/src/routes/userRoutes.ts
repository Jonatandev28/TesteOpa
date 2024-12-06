import { Router } from "express";
import { getUsers } from "../services/userService";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

// @ts-ignore
router.get("/users", isAuthenticated, async (req, res) => {
  const user = req.user;
  try {
    // @ts-ignore
    const users = await getUsers(user.email as string);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter usuários" });
  }
});

export default router;
