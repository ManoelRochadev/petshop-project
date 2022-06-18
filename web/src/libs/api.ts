import axios from "axios";

const url = 'http://localhost:4000' || 'https://petshop-project2-production.up.railway.app/'

export const api = axios.create({
  baseURL: url,
})