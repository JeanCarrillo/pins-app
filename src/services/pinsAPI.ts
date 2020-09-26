import axios, { AxiosResponse } from "axios";
import { PINS_API } from "../config/api";
import { PinFormData } from "../types/interfaces";

const create = (pin: PinFormData) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(pin)) {
    formData.append(key, value);
  }
  return axios
    .post(PINS_API, formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((res: AxiosResponse<any>) => res.data);
};

export default { create };
