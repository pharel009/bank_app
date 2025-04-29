import axios from "axios";
import { useState } from "react";


export const useAxios = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true
})

//request interceptor
axiosInstance.interceptors.request.use((request) => {
    return request;
},(error) => {
    return Promise.reject(error);
})

//response interceptor
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        setError(error.response.data.error); //capture backend error message
    } else {
        setError(error.message); //handle network error
    }
    return Promise.reject(error)
})



//fetch data api calls
const fetchData = async ({ url, method, data = {}, params = {} }) => {
        setLoading(true);
        setError(null);

    const controller = new AbortController();

    try {
        const result = await axiosInstance({
            url,
            method,
            data,
            params,
            signal: controller.signal
        });

        setData(result.data);
        return result;
    } catch (error) {
        console.log("Request has been cancelled", error.message);
    } finally {
        setLoading(false)
    }
    }

    return { data, error, loading, fetchData };
};