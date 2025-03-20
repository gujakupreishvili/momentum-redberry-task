import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});
