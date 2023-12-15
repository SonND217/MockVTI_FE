import instance from "./axiosClient";

const authService = {
  login(body) {
    return instance.post("/auth/login", body);
  },
  register() {},
  forgetPassword() {},
};

export default authService;
