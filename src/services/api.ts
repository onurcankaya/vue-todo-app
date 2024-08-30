import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchTodos = async () => {
  try {
    const response = await api.get("/todos");
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error((error as Error).message);
  }
};
