import { Request, Response, NextFunction, RequestHandler } from "express";
export const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    return next();
  }

  res
    .status(401)
    .json({ message: "Você precisa estar logado para acessar esta rota." });
};
