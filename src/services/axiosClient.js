import axios from "axios";
import { getAcessToken } from "../utils/helper";

const instance = axios.create({
  baseURL: "https://dummyjson.com/", // base URL
  timeout: 5000, // thời gian hết hạn call API
  headers: { "Content-Type": "application/json" },
});

// interceptor can thiệp vào quá trình request
instance.interceptors.request.use(
  function (config) {
    const accessToken = getAcessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ` + accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// interceptor can thiệp vào quá trình nhận response từ BE gửi về
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
