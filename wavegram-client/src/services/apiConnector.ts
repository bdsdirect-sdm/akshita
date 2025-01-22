import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create();

// Define types for method, headers, and parameters
type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface ApiConnectorParams<T> {
  method: HttpMethod;
  url: string;
  bodyData?: T;
  headers?: AxiosRequestHeaders;
}

// Define return type for Axios response
export const apiConnector = <T,R>({
  method,
  url,
  bodyData,
  headers,
}: ApiConnectorParams<T>): Promise<AxiosResponse<R>> => {
  return axiosInstance({
    method,
    url:`${baseUrl}${url}`,
    data: bodyData || null,
    headers: headers || undefined,
  });
};
