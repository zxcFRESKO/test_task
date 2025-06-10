import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_API
const HASURA_ADMIN_KEY = import.meta.env.VITE_HASURA_ADMIN_KEY

export const defaultApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'x-hasura-admin-secret': HASURA_ADMIN_KEY,
  },
});



