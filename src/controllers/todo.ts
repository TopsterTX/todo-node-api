import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { TODO_PATH } from "constants/index";
import { readFile, writeFile } from "utils/index";
import { TodoModel } from "models/todo";
import { errorHandler, responseHandler } from "utils/handlers";

type ControllerKeys = "findAll" | "findById" | "create" | "delete" | "update";

const readTodos = (path: string = TODO_PATH) =>
  readFile(path) as Promise<TodoModel[]>;
const writeTodo = (data: string, path: string = TODO_PATH) =>
  writeFile(path, data);

export const todoController: Record<ControllerKeys, RequestHandler> = {
  findAll: async (req, res) => {
    const todos = await readTodos();
    return res.json(responseHandler(todos));
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const todos = await readTodos();
    const currTodo = todos.find((todo) => todo.id === id);

    if (!currTodo) {
      return res.json(errorHandler("Todo is not found"));
    }

    return res.json(responseHandler(currTodo));
  },
  create: async (req, res) => {
    const { author, body, title } = req.body as TodoModel;
    const id = uuidv4();
    const newTodo = { id, author, body, title };
    const todos = await readTodos();

    if (!id) {
      return res.send(errorHandler("Id is required"));
    }

    const equalTodo = todos.find((todo) => todo.id === id);

    if (equalTodo) {
      return res.send(errorHandler("Todo already create"));
    }

    todos.push(newTodo);

    writeTodo(JSON.stringify(todos));
    return res.json(responseHandler(newTodo));
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const todos = await readTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    writeTodo(JSON.stringify(filteredTodos));
    return res.json(responseHandler(null));
  },
  update: async (req, res) => {
    const { id } = req.params;

    const { author, body, title } = req.body as TodoModel;
    const todos = await readTodos();

    if (!todos.find((todo) => todo.id === id)) {
      return res.send(errorHandler("Todo not found"));
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
    return res.json(responseHandler(null));
  },
};
