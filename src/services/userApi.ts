import axios from "axios";
import { User } from "../types/User";

const BASE_URL = "http://localhost:3000";

export const registerUser = async (user: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error((error as Error).message);
  }
};

export const loginUser = async (user: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, user);
    return response.data;
  } catch (error) {
    console.error((error as Error).message);
  }
};
