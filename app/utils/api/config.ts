import axios from "axios";
const API_URL: string = 'https://api.coincap.io/v2/';
export const crypto_api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" }
})
