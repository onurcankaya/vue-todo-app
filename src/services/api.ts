import axios from "axios";
import { Todo } from "../types/Todo";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchTodos = async (): Promise<Todo[] | undefined> => {
  try {
    const response = await api.get("/todos");
    return response.data;
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const deleteTodo = async (id: Todo["id"]): Promise<void> => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const addTodo = async (newTodo: {
  title: Todo["title"];
}): Promise<void> => {
  try {
    await api.post("/todos", newTodo);
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const updateTodo = async (newTodo: Todo): Promise<void> => {
  try {
    await api.put(`/todos/${newTodo.id}`, newTodo);
  } catch (error) {
    console.error((error as Error).message);
  }
};
