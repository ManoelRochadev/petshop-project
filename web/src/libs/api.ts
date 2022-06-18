import axios from "axios";

export const api = axios.create({
  baseURL: "https://petshop-project2-production.up.railway.app"
})