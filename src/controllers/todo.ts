import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { TODO_PATH } from "constants/index";
import { readFile, writeFile } from "utils/index";
import { TodoModel } from "models/todo";

type ControllerKeys = "findAll" | "findById" | "create" | "delete" | "update";

const readTodos = (path: string = TODO_PATH) =>
  readFile(path) as Promise<TodoModel[]>;
const writeTodo = (data: string, path: string = TODO_PATH) =>
  writeFile(path, data);

export const todoController: Record<ControllerKeys, RequestHandler> = {
  findAll: async (req, res) => {
    const todos = await readTodos();
    return res.json(todos);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const todos = await readTodos();
    const currTodo = todos.find((todo) => todo.id === id);

    if (!currTodo) {
      return res.send("todo not found");
    }

    return res.json(currTodo);
  },
  create: async (req, res) => {
    const { author, body, title } = req.body as TodoModel;
    const id = uuidv4();
    const todos = await readTodos();

    if (!id) {
      return res.send("Error, id is required");
    }

    const equalTodo = todos.find((todo) => todo.id === id);

    if (equalTodo) {
      return res.send("Error, todo already create");
    }

    todos.push({ id, author, body, title });

    writeTodo(JSON.stringify(todos));
    return res.json({ status: "ok!" });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const todos = await readTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    writeTodo(JSON.stringify(filteredTodos));
    return res.json({ status: "ok!" });
  },
  update: async (req, res) => {
    const { id } = req.params;

    const { author, body, title } = req.body as TodoModel;
    const todos = await readTodos();

    if (!todos.find((todo) => todo.id === id)) {
      return res.send("Error, todo not found");
    }

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i] = {
          ...todos[i],
          author: author || todos[i].author,
          body: body || todos[i].body,
          title: title || todos[i].title,
        };
        break;
      }
    }

    writeTodo(JSON.stringify(todos));
    return res.json({ status: "ok!" });
  },
};
