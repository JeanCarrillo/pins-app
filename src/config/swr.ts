import axios from "axios";
import { API_URL } from "./api";

export const fetcher = (url: string) =>
  axios.get(API_URL + url).then((res) => res.data.data);
