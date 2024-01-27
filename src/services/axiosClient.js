import axios from "axios";
import { getAccessToken } from "../utils/helper"; // Sử dụng tên hàm đúng

const instance = axios.create({
  baseURL: "http://localhost:8088/api/v1/", // base URL
  timeout: 5000, // thời gian hết hạn call API
  headers: { "Content-Type": "application/json" },
});

// interceptor can thiệp vào quá trình request
instance.interceptors.request.use(
  function (config) {
    // Lấy accessToken mỗi lần gửi request để đảm bảo token là mới nhất
    const accessToken = getAccessToken(); // Sử dụng hàm helper để lấy token
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
