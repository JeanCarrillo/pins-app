import axios from "axios";
import JwtDecode from "jwt-decode";
import { AUTH_API } from "../config/api";

const login = async (username: string, password: string): Promise<boolean> => {
  return axios.post(AUTH_API + "/login", { username, password }).then((res) => {
    const token = res.data.data.token;
    window.localStorage.setItem("authToken", token);
    axios.defaults.headers["Authorization"] = "Bearer " + token;
    return true;
  });
};

const logout = (): void => {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
};

const init = (): void => {
  const token = window.localStorage.getItem("authToken");
  if (token && !isExpired(token))
    axios.defaults.headers["Authorization"] = "Bearer " + token;
};

const isLogged = (): boolean => {
  const token = window.localStorage.getItem("authToken");
  if (token) return !isExpired(token);
  return false;
};

const getUserId = (): string => {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const decodedToken = JwtDecode(token) as any;
    if (decodedToken.userId) return decodedToken.userId;
  }
  return "";
};

const isExpired = (token: string): boolean => {
  try {
    const { exp } = JwtDecode(token);
    if (exp * 1000 > new Date().getTime()) return false;
    return true;
  } catch (error) {
    return true;
  }
};

export default { login, logout, init, isLogged, getUserId };
