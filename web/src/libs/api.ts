import axios from "axios";

const url = 'https://petshop-project2-production.up.railway.app/'

export const api = axios.create({
  baseURL: url,
})


