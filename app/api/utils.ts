import axios from "axios";

export interface IHttpError {
    status: number;
    message?: string;
}

const API_URL: string = 'https://api.coincap.io/v2/';
export const client = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" }
})

const request = () => {
    // TODO
    return client;
};

export default request;