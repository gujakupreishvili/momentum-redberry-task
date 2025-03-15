import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api"
});
