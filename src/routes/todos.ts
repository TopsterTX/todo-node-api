import { Router } from "express";
import { todoController } from "controllers/index";

export const todoRouter = Router();

todoRouter.get("/todo", todoController.findAll);
todoRouter.get("/todo/:id", todoController.findById);
todoRouter.post("/todo", todoController.create);
todoRouter.put("/todo/:id", todoController.update);
todoRouter.delete("/todo/:id", todoController.delete);
