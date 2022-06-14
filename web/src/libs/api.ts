import axios from "axios";

export const api = axios.create({
  baseURL: "https://petshop-project-production.up.railway.app"
})