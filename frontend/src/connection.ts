import axios from "axios";

const axiosOpenInstance = axios.create();
const axiosSecureInstance = axios.create();

axiosSecureInstance.interceptors.request.use(
    // Here we can perform any function we'd like on the request
    (request) => {
        // Retrieve the token from local storage
        const token =localStorage.getItem("TOKEN_KEY");
        if(!token){
          return request;
        }
  
        // Check if the header property exists
        if (request.headers) {
            // Set the Authorization header if it exists
            request.headers[
                "Authorization"
            ] = `Bearer ${token}`;
        } else {
            // Create the headers property if it does not exist
            request.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        return request;
    },
);
export const API_URL = "/api";
export const getSecureInstance = () =>  axiosSecureInstance;
export const getOpenInstance = () =>  axiosOpenInstance;